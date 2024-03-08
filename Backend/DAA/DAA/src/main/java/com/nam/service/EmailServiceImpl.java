package com.nam.service;

import com.nam.model.Email;
import com.nam.repository.EmailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;
    private final EmailRepository emailRepository;

    public static String cleanEmail(String email) {
        // Loại bỏ các ký tự không hợp lệ từ địa chỉ email
        return email.replaceAll("[\\p{Cntrl}\\s]", "");
    }

    @Override
    public void sendEmail(Email registerEmail) {

        emailRepository.save(registerEmail);
        SimpleMailMessage newEmail = new SimpleMailMessage();
        newEmail.setTo(registerEmail.getRegisterEmail());
        newEmail.setSubject("Thank you for registering");
        newEmail.setText("Dear " + registerEmail.getRegisterEmail() + ",\n\n" +
                "Thank you for registering to the Student Application project" + ".\n\n" +
                "We will keep you informed about any updates regarding the project student application.\n\n" +
                "If there are any changes or important information, we will notify you promptly.\n\n" +
                "Please feel free to contact us if you have any questions or concerns.\n\n" +
                "Thank you again for your participation!\n\n" +
                "Best regards,\n" +
                "Nguyen Hoang Nam");

        javaMailSender.send(newEmail);
    }
}
