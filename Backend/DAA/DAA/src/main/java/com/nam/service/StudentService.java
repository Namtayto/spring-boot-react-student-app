package com.nam.service;

import com.nam.model.Student;
import org.springframework.data.domain.Page;

import java.util.List;

public interface StudentService {
    public Page<Student> getStudentListPage(Integer pageNumber, Integer pageSize);

    public List<Student> saveAllStudent(List<Student> students);
}
