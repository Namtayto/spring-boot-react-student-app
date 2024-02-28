package com.nam.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String subjectId;
    private String subjectName;
    private int credits;
    private double point1;
    private double point2;
    private double point3;
    private double point4;
    private double pointAverage;
    private String note;

    @ManyToOne
    @JoinColumn(name = "id_studentpoint")
    @JsonIgnore
    private StudentPoint studentPoint;

}
