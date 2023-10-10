package com.nam.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "id")
public class Student extends User {

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @Column(name = "studentpoints")
    private List<StudentPoint> studentPoints = new ArrayList<>();

    private String studentId;
    private String clas;
    private String department;
    private String educationLevel;
    private String educationProgram;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @Column(name = "tuitions")
    private List<Tuition> tuitions = new ArrayList<>();

    public StudentPoint getStudentPointsBySemester(String semester) {
        StudentPoint studentPointsBySemester = new StudentPoint();
        for (StudentPoint studentPoint : studentPoints) {
            if (studentPoint.getSemester().equals(semester)) {
                return studentPointsBySemester;
            }
        }
        return null;
    }
}






