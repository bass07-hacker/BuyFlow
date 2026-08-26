package com.buyflow.dto.objectif;

import com.buyflow.entity.CategorieKey;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ObjectifRequest(
        @NotBlank(message = "Le nom de l'objectif est obligatoire") String nom,
        String description,
        @NotNull(message = "Le montant cible est obligatoire")
        @DecimalMin(value = "0.0", message = "Le montant cible doit etre superieur ou egal a zero")
        BigDecimal montantCible,
        @DecimalMin(value = "0.0", message = "Le montant epargne doit etre superieur ou egal a zero")
        BigDecimal montantEpargne,
        LocalDate dateCible,
        @NotNull CategorieKey categorie
) {}
