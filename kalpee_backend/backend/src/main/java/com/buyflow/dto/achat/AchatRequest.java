package com.buyflow.dto.achat;

import com.buyflow.entity.CategorieKey;
import com.buyflow.entity.Priorite;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record AchatRequest(
        @NotBlank(message = "Le nom de l'achat est obligatoire") String nom,
        String description,
        @NotNull(message = "La priorite est obligatoire") Priorite priorite,
        LocalDate dateLimite,
        @NotNull(message = "La categorie est obligatoire") CategorieKey categorie
) {}
