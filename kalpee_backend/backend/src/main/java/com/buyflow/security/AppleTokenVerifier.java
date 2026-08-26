package com.buyflow.security;

import com.buyflow.exception.UnauthorizedException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URL;
import java.util.Date;
import java.util.List;

/**
 * Verifie l'identityToken JWT renvoye par "Sign in with Apple" cote frontend (Apple JS).
 * Verification de la signature via les cles publiques JWK d'Apple, de l'issuer et de l'audience.
 */
@Component
public class AppleTokenVerifier {

    private static final String JWK_URL = "https://appleid.apple.com/auth/keys";
    private static final String ISSUER = "https://appleid.apple.com";

    private final String expectedClientId;   // Services ID, ex: com.buyflow.web
    private final List<String> allowedBundleIds;
    private final DefaultJWTProcessor<SecurityContext> processor;

    public AppleTokenVerifier(
            @Value("${app.oauth.apple.client-id}") String expectedClientId,
            @Value("${app.oauth.apple.bundle-ids:}") String bundleIdsCsv
    ) throws Exception {
        this.expectedClientId = expectedClientId;
        this.allowedBundleIds = bundleIdsCsv == null || bundleIdsCsv.isBlank()
                ? List.of() : List.of(bundleIdsCsv.split(","));
        this.processor = new DefaultJWTProcessor<>();
        JWKSource<SecurityContext> jwkSource = new RemoteJWKSet<>(new URL(JWK_URL));
        JWSKeySelector<SecurityContext> keySelector =
                new JWSVerificationKeySelector<>(JWSAlgorithm.RS256, jwkSource);
        this.processor.setJWSKeySelector(keySelector);
    }

    public record AppleUser(String sub, String email, boolean emailVerified) {}

    public AppleUser verify(String identityToken) {
        if (expectedClientId == null || expectedClientId.isBlank()) {
            throw new UnauthorizedException("Connexion Apple non configuree sur le serveur");
        }
        try {
            SignedJWT signedJWT = SignedJWT.parse(identityToken);
            JWTClaimsSet claims = processor.process(signedJWT, null);

            if (!ISSUER.equals(claims.getIssuer())) {
                throw new UnauthorizedException("Jeton Apple invalide (issuer)");
            }
            boolean audienceOk = claims.getAudience().contains(expectedClientId)
                    || claims.getAudience().stream().anyMatch(allowedBundleIds::contains);
            if (!audienceOk) {
                throw new UnauthorizedException("Jeton Apple invalide (audience)");
            }
            if (claims.getExpirationTime() == null || claims.getExpirationTime().before(new Date())) {
                throw new UnauthorizedException("Jeton Apple expire");
            }

            Object emailVerifiedClaim = claims.getClaim("email_verified");
            boolean emailVerified = emailVerifiedClaim != null
                    && ("true".equalsIgnoreCase(String.valueOf(emailVerifiedClaim)));

            return new AppleUser(claims.getSubject(), claims.getStringClaim("email"), emailVerified);
        } catch (UnauthorizedException e) {
            throw e;
        } catch (Exception e) {
            throw new UnauthorizedException("Jeton Apple invalide : " + e.getMessage());
        }
    }
}
