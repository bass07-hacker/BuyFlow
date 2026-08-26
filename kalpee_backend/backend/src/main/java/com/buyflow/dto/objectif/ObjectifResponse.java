package com.buyflow.dto.objectif;

import com.buyflow.entity.CategorieKey;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ObjectifResponse(
        Long id,
        String nom,
        String description,
        BigDecimal montantCible,
        BigDecimal montantEpargne,
        BigDecimal reste,
        int progression,
        LocalDate dateCible,
        CategorieKey categorie,
        BigDecimal epargneMensuelleRecommandee
) {}
