package com.nam.service;

import com.nam.model.Student;
import com.nam.model.StudentPoint;
import com.nam.model.Subject;
import com.nam.repository.StudentPointRepository;
import com.nam.repository.StudentRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class StudentPointServiceTest {

    @Mock
    StudentRepository studentRepository;

    @Mock
    StudentPointRepository studentPointRepository;

    @InjectMocks
    StudentPointServiceImpl studentPointService;

    private StudentPoint existStudentPoint;
    private Student student;
    private List<Subject> subjectList;

    @BeforeEach
    void setUp() {
        Subject subject1 = Subject.builder()
                .id(1L).subjectId("IT001").subjectName("OOP")
                .point1(5).point2(6).point3(7).point4(8)
                .build();
        Subject subject2 = Subject.builder()
                .id(2L).subjectId("IT002").subjectName("DSA")
                .point1(10).point2(10).point3(9).point4(9)
                .build();

        subjectList = new ArrayList<>(Arrays.asList(subject1, subject2));

        existStudentPoint = StudentPoint.builder()
                .id(1L)
                .year("2023-2024")
                .subjects(subjectList)
                .build();

        List<StudentPoint> studentPointList = List.of(existStudentPoint);

        student = Student.builder()
                .id(1L)
                .studentPoints(studentPointList)
                .build();
    }

    @AfterEach
    void tearDown() {
        Mockito.reset(studentRepository, studentPointRepository);
    }

    @DisplayName("JUnit test for createStudentPoint method when Student Point is Null")
    @Test
    void givenStudentPointStudentIdAndSemester_whenCreateStudentPointWithNullExistingStudentPoint_thenVerifyStudentPointRepositorySaveAndStudentPointIsReturned() {
        // given - precondition or setup
        String studentId = "215223xx";
        String semester = "HK1";
        student.setStudentId(studentId);


        given(studentPointRepository.getStudentPointBySemesterAndStudentId(studentId, semester)).willReturn(null);
        given(studentRepository.findByStudentId(studentId)).willReturn(student);
        given(studentPointRepository.save(existStudentPoint)).willReturn(existStudentPoint);

        // when -  action or the behaviour that we are going to test
        StudentPoint result = studentPointService.createStudentPoint(existStudentPoint, studentId, semester);

        // then - verify the output
        verify(studentPointRepository, times(1)).save(existStudentPoint);
        assertThat(result).isEqualTo(existStudentPoint);
    }

    @DisplayName("JUnit test for createStudentPoint method when Student Point is Exist")
    @Test
    void givenStudentPointStudentIdAndSemester_whenCreateStudentPointWithExistingStudentPoint_thenVerifyStudentPointRepositorySaveAndStudentPointIsReturned() {
        // given - precondition or setup
        String studentId = "215223xx";
        String semester = "HK1";
        student.setStudentId(studentId);
        existStudentPoint.setSemester(semester);
        List<Subject> newSubjectList = new ArrayList<>(subjectList);
        Subject subject3 = Subject.builder()
                .id(3L).subjectId("IT003").subjectName("Java")
                .point1(10).point2(10).point3(10).point4(10)
                .build();

        newSubjectList.add(subject3);

        StudentPoint updateStudentPoint = StudentPoint.builder()
                .year("2023-2024")
                .subjects(newSubjectList)
                .build();


        given(studentPointRepository.getStudentPointBySemesterAndStudentId(studentId, semester)).willReturn(existStudentPoint);
        given(studentPointRepository.save(existStudentPoint)).willReturn(existStudentPoint);

        // when -  action or the behaviour that we are going to test
        StudentPoint result = studentPointService.createStudentPoint(updateStudentPoint, studentId, semester);

        // then - verify the output
        verify(studentPointRepository, times(1)).save(existStudentPoint);
        assertThat(result).isEqualTo(existStudentPoint);
    }
}