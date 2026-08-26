package com.buyflow.dto.article;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record ArticleRequest(
        @NotBlank(message = "Le nom de l'article est obligatoire") String nom,
        String description,
        String photoUrl,
        @NotNull(message = "La quantite est obligatoire")
        @Positive(message = "La quantite doit etre superieure a zero")
        Integer quantite,
        @NotNull(message = "Le prix unitaire est obligatoire")
        @DecimalMin(value = "0.0", message = "Le prix unitaire doit etre superieur ou egal a zero")
        BigDecimal prixUnitaire,
        String source
) {}
