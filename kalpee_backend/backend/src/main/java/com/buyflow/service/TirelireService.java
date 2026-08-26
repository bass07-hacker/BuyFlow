package com.buyflow.service;

import com.buyflow.dto.tirelire.TirelireResponse;
import com.buyflow.dto.tirelire.TransactionRequest;
import com.buyflow.dto.tirelire.TransactionResponse;
import com.buyflow.entity.Tirelire;
import com.buyflow.entity.Transaction;
import com.buyflow.entity.TypeTransaction;
import com.buyflow.exception.BadRequestException;
import com.buyflow.exception.ResourceNotFoundException;
import com.buyflow.repository.TirelireRepository;
import com.buyflow.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TirelireService {

    private final TirelireRepository tirelireRepository;
    private final TransactionRepository transactionRepository;

    public TirelireResponse obtenir(Long utilisateurId) {
        Tirelire tirelire = getTirelire(utilisateurId);
        BigDecimal solde = transactionRepository.calculerSolde(tirelire.getId());
        BigDecimal totalDepose = transactionRepository.sommeParType(tirelire.getId(), TypeTransaction.DEPOT);
        BigDecimal totalRetire = transactionRepository.sommeParType(tirelire.getId(), TypeTransaction.RETRAIT);
        return new TirelireResponse(tirelire.getId(), solde, totalDepose, totalRetire);
    }

    public List<TransactionResponse> historique(Long utilisateurId) {
        Tirelire tirelire = getTirelire(utilisateurId);
        return transactionRepository.findByTirelireIdOrderByCreatedAtDesc(tirelire.getId())
                .stream()
                .map(t -> new TransactionResponse(t.getId(), t.getType(), t.getMontant(), t.getMotif(), t.getCreatedAt()))
                .toList();
    }

    @Transactional
    public TirelireResponse deposer(TransactionRequest req, Long utilisateurId) {
        Tirelire tirelire = getTirelire(utilisateurId);
        Transaction tx = Transaction.builder()
                .tirelire(tirelire).type(TypeTransaction.DEPOT)
                .montant(req.montant()).motif(req.motif().trim())
                .build();
        transactionRepository.save(tx);
        return obtenir(utilisateurId);
    }

    /** RB12 : un retrait ne peut pas depasser le solde disponible. Verification faite dans la meme transaction DB. */
    @Transactional
    public TirelireResponse retirer(TransactionRequest req, Long utilisateurId) {
        Tirelire tirelire = getTirelire(utilisateurId);
        BigDecimal soldeActuel = transactionRepository.calculerSolde(tirelire.getId());
        if (req.montant().compareTo(soldeActuel) > 0) {
            throw new BadRequestException("Solde insuffisant pour effectuer ce retrait");
        }
        Transaction tx = Transaction.builder()
                .tirelire(tirelire).type(TypeTransaction.RETRAIT)
                .montant(req.montant()).motif(req.motif().trim())
                .build();
        transactionRepository.save(tx);
        return obtenir(utilisateurId);
    }

    Tirelire getTirelire(Long utilisateurId) {
        return tirelireRepository.findByUtilisateurId(utilisateurId)
                .orElseThrow(() -> new ResourceNotFoundException("Tirelire introuvable"));
    }
}
