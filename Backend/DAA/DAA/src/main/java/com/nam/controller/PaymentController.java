package com.nam.controller;

import com.nam.exception.TuitionException;
import com.nam.model.Tuition;
import com.nam.payload.response.ApiResponse;
import com.nam.payload.response.PaymentLinkResponse;
import com.nam.repository.TuitionRepository;
import com.nam.service.UserService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PaymentController {
    @Value("${razorpay.api.key}")
    String apiKey;

    @Value("${razorpay.api.secret}")
    String apiSecret;

    private final UserService userService;
    private final TuitionRepository tuitionRepository;


    @PostMapping("/payments/{tuitionId}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(@PathVariable Long tuitionId,
                                                                 @RequestHeader("Authorization") String jwt) throws TuitionException, RazorpayException {
        Optional<Tuition> opt = tuitionRepository.findById(tuitionId);
        Tuition tuition = new Tuition();
        if (opt.isPresent()) {
            tuition = opt.get();
        }

        try {
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", tuition.getTotalPay());
            paymentLinkRequest.put("currency", "USD");

            JSONObject customer = new JSONObject();
            customer.put("name", tuition.getStudent().getFirstName());
            customer.put("email", tuition.getStudent().getEmail());
            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("sms", true);
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("callback_url", "http://localhost:3000/payment/" + tuitionId);
            paymentLinkRequest.put("callback_method", "get");

            PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

            PaymentLinkResponse res = new PaymentLinkResponse(payment.get("id"), payment.get("short_url"));
            return new ResponseEntity<PaymentLinkResponse>(res, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new RazorpayException(e.getMessage());
        }
    }

    @GetMapping("/payments")
    public ResponseEntity<ApiResponse> redirect(@RequestParam(name = "payment_id") String paymentId, @RequestParam(name = "tuition_id") Long tuitionId)
            throws TuitionException, RazorpayException {
        Optional<Tuition> opt = tuitionRepository.findById(tuitionId);
        Tuition tuition = new Tuition();
        if (opt.isPresent()) {
            tuition = opt.get();
        }

        RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

        try {
            Payment payment = razorpay.payments.fetch(paymentId);

            if (payment.get("status").equals("captured")) {


                tuition.setPaymentStatus("Đã thanh toán");
                tuition.setPayAt(LocalDateTime.now());
                tuitionRepository.save(tuition);
            }

            ApiResponse res = ApiResponse.builder().message("Your tuition has been paid").status(true)
                    .build();

            return new ResponseEntity<ApiResponse>(res, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            throw new RazorpayException(e.getMessage());
        }
    }
}

