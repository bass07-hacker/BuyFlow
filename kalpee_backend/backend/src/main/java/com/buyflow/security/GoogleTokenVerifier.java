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
import java.util.Set;

/**
 * Verifie le ID Token JWT renvoye par Google Identity Services (GIS) cote frontend.
 * Verification de la signature via les cles publiques JWK de Google, de l'issuer,
 * de l'audience (client-id) et de l'expiration.
 */
@Component
public class GoogleTokenVerifier {

    private static final String JWK_URL = "https://www.googleapis.com/oauth2/v3/certs";
    private static final Set<String> VALID_ISSUERS = Set.of("accounts.google.com", "https://accounts.google.com");

    private final String expectedClientId;
    private final DefaultJWTProcessor<SecurityContext> processor;

    public GoogleTokenVerifier(@Value("${app.oauth.google.client-id}") String expectedClientId) throws Exception {
        this.expectedClientId = expectedClientId;
        this.processor = new DefaultJWTProcessor<>();
        JWKSource<SecurityContext> jwkSource = new RemoteJWKSet<>(new URL(JWK_URL));
        JWSKeySelector<SecurityContext> keySelector =
                new JWSVerificationKeySelector<>(JWSAlgorithm.RS256, jwkSource);
        this.processor.setJWSKeySelector(keySelector);
    }

    public record GoogleUser(String sub, String email, boolean emailVerified, String givenName,
                              String familyName, String picture) {}

    public GoogleUser verify(String idToken) {
        if (expectedClientId == null || expectedClientId.isBlank()) {
            throw new UnauthorizedException("Connexion Google non configuree sur le serveur");
        }
        try {
            SignedJWT signedJWT = SignedJWT.parse(idToken);
            JWTClaimsSet claims = processor.process(signedJWT, null);

            if (!VALID_ISSUERS.contains(claims.getIssuer())) {
                throw new UnauthorizedException("Jeton Google invalide (issuer)");
            }
            if (!claims.getAudience().contains(expectedClientId)) {
                throw new UnauthorizedException("Jeton Google invalide (audience)");
            }
            if (claims.getExpirationTime() == null || claims.getExpirationTime().before(new Date())) {
                throw new UnauthorizedException("Jeton Google expire");
            }

            boolean emailVerified = Boolean.TRUE.equals(claims.getBooleanClaim("email_verified"));
            return new GoogleUser(
                    claims.getSubject(),
                    claims.getStringClaim("email"),
                    emailVerified,
                    claims.getStringClaim("given_name"),
                    claims.getStringClaim("family_name"),
                    claims.getStringClaim("picture")
            );
        } catch (UnauthorizedException e) {
            throw e;
        } catch (Exception e) {
            throw new UnauthorizedException("Jeton Google invalide : " + e.getMessage());
        }
    }
}
