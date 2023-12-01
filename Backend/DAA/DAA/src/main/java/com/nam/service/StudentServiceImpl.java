package com.nam.service;

import com.nam.model.Student;
import com.nam.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Page<Student> getStudentListPage(Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        List<Student> studentList = studentRepository.findAll();

        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), studentList.size());
        List<Student> pageContent = studentList.subList(startIndex, endIndex);

        Page<Student> filteredStudents = new PageImpl<>(pageContent, pageable, studentList.size());

        return filteredStudents;
    }

    @Override
    public List<Student> saveallStudent(List<Student> students) {
        return studentRepository.saveAll(students);
    }
}
