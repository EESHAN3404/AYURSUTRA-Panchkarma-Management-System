package com.ayursutra.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "bill")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "appointmentId", nullable = false)
    private Integer appointmentId;

    @Column(name = "patientId", nullable = false)
    private Integer patientId;

    @Column(nullable = false)
    private Double amount;

    @Column(name = "paymentMethod", nullable = false, length = 50)
    private String paymentMethod;

    @Column(nullable = false, length = 50)
    private String status;

    @Column(nullable = false, length = 50)
    private String date;
}
