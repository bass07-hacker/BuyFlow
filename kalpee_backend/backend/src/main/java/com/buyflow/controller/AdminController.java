package com.buyflow.controller;

import com.buyflow.dto.admin.AdminStatsResponse;
import com.buyflow.dto.admin.AdminUserCreateRequest;
import com.buyflow.dto.admin.AdminUserResponse;
import com.buyflow.dto.admin.AdminUserUpdateRequest;
import com.buyflow.security.CurrentUser;
import com.buyflow.service.AdminStatsService;
import com.buyflow.service.AdminUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Reserve a l'administrateur unique (role ADMIN en base).
 * Acces verrouille au niveau de SecurityConfig : /api/admin/** exige ROLE_ADMIN.
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminUserService adminUserService;
    private final AdminStatsService adminStatsService;

    @GetMapping("/users")
    public List<AdminUserResponse> listerUtilisateurs() {
        return adminUserService.lister();
    }

    @PostMapping("/users")
    public ResponseEntity<AdminUserResponse> creerUtilisateur(@Valid @RequestBody AdminUserCreateRequest req) {
        return ResponseEntity.ok(adminUserService.creer(req));
    }

    @PutMapping("/users/{id}")
    public AdminUserResponse modifierUtilisateur(@PathVariable Long id,
                                                   @Valid @RequestBody AdminUserUpdateRequest req) {
        return adminUserService.modifier(id, req);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> supprimerUtilisateur(@PathVariable Long id, @CurrentUser Long adminId) {
        adminUserService.supprimer(id, adminId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public AdminStatsResponse statistiques() {
        return adminStatsService.obtenir();
    }
}
