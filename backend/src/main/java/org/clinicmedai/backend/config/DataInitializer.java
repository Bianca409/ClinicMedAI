package org.clinicmedai.backend.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.clinicmedai.backend.entity.Role;
import org.clinicmedai.backend.entity.User;
import org.clinicmedai.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        final String adminEmail = "admin@clinicmedai.com";

        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = User.builder()
                    .firstName("System")
                    .lastName("Administrator")
                    .email(adminEmail)
                    .password(passwordEncoder.encode("Admin123!"))
                    .phoneNumber("+40700000000")
                    .role(Role.ROLE_ADMIN)
                    .build();

            userRepository.save(admin);
            log.info("Default administrator account successfully initialized: {}", adminEmail);
        } else {
            log.info("Administrator account already exists. Skipping initialization.");
        }
    }
}