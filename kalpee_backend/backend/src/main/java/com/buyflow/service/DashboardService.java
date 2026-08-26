package com.buyflow.service;

import com.buyflow.dto.dashboard.DashboardResponse;
import com.buyflow.entity.*;
import com.buyflow.repository.AchatRepository;
import com.buyflow.repository.ObjectifEpargneRepository;
import com.buyflow.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardService {

    private final AchatRepository achatRepository;
    private final ObjectifEpargneRepository objectifRepository;
    private final TirelireService tirelireService;
    private final TransactionRepository transactionRepository;

    public DashboardResponse obtenir(Long utilisateurId) {
        Tirelire tirelire = tirelireService.getTirelire(utilisateurId);
        BigDecimal solde = transactionRepository.calculerSolde(tirelire.getId());
        BigDecimal totalDepose = transactionRepository.sommeParType(tirelire.getId(), TypeTransaction.DEPOT);
        BigDecimal totalRetire = transactionRepository.sommeParType(tirelire.getId(), TypeTransaction.RETRAIT);

        List<Achat> achats = achatRepository.findByUtilisateurIdOrderByCreatedAtDesc(utilisateurId);

        BigDecimal totalAchats = BigDecimal.ZERO;
        BigDecimal montantDejaDepense = BigDecimal.ZERO;

        for (Achat a : achats) {
            for (Article art : a.getArticles()) {
                BigDecimal montant = art.getPrixUnitaire().multiply(BigDecimal.valueOf(art.getQuantite()));
                totalAchats = totalAchats.add(montant);
                if (art.getStatut() == ArticleStatut.ACHETE) montantDejaDepense = montantDejaDepense.add(montant);
            }
        }
        BigDecimal montantRestant = totalAchats.subtract(montantDejaDepense).max(BigDecimal.ZERO);

        long urgents = achatRepository.countByUtilisateurIdAndPriorite(utilisateurId, Priorite.URGENT);
        long importants = achatRepository.countByUtilisateurIdAndPriorite(utilisateurId, Priorite.IMPORTANT);
        long normaux = achatRepository.countByUtilisateurIdAndPriorite(utilisateurId, Priorite.NORMAL);
        long faibles = achatRepository.countByUtilisateurIdAndPriorite(utilisateurId, Priorite.FAIBLE);

        long objectifsEnCours = objectifRepository.countByUtilisateurId(utilisateurId);

        List<DashboardResponse.AchatPrioritaireDto> achatsPrioritaires = achats.stream()
                .filter(a -> a.getPriorite() == Priorite.URGENT || a.getPriorite() == Priorite.IMPORTANT)
                .sorted(Comparator.comparing(Achat::getPriorite))
                .limit(5)
                .map(a -> {
                    BigDecimal total = a.getArticles().stream()
                            .map(art -> art.getPrixUnitaire().multiply(BigDecimal.valueOf(art.getQuantite())))
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                    BigDecimal achete = a.getArticles().stream()
                            .filter(art -> art.getStatut() == ArticleStatut.ACHETE)
                            .map(art -> art.getPrixUnitaire().multiply(BigDecimal.valueOf(art.getQuantite())))
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                    int progression = total.compareTo(BigDecimal.ZERO) == 0 ? 0 :
                            achete.multiply(BigDecimal.valueOf(100)).divide(total, 0, RoundingMode.HALF_UP).intValue();
                    return new DashboardResponse.AchatPrioritaireDto(
                            a.getId(), a.getNom(), a.getPriorite().name(), a.getCategorie().name(),
                            total, progression, a.getArticles().size()
                    );
                })
                .toList();

        return new DashboardResponse(
                solde, totalDepose, totalRetire,
                totalAchats, montantDejaDepense, montantRestant,
                achats.size(), urgents, importants, normaux, faibles,
                objectifsEnCours, achatsPrioritaires
        );
    }
}
