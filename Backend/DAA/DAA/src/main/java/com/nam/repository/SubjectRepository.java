package com.nam.repository;

import com.nam.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    public Optional<Subject> findById(Long id);
}
