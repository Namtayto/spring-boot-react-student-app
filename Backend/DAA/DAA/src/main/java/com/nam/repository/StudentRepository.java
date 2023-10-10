package com.nam.repository;

import com.nam.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    public Student findByStudentId(String studentId);

}
