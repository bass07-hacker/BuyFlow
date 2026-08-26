package com.buyflow.dto.auth;

import jakarta.validation.constraints.NotBlank;

/** idToken = credential renvoye par Google Identity Services cote frontend (bouton "Se connecter avec Google") */
public record GoogleLoginRequest(@NotBlank String idToken) {}
