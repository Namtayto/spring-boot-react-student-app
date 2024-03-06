package com.nam;


import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MySQLContainer;

public class AbstractContainerBaseTest {

    static final MySQLContainer MY_SQL_CONTAINER;

    static {
        MY_SQL_CONTAINER = (MySQLContainer) new MySQLContainer("mysql:latest")
                .withUsername("nam")
                .withPassword("123")
                .withDatabaseName("daa")
                .withReuse(false);

        MY_SQL_CONTAINER.start();
    }

    @DynamicPropertySource
    public static void containersProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.username", MY_SQL_CONTAINER::getUsername);
        registry.add("spring.datasource.password", MY_SQL_CONTAINER::getPassword);
        registry.add("spring.datasource.url", MY_SQL_CONTAINER::getJdbcUrl);
    }

}