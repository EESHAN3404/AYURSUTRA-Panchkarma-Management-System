package com.ayursutra.backend.repository;

import com.ayursutra.backend.model.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Integer> {
    List<Consultation> findByPatientId(Integer patientId);
    List<Consultation> findByDoctorId(Integer doctorId);
}
