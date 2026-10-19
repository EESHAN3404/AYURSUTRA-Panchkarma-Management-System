package com.ayursutra.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "appointment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "patientId", nullable = false)
    private Integer patientId;

    @Column(name = "patientName", nullable = false, length = 120)
    private String patientName;

    @Column(name = "therapistId", nullable = false)
    private Integer therapistId;

    @Column(name = "therapistName", length = 120)
    private String therapistName;

    @Column(name = "therapyType", nullable = false, length = 120)
    private String therapyType;

    @Column(nullable = false, length = 50)
    private String date;

    @Column(nullable = false, length = 50)
    private String time;

    @Column(length = 50)
    private String status = "pending";

    @Lob
    private String notes = "";

    @Lob
    private String diet = "";

    @Column(name = "paymentStatus", length = 50)
    private String paymentStatus = "pending";

    private Integer amount;

    @Column(name = "paymentMethod", length = 50)
    private String paymentMethod = "cash";

    @Column(name = "razorpay_order_id", length = 120)
    private String razorpayOrderId;

    @Column(name = "razorpay_payment_id", length = 120)
    private String razorpayPaymentId;

    @Column(name = "payment_date", length = 120)
    private String paymentDate;

    @Column(name = "assignedTherapy", length = 120)
    private String assignedTherapy;

    private Integer duration;

    @Lob
    @Column(name = "practitionerNotes")
    private String practitionerNotes;

    @Column(name = "currentDay")
    private Integer currentDay = 1;
}
