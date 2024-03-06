package com.nam.repository;

import com.nam.AbstractContainerBaseTest;
import com.nam.model.Student;
import com.nam.model.StudentPoint;
import com.nam.model.Tuition;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class StudentPointRepositoryTest extends AbstractContainerBaseTest {

    @Autowired
    private StudentPointRepository studentPointRepository;

    @Autowired
    private UserRepository userRepository;

    private Student student;
    private StudentPoint studentPoint;

    @BeforeEach
    void setUp() {
/*        Subject subject1 = Subject.builder()
                .subjectId("IT001").subjectName("OOP")
                .point1(5).point2(6).point3(7).point4(8)
                .build();
        Subject subject2 = Subject.builder()
                .subjectId("IT002").subjectName("DSA")
                .point1(10).point2(10).point3(9).point4(9)
                .build();*/
        studentPoint = StudentPoint.builder()
                .year("2023-2024")
                .semester("HK1")
                .build();

        List<Tuition> tuitionList = new ArrayList<>();

        student = Student.builder()
                .studentId("215223xx")
                .tuitions(tuitionList)
                .email("131@gmail.com")
                .build();
    }


    @Test
    @DisplayName("JUnit test for getStudentPointBySemesterAndStudentId method when Student Point is existed")
    public void givenStudentIdAndSemester_whenGetStudentPointBySemesterAndStudentId_returnStudentPointObject() {
        // given - precondition or setup
        String studentId = "215223xx";
        String semester = "HK1";

        Student savedStudent = userRepository.save(student);
        studentPoint.setStudent(savedStudent);
        StudentPoint savedStudentPoint = studentPointRepository.save(studentPoint);

        // when action or the behaviour that we are going to test
        StudentPoint returnedStudentPoint = studentPointRepository.getStudentPointBySemesterAndStudentId(studentId, semester);

        // then - verify the output
        assertThat(returnedStudentPoint).isNotNull();
        assertThat(returnedStudentPoint.getId()).isEqualTo(savedStudentPoint.getId());
    }
}