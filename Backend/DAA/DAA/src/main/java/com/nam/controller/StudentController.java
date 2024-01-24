package com.nam.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nam.exception.UserException;
import com.nam.model.Student;
import com.nam.model.StudentPoint;
import com.nam.payload.response.ApiResponse;
import com.nam.service.StudentPointService;
import com.nam.service.StudentService;
import com.nam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;
    private final StudentPointService studentPointService;
    private final UserService userService;

    @Autowired
    public StudentController(StudentService studentService, StudentPointService studentPointService, UserService userService) {
        this.studentService = studentService;
        this.studentPointService = studentPointService;
        this.userService = userService;
    }

    @PostMapping("/subject/{studentId}/{semester}")
    public ResponseEntity<StudentPoint> addSubject(@RequestBody StudentPoint studentPoint, @PathVariable String studentId, @PathVariable String semester) {
        StudentPoint saveStudentPoint = studentPointService.createStudentPoint(studentPoint, studentId, semester);
        return new ResponseEntity<>(saveStudentPoint, HttpStatus.CREATED);
    }

    @GetMapping("/getStudentList")
    public ResponseEntity<Page<Student>> getAllNotice(@RequestParam Integer pageNumber, @RequestParam Integer pageSize) {

        Page<Student> students = studentService.getStudentListPage(pageNumber, pageSize);
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{studentId}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long studentId) throws UserException {
        userService.removeUser(studentId);

        ApiResponse res = ApiResponse.builder().
                message("Deleted student with id: " + studentId).status(true).build();

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            List<Student> entities = readJsonAndMapToEntities(file);

            studentService.saveallStudent(entities);

            return "File uploaded successfully";
        } catch (Exception e) {
            return "Error uploading file: " + e.getMessage();
        }
    }

    private List<Student> readJsonAndMapToEntities(MultipartFile file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        TypeReference<List<Student>> typeReference = new TypeReference<>() {
        };
        return objectMapper.readValue(file.getInputStream(), typeReference);
    }
}