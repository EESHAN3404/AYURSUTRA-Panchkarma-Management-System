package com.ayursutra.backend.repository;

import com.ayursutra.backend.model.DoctorLeave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DoctorLeaveRepository extends JpaRepository<DoctorLeave, Integer> {
    List<DoctorLeave> findByDoctorId(Integer doctorId);
}
