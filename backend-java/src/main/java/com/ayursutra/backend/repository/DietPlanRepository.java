package com.ayursutra.backend.repository;

import com.ayursutra.backend.model.DietPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DietPlanRepository extends JpaRepository<DietPlan, Integer> {
    Optional<DietPlan> findByPatientId(Integer patientId);
}
