package com.buyflow.service;

import com.buyflow.dto.article.ArticleRequest;
import com.buyflow.dto.article.ArticleResponse;
import com.buyflow.dto.article.ArticleStatutRequest;
import com.buyflow.entity.Achat;
import com.buyflow.entity.Article;
import com.buyflow.exception.ResourceNotFoundException;
import com.buyflow.mapper.ArticleMapper;
import com.buyflow.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final AchatService achatService;

    public List<ArticleResponse> lister(Long achatId, Long utilisateurId) {
        achatService.getAchatOwned(achatId, utilisateurId); // verifie la propriete (RB01/RB03)
        return articleRepository.findByAchatIdOrderByCreatedAtAsc(achatId)
                .stream().map(ArticleMapper::toResponse).toList();
    }

    @Transactional
    public ArticleResponse ajouter(Long achatId, ArticleRequest req, Long utilisateurId) {
        Achat achat = achatService.getAchatOwned(achatId, utilisateurId);
        achatService.verifierNonCloture(achat);
        Article article = Article.builder()
                .achat(achat)
                .nom(req.nom().trim())
                .description(req.description())
                .photoUrl(req.photoUrl())
                .quantite(req.quantite())
                .prixUnitaire(req.prixUnitaire())
                .source(req.source())
                .build();
        return ArticleMapper.toResponse(articleRepository.save(article));
    }

    @Transactional
    public ArticleResponse modifier(Long articleId, ArticleRequest req, Long utilisateurId) {
        Article article = getArticleOwned(articleId, utilisateurId);
        achatService.verifierNonCloture(article.getAchat());
        article.setNom(req.nom().trim());
        article.setDescription(req.description());
        if (req.photoUrl() != null) article.setPhotoUrl(req.photoUrl());
        article.setQuantite(req.quantite());
        article.setPrixUnitaire(req.prixUnitaire());
        article.setSource(req.source());
        return ArticleMapper.toResponse(articleRepository.save(article));
    }

    @Transactional
    public ArticleResponse changerStatut(Long articleId, ArticleStatutRequest req, Long utilisateurId) {
        Article article = getArticleOwned(articleId, utilisateurId);
        achatService.verifierNonCloture(article.getAchat());
        article.setStatut(req.statut());
        return ArticleMapper.toResponse(articleRepository.save(article));
    }

    @Transactional
    public void supprimer(Long articleId, Long utilisateurId) {
        Article article = getArticleOwned(articleId, utilisateurId);
        achatService.verifierNonCloture(article.getAchat());
        articleRepository.delete(article);
    }

    private Article getArticleOwned(Long articleId, Long utilisateurId) {
        return articleRepository.findByIdAndUtilisateurId(articleId, utilisateurId)
                .orElseThrow(() -> new ResourceNotFoundException("Article introuvable"));
    }
}
