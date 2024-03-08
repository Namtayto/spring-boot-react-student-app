# 📓 Student Application

Student project developed using Spring Boot and React.js.<br>

#### An actual version of frontend build deployed to Vercel and backend deployed to Render:
https://studywithnam.vercel.app <br>
Login: teacher@gmail.com <br>
Password: teacher <br>
**Note: If any request is not sent for a few minutes the server will automatically suspend. It will start again after 5 minutes since the first request.**
## Overview:
### Teacher:
![Uploading overviewTeacher.gif…](https://github.com/Namtayto/spring-boot-react-student-app/blob/main/overviewTeacher.gif)

### Student:


## Used Technologies:

* **Back-end:** Spring (Boot, Data, Security), JPA / Hibernate, PostgreSQL, Razorpay
* **Front-end:** React.js, Redux, React Router DOM, Tailwind CSS
* **Security:** JWT, Refresh Token
* **Testing:** JUnit5, AssertJ, Mockito. (given/when/then format - BDD style)
* **Deploy:** Vercel, Render, Docker

## Features

* Regular Username/Password authentication.
* Stores authentication details like JWT in local storage.
* Authentication and Authorization using JWT and Refresh Token
* Everyone can view the notice.
* Students can sign in and view their academic transcripts.
* Students can view and pay tuition via Razorpay payment gateway.
* Admin can register student account.
* Admin can CRUD notice, academic transcript and tuition for students.
* Pagination, Search Bar, Upload using JSON file, Send Email.

  ## Data Model
  ### Entity-Relationship-Diagram
  ![Entity Diagram](https://github.com/Namtayto/spring-boot-react-student-app/blob/main/Backend/DAA/DAA/image/daa_SQL.png)
