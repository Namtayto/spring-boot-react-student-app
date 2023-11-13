package com.nam.controller;

import com.nam.exception.UserException;
import com.nam.model.Student;
import com.nam.model.StudentPoint;
import com.nam.repository.StudentRepository;
import com.nam.response.ApiResponse;
import com.nam.service.StudentPointService;
import com.nam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {
    private final StudentRepository studentRepository;
    private final StudentPointService studentPointService;
    private final UserService userService;

    @Autowired
    public StudentController(StudentRepository studentRepository, StudentPointService studentPointService, UserService userService) {
        this.studentRepository = studentRepository;
        this.studentPointService = studentPointService;
        this.userService = userService;
    }

    @PostMapping("/subject/{studentId}/{semester}")
    public ResponseEntity<StudentPoint> addSubject(@RequestBody StudentPoint studentPoint, @PathVariable String studentId, @PathVariable String semester) {
        StudentPoint saveStudentPoint = studentPointService.createStudentPoint(studentPoint, studentId, semester);
        return new ResponseEntity<>(saveStudentPoint, HttpStatus.CREATED);
    }

    @GetMapping("/getStudentList")
    public ResponseEntity<List<Student>> getAllNotice() {

        List<Student> students = studentRepository.findAll();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{studentId}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long studentId) throws UserException {
        userService.removeUser(studentId);

        ApiResponse res = ApiResponse.builder().
                message("Deleted student with id: " + studentId).status(true).build();

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/getPoint/{studentId}")
    public ResponseEntity<List<StudentPoint>> getPoint(@PathVariable Long studentId) throws UserException {
        Student student = (Student) userService.findUserById(studentId);

        return new ResponseEntity<>(student.getStudentPoints(), HttpStatus.OK);

    }
}
