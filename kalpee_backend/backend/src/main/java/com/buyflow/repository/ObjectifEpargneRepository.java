package com.buyflow.repository;

import com.buyflow.entity.ObjectifEpargne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ObjectifEpargneRepository extends JpaRepository<ObjectifEpargne, Long> {
    List<ObjectifEpargne> findByUtilisateurIdOrderByCreatedAtDesc(Long utilisateurId);
    Optional<ObjectifEpargne> findByIdAndUtilisateurId(Long id, Long utilisateurId);
    long countByUtilisateurId(Long utilisateurId);

    @Query("SELECT COALESCE(SUM(o.montantEpargne), 0) FROM ObjectifEpargne o")
    BigDecimal sommeMontantEpargne();
}
