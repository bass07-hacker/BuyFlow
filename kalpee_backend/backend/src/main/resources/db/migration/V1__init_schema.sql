-- ============================================================
-- BuyFlow / Kalpee - schema initial (MySQL 8.0+)
-- ============================================================

CREATE TABLE utilisateurs (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    prenom          VARCHAR(100) NOT NULL,
    nom             VARCHAR(100) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    mot_de_passe    VARCHAR(255),
    provider        VARCHAR(20)  NOT NULL DEFAULT 'LOCAL',
    provider_id     VARCHAR(255),
    photo_url       VARCHAR(500),
    actif           TINYINT(1) NOT NULL DEFAULT 1,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_utilisateur_email UNIQUE (email),
    CONSTRAINT uq_utilisateur_provider UNIQUE (provider, provider_id),
    CONSTRAINT chk_provider CHECK (provider IN ('LOCAL','GOOGLE','APPLE')),
    CONSTRAINT chk_password_or_oauth CHECK (
        (provider = 'LOCAL' AND mot_de_passe IS NOT NULL)
        OR (provider <> 'LOCAL')
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE tirelires (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id  BIGINT NOT NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_tirelire_utilisateur UNIQUE (utilisateur_id),
    CONSTRAINT fk_tirelire_utilisateur FOREIGN KEY (utilisateur_id)
        REFERENCES utilisateurs (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE transactions (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    tirelire_id     BIGINT NOT NULL,
    type            VARCHAR(10) NOT NULL,
    montant         DECIMAL(14,2) NOT NULL,
    motif           VARCHAR(255) NOT NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_transaction_tirelire FOREIGN KEY (tirelire_id)
        REFERENCES tirelires (id) ON DELETE CASCADE,
    CONSTRAINT chk_transaction_type CHECK (type IN ('DEPOT','RETRAIT')),
    CONSTRAINT chk_transaction_montant CHECK (montant > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE INDEX idx_transactions_tirelire ON transactions (tirelire_id, created_at DESC);

CREATE TABLE achats (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id  BIGINT NOT NULL,
    nom             VARCHAR(150) NOT NULL,
    description     VARCHAR(1000),
    priorite        VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
    date_limite     DATE,
    categorie       VARCHAR(30) NOT NULL DEFAULT 'autre',
    statut          VARCHAR(20) NOT NULL DEFAULT 'EN_COURS',
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_achat_utilisateur FOREIGN KEY (utilisateur_id)
        REFERENCES utilisateurs (id) ON DELETE CASCADE,
    CONSTRAINT chk_achat_priorite CHECK (priorite IN ('URGENT','IMPORTANT','NORMAL','FAIBLE')),
    CONSTRAINT chk_achat_statut CHECK (statut IN ('EN_COURS','TERMINE','ANNULE')),
    CONSTRAINT chk_achat_categorie CHECK (categorie IN
        ('vetements','informatique','telephone','maison','accessoires','loisirs','autre'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE INDEX idx_achats_utilisateur ON achats (utilisateur_id);
CREATE INDEX idx_achats_priorite ON achats (utilisateur_id, priorite);

CREATE TABLE articles (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    achat_id        BIGINT NOT NULL,
    nom             VARCHAR(150) NOT NULL,
    description     VARCHAR(1000),
    photo_url       VARCHAR(500),
    quantite        INT NOT NULL,
    prix_unitaire   DECIMAL(14,2) NOT NULL,
    source          VARCHAR(150),
    statut          VARCHAR(20) NOT NULL DEFAULT 'A_ACHETER',
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_article_achat FOREIGN KEY (achat_id)
        REFERENCES achats (id) ON DELETE CASCADE,
    CONSTRAINT chk_article_quantite CHECK (quantite > 0),
    CONSTRAINT chk_article_prix CHECK (prix_unitaire >= 0),
    CONSTRAINT chk_article_statut CHECK (statut IN ('A_ACHETER','MIS_DE_COTE','ACHETE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE INDEX idx_articles_achat ON articles (achat_id);

CREATE TABLE objectifs_epargne (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id      BIGINT NOT NULL,
    nom                 VARCHAR(150) NOT NULL,
    description         VARCHAR(1000),
    montant_cible       DECIMAL(14,2) NOT NULL,
    montant_epargne     DECIMAL(14,2) NOT NULL DEFAULT 0,
    date_cible          DATE,
    categorie           VARCHAR(30) NOT NULL DEFAULT 'autre',
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_objectif_utilisateur FOREIGN KEY (utilisateur_id)
        REFERENCES utilisateurs (id) ON DELETE CASCADE,
    CONSTRAINT chk_objectif_montant_cible CHECK (montant_cible >= 0),
    CONSTRAINT chk_objectif_montant_epargne CHECK (montant_epargne >= 0),
    CONSTRAINT chk_objectif_categorie CHECK (categorie IN
        ('vetements','informatique','telephone','maison','accessoires','loisirs','autre'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE INDEX idx_objectifs_utilisateur ON objectifs_epargne (utilisateur_id);

CREATE TABLE refresh_tokens (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id  BIGINT NOT NULL,
    token_hash      VARCHAR(255) NOT NULL,
    expires_at      DATETIME NOT NULL,
    revoked         TINYINT(1) NOT NULL DEFAULT 0,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_refresh_utilisateur FOREIGN KEY (utilisateur_id)
        REFERENCES utilisateurs (id) ON DELETE CASCADE,
    CONSTRAINT uq_refresh_token_hash UNIQUE (token_hash)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE INDEX idx_refresh_tokens_utilisateur ON refresh_tokens (utilisateur_id);
