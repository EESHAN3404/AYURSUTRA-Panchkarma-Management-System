package com.ayursutra.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "health_profile")
public class HealthProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "patientId", nullable = false, unique = true)
    private Integer patientId;

    private Integer age;

    @Column(length = 50)
    private String gender;

    @Column(name = "bodyType", length = 50)
    private String bodyType;

    @Lob
    private String symptoms;

    @Lob
    @Column(name = "chronicDiseases")
    private String chronicDiseases;

    @Lob
    private String allergies;

    @Lob
    private String medications;

    @Column(name = "stressLevel", length = 50)
    private String stressLevel;

    @Column(name = "sleepQuality", length = 50)
    private String sleepQuality;

    @Column(name = "painLevel")
    private Integer painLevel;

    @Column(name = "energyLevel", length = 50)
    private String energyLevel;
}
