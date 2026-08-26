package com.buyflow.controller;

import com.buyflow.dto.tirelire.TirelireResponse;
import com.buyflow.dto.tirelire.TransactionRequest;
import com.buyflow.dto.tirelire.TransactionResponse;
import com.buyflow.security.CurrentUser;
import com.buyflow.service.TirelireService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tirelire")
@RequiredArgsConstructor
public class TirelireController {

    private final TirelireService tirelireService;

    @GetMapping
    public TirelireResponse obtenir(@CurrentUser Long userId) {
        return tirelireService.obtenir(userId);
    }

    @GetMapping("/transactions")
    public List<TransactionResponse> historique(@CurrentUser Long userId) {
        return tirelireService.historique(userId);
    }

    @PostMapping("/depot")
    public TirelireResponse deposer(@Valid @RequestBody TransactionRequest req, @CurrentUser Long userId) {
        return tirelireService.deposer(req, userId);
    }

    @PostMapping("/retrait")
    public TirelireResponse retirer(@Valid @RequestBody TransactionRequest req, @CurrentUser Long userId) {
        return tirelireService.retirer(req, userId);
    }
}
