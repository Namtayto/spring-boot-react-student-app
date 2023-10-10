package com.nam.controller;

import com.nam.model.StudentPoint;
import com.nam.service.StudentPointService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/studentpoint")
public class StudentPointController {

    private final StudentPointService studentPointService;


    public StudentPointController(StudentPointService studentPointService) {
        this.studentPointService = studentPointService;
    }


    @PostMapping("/subject/{studentId}/{semester}")
    public ResponseEntity<StudentPoint> addSubject(@RequestBody StudentPoint studentPoint, @PathVariable String studentId, @PathVariable String semester) {
        StudentPoint saveStudentPoint = studentPointService.createStudentPoint(studentPoint, studentId, semester);
        return new ResponseEntity<>(saveStudentPoint, HttpStatus.CREATED);
    }
}



