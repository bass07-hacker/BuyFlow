package com.buyflow.dto.admin;

import java.time.OffsetDateTime;

public record AdminUserResponse(
        Long id,
        String prenom,
        String nom,
        String email,
        String provider,
        String role,
        boolean actif,
        long nombreAchats,
        OffsetDateTime createdAt
) {}
