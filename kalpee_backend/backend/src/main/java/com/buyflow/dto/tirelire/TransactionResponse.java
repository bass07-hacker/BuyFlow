package com.buyflow.dto.tirelire;

import com.buyflow.entity.TypeTransaction;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record TransactionResponse(
        Long id,
        TypeTransaction type,
        BigDecimal montant,
        String motif,
        OffsetDateTime date
) {}
