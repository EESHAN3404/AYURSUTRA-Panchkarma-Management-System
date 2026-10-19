package com.ayursutra.backend.repository;

import com.ayursutra.backend.model.SessionNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SessionNoteRepository extends JpaRepository<SessionNote, Integer> {
    List<SessionNote> findByAppointmentId(Integer appointmentId);
    Optional<SessionNote> findByAppointmentIdAndDayNumber(Integer appointmentId, Integer dayNumber);
    List<SessionNote> findByAppointmentIdInOrderByAppointmentIdAscDayNumberAsc(List<Integer> appointmentIds);
}
