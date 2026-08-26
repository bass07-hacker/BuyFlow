package com.buyflow.repository;

import com.buyflow.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByTokenHash(String tokenHash);

    @Modifying
    @Query("UPDATE RefreshToken r SET r.revoked = true WHERE r.utilisateur.id = :utilisateurId")
    void revokeAllForUser(@org.springframework.data.repository.query.Param("utilisateurId") Long utilisateurId);
}
