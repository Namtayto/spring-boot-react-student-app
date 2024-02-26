package com.nam.repository;

import com.nam.model.StudentPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentPointRepository extends JpaRepository<StudentPoint, Long> {
    public StudentPoint findBySemester(String semester);

    @Query("SELECT sp FROM StudentPoint sp" +
            " JOIN sp.student s" +
            " WHERE s.studentId = :studentId AND sp.semester = :semester")
    public StudentPoint getStudentPointBySemesterAndStudentId(@Param("studentId") String studentId, @Param("semester") String semester);

}
