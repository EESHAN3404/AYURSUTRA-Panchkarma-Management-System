package com.ayursutra.backend.repository;

import com.ayursutra.backend.model.TreatmentSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TreatmentSessionRepository extends JpaRepository<TreatmentSession, Integer> {
    List<TreatmentSession> findByTreatmentPlanIdOrderByIdAsc(Integer treatmentPlanId);
    List<TreatmentSession> findByPatientId(Integer patientId);
    List<TreatmentSession> findByTherapistId(Integer therapistId);
}
