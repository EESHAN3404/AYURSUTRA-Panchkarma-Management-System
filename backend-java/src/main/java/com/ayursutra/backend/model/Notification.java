package com.ayursutra.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // The user receiving the notification
    
    private String title;
    
    @Column(length = 1000)
    private String message;
    
    private String type; // e.g., "APPOINTMENT", "PAYMENT", "SYSTEM"
    
    private boolean isRead;
    
    private String createdAt;
}
