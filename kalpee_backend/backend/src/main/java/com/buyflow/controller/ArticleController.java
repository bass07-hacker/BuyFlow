package com.buyflow.controller;

import com.buyflow.dto.article.ArticleRequest;
import com.buyflow.dto.article.ArticleResponse;
import com.buyflow.dto.article.ArticleStatutRequest;
import com.buyflow.security.CurrentUser;
import com.buyflow.service.ArticleService;
import com.buyflow.service.FileStorageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final FileStorageService fileStorageService;

    @GetMapping("/api/achats/{achatId}/articles")
    public List<ArticleResponse> lister(@PathVariable Long achatId, @CurrentUser Long userId) {
        return articleService.lister(achatId, userId);
    }

    @PostMapping("/api/achats/{achatId}/articles")
    public ResponseEntity<ArticleResponse> ajouter(@PathVariable Long achatId,
                                                     @Valid @RequestBody ArticleRequest req,
                                                     @CurrentUser Long userId) {
        return ResponseEntity.ok(articleService.ajouter(achatId, req, userId));
    }

    @PutMapping("/api/articles/{id}")
    public ArticleResponse modifier(@PathVariable Long id, @Valid @RequestBody ArticleRequest req, @CurrentUser Long userId) {
        return articleService.modifier(id, req, userId);
    }

    @PatchMapping("/api/articles/{id}/statut")
    public ArticleResponse changerStatut(@PathVariable Long id, @Valid @RequestBody ArticleStatutRequest req,
                                          @CurrentUser Long userId) {
        return articleService.changerStatut(id, req, userId);
    }

    @DeleteMapping("/api/articles/{id}")
    public ResponseEntity<Void> supprimer(@PathVariable Long id, @CurrentUser Long userId) {
        articleService.supprimer(id, userId);
        return ResponseEntity.noContent().build();
    }

    /** Upload de la photo d'un article ; renvoie l'URL a inclure ensuite dans ArticleRequest.photoUrl */
    @PostMapping("/api/uploads/photo")
    public Map<String, String> uploadPhoto(@RequestParam("file") MultipartFile file, @CurrentUser Long userId) {
        String url = fileStorageService.store(file);
        return Map.of("url", url);
    }
}
