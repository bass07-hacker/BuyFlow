package com.buyflow.repository;

import com.buyflow.entity.Article;
import com.buyflow.entity.ArticleStatut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByAchatIdOrderByCreatedAtAsc(Long achatId);
    Optional<Article> findByIdAndAchatId(Long id, Long achatId);

    @Query("SELECT a FROM Article a WHERE a.id = :id AND a.achat.utilisateur.id = :utilisateurId")
    Optional<Article> findByIdAndUtilisateurId(@Param("id") Long id, @Param("utilisateurId") Long utilisateurId);

    long countByStatut(ArticleStatut statut);

    @Query("SELECT COALESCE(SUM(a.prixUnitaire * a.quantite), 0) FROM Article a")
    BigDecimal sommeMontantTotal();

    @Query("SELECT COALESCE(SUM(a.prixUnitaire * a.quantite), 0) FROM Article a WHERE a.statut = :statut")
    BigDecimal sommeMontantParStatut(@Param("statut") ArticleStatut statut);

    @Query("SELECT a.nom, COUNT(a) as occurrences FROM Article a GROUP BY a.nom ORDER BY occurrences DESC")
    List<Object[]> topArticlesRecurrents(org.springframework.data.domain.Pageable pageable);
}
