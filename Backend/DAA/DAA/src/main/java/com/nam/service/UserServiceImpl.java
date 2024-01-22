package com.nam.service;

import com.nam.exception.UserException;
import com.nam.model.User;
import com.nam.repository.UserRepository;
import com.nam.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private JwtProvider jwtProvider;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User findUserById(Long userId) throws UserException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get();
        }

        throw new UserException("User not found with id: " + userId);
    }


    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromToken(jwt);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserException("User Not Found with email: " + email));

        return user;
    }

    @Override
    public void removeUser(Long id) throws UserException {
        userRepository.deleteById(id);
    }
}