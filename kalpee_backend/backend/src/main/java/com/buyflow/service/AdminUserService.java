package com.buyflow.service;

import com.buyflow.dto.admin.AdminUserCreateRequest;
import com.buyflow.dto.admin.AdminUserResponse;
import com.buyflow.dto.admin.AdminUserUpdateRequest;
import com.buyflow.entity.AuthProvider;
import com.buyflow.entity.Role;
import com.buyflow.entity.Tirelire;
import com.buyflow.entity.Utilisateur;
import com.buyflow.exception.BadRequestException;
import com.buyflow.exception.ConflictException;
import com.buyflow.exception.ResourceNotFoundException;
import com.buyflow.repository.AchatRepository;
import com.buyflow.repository.TirelireRepository;
import com.buyflow.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminUserService {

    private final UtilisateurRepository utilisateurRepository;
    private final TirelireRepository tirelireRepository;
    private final AchatRepository achatRepository;
    private final PasswordEncoder passwordEncoder;

    public List<AdminUserResponse> lister() {
        return utilisateurRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public AdminUserResponse creer(AdminUserCreateRequest req) {
        if (utilisateurRepository.existsByEmailIgnoreCase(req.email())) {
            throw new ConflictException("Un compte existe deja avec cet email");
        }
        Utilisateur utilisateur = Utilisateur.builder()
                .prenom(req.prenom().trim())
                .nom(req.nom().trim())
                .email(req.email().trim().toLowerCase())
                .motDePasse(passwordEncoder.encode(req.motDePasse()))
                .provider(AuthProvider.LOCAL)
                .role(req.admin() ? Role.ADMIN : Role.USER)
                .build();
        utilisateur = utilisateurRepository.save(utilisateur);

        Tirelire tirelire = Tirelire.builder().utilisateur(utilisateur).build();
        tirelireRepository.save(tirelire);

        return toResponse(utilisateur);
    }

    @Transactional
    public AdminUserResponse modifier(Long id, AdminUserUpdateRequest req) {
        Utilisateur u = getById(id);
        if (!u.getEmail().equalsIgnoreCase(req.email())
                && utilisateurRepository.existsByEmailIgnoreCase(req.email())) {
            throw new ConflictException("Un autre compte utilise deja cet email");
        }
        u.setPrenom(req.prenom().trim());
        u.setNom(req.nom().trim());
        u.setEmail(req.email().trim().toLowerCase());
        u.setActif(req.actif());
        return toResponse(utilisateurRepository.save(u));
    }

    @Transactional
    public void supprimer(Long id, Long adminId) {
        if (id.equals(adminId)) {
            throw new BadRequestException("Tu ne peux pas supprimer ton propre compte administrateur");
        }
        Utilisateur u = getById(id);
        if (u.getRole() == Role.ADMIN) {
            throw new BadRequestException("Impossible de supprimer un compte administrateur");
        }
        utilisateurRepository.delete(u);
    }

    private Utilisateur getById(Long id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable"));
    }

    private AdminUserResponse toResponse(Utilisateur u) {
        long nombreAchats = achatRepository.countByUtilisateurId(u.getId());
        return new AdminUserResponse(
                u.getId(), u.getPrenom(), u.getNom(), u.getEmail(),
                u.getProvider().name(), u.getRole().name(), u.isActif(),
                nombreAchats, u.getCreatedAt()
        );
    }
}
