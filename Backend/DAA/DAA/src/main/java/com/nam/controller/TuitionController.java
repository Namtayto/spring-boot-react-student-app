package com.nam.controller;

import com.nam.exception.TuitionException;
import com.nam.exception.UserException;
import com.nam.model.Tuition;
import com.nam.repository.StudentRepository;
import com.nam.repository.TuitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tuition")
public class TuitionController {

    private TuitionRepository tuitionRepository;

    private StudentRepository studentRepository;


    @Autowired
    public TuitionController(TuitionRepository tuitionRepository, StudentRepository studentRepository) {
        this.tuitionRepository = tuitionRepository;
        this.studentRepository = studentRepository;
    }

    @PostMapping("/{studentId}/{semester}")
    public ResponseEntity<Tuition> createTuition(@PathVariable String studentId, @RequestBody Tuition tuition, @PathVariable String semester) throws UserException, TuitionException {

        tuition.setSemester(semester);

        tuition.setStudent(studentRepository.findByStudentId(studentId));

        tuitionRepository.save(tuition);

        return new ResponseEntity<>(tuition, HttpStatus.CREATED);
    }

}