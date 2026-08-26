package com.buyflow.repository;

import com.buyflow.entity.Tirelire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TirelireRepository extends JpaRepository<Tirelire, Long> {
    Optional<Tirelire> findByUtilisateurId(Long utilisateurId);
}
