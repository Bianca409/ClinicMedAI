package org.clinicmedai.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Email address is mandatory")
    @Email(message = "Email must be a valid email address")
    private String email;

    @NotBlank(message = "Password is mandatory")
    private String password;
}