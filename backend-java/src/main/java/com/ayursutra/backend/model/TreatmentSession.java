package com.ayursutra.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "treatment_sessions")
public class TreatmentSession {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "treatment_plan_id", nullable = false)
    private Integer treatmentPlanId;

    @Column(name = "patient_id", nullable = false)
    private Integer patientId;

    @Column(name = "therapist_id")
    private Integer therapistId;

    @Column(name = "session_number")
    private Integer sessionNumber;

    @Column(name = "date")
    private String date; // yyyy-MM-dd

    @Column(name = "time")
    private String time; // HH:mm

    @Column(name = "status")
    private String status; // SCHEDULED, COMPLETED, MISSED, CANCELLED, RESCHEDULED

    @Column(name = "treatment_notes", length = 1000)
    private String treatmentNotes;

    @Column(name = "patient_response", length = 1000)
    private String patientResponse;

    @Column(name = "created_at")
    private String createdAt;
}
