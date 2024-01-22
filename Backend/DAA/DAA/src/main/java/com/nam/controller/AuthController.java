package com.nam.controller;

import com.nam.config.JwtProvider;
import com.nam.exception.UserException;
import com.nam.model.Student;
import com.nam.model.Teacher;
import com.nam.model.User;
import com.nam.repository.UserRepository;
import com.nam.request.LoginRequest;
import com.nam.response.AuthResponse;
import com.nam.service.CustomerUserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final CustomerUserServiceImpl customerUserService;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public AuthController(UserRepository userRepository,
                          CustomerUserServiceImpl customerUserService,
                          PasswordEncoder passwordEncoder,
                          JwtProvider jwtProvider) {

        this.userRepository = userRepository;
        this.customerUserService = customerUserService;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;

    }

    @PostMapping("/signup/student")
    public ResponseEntity<AuthResponse> createStudent(@RequestBody Student student) throws UserException {

        User isEmailExist = userRepository.findByEmail(student.getEmail())
                .orElseThrow(() -> new UserException("User Not Found with email: " + student.getEmail()));

        Student created = new Student();
        created.setEmail(student.getEmail());
        created.setPassword(passwordEncoder.encode(student.getPassword()));
        created.setFirstName(student.getFirstName());
        created.setLastName(student.getLastName());
        created.setRole("student");
        created.setStudentId(student.getStudentId());
        created.setClas(student.getClas());
        created.setDepartment(student.getDepartment());
        created.setEducationLevel(student.getEducationLevel());
        created.setEducationProgram(student.getEducationProgram());

        User savedUser = userRepository.save(created);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Signup Success for Student with Id: " + student.getStudentId());
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);


    }

    @PostMapping("/signup/teacher")
    public ResponseEntity<AuthResponse> createTeacher(@RequestBody Teacher teacher) throws UserException {

        User isEmailExist = userRepository.findByEmail(teacher.getEmail())
                .orElseThrow(() -> new UserException("User Not Found with email: " + teacher.getEmail()));
        
        Teacher created = new Teacher();
        created.setEmail(teacher.getEmail());
        created.setPassword(passwordEncoder.encode(teacher.getPassword()));
        created.setFirstName(teacher.getFirstName());
        created.setLastName(teacher.getLastName());
        created.setRole("teacher");

        User savedUser = userRepository.save(created);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Signup Success for Teacher.");
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);

    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) {
        String userName = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(userName, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Signin Success");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);


    }

    private Authentication authenticate(String userName, String password) {
        UserDetails userDetails = customerUserService.loadUserByUsername(userName);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid UserName");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid Password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

    }
}




