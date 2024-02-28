package com.nam.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @OneToMany(mappedBy = "studentPoint", cascade = CascadeType.ALL, orphanRemoval = true)
    @Column(name = "studentpoints")
    private List<Subject> subjects = new ArrayList<>();

    private String semester;
    private String year;

    @ManyToOne
    @JoinColumn(name = "id_student")
    @JsonIgnore
    private Student student;


}


