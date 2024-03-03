package com.nam.service;

import com.nam.exception.UserException;
import com.nam.model.Student;
import com.nam.model.Teacher;
import com.nam.model.User;
import com.nam.payload.request.SignupStudentRequest;
import com.nam.payload.request.SignupTeacherRequest;

public interface UserService {
    public User findUserById(Long userId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;

    public void deleteUser(Long id) throws UserException;

    public Student createStudent(SignupStudentRequest studentRequest) throws UserException;

    public Teacher createTeacher(SignupTeacherRequest teacherRequest) throws UserException;
}