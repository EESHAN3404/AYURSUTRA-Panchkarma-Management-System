package com.ayursutra.backend.controller;

import com.ayursutra.backend.model.*;
import com.ayursutra.backend.repository.*;
import com.ayursutra.backend.service.ClinicalService;
import com.ayursutra.backend.service.EmailService;
import com.ayursutra.backend.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/clinical")
public class ClinicalController {

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;
    
    @Autowired
    private TreatmentPlanRepository treatmentPlanRepository;

    @Autowired
    private TreatmentSessionRepository treatmentSessionRepository;

    @Autowired
    private ClinicalService clinicalService;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    // --- CONSULTATIONS ---
    @PostMapping("/consultations")
    public ResponseEntity<?> createConsultation(@RequestBody Consultation consultation) {
        consultation.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        return ResponseEntity.ok(consultationRepository.save(consultation));
    }

    @GetMapping("/consultations/patient/{patientId}")
    public ResponseEntity<?> getPatientConsultations(@PathVariable Integer patientId) {
        return ResponseEntity.ok(consultationRepository.findByPatientId(patientId));
    }

    // --- PRESCRIPTIONS ---
    @PostMapping("/prescriptions")
    public ResponseEntity<?> createPrescription(@RequestBody Prescription prescription) {
        prescription.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        if (prescription.getMedicines() != null) {
            for (PrescriptionMedicine med : prescription.getMedicines()) {
                med.setPrescriptionId(prescription.getId());
            }
        }
        Prescription saved = prescriptionRepository.save(prescription);

        // Generate PDF and Email
        Optional<User> patientOpt = userRepository.findById(saved.getPatientId());
        Optional<User> doctorOpt = userRepository.findById(saved.getDoctorId());
        
        if (patientOpt.isPresent() && doctorOpt.isPresent()) {
            User patient = patientOpt.get();
            byte[] pdfBytes = pdfService.generatePrescriptionPdf(saved, patient, doctorOpt.get());
            if (pdfBytes != null && patient.getEmail() != null) {
                emailService.sendPrescriptionEmail(patient.getEmail(), patient.getName(), pdfBytes);
            }
        }

        return ResponseEntity.ok(saved);
    }

    @GetMapping("/prescriptions/{id}/pdf")
    public ResponseEntity<byte[]> downloadPrescriptionPdf(@PathVariable Integer id) {
        Optional<Prescription> preOpt = prescriptionRepository.findById(id);
        if (!preOpt.isPresent()) return ResponseEntity.notFound().build();
        
        Prescription pre = preOpt.get();
        Optional<User> pOpt = userRepository.findById(pre.getPatientId());
        Optional<User> dOpt = userRepository.findById(pre.getDoctorId());
        
        if (pOpt.isPresent() && dOpt.isPresent()) {
            byte[] pdf = pdfService.generatePrescriptionPdf(pre, pOpt.get(), dOpt.get());
            if (pdf != null) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_PDF);
                headers.setContentDispositionFormData("attachment", "Prescription-" + pre.getId() + ".pdf");
                return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
            }
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @GetMapping("/prescriptions/patient/{patientId}")
    public ResponseEntity<?> getPatientPrescriptions(@PathVariable Integer patientId) {
        return ResponseEntity.ok(prescriptionRepository.findByPatientId(patientId));
    }

    // --- TREATMENT PLANS ---
    @PostMapping("/treatment-plans")
    public ResponseEntity<?> createTreatmentPlan(@RequestBody TreatmentPlan plan) {
        return ResponseEntity.ok(clinicalService.createTreatmentPlan(plan));
    }

    @GetMapping("/treatment-plans/patient/{patientId}")
    public ResponseEntity<?> getPatientTreatmentPlans(@PathVariable Integer patientId) {
        return ResponseEntity.ok(treatmentPlanRepository.findByPatientId(patientId));
    }

    // --- TREATMENT SESSIONS ---
    @GetMapping("/treatment-sessions/plan/{planId}")
    public ResponseEntity<?> getSessionsForPlan(@PathVariable Integer planId) {
        return ResponseEntity.ok(treatmentSessionRepository.findByTreatmentPlanIdOrderByIdAsc(planId));
    }
    
    @GetMapping("/treatment-sessions/therapist/{therapistId}")
    public ResponseEntity<?> getSessionsForTherapist(@PathVariable Integer therapistId) {
        return ResponseEntity.ok(treatmentSessionRepository.findByTherapistId(therapistId));
    }

    @PostMapping("/treatment-sessions/{sessionId}/complete")
    public ResponseEntity<?> completeSession(@PathVariable Integer sessionId, @RequestBody Map<String, String> payload) {
        String notes = payload.get("notes");
        String response = payload.get("patientResponse");
        return ResponseEntity.ok(clinicalService.completeSession(sessionId, notes, response));
    }
}
