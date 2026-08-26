package com.buyflow.mapper;

import com.buyflow.dto.objectif.ObjectifResponse;
import com.buyflow.entity.ObjectifEpargne;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Period;

public class ObjectifMapper {

    private ObjectifMapper() {}

    public static ObjectifResponse toResponse(ObjectifEpargne o) {
        BigDecimal reste = o.getMontantCible().subtract(o.getMontantEpargne()).max(BigDecimal.ZERO);

        int progression = o.getMontantCible().compareTo(BigDecimal.ZERO) == 0
                ? 0
                : o.getMontantEpargne().multiply(BigDecimal.valueOf(100))
                    .divide(o.getMontantCible(), 0, RoundingMode.HALF_UP)
                    .min(BigDecimal.valueOf(100)).intValue();

        BigDecimal epargneMensuelle = calculerEpargneMensuelle(reste, o.getDateCible());

        return new ObjectifResponse(
                o.getId(), o.getNom(), o.getDescription(),
                o.getMontantCible(), o.getMontantEpargne(), reste, progression,
                o.getDateCible(), o.getCategorie(), epargneMensuelle
        );
    }

    private static BigDecimal calculerEpargneMensuelle(BigDecimal reste, LocalDate dateCible) {
        if (dateCible == null || reste.compareTo(BigDecimal.ZERO) <= 0) return BigDecimal.ZERO;
        LocalDate now = LocalDate.now();
        int moisRestants = Math.max(1, Period.between(now.withDayOfMonth(1), dateCible.withDayOfMonth(1)).toTotalMonths() >= 0
                ? (int) Period.between(now.withDayOfMonth(1), dateCible.withDayOfMonth(1)).toTotalMonths()
                : 1);
        return reste.divide(BigDecimal.valueOf(moisRestants), 0, RoundingMode.CEILING);
    }
}
