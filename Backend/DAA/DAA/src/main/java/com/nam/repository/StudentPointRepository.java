package com.nam.repository;

import com.nam.model.StudentPoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentPointRepository extends JpaRepository<StudentPoint, Long> {
    public StudentPoint findBySemester(String semester);


}
