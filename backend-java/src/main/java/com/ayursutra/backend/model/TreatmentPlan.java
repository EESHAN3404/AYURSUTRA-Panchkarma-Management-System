package com.ayursutra.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "treatment_plans")
public class TreatmentPlan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "patient_id", nullable = false)
    private Integer patientId;

    @Column(name = "doctor_id")
    private Integer doctorId;

    @Column(name = "therapist_id")
    private Integer therapistId;

    @Column(name = "therapy_name", nullable = false)
    private String therapyName;

    @Column(name = "start_date")
    private String startDate; // yyyy-MM-dd

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "total_sessions")
    private Integer totalSessions;

    @Column(name = "frequency")
    private String frequency; // e.g., "Every 2 days"

    @Column(name = "status")
    private String status; // ACTIVE, PAUSED, COMPLETED, CANCELLED

    @Column(name = "notes", length = 1000)
    private String notes;
}
