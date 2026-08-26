package com.buyflow.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record UpdateProfileRequest(
        @NotBlank String prenom,
        @NotBlank String nom
) {}
