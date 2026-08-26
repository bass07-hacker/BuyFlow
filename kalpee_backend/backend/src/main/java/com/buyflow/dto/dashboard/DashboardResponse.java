package com.buyflow.dto.dashboard;

import java.math.BigDecimal;
import java.util.List;

public record DashboardResponse(
        BigDecimal solde,
        BigDecimal totalDepose,
        BigDecimal totalRetire,
        BigDecimal totalAchats,
        BigDecimal montantDejaDepense,
        BigDecimal montantRestant,
        long nombreAchats,
        long achatsUrgents,
        long achatsImportants,
        long achatsNormaux,
        long achatsFaibles,
        long objectifsEnCours,
        List<AchatPrioritaireDto> achatsPrioritaires
) {
    public record AchatPrioritaireDto(
            Long id,
            String nom,
            String priorite,
            String categorie,
            BigDecimal total,
            int progression,
            int nombreArticles
    ) {}
}
