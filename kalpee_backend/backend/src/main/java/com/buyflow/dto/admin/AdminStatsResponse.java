package com.buyflow.dto.admin;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public record AdminStatsResponse(
        long totalUtilisateurs,
        long utilisateursActifs,
        long nouveauxUtilisateurs30j,
        long totalAchats,
        long totalArticles,
        long articlesAchetes,
        BigDecimal montantTotalPlanifie,
        BigDecimal montantTotalDepense,
        BigDecimal totalDepotsGlobal,
        BigDecimal totalRetraitsGlobal,
        long totalObjectifs,
        BigDecimal montantTotalEpargne,
        Map<String, Long> achatsParPriorite,
        Map<String, Long> achatsParCategorie,
        Map<String, Long> utilisateursParProvider,
        List<ArticleRecurrent> articlesRecurrents
) {
    public record ArticleRecurrent(String nom, long occurrences) {}
}
