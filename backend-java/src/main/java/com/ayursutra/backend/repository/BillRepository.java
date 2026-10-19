package com.ayursutra.backend.repository;

import com.ayursutra.backend.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {
    List<Bill> findByPatientId(Integer patientId);
    List<Bill> findByAppointmentId(Integer appointmentId);
    List<Bill> findByDateAndStatus(String date, String status);
}
