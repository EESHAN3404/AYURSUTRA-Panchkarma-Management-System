package com.ayursutra.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "prescription_medicines")
public class PrescriptionMedicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "prescription_id", nullable = false)
    private Integer prescriptionId;

    @Column(name = "medicine_name")
    private String medicineName;

    @Column(name = "dosage")
    private String dosage; // e.g., "5g"

    @Column(name = "frequency")
    private String frequency; // e.g., "Twice daily"

    @Column(name = "timing")
    private String timing; // e.g., "After meals"

    @Column(name = "duration")
    private String duration; // e.g., "30 days"

    @Column(name = "special_instructions", length = 500)
    private String specialInstructions;
}
