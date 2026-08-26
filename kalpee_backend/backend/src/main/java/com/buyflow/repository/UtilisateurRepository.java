package com.buyflow.repository;

import com.buyflow.entity.AuthProvider;
import com.buyflow.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByEmailIgnoreCase(String email);
    boolean existsByEmailIgnoreCase(String email);
    Optional<Utilisateur> findByProviderAndProviderId(AuthProvider provider, String providerId);

    List<Utilisateur> findAllByOrderByCreatedAtDesc();

    long countByActifTrue();
    long countByCreatedAtAfter(OffsetDateTime since);

    @Query("SELECT u.provider, COUNT(u) FROM Utilisateur u GROUP BY u.provider")
    List<Object[]> countByProviderGrouped();
}
