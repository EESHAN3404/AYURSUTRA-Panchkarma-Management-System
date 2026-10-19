package com.ayursutra.backend.service;

import com.ayursutra.backend.model.TreatmentSession;
import com.ayursutra.backend.model.User;
import com.ayursutra.backend.repository.TreatmentSessionRepository;
import com.ayursutra.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Component
public class ScheduledTasks {

    @Autowired
    private TreatmentSessionRepository treatmentSessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    // Runs every day at 08:00 AM
    @Scheduled(cron = "0 0 8 * * ?")
    public void sendSessionReminders() {
        String tomorrowDate = LocalDate.now().plusDays(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        
        // Find all sessions scheduled for tomorrow (Requires custom query, but we can fetch all SCHEDULED and filter)
        // For efficiency in a real app, use a custom JPA query. Here we filter in memory for simplicity.
        List<TreatmentSession> sessions = treatmentSessionRepository.findAll();
        
        for (TreatmentSession session : sessions) {
            if ("SCHEDULED".equals(session.getStatus()) && tomorrowDate.equals(session.getDate())) {
                Optional<User> patientOpt = userRepository.findById(session.getPatientId());
                if (patientOpt.isPresent() && patientOpt.get().getEmail() != null) {
                    User patient = patientOpt.get();
                    String subject = "Reminder: Upcoming Panchakarma Session Tomorrow";
                    String text = "Dear " + patient.getName() + ",\n\n" +
                                  "This is a gentle reminder that your Panchakarma Session " + session.getSessionNumber() + 
                                  " is scheduled for tomorrow (" + session.getDate() + ") at " + session.getTime() + ".\n\n" +
                                  "Please arrive 10 minutes early.\n\n" +
                                  "Regards,\nAyurSutra Panchakarma";
                    emailService.sendEmail(patient.getEmail(), subject, text);
                    System.out.println("Sent reminder for session " + session.getId() + " to " + patient.getEmail());
                }
            }
        }
    }
}
