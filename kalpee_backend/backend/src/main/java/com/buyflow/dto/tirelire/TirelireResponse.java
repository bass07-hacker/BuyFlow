package com.buyflow.dto.tirelire;

import java.math.BigDecimal;

public record TirelireResponse(
        Long id,
        BigDecimal solde,
        BigDecimal totalDepose,
        BigDecimal totalRetire
) {}
