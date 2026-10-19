package com.ayursutra.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "diet_plan")
public class DietPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "patientId", nullable = false, unique = true)
    private Integer patientId;

    @Lob
    @Column(name = "planData", nullable = false)
    private String planData;
}
