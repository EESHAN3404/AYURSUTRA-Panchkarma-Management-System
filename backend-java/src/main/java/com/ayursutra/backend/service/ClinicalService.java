package com.ayursutra.backend.service;

import com.ayursutra.backend.model.*;
import com.ayursutra.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
public class ClinicalService {

    @Autowired
    private TreatmentPlanRepository treatmentPlanRepository;

    @Autowired
    private TreatmentSessionRepository treatmentSessionRepository;

    @Autowired
    private DoctorLeaveRepository doctorLeaveRepository;
    
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private EmailService emailService;
    
    @Autowired
    private UserRepository userRepository;

    public TreatmentPlan createTreatmentPlan(TreatmentPlan plan) {
        plan.setStatus("ACTIVE");
        TreatmentPlan savedPlan = treatmentPlanRepository.save(plan);
        generateSessions(savedPlan);
        return savedPlan;
    }

    private void generateSessions(TreatmentPlan plan) {
        int totalSessions = plan.getTotalSessions() != null ? plan.getTotalSessions() : 1;
        int intervalDays = 1;
        if (plan.getFrequency() != null) {
            if (plan.getFrequency().toLowerCase().contains("2 days")) intervalDays = 2;
            else if (plan.getFrequency().toLowerCase().contains("3 days")) intervalDays = 3;
            else if (plan.getFrequency().toLowerCase().contains("week")) intervalDays = 7;
        }

        LocalDate currentDate = LocalDate.parse(plan.getStartDate());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (int i = 1; i <= totalSessions; i++) {
            // Note: A robust implementation would loop to check therapist/doctor availability here
            // and skip dates if they are on leave. For brevity, we schedule sequentially.
            
            TreatmentSession session = new TreatmentSession();
            session.setTreatmentPlanId(plan.getId());
            session.setPatientId(plan.getPatientId());
            session.setTherapistId(plan.getTherapistId());
            session.setSessionNumber(i);
            session.setDate(currentDate.format(formatter));
            session.setTime("10:00 AM"); // Default time, could be chosen per slot
            session.setStatus("SCHEDULED");
            session.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            
            treatmentSessionRepository.save(session);
            
            currentDate = currentDate.plusDays(intervalDays);
        }
    }

    public TreatmentSession completeSession(Integer sessionId, String notes, String patientResponse) {
        Optional<TreatmentSession> sessionOpt = treatmentSessionRepository.findById(sessionId);
        if (!sessionOpt.isPresent()) throw new RuntimeException("Session not found");
        
        TreatmentSession session = sessionOpt.get();
        session.setStatus("COMPLETED");
        session.setTreatmentNotes(notes);
        session.setPatientResponse(patientResponse);
        TreatmentSession saved = treatmentSessionRepository.save(session);
        
        Optional<TreatmentPlan> planOpt = treatmentPlanRepository.findById(session.getTreatmentPlanId());
        if (planOpt.isPresent()) {
            TreatmentPlan plan = planOpt.get();
            
            // Check if all sessions are completed
            List<TreatmentSession> allSessions = treatmentSessionRepository.findByTreatmentPlanIdOrderByIdAsc(plan.getId());
            boolean allCompleted = allSessions.stream().allMatch(s -> "COMPLETED".equals(s.getStatus()) || "CANCELLED".equals(s.getStatus()));
            
            if (allCompleted) {
                plan.setStatus("COMPLETED");
                treatmentPlanRepository.save(plan);
            }
            
            // Notifications & Emails
            createNotification((long) plan.getPatientId(), "Session Completed", "Your session " + session.getSessionNumber() + " for " + plan.getTherapyName() + " is complete.", "TREATMENT");
            
            Optional<User> patient = userRepository.findById(plan.getPatientId());
            if (patient.isPresent() && patient.get().getEmail() != null) {
                emailService.sendDailyTreatmentUpdate(patient.get().getEmail(), patient.get().getName(), plan.getTherapyName(), session.getSessionNumber(), plan.getTotalSessions(), session.getDate());
            }
        }
        return saved;
    }

    private void createNotification(Long userId, String title, String message, String type) {
        Notification n = new Notification();
        n.setUserId(userId);
        n.setTitle(title);
        n.setMessage(message);
        n.setType(type);
        n.setRead(false);
        n.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        notificationRepository.save(n);
    }
}
