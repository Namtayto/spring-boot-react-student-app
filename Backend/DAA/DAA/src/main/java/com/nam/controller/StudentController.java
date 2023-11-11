package com.nam.controller;

import com.nam.model.Student;
import com.nam.model.StudentPoint;
import com.nam.repository.StudentRepository;
import com.nam.service.StudentPointService;
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

    @Autowired
    public StudentController(StudentRepository studentRepository, StudentPointService studentPointService) {
        this.studentRepository = studentRepository;
        this.studentPointService = studentPointService;
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
}
