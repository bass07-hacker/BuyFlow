package com.buyflow.dto.auth;

import jakarta.validation.constraints.*;

public record RegisterRequest(
        @NotBlank(message = "Le prenom est obligatoire") String prenom,
        @NotBlank(message = "Le nom est obligatoire") String nom,
        @NotBlank(message = "L'email est obligatoire") @Email(message = "Email invalide") String email,
        @NotBlank(message = "Le mot de passe est obligatoire")
        @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caracteres")
        @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$",
            message = "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
        )
        String motDePasse
) {}
