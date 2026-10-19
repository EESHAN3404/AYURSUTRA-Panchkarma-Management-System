package com.ayursutra.backend.controller;

import com.ayursutra.backend.model.*;
import com.ayursutra.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.stream.Collectors;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PatientController {

    @Autowired
    private HealthProfileRepository healthProfileRepository;

    @Autowired
    private SessionNoteRepository sessionNoteRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private DietPlanRepository dietPlanRepository;

    @Autowired
    private BillRepository billRepository;

    // --- Health Profile ---
    @GetMapping("/health_profile/{patientId}")
    public ResponseEntity<?> getHealthProfile(@PathVariable Integer patientId) {
        Optional<HealthProfile> profile = healthProfileRepository.findByPatientId(patientId);
        if (profile.isPresent()) return ResponseEntity.ok(profile.get());
        return ResponseEntity.status(404).body(Map.of("error", "Profile not found"));
    }

    @PostMapping("/health_profile")
    public ResponseEntity<?> saveHealthProfile(@RequestBody Map<String, Object> data) {
        Object patientIdObj = data.get("patientId");
        if (patientIdObj == null) return ResponseEntity.badRequest().body(Map.of("error", "Patient ID required"));
        
        Integer patientId = Integer.parseInt(patientIdObj.toString());
        HealthProfile profile = healthProfileRepository.findByPatientId(patientId).orElse(new HealthProfile());
        profile.setPatientId(patientId);

        if (data.containsKey("age")) profile.setAge(Integer.parseInt(data.get("age").toString()));
        if (data.containsKey("gender")) profile.setGender((String) data.get("gender"));
        if (data.containsKey("bodyType")) profile.setBodyType((String) data.get("bodyType"));
        if (data.containsKey("symptoms")) profile.setSymptoms((String) data.get("symptoms"));
        if (data.containsKey("chronicDiseases")) profile.setChronicDiseases((String) data.get("chronicDiseases"));
        if (data.containsKey("allergies")) profile.setAllergies((String) data.get("allergies"));
        if (data.containsKey("medications")) profile.setMedications((String) data.get("medications"));
        if (data.containsKey("stressLevel")) profile.setStressLevel((String) data.get("stressLevel"));
        if (data.containsKey("sleepQuality")) profile.setSleepQuality((String) data.get("sleepQuality"));
        if (data.containsKey("painLevel")) profile.setPainLevel(Integer.parseInt(data.get("painLevel").toString()));
        if (data.containsKey("energyLevel")) profile.setEnergyLevel((String) data.get("energyLevel"));

        return ResponseEntity.ok(healthProfileRepository.save(profile));
    }

    // --- Session Notes ---
    @GetMapping("/session_notes/{appointmentId}")
    public ResponseEntity<?> getSessionNotes(@PathVariable Integer appointmentId) {
        return ResponseEntity.ok(sessionNoteRepository.findByAppointmentId(appointmentId));
    }

    @GetMapping("/session_notes")
    public ResponseEntity<?> getSessionNotesByPatient(@RequestParam(value = "patientId", required = false) Integer patientId) {
        try {
            if (patientId != null) {
                List<Appointment> apts = appointmentRepository.findByPatientId(patientId);
                if (apts.isEmpty()) return ResponseEntity.ok(List.of());
                List<Integer> aptIds = apts.stream().map(Appointment::getId).collect(Collectors.toList());
                return ResponseEntity.ok(sessionNoteRepository.findByAppointmentIdInOrderByAppointmentIdAscDayNumberAsc(aptIds));
            } else {
                return ResponseEntity.ok(sessionNoteRepository.findAll());
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/session_notes")
    public ResponseEntity<?> saveSessionNote(@RequestBody Map<String, Object> data) {
        Object aptIdObj = data.get("appointmentId");
        Object dayObj = data.get("dayNumber");
        if (aptIdObj == null || dayObj == null) return ResponseEntity.badRequest().body(Map.of("error", "appointmentId and dayNumber required"));

        Integer appointmentId = Integer.parseInt(aptIdObj.toString());
        Integer dayNumber = Integer.parseInt(dayObj.toString());

        SessionNote note = sessionNoteRepository.findByAppointmentIdAndDayNumber(appointmentId, dayNumber).orElse(new SessionNote());
        if (note.getId() == null) {
            note.setAppointmentId(appointmentId);
            note.setDayNumber(dayNumber);
            note.setDate(LocalDate.now().toString());
        }

        if (data.containsKey("beforeNotes")) note.setBeforeNotes((String) data.get("beforeNotes"));
        if (data.containsKey("afterNotes")) note.setAfterNotes((String) data.get("afterNotes"));

        return ResponseEntity.ok(sessionNoteRepository.save(note));
    }

    // --- Notes ---
    @GetMapping("/notes")
    public ResponseEntity<?> getAllNotes() {
        return ResponseEntity.ok(noteRepository.findAll());
    }

    @GetMapping("/notes/{patientId}")
    public ResponseEntity<?> getNotesForPatient(@PathVariable Integer patientId) {
        return ResponseEntity.ok(noteRepository.findByPatientId(patientId));
    }

    @PostMapping("/notes")
    public ResponseEntity<?> addNote(@RequestBody Map<String, Object> data) {
        Note note = new Note();
        note.setPatientId(Integer.parseInt(data.get("patientId").toString()));
        note.setText((String) data.get("text"));
        note.setDate((String) data.get("date"));
        note.setAuthorName((String) data.get("authorName"));
        return ResponseEntity.status(201).body(noteRepository.save(note));
    }

    // --- Diet Plans ---
    @GetMapping("/diet_plans")
    public ResponseEntity<?> getAllDietPlans() {
        // Need to parse planData as JSON, but we can just return it. 
        // Returning entity will stringify planData. Wait, in python it was json.loads(self.planData).
        // Let's create a custom response wrapper or just rely on Jackson with an object mapping.
        List<Map<String, Object>> plans = dietPlanRepository.findAll().stream().map(dp -> {
             try {
                 return Map.of("id", dp.getId(), "patientId", dp.getPatientId(), "planData", new ObjectMapper().readValue(dp.getPlanData(), Object.class));
             } catch(Exception e) {
                 return Map.of("id", (Object)dp.getId(), "patientId", dp.getPatientId(), "planData", dp.getPlanData());
             }
        }).collect(Collectors.toList());
        return ResponseEntity.ok(plans);
    }

    @GetMapping("/diet_plans/{patientId}")
    public ResponseEntity<?> getDietPlan(@PathVariable Integer patientId) {
        Optional<DietPlan> plan = dietPlanRepository.findByPatientId(patientId);
        if (plan.isPresent()) {
            DietPlan dp = plan.get();
             try {
                 return ResponseEntity.ok(Map.of("id", dp.getId(), "patientId", dp.getPatientId(), "planData", new ObjectMapper().readValue(dp.getPlanData(), Object.class)));
             } catch(Exception e) {
                 return ResponseEntity.ok(Map.of("id", dp.getId(), "patientId", dp.getPatientId(), "planData", dp.getPlanData()));
             }
        }
        return ResponseEntity.status(404).body(Map.of("error", "Not found"));
    }

    @PostMapping("/diet_plans")
    public ResponseEntity<?> saveDietPlan(@RequestBody Map<String, Object> data) {
        try {
            Integer patientId = Integer.parseInt(data.get("patientId").toString());
            String planDataStr = new ObjectMapper().writeValueAsString(data.get("planData"));
            
            DietPlan dp = dietPlanRepository.findByPatientId(patientId).orElse(new DietPlan());
            dp.setPatientId(patientId);
            dp.setPlanData(planDataStr);
            
            DietPlan saved = dietPlanRepository.save(dp);
            return ResponseEntity.status(201).body(Map.of("id", saved.getId(), "patientId", saved.getPatientId(), "planData", data.get("planData")));
        } catch(Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // --- Bills ---
    @GetMapping("/patient-bills/{patientId}")
    public ResponseEntity<?> getPatientBills(@PathVariable Integer patientId) {
        try {
            List<Appointment> apts = appointmentRepository.findByPatientId(patientId).stream()
                    .filter(a -> a.getAmount() != null)
                    .collect(Collectors.toList());
                    
            List<Map<String, Object>> bills = apts.stream().map(apt -> Map.of(
                "id", (Object)apt.getId(),
                "amount", apt.getAmount(),
                "date", apt.getDate() != null ? apt.getDate() : "",
                "paymentMethod", apt.getPaymentMethod() != null ? apt.getPaymentMethod() : "",
                "paymentStatus", apt.getPaymentStatus() != null ? apt.getPaymentStatus() : "",
                "therapyType", apt.getTherapyType() != null ? apt.getTherapyType() : ""
            )).collect(Collectors.toList());
            
            return ResponseEntity.ok(bills);
        } catch(Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/bills/{patientId}")
    public ResponseEntity<?> getBillsForPatient(@PathVariable Integer patientId) {
        return ResponseEntity.ok(billRepository.findByPatientId(patientId));
    }
}
