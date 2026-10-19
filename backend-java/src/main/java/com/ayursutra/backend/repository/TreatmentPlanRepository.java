package com.ayursutra.backend.repository;

import com.ayursutra.backend.model.TreatmentPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TreatmentPlanRepository extends JpaRepository<TreatmentPlan, Integer> {
    List<TreatmentPlan> findByPatientId(Integer patientId);
    List<TreatmentPlan> findByDoctorId(Integer doctorId);
    List<TreatmentPlan> findByTherapistId(Integer therapistId);
}
