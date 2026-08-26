package com.buyflow.dto.auth;

import jakarta.validation.constraints.NotBlank;

/**
 * identityToken = JWT renvoye par "Sign in with Apple" JS cote frontend.
 * prenom/nom : Apple ne les renvoie qu'a la toute premiere connexion, via le champ "user" du callback JS.
 */
public record AppleLoginRequest(@NotBlank String identityToken, String prenom, String nom) {}
