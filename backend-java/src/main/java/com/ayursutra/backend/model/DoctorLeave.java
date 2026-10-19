package com.ayursutra.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "doctor_leaves")
public class DoctorLeave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "doctor_id", nullable = false)
    private Integer doctorId;

    @Column(name = "start_date")
    private String startDate; // yyyy-MM-dd

    @Column(name = "end_date")
    private String endDate; // yyyy-MM-dd

    @Column(name = "reason", length = 500)
    private String reason;

    @Column(name = "status")
    private String status; // APPROVED, CANCELLED

    @Column(name = "created_at")
    private String createdAt;
}
