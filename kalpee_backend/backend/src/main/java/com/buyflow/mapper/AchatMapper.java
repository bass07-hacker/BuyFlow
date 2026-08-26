package com.buyflow.mapper;

import com.buyflow.dto.achat.AchatResponse;
import com.buyflow.entity.Achat;
import com.buyflow.entity.Article;
import com.buyflow.entity.ArticleStatut;

import java.math.BigDecimal;
import java.util.List;

public class AchatMapper {

    private AchatMapper() {}

    public static AchatResponse toResponse(Achat achat) {
        List<Article> articles = achat.getArticles();

        BigDecimal total = articles.stream()
                .map(a -> a.getPrixUnitaire().multiply(BigDecimal.valueOf(a.getQuantite())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal achete = articles.stream()
                .filter(a -> a.getStatut() == ArticleStatut.ACHETE)
                .map(a -> a.getPrixUnitaire().multiply(BigDecimal.valueOf(a.getQuantite())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int progression = total.compareTo(BigDecimal.ZERO) == 0
                ? 0
                : achete.multiply(BigDecimal.valueOf(100)).divide(total, 0, java.math.RoundingMode.HALF_UP).intValue();

        return new AchatResponse(
                achat.getId(),
                achat.getNom(),
                achat.getDescription(),
                achat.getPriorite(),
                achat.getDateLimite(),
                achat.getCategorie(),
                achat.getStatut(),
                total,
                achete,
                progression,
                articles.stream().map(ArticleMapper::toResponse).toList(),
                achat.getCreatedAt()
        );
    }
}
