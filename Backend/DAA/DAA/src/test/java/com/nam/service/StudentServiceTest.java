package com.nam.service;

import com.nam.model.Student;
import com.nam.repository.StudentRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {
    @Mock
    StudentRepository studentRepository;
    @InjectMocks
    StudentServiceImpl studentService;

    private Student student;

    @BeforeEach
    void setUp() {

        student = Student.builder()
                .id(1L)
                .firstName("Nguyen Hoang").lastName("Nam")
                .password("123")
                .email("1@gmail.com")
                .createdAt(LocalDateTime.now())
                .build();
    }

    @AfterEach
    void tearDown() {
    }

    @DisplayName("JUnit test for getStudentListPage method")
    @Test
    void givenPageNumberAndPageSize_whenGetStudentListPage_thenReturnListStudent() {
        // given - precondition or setup
        Student student2 = Student.builder()
                .id(2L)
                .firstName("John").lastName("Cena")
                .password("111")
                .email("UCantCMe@gmail.com")
                .createdAt(LocalDateTime.now())
                .build();

        List<Student> studentList = List.of(student, student2);

        Integer pageNumber = 0;
        Integer pageSize = 1;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Student> studentPage = new PageImpl<>(studentList, pageable, studentList.size());
        System.out.println("studentPage = " + studentPage);
        given(studentRepository.findAllWithPagination(pageable)).willReturn(studentPage);

        // when -  action or the behaviour that we are going test
        Page<Student> result = studentService.getStudentListPage(pageNumber, pageSize);

        // then - verify the output
        assertThat(result).isEqualTo(studentPage);
        verify(studentRepository, times(1)).findAllWithPagination(pageable);
    }

}