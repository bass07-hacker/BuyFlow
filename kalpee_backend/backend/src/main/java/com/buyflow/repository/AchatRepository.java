package com.buyflow.repository;

import com.buyflow.entity.Achat;
import com.buyflow.entity.Priorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AchatRepository extends JpaRepository<Achat, Long> {
    List<Achat> findByUtilisateurIdOrderByCreatedAtDesc(Long utilisateurId);
    Optional<Achat> findByIdAndUtilisateurId(Long id, Long utilisateurId);
    long countByUtilisateurId(Long utilisateurId);
    long countByUtilisateurIdAndPriorite(Long utilisateurId, Priorite priorite);

    @Query("SELECT a.priorite, COUNT(a) FROM Achat a GROUP BY a.priorite")
    List<Object[]> countGroupedByPriorite();

    @Query("SELECT a.categorie, COUNT(a) FROM Achat a GROUP BY a.categorie")
    List<Object[]> countGroupedByCategorie();
}
