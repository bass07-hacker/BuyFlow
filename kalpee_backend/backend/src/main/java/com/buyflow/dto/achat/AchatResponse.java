package com.buyflow.dto.achat;

import com.buyflow.dto.article.ArticleResponse;
import com.buyflow.entity.CategorieKey;
import com.buyflow.entity.Priorite;
import com.buyflow.entity.StatutAchat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

public record AchatResponse(
        Long id,
        String nom,
        String description,
        Priorite priorite,
        LocalDate dateLimite,
        CategorieKey categorie,
        StatutAchat statut,
        BigDecimal totalAchat,
        BigDecimal montantAchete,
        int progression,
        List<ArticleResponse> articles,
        OffsetDateTime createdAt
) {}
