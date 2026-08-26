package com.buyflow.controller;

import com.buyflow.dto.auth.*;
import com.buyflow.security.CurrentUser;
import com.buyflow.security.JwtService;
import com.buyflow.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req, HttpServletResponse response) {
        return ResponseEntity.ok(authService.register(req, response));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req, HttpServletResponse response) {
        return ResponseEntity.ok(authService.login(req, response));
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> google(@Valid @RequestBody GoogleLoginRequest req, HttpServletResponse response) {
        return ResponseEntity.ok(authService.loginWithGoogle(req, response));
    }

    @PostMapping("/apple")
    public ResponseEntity<AuthResponse> apple(@Valid @RequestBody AppleLoginRequest req, HttpServletResponse response) {
        return ResponseEntity.ok(authService.loginWithApple(req, response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(HttpServletRequest request, HttpServletResponse response) {
        String rawRefreshToken = jwtService.readCookie(request, jwtService.getRefreshCookieName()).orElse(null);
        return ResponseEntity.ok(authService.refresh(rawRefreshToken, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@CurrentUser Long userId, HttpServletResponse response) {
        authService.logout(userId, response);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> me(@CurrentUser Long userId) {
        var u = authService.getById(userId);
        return ResponseEntity.ok(new AuthResponse(u.getId(), u.getPrenom(), u.getNom(), u.getEmail(),
                u.getProvider().name(), u.getPhotoUrl(), u.getRole().name()));
    }

    @PutMapping("/me")
    public ResponseEntity<AuthResponse> updateProfile(@CurrentUser Long userId, @Valid @RequestBody UpdateProfileRequest req) {
        return ResponseEntity.ok(authService.updateProfile(userId, req));
    }

    @PostMapping("/me/password")
    public ResponseEntity<Void> changePassword(@CurrentUser Long userId, @Valid @RequestBody ChangePasswordRequest req) {
        authService.changePassword(userId, req);
        return ResponseEntity.noContent().build();
    }
}
