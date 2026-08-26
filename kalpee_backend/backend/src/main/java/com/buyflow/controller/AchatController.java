package com.buyflow.controller;

import com.buyflow.dto.achat.AchatRequest;
import com.buyflow.dto.achat.AchatResponse;
import com.buyflow.security.CurrentUser;
import com.buyflow.service.AchatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achats")
@RequiredArgsConstructor
public class AchatController {

    private final AchatService achatService;

    @GetMapping
    public List<AchatResponse> lister(@CurrentUser Long userId) {
        return achatService.lister(userId);
    }

    @GetMapping("/{id}")
    public AchatResponse obtenir(@PathVariable Long id, @CurrentUser Long userId) {
        return achatService.obtenir(id, userId);
    }

    @PostMapping
    public ResponseEntity<AchatResponse> creer(@Valid @RequestBody AchatRequest req, @CurrentUser Long userId) {
        return ResponseEntity.ok(achatService.creer(req, userId));
    }

    @PutMapping("/{id}")
    public AchatResponse modifier(@PathVariable Long id, @Valid @RequestBody AchatRequest req, @CurrentUser Long userId) {
        return achatService.modifier(id, req, userId);
    }

    @PostMapping("/{id}/cloturer")
    public AchatResponse cloturer(@PathVariable Long id, @CurrentUser Long userId) {
        return achatService.cloturer(id, userId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimer(@PathVariable Long id, @CurrentUser Long userId) {
        achatService.supprimer(id, userId);
        return ResponseEntity.noContent().build();
    }
}
