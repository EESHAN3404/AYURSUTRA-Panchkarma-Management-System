package com.ayursutra.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("AyurSutra App <eeshantest@gmail.com>");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send generic email to " + to + ": " + e.getMessage());
        }
    }

    @Async
    public void sendBookingRequestEmail(String toEmail, String patientName, String therapistName, String date, String time, String therapy) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("AyurSutra App <eeshantest@gmail.com>");
            message.setTo(toEmail);
            message.setSubject("Appointment Request Received - AyurSutra");

            String body = "Dear " + patientName + ",\n\n" +
                    "Your appointment request for " + therapy + " has been received!\n\n" +
                    "Details:\n" +
                    "- Therapist: " + therapistName + "\n" +
                    "- Date: " + date + "\n" +
                    "- Time: " + time + "\n" +
                    "- Status: Awaiting Confirmation\n\n" +
                    "We will notify you once the practitioner confirms the appointment and assigns the payment details.\n\n" +
                    "Thank you for choosing AyurSutra Panchakarma!";

            message.setText(body);
            mailSender.send(message);
            System.out.println("Successfully sent request email to " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send email to " + toEmail + ": " + e.getMessage());
        }
    }

    @Async
    public void sendPaymentDoneEmail(String toEmail, String patientName, String therapy, Double amount, String paymentMethod) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("AyurSutra App <eeshantest@gmail.com>");
            message.setTo(toEmail);
            message.setSubject("Payment Successful & Thank You - AyurSutra");

            String body = "Dear " + patientName + ",\n\n" +
                    "Thank you for visiting AyurSutra Panchakarma!\n\n" +
                    "Your therapy session for " + therapy + " is completed.\n" +
                    "We have successfully received your payment.\n\n" +
                    "BILL DETAILS:\n" +
                    "- Amount Paid: ₹" + amount + "\n" +
                    "- Payment Mode: " + (paymentMethod != null ? paymentMethod.toUpperCase() : "") + "\n" +
                    "- Status: PAID\n\n" +
                    "A PDF copy of your bill will be available in your dashboard later.\n\n" +
                    "We hope you had a relaxing and healing experience. Visit again!\n\n" +
                    "Warm regards,\n" +
                    "AyurSutra Team";

            message.setText(body);
            mailSender.send(message);
            System.out.println("Successfully sent payment email to " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send email to " + toEmail + ": " + e.getMessage());
        }
    }

    @Async
    public void sendDailyTreatmentUpdate(String toEmail, String patientName, String therapy, Integer sessionNumber, Integer totalSessions, String date) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("AyurSutra App <eeshantest@gmail.com>");
            message.setTo(toEmail);
            message.setSubject("AyurSutra - Today's Panchakarma Session Update");

            String body = "Dear " + patientName + ",\n\n" +
                    "Your Panchakarma Session " + sessionNumber + " of " + totalSessions + " has been completed successfully.\n\n" +
                    "Treatment: " + therapy + "\n" +
                    "Date: " + date + "\n\n" +
                    "Please follow your prescribed diet and instructions.\n\n" +
                    "Regards,\n" +
                    "AyurSutra Panchakarma";

            message.setText(body);
            mailSender.send(message);
            System.out.println("Successfully sent daily update email to " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send email to " + toEmail + ": " + e.getMessage());
        }
    }

    @Async
    public void sendPrescriptionEmail(String toEmail, String patientName, byte[] pdfBytes) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            
            helper.setFrom("AyurSutra App <eeshantest@gmail.com>");
            helper.setTo(toEmail);
            helper.setSubject("AyurSutra - Your New Prescription");
            
            String body = "Dear " + patientName + ",\n\n" +
                    "Your new prescription has been generated by the doctor.\n" +
                    "Please find the attached PDF document for your records.\n\n" +
                    "Regards,\nAyurSutra Panchakarma";
            
            helper.setText(body);
            helper.addAttachment("Prescription.pdf", new ByteArrayResource(pdfBytes));
            
            mailSender.send(message);
            System.out.println("Successfully sent prescription PDF to " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send prescription email to " + toEmail + ": " + e.getMessage());
        }
    }

    @Async
    public void sendDietAndPrescriptionEmail(String toEmail, String patientName, String diet, String notes) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("AyurSutra App <eeshantest@gmail.com>");
            message.setTo(toEmail);
            message.setSubject("AyurSutra - Your Treatment Diet Plan & Prescription");

            String body = "Dear " + patientName + ",\n\n" +
                    "Your therapist has updated your treatment details. Please find your diet plan and prescription notes below:\n\n" +
                    "--- DIET PLAN ---\n" +
                    (diet != null && !diet.isEmpty() ? diet : "No specific diet assigned.") + "\n\n" +
                    "--- PRESCRIPTION / THERAPIST NOTES ---\n" +
                    (notes != null && !notes.isEmpty() ? notes : "No specific notes added.") + "\n\n" +
                    "Please follow these instructions carefully to ensure the best results from your Panchakarma therapy.\n\n" +
                    "A detailed PDF copy can be downloaded from your AyurSutra Patient Dashboard.\n\n" +
                    "Warm Regards,\n" +
                    "AyurSutra Panchakarma Center";

            message.setText(body);
            mailSender.send(message);
            System.out.println("Successfully sent diet and prescription email to " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send diet email to " + toEmail + ": " + e.getMessage());
        }
    }

    @Async
    public void sendWelcomeEmail(String toEmail, String userName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("AyurSutra App <eeshantest@gmail.com>");
            message.setTo(toEmail);
            message.setSubject("Welcome to AyurSutra Panchakarma!");

            String body = "Dear " + userName + ",\n\n" +
                    "Welcome to AyurSutra Panchakarma Center!\n\n" +
                    "We are thrilled to have you join our holistic healing community. " +
                    "Our goal is to provide you with authentic Ayurvedic treatments, personalized diet plans, and deep rejuvenation through Panchakarma therapy.\n\n" +
                    "You can now log into your dashboard to:\n" +
                    "- Book consultations and therapy sessions\n" +
                    "- View your active treatment plans\n" +
                    "- Track your Panchakarma journey and diet\n\n" +
                    "If you have any questions, feel free to reach out to our support team.\n\n" +
                    "Wishing you a healthy and balanced life,\n" +
                    "The AyurSutra Team";

            message.setText(body);
            mailSender.send(message);
            System.out.println("Successfully sent welcome email to " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send welcome email to " + toEmail + ": " + e.getMessage());
        }
    }
}
