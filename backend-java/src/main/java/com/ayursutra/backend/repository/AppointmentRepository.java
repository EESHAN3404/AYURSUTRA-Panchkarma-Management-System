package com.ayursutra.backend.repository;

import com.ayursutra.backend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    List<Appointment> findByPatientId(Integer patientId);
    List<Appointment> findByDate(String date);
    
    boolean existsByTherapistIdAndDateAndTimeAndStatusNotIn(Integer therapistId, String date, String time, List<String> statuses);
    
    long countByStatus(String status);
    
    @Query("SELECT SUM(a.amount) FROM Appointment a WHERE a.paymentStatus = 'paid'")
    Long calculateTotalRevenue();
    
    @Query("SELECT SUM(a.amount) FROM Appointment a WHERE a.paymentStatus = 'pending'")
    Long calculatePendingRevenue();
}
