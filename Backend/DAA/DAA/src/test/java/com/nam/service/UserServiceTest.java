package com.nam.service;

import com.nam.exception.UserException;
import com.nam.model.ERole;
import com.nam.model.Role;
import com.nam.model.User;
import com.nam.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserServiceImpl userService;

    User user;
    Set<Role> roles = new HashSet<>();

    @BeforeEach
    void setUp() {
        roles.add(new Role(1L, ERole.ROLE_ADMIN));

        user = User.builder()
                .id(1L)
                .firstName("Nguyen Hoang").lastName("Nam")
                .password("123")
                .email("1@gmail.com")
                .roles(roles)
                .createdAt(LocalDateTime.now())
                .build();
    }

    @AfterEach
    void tearDown() {
    }

    // JUnit test for findUserById method
    @DisplayName("JUnit test for findUserById method")
    @Test
    void givenUserObject_whenFindUserById_thenReturnUserObject() throws UserException {
        // given - precondition or setup
        given(userRepository.findById(user.getId())).willReturn(Optional.of(user));
        System.out.println(userRepository);
        System.out.println(userService);

        // when -  action or the behaviour that we are going test
        User findUser = userService.findUserById(user.getId());
        System.out.println(findUser);

        // then - verify the output
        assertThat(findUser).isEqualTo(user);
        verify(userRepository).findById(user.getId());
    }

    @DisplayName("JUnit test for findUserById method which throws exception")
    @Test
    void givenUserObject_whenFindUserById_thenThrowUserException() throws UserException {
        // given - precondition or setup
        Long userId = 1L;
        given(userRepository.findById(anyLong())).willReturn(Optional.empty());

        // when -  action or the behaviour that we are going to test
        UserException exception = assertThrows(UserException.class, () -> userService.findUserById(userId));

        // then - verify the output
        verify(userRepository).findById(userId);
        String expectedMessage = "User not found with id: " + userId;
        String actualMessage = exception.getMessage();
        assertThat(actualMessage).isEqualTo(expectedMessage);
    }

//    @Test
//    void findUserProfileByJwt() {
//    }
//
//    @Test
//    void removeUser() {
//    }
}