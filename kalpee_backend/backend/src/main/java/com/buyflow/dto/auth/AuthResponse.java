package com.buyflow.dto.auth;

public record AuthResponse(
        Long id,
        String prenom,
        String nom,
        String email,
        String provider,
        String photoUrl,
        String role
) {}
