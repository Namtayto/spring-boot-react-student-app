package com.nam.service;

import com.nam.model.StudentPoint;

public interface StudentPointService {
    public StudentPoint createStudentPoint(StudentPoint studentPoint, String studentId, String semester);

}
