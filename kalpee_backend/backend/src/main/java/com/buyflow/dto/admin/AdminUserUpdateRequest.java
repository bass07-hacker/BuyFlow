package com.buyflow.dto.admin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AdminUserUpdateRequest(
        @NotBlank String prenom,
        @NotBlank String nom,
        @NotBlank @Email String email,
        boolean actif
) {}
