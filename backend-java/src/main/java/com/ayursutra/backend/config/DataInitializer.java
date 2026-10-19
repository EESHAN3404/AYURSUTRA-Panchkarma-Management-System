package com.ayursutra.backend.config;

import com.ayursutra.backend.model.Setting;
import com.ayursutra.backend.model.User;
import com.ayursutra.backend.repository.SettingRepository;
import com.ayursutra.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SettingRepository settingRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User patient = new User();
            patient.setEmail("patient@ayur.com");
            patient.setPassword("patient123");
            patient.setRole("patient");
            patient.setName("Rajesh Kumar");

            User therapist = new User();
            therapist.setEmail("therapist@ayur.com");
            therapist.setPassword("therapist123");
            therapist.setRole("therapist");
            therapist.setName("Dr. Priya Sharma");

            User practitioner = new User();
            practitioner.setEmail("practitioner@ayur.com");
            practitioner.setPassword("practitioner123");
            practitioner.setRole("practitioner");
            practitioner.setName("Dr. Anil Verma");

            userRepository.saveAll(List.of(patient, therapist, practitioner));
        }

        if (settingRepository.count() == 0) {
            Setting notifications = new Setting();
            notifications.setKey("notifications");
            notifications.setValue("{\"emailNotifications\": true, \"smsReminders\": true, \"dailyReports\": false}");

            Setting center = new Setting();
            center.setKey("center");
            center.setValue("{\"name\": \"AyurSutra Panchakarma\", \"email\": \"contact@ayursutra.com\", \"phone\": \"+91 98765 43210\", \"address\": \"123 Wellness Street, Ayurveda City, India\"}");

            Setting twoFactor = new Setting();
            twoFactor.setKey("two_factor");
            twoFactor.setValue("{\"enabled\": false}");

            settingRepository.saveAll(List.of(notifications, center, twoFactor));
        }
    }
}
