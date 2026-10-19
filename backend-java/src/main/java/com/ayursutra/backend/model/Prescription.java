package com.ayursutra.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "prescriptions")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "patient_id", nullable = false)
    private Integer patientId;

    @Column(name = "doctor_id", nullable = false)
    private Integer doctorId;

    @Column(name = "consultation_id")
    private Integer consultationId;

    @Column(name = "date")
    private String date; // yyyy-MM-dd

    @Column(name = "instructions", length = 1000)
    private String instructions;

    @Column(name = "status")
    private String status; // CURRENT, HISTORY

    @OneToMany(mappedBy = "prescriptionId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PrescriptionMedicine> medicines;
    
    @Column(name = "created_at")
    private String createdAt;
}
