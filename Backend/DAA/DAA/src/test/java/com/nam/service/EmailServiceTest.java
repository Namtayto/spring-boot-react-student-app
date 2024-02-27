package com.nam.service;

import com.nam.model.Email;
import com.nam.repository.EmailRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class EmailServiceTest {

    @Mock
    EmailRepository emailRepository;

    @Mock
    private JavaMailSender javaMailSender;

    @InjectMocks
    EmailServiceImpl emailService;

    private Email registerEmail;

    @BeforeEach
    void setUp() {
        registerEmail = Email.builder().registerEmail("BrockLesnar@gmail.com")
                .build();
    }

    @AfterEach
    void tearDown() {
    }

    @DisplayName("JUnit test for sendEmail method")
    @Test
    void givenEmailObject_whenSendEmail_thenVerifyEmailRepositorySaveAndJavaMailSenderSend() {

        SimpleMailMessage expectedEmail = new SimpleMailMessage();
        expectedEmail.setTo(registerEmail.getRegisterEmail());
        expectedEmail.setSubject("Thank you for registering");
        expectedEmail.setText("Dear " + registerEmail.getRegisterEmail() + ",\n\n" +
                "Thank you for registering to the Student Application project" + ".\n\n" +
                "We will keep you informed about any updates regarding the project student application.\n\n" +
                "If there are any changes or important information, we will notify you promptly.\n\n" +
                "Please feel free to contact us if you have any questions or concerns.\n\n" +
                "Thank you again for your participation!\n\n" +
                "Best regards,\n" +
                "Nguyen Hoang Nam");

        // when -  action or the behaviour that we are going to test
        emailService.sendEmail(registerEmail);

        // then - verify the output
        verify(emailRepository, times(1)).save(registerEmail);
        verify(javaMailSender, times(1)).send(expectedEmail);
    }
}