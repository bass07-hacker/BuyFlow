package com.buyflow.service;

import com.buyflow.dto.auth.*;
import com.buyflow.entity.AuthProvider;
import com.buyflow.entity.Tirelire;
import com.buyflow.entity.Utilisateur;
import com.buyflow.exception.BadRequestException;
import com.buyflow.exception.ConflictException;
import com.buyflow.exception.ResourceNotFoundException;
import com.buyflow.exception.UnauthorizedException;
import com.buyflow.repository.RefreshTokenRepository;
import com.buyflow.repository.TirelireRepository;
import com.buyflow.repository.UtilisateurRepository;
import com.buyflow.security.AppleTokenVerifier;
import com.buyflow.security.GoogleTokenVerifier;
import com.buyflow.security.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final TirelireRepository tirelireRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final GoogleTokenVerifier googleTokenVerifier;
    private final AppleTokenVerifier appleTokenVerifier;

    @Transactional
    public AuthResponse register(RegisterRequest req, HttpServletResponse response) {
        if (utilisateurRepository.existsByEmailIgnoreCase(req.email())) {
            throw new ConflictException("Un compte existe deja avec cet email");
        }
        Utilisateur utilisateur = Utilisateur.builder()
                .prenom(req.prenom().trim())
                .nom(req.nom().trim())
                .email(req.email().trim().toLowerCase())
                .motDePasse(passwordEncoder.encode(req.motDePasse()))
                .provider(AuthProvider.LOCAL)
                .build();
        utilisateur = utilisateurRepository.save(utilisateur);
        creerTirelirePourUtilisateur(utilisateur);

        issueTokens(utilisateur, response);
        return toAuthResponse(utilisateur);
    }

    @Transactional
    public AuthResponse login(LoginRequest req, HttpServletResponse response) {
        Utilisateur utilisateur = utilisateurRepository.findByEmailIgnoreCase(req.email())
                .orElseThrow(() -> new UnauthorizedException("Identifiants invalides"));

        if (utilisateur.getProvider() != AuthProvider.LOCAL || utilisateur.getMotDePasse() == null) {
            throw new BadRequestException("Ce compte utilise la connexion " + utilisateur.getProvider() + ". Utilisez ce mode de connexion.");
        }
        if (!passwordEncoder.matches(req.motDePasse(), utilisateur.getMotDePasse())) {
            throw new UnauthorizedException("Identifiants invalides");
        }
        issueTokens(utilisateur, response);
        return toAuthResponse(utilisateur);
    }

    @Transactional
    public AuthResponse loginWithGoogle(GoogleLoginRequest req, HttpServletResponse response) {
        GoogleTokenVerifier.GoogleUser googleUser = googleTokenVerifier.verify(req.idToken());
        if (!googleUser.emailVerified()) {
            throw new UnauthorizedException("Email Google non verifie");
        }

        Utilisateur utilisateur = utilisateurRepository
                .findByProviderAndProviderId(AuthProvider.GOOGLE, googleUser.sub())
                .or(() -> utilisateurRepository.findByEmailIgnoreCase(googleUser.email())
                        .map(existing -> linkProviderIfLocalMissing(existing, AuthProvider.GOOGLE, googleUser.sub())))
                .orElseGet(() -> {
                    Utilisateur nouveau = Utilisateur.builder()
                            .prenom(orDefault(googleUser.givenName(), "Utilisateur"))
                            .nom(orDefault(googleUser.familyName(), ""))
                            .email(googleUser.email().toLowerCase())
                            .provider(AuthProvider.GOOGLE)
                            .providerId(googleUser.sub())
                            .photoUrl(googleUser.picture())
                            .build();
                    Utilisateur saved = utilisateurRepository.save(nouveau);
                    creerTirelirePourUtilisateur(saved);
                    return saved;
                });

        issueTokens(utilisateur, response);
        return toAuthResponse(utilisateur);
    }

    @Transactional
    public AuthResponse loginWithApple(AppleLoginRequest req, HttpServletResponse response) {
        AppleTokenVerifier.AppleUser appleUser = appleTokenVerifier.verify(req.identityToken());

        Utilisateur utilisateur = utilisateurRepository
                .findByProviderAndProviderId(AuthProvider.APPLE, appleUser.sub())
                .or(() -> {
                    if (appleUser.email() == null) return java.util.Optional.empty();
                    return utilisateurRepository.findByEmailIgnoreCase(appleUser.email())
                            .map(existing -> linkProviderIfLocalMissing(existing, AuthProvider.APPLE, appleUser.sub()));
                })
                .orElseGet(() -> {
                    // Apple ne renvoie prenom/nom que lors de la toute premiere connexion (payload "user" cote JS)
                    String email = appleUser.email() != null ? appleUser.email()
                            : appleUser.sub() + "@privaterelay.appleid.com";
                    Utilisateur nouveau = Utilisateur.builder()
                            .prenom(orDefault(req.prenom(), "Utilisateur"))
                            .nom(orDefault(req.nom(), ""))
                            .email(email.toLowerCase())
                            .provider(AuthProvider.APPLE)
                            .providerId(appleUser.sub())
                            .build();
                    Utilisateur saved = utilisateurRepository.save(nouveau);
                    creerTirelirePourUtilisateur(saved);
                    return saved;
                });

        issueTokens(utilisateur, response);
        return toAuthResponse(utilisateur);
    }

    @Transactional
    public AuthResponse refresh(String rawRefreshToken, HttpServletResponse response) {
        if (rawRefreshToken == null || rawRefreshToken.isBlank()) {
            throw new UnauthorizedException("Session expiree, veuillez vous reconnecter");
        }
        String hash = jwtService.hashToken(rawRefreshToken);
        var token = refreshTokenRepository.findByTokenHash(hash)
                .orElseThrow(() -> new UnauthorizedException("Session expiree, veuillez vous reconnecter"));

        if (token.isRevoked() || token.getExpiresAt().isBefore(OffsetDateTime.now())) {
            throw new UnauthorizedException("Session expiree, veuillez vous reconnecter");
        }

        Utilisateur utilisateur = token.getUtilisateur();
        token.setRevoked(true); // rotation du refresh token
        refreshTokenRepository.save(token);

        issueTokens(utilisateur, response);
        return toAuthResponse(utilisateur);
    }

    public void logout(Long utilisateurId, HttpServletResponse response) {
        if (utilisateurId != null) {
            refreshTokenRepository.revokeAllForUser(utilisateurId);
        }
        jwtService.clearAuthCookies(response);
    }

    public Utilisateur getById(Long id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));
    }

    @Transactional
    public AuthResponse updateProfile(Long userId, UpdateProfileRequest req) {
        Utilisateur u = getById(userId);
        u.setPrenom(req.prenom().trim());
        u.setNom(req.nom().trim());
        return toAuthResponse(utilisateurRepository.save(u));
    }

    @Transactional
    public void changePassword(Long userId, ChangePasswordRequest req) {
        Utilisateur u = getById(userId);
        if (u.getProvider() != AuthProvider.LOCAL || u.getMotDePasse() == null) {
            throw new BadRequestException("Ce compte ne possede pas de mot de passe local");
        }
        if (!passwordEncoder.matches(req.ancienMotDePasse(), u.getMotDePasse())) {
            throw new UnauthorizedException("Ancien mot de passe incorrect");
        }
        u.setMotDePasse(passwordEncoder.encode(req.nouveauMotDePasse()));
        utilisateurRepository.save(u);
        refreshTokenRepository.revokeAllForUser(userId); // deconnecte les autres sessions par securite
    }

    /* ------------------------------------------------------------------ */

    private void issueTokens(Utilisateur utilisateur, HttpServletResponse response) {
        String accessToken = jwtService.generateAccessToken(utilisateur.getId(), utilisateur.getEmail());
        String refreshToken = jwtService.generateOpaqueRefreshToken();

        com.buyflow.entity.RefreshToken entity = com.buyflow.entity.RefreshToken.builder()
                .utilisateur(utilisateur)
                .tokenHash(jwtService.hashToken(refreshToken))
                .expiresAt(OffsetDateTime.now().plusNanos(jwtService.getRefreshTokenExpirationMs() * 1_000_000))
                .build();
        refreshTokenRepository.save(entity);

        jwtService.addAccessTokenCookie(response, accessToken);
        jwtService.addRefreshTokenCookie(response, refreshToken);
    }

    private void creerTirelirePourUtilisateur(Utilisateur utilisateur) {
        Tirelire tirelire = Tirelire.builder().utilisateur(utilisateur).build();
        tirelireRepository.save(tirelire);
    }

    private Utilisateur linkProviderIfLocalMissing(Utilisateur existing, AuthProvider provider, String providerId) {
        // Un compte local peut "s'enrichir" d'une connexion sociale sur le meme email deja verifie.
        if (existing.getProvider() == AuthProvider.LOCAL) {
            existing.setProvider(provider);
            existing.setProviderId(providerId);
            return utilisateurRepository.save(existing);
        }
        return existing;
    }

    private String orDefault(String value, String def) {
        return (value == null || value.isBlank()) ? def : value;
    }

    private AuthResponse toAuthResponse(Utilisateur u) {
        return new AuthResponse(u.getId(), u.getPrenom(), u.getNom(), u.getEmail(),
                u.getProvider().name(), u.getPhotoUrl(), u.getRole().name());
    }
}
