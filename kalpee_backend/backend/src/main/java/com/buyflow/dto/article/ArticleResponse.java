package com.buyflow.dto.article;

import com.buyflow.entity.ArticleStatut;

import java.math.BigDecimal;

public record ArticleResponse(
        Long id,
        String nom,
        String description,
        String photoUrl,
        Integer quantite,
        BigDecimal prixUnitaire,
        BigDecimal total,
        String source,
        ArticleStatut statut
) {}
