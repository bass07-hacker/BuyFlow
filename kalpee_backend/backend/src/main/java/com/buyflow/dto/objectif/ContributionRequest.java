package com.buyflow.dto.objectif;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ContributionRequest(
        @NotNull @DecimalMin(value = "0.01", message = "Le montant doit etre strictement positif")
        BigDecimal montant
) {}
