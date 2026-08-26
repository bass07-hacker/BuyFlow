package com.buyflow.service;

import com.buyflow.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.UUID;

/**
 * Stockage local securise des photos d'articles.
 * - type MIME et taille verifies
 * - nom de fichier genere aleatoirement (jamais le nom original, evite path traversal / collisions)
 * - fichiers servis en lecture seule via /uploads/**
 */
@Service
public class FileStorageService {

    private final Path uploadsDir;
    private final long maxSizeBytes;
    private final List<String> allowedContentTypes;

    public FileStorageService(
            @Value("${app.uploads.dir}") String uploadsDir,
            @Value("${app.uploads.max-size-bytes}") long maxSizeBytes,
            @Value("${app.uploads.allowed-content-types}") String allowedContentTypesCsv
    ) {
        this.uploadsDir = Path.of(uploadsDir).toAbsolutePath().normalize();
        this.maxSizeBytes = maxSizeBytes;
        this.allowedContentTypes = List.of(allowedContentTypesCsv.split(","));
        try {
            Files.createDirectories(this.uploadsDir);
        } catch (IOException e) {
            throw new IllegalStateException("Impossible de creer le dossier d'uploads", e);
        }
    }

    public String store(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Aucun fichier fourni");
        }
        if (file.getSize() > maxSizeBytes) {
            throw new BadRequestException("Le fichier depasse la taille maximale autorisee (5 Mo)");
        }
        String contentType = file.getContentType();
        if (contentType == null || allowedContentTypes.stream().noneMatch(contentType::equalsIgnoreCase)) {
            throw new BadRequestException("Format d'image non autorise (png, jpeg, webp uniquement)");
        }

        String extension = switch (contentType) {
            case "image/png" -> ".png";
            case "image/jpeg" -> ".jpg";
            case "image/webp" -> ".webp";
            default -> "";
        };
        String filename = UUID.randomUUID() + extension;
        Path target = uploadsDir.resolve(filename).normalize();

        if (!target.getParent().equals(uploadsDir)) {
            throw new BadRequestException("Nom de fichier invalide");
        }
        try {
            Files.copy(file.getInputStream(), target);
        } catch (IOException e) {
            throw new IllegalStateException("Erreur lors de l'enregistrement du fichier", e);
        }
        return "/uploads/" + filename;
    }
}
