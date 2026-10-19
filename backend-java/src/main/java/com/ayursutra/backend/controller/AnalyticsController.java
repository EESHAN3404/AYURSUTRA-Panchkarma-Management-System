package com.ayursutra.backend.controller;

import com.ayursutra.backend.dto.ApiResponse;
import com.ayursutra.backend.repository.AppointmentRepository;
import com.ayursutra.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardAnalytics() {
        Map<String, Object> data = new HashMap<>();
        
        long totalPatients = userRepository.countByRole("patient");
        long totalTherapists = userRepository.countByRole("therapist");
        
        long totalAppointments = appointmentRepository.count();
        long completedAppointments = appointmentRepository.countByStatus("completed");
        long pendingAppointments = appointmentRepository.countByStatus("pending");
        
        Long totalRevenue = appointmentRepository.calculateTotalRevenue();
        Long pendingRevenue = appointmentRepository.calculatePendingRevenue();
        
        data.put("totalPatients", totalPatients);
        data.put("totalTherapists", totalTherapists);
        data.put("totalAppointments", totalAppointments);
        data.put("completedAppointments", completedAppointments);
        data.put("pendingAppointments", pendingAppointments);
        data.put("totalRevenue", totalRevenue != null ? totalRevenue : 0);
        data.put("pendingRevenue", pendingRevenue != null ? pendingRevenue : 0);
        
        return ResponseEntity.ok(ApiResponse.success("Analytics fetched successfully", data));
    }
}
