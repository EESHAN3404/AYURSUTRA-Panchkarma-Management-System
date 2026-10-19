package com.ayursutra.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    @Column(nullable = false, length = 120)
    private String password;

    @Column(nullable = false, length = 50)
    private String role;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(length = 120)
    private String experience;

    @Column(length = 120)
    private String specialization;

    @Column(name = "shiftTiming", length = 120)
    private String shiftTiming;

    @Column(length = 120)
    private String qualification;

    @Column(name = "registration_number", length = 120)
    private String registrationNumber;

    @Column(name = "working_days", length = 120)
    private String workingDays;

    @Column(name = "working_hours", length = 120)
    private String workingHours;

    @Column(name = "consultation_fee")
    private Integer consultationFee;

    @Column(name = "status", length = 50)
    private String status; // ACTIVE, ON_LEAVE, INACTIVE

    @Lob
    private String bio;
}
