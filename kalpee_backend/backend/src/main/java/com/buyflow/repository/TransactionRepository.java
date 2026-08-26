package com.buyflow.repository;

import com.buyflow.entity.Transaction;
import com.buyflow.entity.TypeTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByTirelireIdOrderByCreatedAtDesc(Long tirelireId);

    @Query("""
        SELECT COALESCE(SUM(
            CASE WHEN t.type = com.buyflow.entity.TypeTransaction.DEPOT THEN t.montant
                 ELSE -t.montant END), 0)
        FROM Transaction t WHERE t.tirelire.id = :tirelireId
        """)
    BigDecimal calculerSolde(@Param("tirelireId") Long tirelireId);

    @Query("SELECT COALESCE(SUM(t.montant), 0) FROM Transaction t WHERE t.tirelire.id = :tirelireId AND t.type = :type")
    BigDecimal sommeParType(@Param("tirelireId") Long tirelireId, @Param("type") TypeTransaction type);

    @Query("SELECT COALESCE(SUM(t.montant), 0) FROM Transaction t WHERE t.type = :type")
    BigDecimal sommeGlobaleParType(@Param("type") TypeTransaction type);
}
