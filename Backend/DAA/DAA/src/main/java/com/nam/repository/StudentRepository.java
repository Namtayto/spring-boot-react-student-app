package com.nam.repository;

import com.nam.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StudentRepository extends JpaRepository<Student, Long> {
    public Student findByStudentId(String studentId);

    @Query("SELECT s FROM Student s")
    public Page<Student> findAllWithPagination(Pageable pageable);

}
