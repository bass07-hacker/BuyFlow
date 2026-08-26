package com.buyflow.mapper;

import com.buyflow.dto.article.ArticleResponse;
import com.buyflow.entity.Article;

public class ArticleMapper {

    private ArticleMapper() {}

    public static ArticleResponse toResponse(Article a) {
        return new ArticleResponse(
                a.getId(),
                a.getNom(),
                a.getDescription(),
                a.getPhotoUrl(),
                a.getQuantite(),
                a.getPrixUnitaire(),
                a.getPrixUnitaire().multiply(java.math.BigDecimal.valueOf(a.getQuantite())),
                a.getSource(),
                a.getStatut()
        );
    }
}
