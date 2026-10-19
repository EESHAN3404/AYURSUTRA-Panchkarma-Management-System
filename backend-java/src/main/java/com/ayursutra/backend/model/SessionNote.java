package com.ayursutra.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "session_note")
public class SessionNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "appointmentId", nullable = false)
    private Integer appointmentId;

    @Column(name = "dayNumber", nullable = false)
    private Integer dayNumber;

    @Lob
    @Column(name = "beforeNotes")
    private String beforeNotes;

    @Lob
    @Column(name = "afterNotes")
    private String afterNotes;

    @Column(nullable = false, length = 50)
    private String date;
}
