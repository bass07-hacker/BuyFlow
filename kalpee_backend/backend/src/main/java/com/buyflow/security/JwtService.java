package com.buyflow.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

/**
 * Emission et validation des JWT d'acces, et gestion des cookies httpOnly + Secure
 * qui les transportent (protection contre le vol de token via XSS).
 */
@Service
public class JwtService {

    private final SecretKey key;
    private final long accessTokenExpirationMs;
    private final long refreshTokenExpirationMs;
    private final String cookieName;
    private final String refreshCookieName;
    private final boolean cookieSecure;
    private final String cookieDomain;

    public JwtService(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.access-token-expiration-ms}") long accessTokenExpirationMs,
            @Value("${app.jwt.refresh-token-expiration-ms}") long refreshTokenExpirationMs,
            @Value("${app.jwt.cookie-name}") String cookieName,
            @Value("${app.jwt.refresh-cookie-name}") String refreshCookieName,
            @Value("${app.jwt.cookie-secure}") boolean cookieSecure,
            @Value("${app.jwt.cookie-domain}") String cookieDomain
    ) {
        // Le secret doit faire au moins 256 bits ; on le derive au besoin avec SHA-256.
        this.key = deriveKey(secret);
        this.accessTokenExpirationMs = accessTokenExpirationMs;
        this.refreshTokenExpirationMs = refreshTokenExpirationMs;
        this.cookieName = cookieName;
        this.refreshCookieName = refreshCookieName;
        this.cookieSecure = cookieSecure;
        this.cookieDomain = cookieDomain;
    }

    private SecretKey deriveKey(String secret) {
        try {
            MessageDigest sha256 = MessageDigest.getInstance("SHA-256");
            byte[] hashed = sha256.digest(secret.getBytes(StandardCharsets.UTF_8));
            return Keys.hmacShaKeyFor(hashed);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }

    public String generateAccessToken(Long userId, String email) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("email", email)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusMillis(accessTokenExpirationMs)))
                .signWith(key)
                .compact();
    }

    /** Jeton opaque aleatoire (pas un JWT) : seul son hash SHA-256 est stocke en base. */
    public String generateOpaqueRefreshToken() {
        byte[] randomBytes = new byte[64];
        new java.security.SecureRandom().nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

    public String hashToken(String token) {
        try {
            MessageDigest sha256 = MessageDigest.getInstance("SHA-256");
            byte[] hashed = sha256.digest(token.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hashed);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }

    public Optional<Long> extractUserId(String token) {
        try {
            Claims claims = Jwts.parser().verifyWith(key).build()
                    .parseSignedClaims(token).getPayload();
            return Optional.of(Long.parseLong(claims.getSubject()));
        } catch (JwtException | IllegalArgumentException e) {
            return Optional.empty();
        }
    }

    public long getRefreshTokenExpirationMs() {
        return refreshTokenExpirationMs;
    }

    public void addAccessTokenCookie(HttpServletResponse response, String token) {
        addCookie(response, cookieName, token, (int) (accessTokenExpirationMs / 1000));
    }

    public void addRefreshTokenCookie(HttpServletResponse response, String token) {
        addCookie(response, refreshCookieName, token, (int) (refreshTokenExpirationMs / 1000));
    }

    public void clearAuthCookies(HttpServletResponse response) {
        addCookie(response, cookieName, "", 0);
        addCookie(response, refreshCookieName, "", 0);
    }

    private void addCookie(HttpServletResponse response, String name, String value, int maxAgeSeconds) {
        StringBuilder sb = new StringBuilder();
        sb.append(name).append('=').append(value)
                .append("; Path=/")
                .append("; HttpOnly")
                .append("; Max-Age=").append(maxAgeSeconds)
                .append("; SameSite=Lax");
        if (cookieSecure) sb.append("; Secure");
        if (cookieDomain != null && !cookieDomain.isBlank()) sb.append("; Domain=").append(cookieDomain);
        response.addHeader("Set-Cookie", sb.toString());
    }

    public Optional<String> readCookie(HttpServletRequest request, String name) {
        if (request.getCookies() == null) return Optional.empty();
        for (Cookie c : request.getCookies()) {
            if (c.getName().equals(name)) return Optional.of(c.getValue());
        }
        return Optional.empty();
    }

    public String getCookieName() { return cookieName; }
    public String getRefreshCookieName() { return refreshCookieName; }
}
