package com.buyflow.controller;

import com.buyflow.dto.objectif.ContributionRequest;
import com.buyflow.dto.objectif.ObjectifRequest;
import com.buyflow.dto.objectif.ObjectifResponse;
import com.buyflow.security.CurrentUser;
import com.buyflow.service.ObjectifEpargneService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/objectifs")
@RequiredArgsConstructor
public class ObjectifEpargneController {

    private final ObjectifEpargneService objectifService;

    @GetMapping
    public List<ObjectifResponse> lister(@CurrentUser Long userId) {
        return objectifService.lister(userId);
    }

    @GetMapping("/{id}")
    public ObjectifResponse obtenir(@PathVariable Long id, @CurrentUser Long userId) {
        return objectifService.obtenir(id, userId);
    }

    @PostMapping
    public ResponseEntity<ObjectifResponse> creer(@Valid @RequestBody ObjectifRequest req, @CurrentUser Long userId) {
        return ResponseEntity.ok(objectifService.creer(req, userId));
    }

    @PutMapping("/{id}")
    public ObjectifResponse modifier(@PathVariable Long id, @Valid @RequestBody ObjectifRequest req, @CurrentUser Long userId) {
        return objectifService.modifier(id, req, userId);
    }

    @PostMapping("/{id}/contribution")
    public ObjectifResponse contribuer(@PathVariable Long id, @Valid @RequestBody ContributionRequest req,
                                        @CurrentUser Long userId) {
        return objectifService.ajouterContribution(id, req, userId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimer(@PathVariable Long id, @CurrentUser Long userId) {
        objectifService.supprimer(id, userId);
        return ResponseEntity.noContent().build();
    }
}
