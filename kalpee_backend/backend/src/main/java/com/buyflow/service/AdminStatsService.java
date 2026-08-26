package com.buyflow.service;

import com.buyflow.dto.admin.AdminStatsResponse;
import com.buyflow.entity.ArticleStatut;
import com.buyflow.entity.TypeTransaction;
import com.buyflow.repository.AchatRepository;
import com.buyflow.repository.ArticleRepository;
import com.buyflow.repository.ObjectifEpargneRepository;
import com.buyflow.repository.TransactionRepository;
import com.buyflow.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminStatsService {

    private final UtilisateurRepository utilisateurRepository;
    private final AchatRepository achatRepository;
    private final ArticleRepository articleRepository;
    private final ObjectifEpargneRepository objectifRepository;
    private final TransactionRepository transactionRepository;

    public AdminStatsResponse obtenir() {
        long totalUtilisateurs = utilisateurRepository.count();
        long utilisateursActifs = utilisateurRepository.countByActifTrue();
        long nouveaux30j = utilisateurRepository.countByCreatedAtAfter(OffsetDateTime.now().minusDays(30));

        long totalAchats = achatRepository.count();
        long totalArticles = articleRepository.count();
        long articlesAchetes = articleRepository.countByStatut(ArticleStatut.ACHETE);

        var montantTotalPlanifie = articleRepository.sommeMontantTotal();
        var montantTotalDepense = articleRepository.sommeMontantParStatut(ArticleStatut.ACHETE);

        var totalDepots = transactionRepository.sommeGlobaleParType(TypeTransaction.DEPOT);
        var totalRetraits = transactionRepository.sommeGlobaleParType(TypeTransaction.RETRAIT);

        long totalObjectifs = objectifRepository.count();
        var montantTotalEpargne = objectifRepository.sommeMontantEpargne();

        Map<String, Long> parPriorite = new LinkedHashMap<>();
        for (Object[] row : achatRepository.countGroupedByPriorite()) {
            parPriorite.put(String.valueOf(row[0]), (Long) row[1]);
        }

        Map<String, Long> parCategorie = new LinkedHashMap<>();
        for (Object[] row : achatRepository.countGroupedByCategorie()) {
            parCategorie.put(String.valueOf(row[0]), (Long) row[1]);
        }

        Map<String, Long> parProvider = new LinkedHashMap<>();
        for (Object[] row : utilisateurRepository.countByProviderGrouped()) {
            parProvider.put(String.valueOf(row[0]), (Long) row[1]);
        }

        List<AdminStatsResponse.ArticleRecurrent> articlesRecurrents = new ArrayList<>();
        for (Object[] row : articleRepository.topArticlesRecurrents(PageRequest.of(0, 10))) {
            articlesRecurrents.add(new AdminStatsResponse.ArticleRecurrent(
                    String.valueOf(row[0]), (Long) row[1]));
        }

        return new AdminStatsResponse(
                totalUtilisateurs, utilisateursActifs, nouveaux30j,
                totalAchats, totalArticles, articlesAchetes,
                montantTotalPlanifie, montantTotalDepense,
                totalDepots, totalRetraits,
                totalObjectifs, montantTotalEpargne,
                parPriorite, parCategorie, parProvider,
                articlesRecurrents
        );
    }
}
