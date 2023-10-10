package com.nam.service;

import com.nam.exception.UserException;
import com.nam.model.User;

public interface UserService {
    public User findUserById(Long userId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;
}