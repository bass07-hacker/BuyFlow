package com.buyflow.dto.article;

import com.buyflow.entity.ArticleStatut;
import jakarta.validation.constraints.NotNull;

public record ArticleStatutRequest(@NotNull ArticleStatut statut) {}
