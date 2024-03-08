package com.nam.controller;

import com.nam.model.Email;
import com.nam.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @RequestMapping("/send")
    public String processEmail(@RequestBody Email email) {
        emailService.sendEmail(email);
        return "Send mail successfully";
    }
}
