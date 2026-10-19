package com.ayursutra.backend.controller;

import com.ayursutra.backend.model.User;
import com.ayursutra.backend.repository.UserRepository;
import com.ayursutra.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String password = data.get("password");
        Optional<User> user = userRepository.findByEmailAndPassword(email, password);
        
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<?> signup(@RequestBody User newUser) {
        String email = newUser.getEmail();
        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Email already registered"));
        }
        
        if (newUser.getRole() == null || newUser.getRole().isEmpty()) {
            newUser.setRole("patient");
        }
        
        User savedUser = userRepository.save(newUser);
        
        if (savedUser.getEmail() != null && !savedUser.getEmail().isEmpty()) {
            emailService.sendWelcomeEmail(savedUser.getEmail(), savedUser.getName() != null ? savedUser.getName() : "User");
        }
        
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/therapists")
    public ResponseEntity<?> getTherapists() {
        try {
            List<User> therapists = userRepository.findByRole("therapist");
            return ResponseEntity.ok(therapists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/therapist/profile/")
    public ResponseEntity<?> getTherapistProfile(@RequestParam(value = "id", required = false) String id) {
        try {
            if (id == null || id.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Therapist ID is required"));
            }
            Optional<User> userOpt = userRepository.findById(Integer.parseInt(id));
            if (!userOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Therapist not found"));
            }
            User user = userOpt.get();
            if (!"therapist".equals(user.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "User is not a therapist"));
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/therapist/profile/")
    public ResponseEntity<?> updateTherapistProfile(@RequestBody Map<String, Object> data) {
        try {
            Object idObj = data.get("id");
            if (idObj == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Therapist ID is required"));
            }
            Integer therapistId = Integer.parseInt(idObj.toString());
            Optional<User> userOpt = userRepository.findById(therapistId);
            if (!userOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Therapist not found"));
            }
            User user = userOpt.get();
            if (!"therapist".equals(user.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "User is not a therapist"));
            }

            if (data.containsKey("name")) user.setName((String) data.get("name"));
            if (data.containsKey("experience")) user.setExperience((String) data.get("experience"));
            if (data.containsKey("specialization")) user.setSpecialization((String) data.get("specialization"));
            if (data.containsKey("shiftTiming")) user.setShiftTiming((String) data.get("shiftTiming"));
            if (data.containsKey("qualification")) user.setQualification((String) data.get("qualification"));
            if (data.containsKey("bio")) user.setBio((String) data.get("bio"));

            User saved = userRepository.save(user);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}
