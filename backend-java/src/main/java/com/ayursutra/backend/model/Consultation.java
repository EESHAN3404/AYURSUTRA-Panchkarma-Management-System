package com.ayursutra.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "consultations")
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "patient_id", nullable = false)
    private Integer patientId;

    @Column(name = "doctor_id", nullable = false)
    private Integer doctorId;

    @Column(name = "date")
    private String date; // yyyy-MM-dd

    @Column(name = "chief_complaint", length = 500)
    private String chiefComplaint;

    @Column(name = "symptoms", length = 1000)
    private String symptoms;

    @Column(name = "observations", length = 1000)
    private String observations;

    @Column(name = "prakriti")
    private String prakriti;

    @Column(name = "vikriti")
    private String vikriti;

    @Column(name = "diagnosis", length = 1000)
    private String diagnosis;

    @Column(name = "treatment_recommendation", length = 1000)
    private String treatmentRecommendation;

    @Column(name = "follow_up_date")
    private String followUpDate;

    @Column(name = "created_at")
    private String createdAt;
}
