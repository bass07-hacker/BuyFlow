package com.buyflow.service;

import com.buyflow.dto.achat.AchatRequest;
import com.buyflow.dto.achat.AchatResponse;
import com.buyflow.dto.tirelire.TransactionRequest;
import com.buyflow.entity.Achat;
import com.buyflow.entity.Article;
import com.buyflow.entity.ArticleStatut;
import com.buyflow.entity.StatutAchat;
import com.buyflow.entity.Utilisateur;
import com.buyflow.exception.BadRequestException;
import com.buyflow.exception.ResourceNotFoundException;
import com.buyflow.mapper.AchatMapper;
import com.buyflow.repository.AchatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AchatService {

    private final AchatRepository achatRepository;
    private final AuthService authService;
    private final TirelireService tirelireService;

    public List<AchatResponse> lister(Long utilisateurId) {
        return achatRepository.findByUtilisateurIdOrderByCreatedAtDesc(utilisateurId)
                .stream().map(AchatMapper::toResponse).toList();
    }

    public AchatResponse obtenir(Long id, Long utilisateurId) {
        return AchatMapper.toResponse(getAchatOwned(id, utilisateurId));
    }

    @Transactional
    public AchatResponse creer(AchatRequest req, Long utilisateurId) {
        Utilisateur utilisateur = authService.getById(utilisateurId);
        Achat achat = Achat.builder()
                .utilisateur(utilisateur)
                .nom(req.nom().trim())
                .description(req.description())
                .priorite(req.priorite())
                .dateLimite(req.dateLimite())
                .categorie(req.categorie())
                .build();
        return AchatMapper.toResponse(achatRepository.save(achat));
    }

    @Transactional
    public AchatResponse modifier(Long id, AchatRequest req, Long utilisateurId) {
        Achat achat = getAchatOwned(id, utilisateurId);
        verifierNonCloture(achat);
        achat.setNom(req.nom().trim());
        achat.setDescription(req.description());
        achat.setPriorite(req.priorite());
        achat.setDateLimite(req.dateLimite());
        achat.setCategorie(req.categorie());
        return AchatMapper.toResponse(achatRepository.save(achat));
    }

    @Transactional
    public void supprimer(Long id, Long utilisateurId) {
        Achat achat = getAchatOwned(id, utilisateurId);
        achatRepository.delete(achat);
    }

    /**
     * Cloture un achat : les articles marques "Achete" sont debites de la tirelire
     * en une seule transaction (RETRAIT), puis l'achat passe au statut TERMINE.
     * Les articles "Mis de cote" ou "A acheter" ne sont pas comptabilises : ils n'ont
     * pas encore ete reellement payes.
     * RB12 (retrait <= solde disponible) est verifiee par TirelireService, dans la meme
     * transaction que le changement de statut : soit tout reussit, soit rien n'est modifie.
     */
    @Transactional
    public AchatResponse cloturer(Long id, Long utilisateurId) {
        Achat achat = getAchatOwned(id, utilisateurId);
        if (achat.getStatut() == StatutAchat.TERMINE) {
            throw new BadRequestException("Cet achat est déjà clôturé");
        }

        BigDecimal montantAchete = achat.getArticles().stream()
                .filter(a -> a.getStatut() == ArticleStatut.ACHETE)
                .map(this::totalArticle)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (montantAchete.compareTo(BigDecimal.ZERO) > 0) {
            tirelireService.retirer(
                    new TransactionRequest(montantAchete, "Clôture achat : " + achat.getNom()),
                    utilisateurId
            );
        }

        achat.setStatut(StatutAchat.TERMINE);
        return AchatMapper.toResponse(achatRepository.save(achat));
    }

    private BigDecimal totalArticle(Article a) {
        return a.getPrixUnitaire().multiply(BigDecimal.valueOf(a.getQuantite()));
    }

    void verifierNonCloture(Achat achat) {
        if (achat.getStatut() == StatutAchat.TERMINE) {
            throw new BadRequestException("Cet achat est clôturé, il ne peut plus être modifié");
        }
    }

    /** RB01/RB02 : un utilisateur ne peut acceder qu'a ses propres achats */
    Achat getAchatOwned(Long id, Long utilisateurId) {
        return achatRepository.findByIdAndUtilisateurId(id, utilisateurId)
                .orElseThrow(() -> new ResourceNotFoundException("Achat introuvable"));
    }
}
