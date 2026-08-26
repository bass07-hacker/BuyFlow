package com.buyflow.service;

import com.buyflow.dto.objectif.ContributionRequest;
import com.buyflow.dto.objectif.ObjectifRequest;
import com.buyflow.dto.objectif.ObjectifResponse;
import com.buyflow.entity.ObjectifEpargne;
import com.buyflow.entity.Utilisateur;
import com.buyflow.exception.BadRequestException;
import com.buyflow.exception.ResourceNotFoundException;
import com.buyflow.mapper.ObjectifMapper;
import com.buyflow.repository.ObjectifEpargneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ObjectifEpargneService {

    private final ObjectifEpargneRepository objectifRepository;
    private final AuthService authService;

    public List<ObjectifResponse> lister(Long utilisateurId) {
        return objectifRepository.findByUtilisateurIdOrderByCreatedAtDesc(utilisateurId)
                .stream().map(ObjectifMapper::toResponse).toList();
    }

    public ObjectifResponse obtenir(Long id, Long utilisateurId) {
        return ObjectifMapper.toResponse(getOwned(id, utilisateurId));
    }

    @Transactional
    public ObjectifResponse creer(ObjectifRequest req, Long utilisateurId) {
        validerDates(req.dateCible());
        Utilisateur utilisateur = authService.getById(utilisateurId);
        ObjectifEpargne objectif = ObjectifEpargne.builder()
                .utilisateur(utilisateur)
                .nom(req.nom().trim())
                .description(req.description())
                .montantCible(req.montantCible())
                .montantEpargne(req.montantEpargne() != null ? req.montantEpargne() : BigDecimal.ZERO)
                .dateCible(req.dateCible())
                .categorie(req.categorie())
                .build();
        return ObjectifMapper.toResponse(objectifRepository.save(objectif));
    }

    @Transactional
    public ObjectifResponse modifier(Long id, ObjectifRequest req, Long utilisateurId) {
        validerDates(req.dateCible());
        ObjectifEpargne objectif = getOwned(id, utilisateurId);
        objectif.setNom(req.nom().trim());
        objectif.setDescription(req.description());
        objectif.setMontantCible(req.montantCible());
        if (req.montantEpargne() != null) objectif.setMontantEpargne(req.montantEpargne());
        objectif.setDateCible(req.dateCible());
        objectif.setCategorie(req.categorie());
        return ObjectifMapper.toResponse(objectifRepository.save(objectif));
    }

    @Transactional
    public ObjectifResponse ajouterContribution(Long id, ContributionRequest req, Long utilisateurId) {
        ObjectifEpargne objectif = getOwned(id, utilisateurId);
        objectif.setMontantEpargne(objectif.getMontantEpargne().add(req.montant()));
        return ObjectifMapper.toResponse(objectifRepository.save(objectif));
    }

    @Transactional
    public void supprimer(Long id, Long utilisateurId) {
        objectifRepository.delete(getOwned(id, utilisateurId));
    }

    private void validerDates(LocalDate dateCible) {
        // RB11 : la date cible doit etre coherente avec la date de creation (donc pas dans le passe)
        if (dateCible != null && dateCible.isBefore(LocalDate.now())) {
            throw new BadRequestException("La date cible ne peut pas etre anterieure a aujourd'hui");
        }
    }

    ObjectifEpargne getOwned(Long id, Long utilisateurId) {
        return objectifRepository.findByIdAndUtilisateurId(id, utilisateurId)
                .orElseThrow(() -> new ResourceNotFoundException("Objectif introuvable"));
    }
}
