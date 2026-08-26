package com.buyflow.dto.tirelire;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record TransactionRequest(
        @NotNull(message = "Le montant est obligatoire")
        @DecimalMin(value = "0.01", message = "Le montant doit etre strictement positif")
        BigDecimal montant,
        @NotBlank(message = "Le motif est obligatoire") String motif
) {}
