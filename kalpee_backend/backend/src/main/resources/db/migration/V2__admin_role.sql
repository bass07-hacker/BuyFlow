-- ============================================================
-- BuyFlow / Kalpee - ajout du role administrateur (MySQL 8.0+)
-- ============================================================

ALTER TABLE utilisateurs
    ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'USER' AFTER actif;

ALTER TABLE utilisateurs
    ADD CONSTRAINT chk_utilisateur_role CHECK (role IN ('USER','ADMIN'));

-- Compte administrateur unique, cree directement en base (pas d'inscription publique admin).
-- Email    : admin@kalpee.app
-- Mot de passe : AdminKalpee2026!
-- => A CHANGER immediatement apres la premiere connexion (Parametres > mot de passe),
--    ou en editant directement cette ligne avant le premier deploiement en production.
INSERT INTO utilisateurs (prenom, nom, email, mot_de_passe, provider, actif, role)
VALUES (
    'Admin',
    'Kalpee',
    'admin@kalpee.app',
    '$2b$12$bflsTw/9ZOtLCfPG6WRSO.LQkF5iIR716iVJMhz8XFSHXc4yEOYJq',
    'LOCAL',
    1,
    'ADMIN'
);

-- Tirelire associee (chaque utilisateur, y compris l'admin, en possede une par coherence de modele).
INSERT INTO tirelires (utilisateur_id)
SELECT id FROM utilisateurs WHERE email = 'admin@kalpee.app';
