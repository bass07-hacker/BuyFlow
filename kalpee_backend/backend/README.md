# BuyFlow / Kalpee — Backend (Spring Boot)

API REST securisee pour l'application BuyFlow (planification des achats + tirelire + objectifs d'epargne),
conforme au cahier des charges (F01–F18, RB01–RB12).

## Stack

- Java 21, Spring Boot 3.3
- Spring Security (JWT en cookie httpOnly + Bearer token pour mobile)
- Spring Data JPA + PostgreSQL
- Flyway (migrations versionnees, `ddl-auto: validate` — le schema n'est **jamais** genere automatiquement)
- Connexion sociale : Google Identity Services + Sign in with Apple (verification JWK cote serveur)

## Demarrage rapide

```bash
# 1. Base de donnees
docker compose up -d

# 2. Variables d'environnement
cp .env.example .env
# -> editer .env : JWT_SECRET, GOOGLE_CLIENT_ID, APPLE_CLIENT_ID, FRONTEND_URL...

# 3. Lancer l'API (charge .env automatiquement si vous utilisez direnv, sinon exportez les variables)
export $(grep -v '^#' .env | xargs)
./mvnw spring-boot:run
```

L'API demarre sur `http://localhost:8080`. Flyway cree automatiquement le schema au premier lancement.

## Securite mise en place

- **Mots de passe** : hash BCrypt (facteur 12), jamais stockes en clair.
- **JWT** : token d'acces (15 min) transporte dans un cookie `HttpOnly`, `SameSite=Lax`, `Secure` en prod —
  donc invisible et inexploitable en JavaScript (protection XSS). Un refresh token opaque (7 jours) est stocke
  cote serveur sous forme de **hash SHA-256** uniquement (jamais en clair), avec rotation a chaque refresh.
- **CORS** verrouille sur `FRONTEND_URL` uniquement, credentials autorises.
- **Autorisation par ressource** : chaque requete (achat, article, tirelire, objectif) est filtree par
  `utilisateur_id` cote base de donnees — un utilisateur ne peut jamais lire/modifier les donnees d'un autre (RB01).
- **Validation** stricte des DTO (Bean Validation) + contraintes `CHECK` redondantes au niveau SQL
  (RB04, RB05, RB06, RB10) pour empecher toute donnee invalide meme en cas de bug applicatif.
- **Retraits** : le solde est recalcule et verifie dans la meme transaction que l'insertion (RB12).
- **Upload de photos** : type MIME + taille verifies, nom de fichier regenere aleatoirement (pas de path traversal),
  fichiers servis en lecture seule sans execution possible.
- **En-tetes de securite** : CSP `default-src 'self'`, `X-Frame-Options: DENY`.
- Recommandations pour la production (non incluses ici faute de temps, a ajouter avant mise en ligne) :
  rate-limiting sur `/api/auth/*` (ex. Bucket4j), verrou pessimiste (`SELECT ... FOR UPDATE`) sur la tirelire
  si vous prevoyez une forte concurrence de retraits simultanes, et audit logging.

## Connexion Google

1. Console Google Cloud → *APIs & Services → Credentials* → creer un **OAuth Client ID** de type **Web application**.
2. Ajoutez l'origine JavaScript autorisee : `http://localhost:3000` (et votre domaine de prod).
3. Copiez le `Client ID` dans `GOOGLE_CLIENT_ID` (backend) **et** cote frontend (meme valeur, publique).
4. Le frontend affiche le bouton Google (Google Identity Services), recupere un `idToken`, et l'envoie a
   `POST /api/auth/google { idToken }`. Le backend verifie la signature via les cles publiques Google (JWKS),
   l'issuer et l'audience avant de creer/connecter le compte.

## Connexion Apple

1. Apple Developer → *Certificates, Identifiers & Profiles* → creer un **Services ID** (ex. `com.buyflow.web`).
2. Configurer *Sign in with Apple* sur ce Services ID avec vos domaines et URL de redirection.
3. Copiez le Services ID dans `APPLE_CLIENT_ID`.
4. Le frontend utilise `AppleID.auth` (script Apple JS) pour recuperer un `identityToken`, envoye a
   `POST /api/auth/apple { identityToken, prenom?, nom? }` (prenom/nom uniquement disponibles a la 1ere connexion).
   Le backend verifie la signature via le JWKS Apple, l'issuer et l'audience.

## Points d'API principaux

Voir le detail complet dans le code (`controller/`). Resume :

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/google
POST   /api/auth/apple
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/auth/me
PUT    /api/auth/me
POST   /api/auth/me/password

GET    /api/achats
POST   /api/achats
GET    /api/achats/{id}
PUT    /api/achats/{id}
DELETE /api/achats/{id}

GET    /api/achats/{achatId}/articles
POST   /api/achats/{achatId}/articles
PUT    /api/articles/{id}
PATCH  /api/articles/{id}/statut
DELETE /api/articles/{id}
POST   /api/uploads/photo         (multipart, renvoie { url })

GET    /api/tirelire
GET    /api/tirelire/transactions
POST   /api/tirelire/depot
POST   /api/tirelire/retrait

GET    /api/objectifs
POST   /api/objectifs
PUT    /api/objectifs/{id}
POST   /api/objectifs/{id}/contribution
DELETE /api/objectifs/{id}

GET    /api/dashboard
```

## Structure du projet

```
com.buyflow
├── config          (SecurityConfig, WebConfig pour /uploads)
├── security        (JWT, filtre, verification Google/Apple)
├── entity          (JPA)
├── repository      (Spring Data)
├── dto             (records, un sous-package par domaine)
├── mapper          (entity -> DTO)
├── service         (logique metier, regles RB01-RB12)
├── controller      (REST)
└── exception       (gestion centralisee des erreurs -> JSON uniforme)
```
