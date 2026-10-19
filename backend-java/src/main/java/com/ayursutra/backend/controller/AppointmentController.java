package com.ayursutra.backend.controller;

import com.ayursutra.backend.model.Appointment;
import com.ayursutra.backend.model.Bill;
import com.ayursutra.backend.model.TreatmentSession;
import com.ayursutra.backend.model.User;
import com.ayursutra.backend.repository.AppointmentRepository;
import com.ayursutra.backend.repository.BillRepository;
import com.ayursutra.backend.repository.TreatmentSessionRepository;
import com.ayursutra.backend.repository.UserRepository;
import com.ayursutra.backend.repository.NotificationRepository;
import com.ayursutra.backend.model.Notification;
import com.ayursutra.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private TreatmentSessionRepository treatmentSessionRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private NotificationRepository notificationRepository;

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

    @GetMapping("/appointments")
    public ResponseEntity<List<Appointment>> getAppointments() {
        return ResponseEntity.ok(appointmentRepository.findAll());
    }

    @PostMapping("/appointments")
    public ResponseEntity<?> createAppointment(@RequestBody Map<String, Object> data) {
        try {
            Appointment apt = new Appointment();
            apt.setPatientId(Integer.parseInt(data.get("patientId").toString()));
            apt.setPatientName((String) data.get("patientName"));
            apt.setTherapistId(Integer.parseInt(data.get("therapistId").toString()));
            
            String therapistName = (String) data.get("therapistName");
            if (therapistName == null || therapistName.isEmpty()) {
                Optional<User> therapist = userRepository.findById(apt.getTherapistId());
                if (therapist.isPresent()) {
                    therapistName = therapist.get().getName();
                }
            }
            apt.setTherapistName(therapistName);
            apt.setTherapyType((String) data.get("therapyType"));
            apt.setDate((String) data.get("date"));
            apt.setTime((String) data.get("time"));
            apt.setStatus(data.get("status") != null ? data.get("status").toString() : "pending");
            apt.setNotes(data.get("notes") != null ? data.get("notes").toString() : "");
            
            String paymentMethod = data.get("paymentMethod") != null ? data.get("paymentMethod").toString() : "cash";
            String paymentStatus = data.get("paymentStatus") != null ? data.get("paymentStatus").toString() : "pending";
            if ("online".equals(paymentMethod) && !("paid".equals(paymentStatus) || "pending".equals(paymentStatus))) {
                paymentStatus = "pending";
            }
            apt.setPaymentMethod(paymentMethod);
            apt.setPaymentStatus(paymentStatus);
            if (data.get("amount") != null) apt.setAmount(Integer.parseInt(data.get("amount").toString()));
            if (data.get("razorpay_payment_id") != null) apt.setRazorpayPaymentId((String) data.get("razorpay_payment_id"));

            List<String> inactiveStatuses = java.util.Arrays.asList("cancelled", "rejected");
            if (appointmentRepository.existsByTherapistIdAndDateAndTimeAndStatusNotIn(
                    apt.getTherapistId(), apt.getDate(), apt.getTime(), inactiveStatuses)) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "The therapist is already booked for this time slot."));
            }

            Appointment saved = appointmentRepository.save(apt);

            Optional<User> patient = userRepository.findById(saved.getPatientId());
            if (patient.isPresent() && patient.get().getEmail() != null) {
                emailService.sendBookingRequestEmail(patient.get().getEmail(), saved.getPatientName(), saved.getTherapistName(), saved.getDate(), saved.getTime(), saved.getTherapyType());
                createNotification(Long.valueOf(saved.getPatientId()), "Booking Requested", "Your booking for " + saved.getTherapyType() + " is pending confirmation.", "APPOINTMENT");
            }
            if (saved.getTherapistId() != null) {
                createNotification(Long.valueOf(saved.getTherapistId()), "New Booking", "New booking request from " + saved.getPatientName() + " for " + saved.getTherapyType(), "APPOINTMENT");
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("appointment", saved));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/appointments/{id}")
    public ResponseEntity<?> updateAppointment(@PathVariable Integer id, @RequestBody Map<String, Object> data) {
        Optional<Appointment> aptOpt = appointmentRepository.findById(id);
        if (!aptOpt.isPresent()) return ResponseEntity.notFound().build();
        
        Appointment apt = aptOpt.get();

        if ("completed".equals(data.get("status"))) {
            apt.setStatus("completed");
            List<Bill> bills = billRepository.findByAppointmentId(id);
            if (!bills.isEmpty()) {
                Bill bill = bills.get(0);
                if ("pending".equals(bill.getStatus())) {
                    if ("cash".equals(bill.getPaymentMethod())) {
                        bill.setStatus("paid");
                        apt.setPaymentStatus("paid");
                        billRepository.save(bill);
                        
                        Optional<User> user = userRepository.findById(apt.getPatientId());
                        if (user.isPresent() && user.get().getEmail() != null) {
                            emailService.sendPaymentDoneEmail(user.get().getEmail(), apt.getPatientName(), apt.getTherapyType(), bill.getAmount(), bill.getPaymentMethod());
                        }
                    }
                }
            }
        }

        if (data.containsKey("status") && !("completed".equals(data.get("status")) || data.containsKey("paymentMethod"))) {
             apt.setStatus((String) data.get("status"));
        }

        if (data.containsKey("currentDay")) apt.setCurrentDay(Integer.parseInt(data.get("currentDay").toString()));
        if (data.containsKey("duration")) apt.setDuration(Integer.parseInt(data.get("duration").toString()));
        if (data.containsKey("paymentStatus")) apt.setPaymentStatus((String) data.get("paymentStatus"));
        if (data.containsKey("paymentMethod")) apt.setPaymentMethod((String) data.get("paymentMethod"));
        if (data.containsKey("razorpay_payment_id")) apt.setRazorpayPaymentId((String) data.get("razorpay_payment_id"));
        if (data.containsKey("razorpay_order_id")) apt.setRazorpayOrderId((String) data.get("razorpay_order_id"));
        if (data.containsKey("payment_date")) apt.setPaymentDate((String) data.get("payment_date"));
        if (data.containsKey("notes")) apt.setNotes((String) data.get("notes"));
        if (data.containsKey("date")) apt.setDate((String) data.get("date"));
        if (data.containsKey("time")) apt.setTime((String) data.get("time"));

        appointmentRepository.save(apt);
        return ResponseEntity.ok(apt);
    }

    @PutMapping("/appointments/{id}/payment")
    public ResponseEntity<?> updateAppointmentPayment(@PathVariable Integer id, @RequestBody Map<String, Object> data) {
        Optional<Appointment> aptOpt = appointmentRepository.findById(id);
        if (!aptOpt.isPresent()) return ResponseEntity.notFound().build();
        Appointment apt = aptOpt.get();

        if (data.containsKey("paymentStatus")) {
            String pStatus = (String) data.get("paymentStatus");
            apt.setPaymentStatus(pStatus);
            List<Bill> bills = billRepository.findByAppointmentId(id);
            for (Bill b : bills) {
                b.setStatus(pStatus);
                billRepository.save(b);
            }
            if ("paid".equals(pStatus)) {
                Optional<User> user = userRepository.findById(apt.getPatientId());
                if (user.isPresent() && user.get().getEmail() != null) {
                    emailService.sendPaymentDoneEmail(user.get().getEmail(), apt.getPatientName(), apt.getTherapyType(), apt.getAmount() != null ? apt.getAmount().doubleValue() : 0.0, apt.getPaymentMethod());
                }
            }
        }
        if (data.containsKey("paymentMethod")) apt.setPaymentMethod((String) data.get("paymentMethod"));
        if (data.containsKey("razorpay_payment_id")) apt.setRazorpayPaymentId((String) data.get("razorpay_payment_id"));
        if (data.containsKey("razorpay_order_id")) apt.setRazorpayOrderId((String) data.get("razorpay_order_id"));
        if (data.containsKey("payment_date")) apt.setPaymentDate((String) data.get("payment_date"));

        appointmentRepository.save(apt);
        return ResponseEntity.ok(apt);
    }

    @RequestMapping(value = "/update-appointment", method = {RequestMethod.PUT, RequestMethod.OPTIONS})
    public ResponseEntity<?> updateAppointmentDetails(@RequestBody(required = false) Map<String, Object> data) {
        if (data == null) return ResponseEntity.ok().build(); // For OPTIONS

        try {
            Object aptIdObj = data.get("appointmentId");
            if (aptIdObj == null) return ResponseEntity.badRequest().body(Map.of("error", "appointmentId is required"));
            
            Integer appointmentId = Integer.parseInt(aptIdObj.toString());
            Optional<Appointment> aptOpt = appointmentRepository.findById(appointmentId);
            if (!aptOpt.isPresent()) return ResponseEntity.status(404).body(Map.of("error", "Appointment not found"));
            Appointment apt = aptOpt.get();

            if (data.containsKey("notes")) apt.setNotes((String) data.get("notes"));
            if (data.containsKey("diet")) apt.setDiet((String) data.get("diet"));
            if (data.containsKey("status")) {
                String status = (String) data.get("status");
                if (!status.equals(apt.getStatus())) {
                     createNotification(Long.valueOf(apt.getPatientId()), "Appointment Update", "Your appointment status was updated to: " + status, "APPOINTMENT");
                }
                apt.setStatus(status);
                if ("confirmed".equals(status)) {
                    apt.setPaymentStatus("pending");
                    Object therapistIdObj = data.getOrDefault("therapistId", apt.getTherapistId());
                    if (therapistIdObj == null || therapistIdObj.toString().isEmpty()) {
                        return ResponseEntity.badRequest().body(Map.of("error", "A therapistId is required to confirm an appointment."));
                    }
                }
            }

            if (data.containsKey("paymentStatus")) apt.setPaymentStatus((String) data.get("paymentStatus"));
            if (data.containsKey("amount") && data.get("amount") != null && !data.get("amount").toString().isEmpty()) {
                apt.setAmount(Integer.parseInt(data.get("amount").toString()));
            }
            if (data.containsKey("paymentMethod")) apt.setPaymentMethod((String) data.get("paymentMethod"));
            if (data.containsKey("assignedTherapy")) apt.setAssignedTherapy((String) data.get("assignedTherapy"));
            if (data.containsKey("duration")) apt.setDuration(Integer.parseInt(data.get("duration").toString()));
            if (data.containsKey("practitionerNotes")) apt.setPractitionerNotes((String) data.get("practitionerNotes"));
            if (data.containsKey("currentDay")) apt.setCurrentDay(Integer.parseInt(data.get("currentDay").toString()));
            if (data.containsKey("therapistId") && data.get("therapistId") != null && !data.get("therapistId").toString().isEmpty()) {
                apt.setTherapistId(Integer.parseInt(data.get("therapistId").toString()));
                Optional<User> therapist = userRepository.findById(apt.getTherapistId());
                therapist.ifPresent(user -> apt.setTherapistName(user.getName()));
            }

            appointmentRepository.save(apt);
            return ResponseEntity.ok(apt);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/appointments/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Integer id) {
        Optional<Appointment> aptOpt = appointmentRepository.findById(id);
        if (!aptOpt.isPresent()) return ResponseEntity.notFound().build();
        appointmentRepository.delete(aptOpt.get());
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }

    @PostMapping("/appointments/{id}/email-docs")
    public ResponseEntity<?> emailDocs(@PathVariable Integer id) {
        Optional<Appointment> aptOpt = appointmentRepository.findById(id);
        if (!aptOpt.isPresent()) return ResponseEntity.notFound().build();
        
        Appointment apt = aptOpt.get();
        Optional<User> user = userRepository.findById(apt.getPatientId());
        
        if (user.isPresent() && user.get().getEmail() != null) {
            emailService.sendDietAndPrescriptionEmail(
                user.get().getEmail(), 
                apt.getPatientName(), 
                apt.getDiet(), 
                apt.getNotes()
            );
            return ResponseEntity.ok(Map.of("success", true, "message", "Email sent successfully"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "Patient does not have a registered email address."));
        }
    }

}
