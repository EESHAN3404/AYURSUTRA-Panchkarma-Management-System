package com.ayursutra.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "note")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "patientId", nullable = false)
    private Integer patientId;

    @Lob
    @Column(nullable = false)
    private String text;

    @Column(nullable = false, length = 50)
    private String date;

    @Column(name = "authorName", nullable = false, length = 120)
    private String authorName;
}
