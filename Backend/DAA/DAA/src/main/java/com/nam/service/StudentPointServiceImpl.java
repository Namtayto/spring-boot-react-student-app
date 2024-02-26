package com.nam.service;

import com.nam.model.StudentPoint;
import com.nam.model.Subject;
import com.nam.repository.StudentPointRepository;
import com.nam.repository.StudentRepository;
import com.nam.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentPointServiceImpl implements StudentPointService {
    private final StudentPointRepository studentPointRepository;
    private final StudentRepository studentRepository;
    private final SubjectRepository subjectRepository;


    @Autowired
    public StudentPointServiceImpl(StudentPointRepository studentPointRepository, StudentRepository studentRepository, SubjectRepository subjectRepository) {
        this.studentPointRepository = studentPointRepository;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public StudentPoint createStudentPoint(StudentPoint studentPoint, String studentId, String semester) {

        // StudentPoint existStudentPoint = studentRepository.findByStudentId(studentId).getStudentPointsBySemester(semester);//
        
        StudentPoint existStudentPoint = studentPointRepository.getStudentPointBySemesterAndStudentId(studentId, semester);

        if (existStudentPoint == null) {
            studentPoint.setSemester(semester);
            studentPoint.setStudent(studentRepository.findByStudentId(studentId));

            studentPointRepository.save(studentPoint);

            for (Subject subject : studentPoint.getSubjects()) {
                Long subjectId = subject.getId();

                Optional<Subject> existingSubject = subjectRepository.findById(subjectId);

                if (existingSubject.isEmpty()) {
                    return null;
                }

                existingSubject.get().setStudentPoint(studentPoint);
                existingSubject.get().setPointAverage((subject.getPoint1() + subject.getPoint2() + subject.getPoint3() + subject.getPoint4()) / 4);
                subjectRepository.save(existingSubject.get());

            }
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


