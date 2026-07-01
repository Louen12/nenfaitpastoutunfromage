# Synthèse complète de l'application — N'en fais pas tout un fromage

> Site web mobile-first pour une fromagerie artisanale itinérante basée à Plouégat-Guérand (Finistère).
> Workshop client M2 MBA Expert UX/UI Design — MyDigitalSchool.

---

## Stack technique

| Couche          | Technologie                                  |
| --------------- | -------------------------------------------- |
| Framework       | Next.js (App Router) + TypeScript            |
| Styles          | Tailwind CSS v4                              |
| Base de données | Supabase (PostgreSQL) + Row Level Security   |
| Paiement        | Stripe Checkout (sessions hébergées)         |
| Carte           | Leaflet.js + OpenStreetMap                   |
| Instagram       | Widget Elfsight (embed tiers)                |
| Email           | Resend (email transactionnel de confirmation)|
| Hébergement     | Vercel (front) + Supabase Cloud (BDD)        |

---

## Design System

- **Polices** : Fraunces (serif/titres), Inter (sans/corps), JetBrains Mono (mono/tags)
- **Couleurs** : vert `#1d5b3a`, crème `#f4ecd8`, encre `#1a1a17`
- **Approche** : Mobile-first, esthétique artisanale, storytelling fort

---

## Architecture de la base de données (6 tables)

### 1. `categories`
Familles de fromages (pâtes pressées, pâtes molles, bleus…).

| Champ       | Type      | Description              |
| ----------- | --------- | ------------------------ |
| id          | UUID (PK) | Identifiant unique       |
| slug        | text      | Slug URL unique          |
| nom         | text      | Nom affiché              |
| position    | int       | Ordre d'affichage        |
| created_at  | timestamp | Date de création         |

### 2. `produits`
Catalogue de fromages.

| Champ            | Type      | Description                               |
| ---------------- | --------- | ----------------------------------------- |
| id               | UUID (PK) | Identifiant unique                        |
| nom              | text      | Nom du fromage                            |
| slug             | text      | Slug URL unique                           |
| description      | text      | Description longue                        |
| prix_cents       | int       | Prix en centimes (jamais de float)        |
| unite_label      | text      | Unité de vente (pièce, kg…)               |
| categorie_id     | UUID (FK) | Lien vers la catégorie                    |
| image_url        | text      | URL de la photo (Supabase Storage)        |
| stock            | int       | Quantité en stock (null = non suivi)      |
| disponible       | boolean   | Visible en boutique                       |
| lait             | text      | Type de lait (vache, chèvre, brebis…)     |
| affinage         | text      | Durée / type d'affinage                   |
| producteur       | text      | Nom du producteur                         |
| distance_km      | int       | Distance du producteur                    |
| region           | text      | Région d'origine                          |
| aop              | boolean   | Appellation d'origine protégée            |
| conseil_fromager | text      | Conseil de dégustation                    |
| en_avant         | boolean   | Mis en avant (nouveauté) sur l'accueil    |
| position         | int       | Ordre d'affichage                         |

### 3. `marches`
Tournée hebdomadaire + local fixe.

| Champ         | Type      | Description                                  |
| ------------- | --------- | -------------------------------------------- |
| id            | UUID (PK) | Identifiant unique                           |
| nom           | text      | Nom du marché                                |
| commune       | text      | Ville                                        |
| code_postal   | text      | Code postal                                  |
| departement   | text      | Département                                  |
| adresse       | text      | Adresse complète                             |
| latitude      | numeric   | Coordonnée GPS (latitude)                    |
| longitude     | numeric   | Coordonnée GPS (longitude)                   |
| jour_semaine  | int       | 0 = dimanche … 6 = samedi                    |
| heure_debut   | time      | Heure d'ouverture                            |
| heure_fin     | time      | Heure de fermeture                           |
| type          | text      | `itinerant` ou `local_fixe`                  |
| point_retrait | boolean   | Disponible pour le retrait click & collect   |
| actif         | boolean   | Présent cette semaine (toggle ON/OFF)        |
| position      | int       | Ordre d'affichage                            |

### 4. `commandes`
Commandes clients (créées côté serveur via webhook Stripe uniquement).

| Champ                    | Type      | Description                                 |
| ------------------------ | --------- | ------------------------------------------- |
| id                       | UUID (PK) | Identifiant unique                          |
| numero                   | serial    | Numéro de commande auto-incrémenté         |
| client_nom               | text      | Nom du client                               |
| client_email             | text      | Email du client                             |
| client_telephone         | text      | Téléphone (optionnel)                       |
| total_cents              | int       | Montant total en centimes                   |
| statut                   | text      | `en_attente` → `preparee` → `retiree` / `annulee` |
| paiement_statut          | text      | `pending`, `paye`, `echoue`, `rembourse`    |
| retrait_type             | text      | `local` ou `marche`                         |
| retrait_marche_id        | UUID (FK) | Marché de retrait choisi                    |
| retrait_date             | date      | Date de retrait prévue                      |
| retrait_creneau          | text      | Créneau horaire                             |
| stripe_session_id        | text      | ID de session Stripe                        |
| stripe_payment_intent_id | text      | ID du PaymentIntent Stripe                  |

### 5. `commande_items`
Lignes de commande (snapshot du produit au moment de l'achat).

| Champ               | Type      | Description               |
| -------------------- | --------- | ------------------------- |
| id                   | UUID (PK) | Identifiant unique        |
| commande_id          | UUID (FK) | Lien vers la commande     |
| produit_id           | UUID (FK) | Lien vers le produit      |
| nom_produit          | text      | Nom figé à la commande   |
| unite_label          | text      | Unité figée              |
| prix_unitaire_cents  | int       | Prix unitaire figé       |
| quantite             | int       | Quantité commandée       |

### 6. `actualites`
Actualités / nouveautés gérées par l'artisan.

| Champ      | Type      | Description                    |
| ---------- | --------- | ------------------------------ |
| id         | UUID (PK) | Identifiant unique             |
| titre      | text      | Titre de l'actualité           |
| contenu    | text      | Corps de texte                 |
| image_url  | text      | Photo illustrative             |
| publie     | boolean   | Visible sur le site public     |
| position   | int       | Ordre d'affichage              |
| created_at | timestamp | Date de création               |

---

## Sécurité (RLS)

- **Lecture publique** (anon + authenticated) : `categories`, `produits`, `marches`, `actualites` (si `publie = true`)
- **Écriture réservée** (authenticated uniquement) : CRUD complet sur `categories`, `produits`, `marches`, `actualites`
- **Commandes** : aucun accès navigateur (pas de policy anon). L'artisan (authenticated) peut lire et mettre à jour les commandes. Les commandes sont créées uniquement côté serveur via la clé admin Supabase (webhook Stripe)

---

## Stockage images

Deux buckets Supabase Storage publics :
- `produits` — photos des fromages
- `actualites` — images des actualités

Upload/suppression réservés au rôle `authenticated`. Lecture publique.

---

# CÔTÉ CLIENT (site public)

## Navigation

**Barre de navigation fixe en bas de l'écran (TabBar)** avec 5 onglets :
1. **Accueil** (`/`)
2. **Marchés** (`/marches`)
3. **Boutique** (`/boutique`)
4. **Actu** (`/actu`)
5. **Panier** (`/panier`) — avec badge indiquant le nombre d'articles

**Barre supérieure (Topbar)** affichée sur les pages internes avec titre de la page et bouton retour.

---

## Page d'accueil (`/`)

Page vitrine composée de 8 sections :

### 1. Hero
- Logo de la fromagerie (rond, en haut à gauche)
- Icône panier (lien vers `/panier`, en haut à droite)
- Titre principal : « N'en fais pas tout un fromage »
- Sous-titre : « Fromagerie · Crèmerie »
- Fond vert profond, texte crème

### 2. Introduction
- Eyebrow « Fromagerie itinérante »
- Titre : « Présent toute l'année sur vos marchés préférés »
- 2 boutons CTA : « Voir les marchés → » (primaire) et « La boutique » (ghost)

### 3. L'artisan — Maugan
- Section de storytelling avec photo du camion
- Texte de présentation de Maugan LE GAC
- 3 statistiques : « 2025 — Création », « 100% — Artisanal », « 0 — Intermédiaire »

### 4. Le camion
- Fond vert profond
- Photo du comptoir réfrigéré
- 3 specs techniques : « Comptoir réfrigéré +4°C », « 2 marchés/semaine + local », « Zone : Finistère · Côtes-d'Armor »

### 5. Marchés cette semaine
- Données dynamiques depuis Supabase (marchés actifs)
- Carrousel horizontal scrollable de cartes
- Chaque carte : jour abrégé, commune, horaires

### 6. Boutique preview
- 4 premiers produits disponibles (grille 2 colonnes)
- Chaque carte : photo, nom, prix, bouton « + » pour ajouter au panier
- Bouton « Voir toute la boutique → »

### 7. Nouveautés
- 2 dernières actualités publiées
- Carte : image, date, titre, extrait de contenu
- Bouton « Toutes les actus → »

### 8. Footer
- 3 colonnes (desktop) : logo + citation, navigation (Instagram, Facebook, Contact), légal (Mentions légales, CGV, Confidentialité)
- Lieu : « Plouégat-Guérand · Bretagne »

### SEO
- Données structurées JSON-LD (Schema.org `LocalBusiness`)

---

## Page Artisan (`/artisan`)

- **Topbar** avec bouton retour
- Récit éditorial en storytelling : l'histoire de Maugan, de Paris à la Bretagne
- Lettrine stylisée sur le premier paragraphe
- Placeholder photo (PhotoSlot) pour portrait
- Encart « À venir » pour contenus futurs (shooting photo)
- **Métadonnées SEO** et Open Graph

---

## Page Marchés (`/marches`)

- **Topbar** + header « Où me trouver »
- **Toggle Carte / Liste** (boutons pill)

### Vue Carte (Leaflet)
- Carte interactive plein écran (70vh) avec OpenStreetMap
- Marqueurs personnalisés (SVG) : vert pour itinérant, marron pour local fixe
- Popups au clic : nom, commune, département, jour, horaires, adresse, type, bouton « Commander pour ce retrait »
- Auto-zoom sur les marqueurs (fitBounds)
- Légende des couleurs

### Vue Liste
- Liste verticale des marchés actifs
- Chaque item : jour abrégé, nom, commune, horaires, badges « Point fixe » et « Retrait »

### Données
- Marchés actifs uniquement (filtre `actif = true`)
- Triés par jour de la semaine puis position

---

## Page Boutique (`/boutique`)

- **Topbar** + header « Notre sélection » avec nombre de références
- **Filtres par catégorie** : barre horizontale scrollable de boutons pills (« Tous », puis chaque catégorie)
- **Grille produits** (2 colonnes) :
  - Photo du fromage (ou placeholder emoji)
  - Nom, prix en euros, unité
  - Bouton « + » vert pour ajout rapide au panier
  - **Badges** : « Rupture » (overlay sombre sur photo), « Plus que X » (stock faible ≤ 3), « AOP »
  - Clic sur la carte → fiche produit détaillée

### Données
- Produits disponibles uniquement (filtre `disponible = true`)
- Triés par position puis nom
- Jointure avec les catégories

---

## Fiche produit (`/boutique/[slug]`)

- **Topbar** avec nom du produit et bouton retour
- **Photo pleine largeur** (264px de hauteur)
- **Chips** : catégorie, AOP, Nouveauté
- **Nom**, **prix** (en euros, formaté), **unité**
- **Description** textuelle
- **Fiche détaillée** : lait, affinage, producteur, région, distance (km)
- **Conseil du fromager** : encart vert d'eau
- **Bouton « Ajouter au panier »** (ou message « Rupture de stock » si stock = 0)
- **SEO** : métadonnées dynamiques, JSON-LD Schema.org `Product` avec disponibilité et prix

---

## Panier & Tunnel de commande (`/panier`)

Tunnel en 3 étapes :

### Étape 1/3 — Panier
- Liste des articles avec :
  - Photo, nom, unité
  - Boutons +/− pour modifier la quantité (suppression si quantité = 0)
  - Sous-total par ligne
- Bouton « Vider » le panier
- Récapitulatif : sous-total, frais de retrait (gratuit), total
- Bouton « Continuer → »
- Si panier vide : message + lien vers la boutique

### Étape 2/3 — Coordonnées client
- Formulaire : nom (obligatoire), email (obligatoire), téléphone (optionnel)
- Boutons « ← Retour » et « Continuer → »

### Étape 3/3 — Point de retrait
- Choix du mode de retrait :
  - **Sur un marché** : liste des marchés itinérants actifs avec nom, jour, commune, horaires. Sélection par clic
  - **Au local** : informations du local fixe
- Récapitulatif total
- Boutons « ← Retour » et « Payer → »
- Mention « Paiement sécurisé Stripe · CGV »
- Redirection vers Stripe Checkout

### Gestion du panier (côté client)
- **Persistance localStorage** (clé `nftuf-cart`)
- Context React (`CartProvider` + hook `useCart`)
- Fonctions : `addItem`, `updateQuantity`, `removeItem`, `clearCart`
- Calcul automatique : `totalCents`, `totalItems`

---

## Page de confirmation (`/confirmation`)

- Affichée après paiement Stripe réussi
- Icône check verte
- « Commande confirmée ! »
- Message : récapitulatif par email, présentation au point de retrait
- Référence Stripe (tronquée)
- Boutons : « Retour à la boutique » et « Accueil »

---

## Page Actu (`/actu`)

### Actualités (données Supabase)
- Liste verticale de toutes les actualités publiées (`publie = true`)
- Chaque carte : image, date formatée (jour + mois + année), titre, contenu intégral

### Instagram (widget Elfsight)
- Embed du flux Instagram via widget Elfsight
- Chargement lazy avec timeout de 7 secondes
- **Fallback gracieux** : si le widget ne charge pas, affichage d'une carte avec lien direct vers le compte Instagram
- CSS custom pour intégrer le widget au design system (couleurs boutons, atténuation du branding Elfsight)
- Bouton « Suivez-nous sur Instagram »

---

## Page Contact (`/contact`)

- Coordonnées : email, téléphone (lien cliquable `tel:`), adresse du local de retrait
- **Horaires du local** : tableau jour par jour (mardi, vendredi, samedi ouverts)
- Note : retrait click & collect le vendredi 16h–19h
- **Réseaux sociaux** : boutons Instagram et Facebook
- Icônes SVG custom pour chaque moyen de contact

---

## Pages légales

Trois pages générées via le composant `LegalPage` :

### Mentions légales (`/mentions-legales`)
- Raison sociale, forme juridique (SARL), capital social
- SIREN, SIRET, TVA intracommunautaire, RCS, NAF
- Gérant et directeur de publication : Maugan LE GAC
- Hébergeur : Vercel Inc.
- Sous-traitants : Supabase, Stripe, Resend

### CGV (`/cgv`)
- Conditions générales de vente complètes

### Politique de confidentialité (`/confidentialite`)
- Conformité RGPD
- Données collectées, finalités, durées de conservation
- Droits des utilisateurs

---

## Email transactionnel

Après chaque paiement validé, un email de confirmation de retrait est envoyé au client via **Resend** :
- Template HTML responsive avec le design system de la marque
- Contenu : numéro de commande, détail des articles, lieu et horaires de retrait, total
- Note : « Présentez cet email ou donnez votre nom au moment du retrait »
- Copie cachée (BCC) envoyée à l'artisan

---

# CÔTÉ ADMIN (back-office)

> Interface mobile-first pensée pour être utilisée depuis le smartphone de l'artisan.

## Authentification (`/admin/login`)

- Un seul utilisateur : l'artisan (inscription publique désactivée)
- Connexion par email + mot de passe via Supabase Auth (`signInWithPassword`)
- Protection de toutes les routes `/admin/*` via middleware
- Redirection automatique vers `/admin` après connexion
- Bouton de déconnexion dans le shell admin

---

## Tableau de bord (`/admin`)

Dashboard avec :

### Indicateurs (4 cards en grille 2×2)
1. **Commandes en attente** (compteur, fond vert accentué) — lien vers `/admin/commandes`
2. **Produits** (compteur total) — lien vers `/admin/produits`
3. **Marchés actifs** (compteur) — lien vers `/admin/marches`
4. **Actualités** — lien vers `/admin/actualites`

### Liens rapides (4 items)
- Gérer les produits
- Gérer les marchés
- Voir les commandes
- Gérer les actualités

---

## Gestion des produits (`/admin/produits`)

### Liste (`/admin/produits`)
- Compteur de produits
- Bouton « Catégories » (vers `/admin/categories`)
- Bouton « + Ajouter » (vers `/admin/produits/nouveau`)
- Liste avec pour chaque produit :
  - Miniature photo (ou emoji placeholder)
  - Nom, prix en euros, catégorie, stock
  - **Toggle de disponibilité** (activer/désactiver sans entrer dans la fiche)

### Création / Édition (`/admin/produits/nouveau` et `/admin/produits/[id]`)
Formulaire complet avec :

| Champ                      | Type     | Obligatoire |
| -------------------------- | -------- | ----------- |
| Nom                        | texte    | Oui         |
| Prix (€)                   | decimal  | Oui         |
| Unité (pièce, kg…)         | texte    | Non         |
| Catégorie                  | select   | Non         |
| Description                | textarea | Non         |
| Photo                      | upload   | Non         |
| Stock                      | nombre   | Non         |
| Lait                       | texte    | Non         |
| Affinage                   | texte    | Non         |
| Producteur                 | texte    | Non         |
| Région                     | texte    | Non         |
| Distance (km)              | nombre   | Non         |
| Conseil du fromager        | textarea | Non         |
| Toggle Disponible          | on/off   | —           |
| Toggle AOP                 | on/off   | —           |
| Toggle Mise en avant       | on/off   | —           |

- **Upload photo** vers Supabase Storage (bucket `produits`)
- Bouton « Mettre à jour » ou « Créer le produit »
- Bouton « Supprimer » (avec confirmation) en mode édition

### Gestion des catégories (`/admin/categories`)
- Champ texte + bouton « Ajouter » pour créer une catégorie
- Liste des catégories existantes avec bouton « Supprimer » (avec confirmation)

---

## Gestion des marchés (`/admin/marches`)

### Liste (`/admin/marches`)
- Compteur de marchés
- Bouton « + Ajouter »
- Liste avec pour chaque marché :
  - Nom, jour, commune, horaires
  - Badges : « Itinérant » ou « Local fixe », « Retrait »
  - **Toggle actif** (présent cette semaine : activer/désactiver)

### Création / Édition (`/admin/marches/nouveau` et `/admin/marches/[id]`)
Formulaire complet :

| Champ                           | Type    | Obligatoire |
| ------------------------------- | ------- | ----------- |
| Nom du marché                   | texte   | Oui         |
| Commune                         | texte   | Oui         |
| Code postal                     | texte   | Non         |
| Département                     | texte   | Non         |
| Type (itinérant / local fixe)   | select  | —           |
| Adresse                         | texte   | Non         |
| Latitude                        | decimal | Non         |
| Longitude                       | decimal | Non         |
| Jour de la semaine              | select  | Non         |
| Heure début                     | time    | Non         |
| Heure fin                       | time    | Non         |
| Toggle Actif cette semaine      | on/off  | —           |
| Toggle Point de retrait         | on/off  | —           |

- Bouton « Mettre à jour » ou « Créer le marché »
- Bouton « Supprimer » (avec confirmation)

---

## Gestion des commandes (`/admin/commandes`)

### Liste (`/admin/commandes`)
- **Filtres par statut** : Tous, En attente, Préparée, Retirée, Annulée
- Liste triée par date décroissante :
  - Numéro de commande (`#123`)
  - Badge de statut coloré (jaune/bleu/vert/rouge)
  - Nom du client
  - Montant total, lieu de retrait, date de retrait
  - Horodatage de création

### Détail de commande (`/admin/commandes/[id]`)

4 sections :

1. **Statut + Actions**
   - Badge de statut actuel + statut de paiement
   - Boutons de transition :
     - `en_attente` → « Marquer préparée » | « Annuler »
     - `preparee` → « Marquer retirée » | « Annuler »
     - `retiree` et `annulee` → aucune action (états terminaux)

2. **Client**
   - Nom, email, téléphone (lien cliquable `tel:`)

3. **Retrait**
   - Type (au local ou marché), nom du marché + commune
   - Date et créneau de retrait

4. **Articles**
   - Liste des lignes de commande : nom produit, quantité × prix unitaire, sous-total par ligne
   - Total de la commande

5. **Infos techniques**
   - Date/heure de création
   - ID du PaymentIntent Stripe

---

## Gestion des actualités (`/admin/actualites`)

### Liste (`/admin/actualites`)
- Compteur d'actualités
- Bouton « + Ajouter »
- Liste triée par date décroissante :
  - Miniature photo (ou emoji placeholder)
  - Titre, date, statut (« Publié » / « Brouillon »)
  - **Toggle de publication** (publier/dépublier sans entrer dans la fiche)

### Création / Édition (`/admin/actualites/nouveau` et `/admin/actualites/[id]`)
Formulaire :

| Champ          | Type     | Obligatoire |
| -------------- | -------- | ----------- |
| Titre          | texte    | Oui         |
| Contenu        | textarea | Non         |
| Photo          | upload   | Non         |
| Toggle Publié  | on/off   | —           |

- **Upload photo** vers Supabase Storage (bucket `actualites`)
- Bouton « Mettre à jour » ou « Créer l'actualité »
- Bouton « Supprimer » (avec confirmation)

---

# API Routes

## `POST /api/checkout`

Crée une session Stripe Checkout.

**Corps de la requête :**
```json
{
  "items": [{ "produit_id": "uuid", "quantite": 2 }],
  "client": { "nom": "Jean Dupont", "email": "jean@mail.fr", "telephone": "06..." },
  "retrait": { "type": "marche", "marche_id": "uuid", "date": "2026-07-05", "creneau": "09:00–12:00" }
}
```

**Logique :**
1. Validation du panier (non vide), des infos client (nom + email), du type de retrait
2. Vérification côté serveur : chaque produit existe, est disponible, et le stock est suffisant
3. Création de `line_items` Stripe avec prix en centimes
4. Création de la session Stripe Checkout avec les métadonnées complètes (client, retrait, articles)
5. Retour de l'URL Stripe Checkout

**Réponse :** `{ "url": "https://checkout.stripe.com/..." }`

---

## `POST /api/webhooks/stripe`

Webhook Stripe déclenché après paiement réussi (`checkout.session.completed`).

**Logique :**
1. Vérification de la signature Stripe
2. Si `payment_status === "paid"` :
   - Récupération des métadonnées de la session
   - Lecture des produits depuis Supabase (prix serveur, pas client)
   - Création de la commande dans `commandes` (statut `en_attente`, paiement `paye`)
   - Création des lignes de commande dans `commande_items` (snapshot des prix)
   - **Décrémentation du stock** pour chaque produit (si stock suivi)
   - **Envoi de l'email de confirmation** au client (+ BCC artisan) via Resend

---

# Flux utilisateur complet : de la boutique au retrait

```
1. Visiteur → parcourt la boutique → ajoute des fromages au panier (localStorage)
2. Visiteur → ouvre /panier → vérifie les articles et quantités
3. Visiteur → saisit nom + email + téléphone
4. Visiteur → choisit le point de retrait (marché itinérant ou local fixe)
5. Visiteur → clique « Payer » → redirection vers Stripe Checkout
6. Visiteur → paye par carte bancaire sur Stripe
7. Stripe → envoie webhook au serveur → commande créée en BDD
8. Serveur → envoie email de confirmation au client + copie à l'artisan
9. Visiteur → redirigé vers /confirmation
10. Artisan → voit la commande « En attente » dans le back-office mobile
11. Artisan → marque la commande « Préparée » quand les fromages sont prêts
12. Client → se présente au marché/local → l'artisan marque « Retirée »
```

---

# Composants réutilisables

| Composant        | Rôle                                                        |
| ---------------- | ----------------------------------------------------------- |
| `Button`         | Bouton CTA (variants : primary, ghost)                      |
| `Eyebrow`        | Petite étiquette / surtitre (ligne verte + texte uppercase) |
| `Chip`           | Badge coloré (tons : open, vert, cream, dark, rouge)        |
| `PhotoSlot`      | Placeholder pour future photo (aspect visuel)               |
| `Topbar`         | Barre de navigation supérieure avec titre et bouton retour  |
| `TabBar`         | Navigation fixe en bas avec 5 onglets + badge panier        |
| `LayoutShell`    | Shell de layout principal (wraps TabBar)                    |
| `LegalPage`      | Template de page légale                                     |
| `MarchesMap`     | Carte Leaflet avec marqueurs et popups                      |
| `InstagramFeed`  | Widget Elfsight avec fallback gracieux                      |
| `HomeAddButton`  | Bouton « + » d'ajout au panier sur la page d'accueil       |

### Composants admin

| Composant       | Rôle                                                    |
| --------------- | ------------------------------------------------------- |
| `AdminShell`    | Shell de layout admin (header, navigation)              |
| `LogoutButton`  | Bouton de déconnexion                                   |
| `FormField`     | Composants de formulaire (Field, Input, Textarea, Select, Toggle, SubmitButton, DeleteButton) |
| `ImageUpload`   | Upload d'image vers Supabase Storage                    |
| `ToggleSwitch`  | Interrupteur on/off                                     |
| `ProduitForm`   | Formulaire complet de création/édition de produit       |
| `MarcheForm`    | Formulaire complet de création/édition de marché        |
| `ActualiteForm` | Formulaire complet de création/édition d'actualité      |
| `ClickStop`     | Wrapper pour empêcher la propagation du clic (toggle dans un lien) |

---

# Informations commerciales

| Donnée               | Valeur                                              |
| -------------------- | --------------------------------------------------- |
| Nom commercial       | N'en fais pas tout un fromage                       |
| Forme juridique      | SARL                                                |
| Capital social       | 1 000 €                                             |
| SIREN                | 939 719 688                                         |
| NAF                  | 4781Z — Commerce alimentaire sur marchés            |
| Gérant               | Maugan LE GAC                                       |
| Adresse              | Le Veuzit, 29620 Plouégat-Guérand                   |
| Email                | mauganlegac2@gmail.com                              |
| Téléphone            | 06 13 87 07 17                                      |
| Zone                 | Finistère · Côtes-d'Armor                           |
| Instagram            | @nenfaispastoutunfromage                            |
| URL                  | nenfaitpastoutunfromage.fr                          |
