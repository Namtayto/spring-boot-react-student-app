package com.nam.service;

import com.nam.model.StudentPoint;
import com.nam.model.Subject;
import com.nam.repository.StudentPointRepository;
import com.nam.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentPointServiceImpl implements StudentPointService {

    private final StudentPointRepository studentPointRepository;
    private final StudentRepository studentRepository;

    @Override
    public StudentPoint createStudentPoint(StudentPoint studentPoint, String studentId, String semester) {

        // StudentPoint existStudentPoint = studentRepository.findByStudentId(studentId).getStudentPointsBySemester(semester);//

        StudentPoint existStudentPoint = studentPointRepository.getStudentPointBySemesterAndStudentId(studentId, semester);

        if (existStudentPoint == null) {
            studentPoint.setSemester(semester);
            studentPoint.setStudent(studentRepository.findByStudentId(studentId));

            for (Subject subject : studentPoint.getSubjects()) {
                subject.setStudentPoint(studentPoint);
                subject.setPointAverage((subject.getPoint1() + subject.getPoint2() + subject.getPoint3() + subject.getPoint4()) / 4);
            }

            studentPointRepository.save(studentPoint);
            return studentPoint;
        } else {
            for (Subject subject : studentPoint.getSubjects()) {
                subject.setStudentPoint(existStudentPoint);
                subject.setPointAverage((subject.getPoint1() + subject.getPoint2() + subject.getPoint3() + subject.getPoint4()) / 4);

                existStudentPoint.getSubjects().add(subject);
            }

            studentPointRepository.save(existStudentPoint);
            return existStudentPoint;
        }
    }

}