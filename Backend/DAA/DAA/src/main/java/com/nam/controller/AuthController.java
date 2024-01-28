package com.nam.controller;

import com.nam.exception.TokenRefreshException;
import com.nam.model.*;
import com.nam.payload.request.LoginRequest;
import com.nam.payload.request.TokenRefreshRequest;
import com.nam.payload.response.ApiResponse;
import com.nam.payload.response.JwtResponse;
import com.nam.payload.response.TokenRefreshResponse;
import com.nam.repository.RoleRepository;
import com.nam.repository.UserRepository;
import com.nam.security.jwt.JwtProvider;
import com.nam.security.services.RefreshTokenService;
import com.nam.security.services.UserDetailsImpl;
import com.nam.security.services.UserDetailsServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    private final AuthenticationManager authenticationManager;

    private final RefreshTokenService refreshTokenService;


    @Autowired
    public AuthController(UserRepository userRepository,
                          UserDetailsServiceImpl customerUserService,
                          PasswordEncoder passwordEncoder,
                          JwtProvider jwtProvider, RoleRepository roleRepository, AuthenticationManager authenticationManager, RefreshTokenService refreshTokenService) {

        this.userRepository = userRepository;
        this.userDetailsService = customerUserService;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;

        this.roleRepository = roleRepository;
        this.authenticationManager = authenticationManager;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/signup/student")
    public ResponseEntity<ApiResponse> createStudent(@RequestBody Student student) {

        Optional<User> isEmailExist = userRepository.findByEmail(student.getEmail());
        if (isEmailExist.isPresent()) {
            return new ResponseEntity<>(new ApiResponse("User already exists with email: " + student.getEmail(), false), HttpStatus.BAD_REQUEST);
        }


        Student created = new Student();
        created.setEmail(student.getEmail());
        created.setPassword(passwordEncoder.encode(student.getPassword()));
        created.setFirstName(student.getFirstName());
        created.setLastName(student.getLastName());

        Set<Role> roles = new HashSet<>();
        Optional<Role> role = roleRepository.findByName(ERole.ROLE_STUDENT);
        roles.add(role.get());
        created.setRoles(roles);

        created.setStudentId(student.getStudentId());
        created.setClas(student.getClas());
        created.setDepartment(student.getDepartment());
        created.setEducationLevel(student.getEducationLevel());
        created.setEducationProgram(student.getEducationProgram());

        userRepository.save(created);

        return new ResponseEntity<>(new ApiResponse("Signup Success for Student with Id: " + student.getStudentId(), true), HttpStatus.CREATED);


    }

    @PostMapping("/signup/teacher")
    public ResponseEntity<ApiResponse> createTeacher(@RequestBody Teacher teacher) {

        Optional<User> isEmailExist = userRepository.findByEmail(teacher.getEmail());
        if (isEmailExist.isPresent()) {
            return new ResponseEntity<>(new ApiResponse("User already exists with email: " + teacher.getEmail(), false), HttpStatus.BAD_REQUEST);
        }

        Teacher created = new Teacher();
        created.setEmail(teacher.getEmail());
        created.setPassword(passwordEncoder.encode(teacher.getPassword()));
        created.setFirstName(teacher.getFirstName());
        created.setLastName(teacher.getLastName());

        Set<Role> roles = new HashSet<>();
        Optional<Role> role = roleRepository.findByName(ERole.ROLE_TEACHER);
        roles.add(role.get());
        created.setRoles(roles);

        userRepository.save(created);

        return new ResponseEntity<>(new ApiResponse("Signup Success for Teacher.", true), HttpStatus.CREATED);

    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken(), userDetails.getId(),
                userDetails.getUsername(), userDetails.getEmail(), roles));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtProvider.generateTokenByEmail(user.getEmail());
                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = userDetails.getId();
        refreshTokenService.deleteByUserId(userId);
        return ResponseEntity.ok(new ApiResponse("Log out successful!", true));
    }

}