package com.buyflow.dto.admin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AdminUserCreateRequest(
        @NotBlank String prenom,
        @NotBlank String nom,
        @NotBlank @Email String email,
        @NotBlank
        @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caracteres")
        @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$",
            message = "Le mot de passe doit contenir une majuscule, une minuscule et un chiffre"
        )
        String motDePasse,
        boolean admin
) {}
