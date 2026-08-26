package com.buyflow.security;

import com.buyflow.entity.Role;
import com.buyflow.entity.Utilisateur;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
public class UserPrincipal implements UserDetails {

    private final Long id;
    private final String email;
    private final String motDePasse;
    private final boolean actif;
    private final Role role;

    public UserPrincipal(Utilisateur u) {
        this.id = u.getId();
        this.email = u.getEmail();
        this.motDePasse = u.getMotDePasse();
        this.actif = u.isActif();
        this.role = u.getRole();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Un ADMIN possede aussi les droits USER (acces a ses propres achats/tirelire s'il en a).
        if (role == Role.ADMIN) {
            return List.of(new SimpleGrantedAuthority("ROLE_USER"), new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() { return motDePasse; }

    @Override
    public String getUsername() { return email; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return actif; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return actif; }
}
