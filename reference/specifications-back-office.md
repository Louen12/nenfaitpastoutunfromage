# Back-office — Spécifications techniques et fonctionnelles

**Projet** : N'en fais pas tout un fromage — Site web de fromagerie artisanale itinérante  
**Version** : 1.0  
**Date** : 30 juin 2026  
**Auteur** : Louen Le Gac — M2 MBA Expert UX/UI Design, MyDigitalSchool

---

## 1. Présentation générale

Le back-office permet au fromager (administrateur unique) de gérer l'ensemble du contenu et de l'activité commerciale du site depuis une interface dédiée, accessible à l'adresse `/admin`. Il couvre quatre domaines fonctionnels : la gestion du catalogue produits, la gestion des marchés et points de retrait, le suivi des commandes click & collect, et la publication d'actualités.

### 1.1 Utilisateur cible

| Rôle | Description |
|------|-------------|
| Administrateur (fromager) | Utilisateur unique, gère produits, marchés, commandes et actualités |

### 1.2 Accès et sécurité

- **Authentification** : connexion par email + mot de passe via Supabase Auth
- **Protection des routes** : middleware Next.js qui vérifie la session sur chaque requête vers `/admin/*`
- **Déconnexion** : bouton de déconnexion disponible depuis toutes les pages du back-office
- **Pas de création de compte publique** : le compte administrateur est créé manuellement dans Supabase

---

## 2. Architecture technique

### 2.1 Stack

| Couche | Technologie | Rôle |
|--------|-------------|------|
| Frontend | Next.js 15 (App Router) + Tailwind CSS v4 | Interface d'administration |
| Backend | Next.js Server Actions (`"use server"`) | Logique métier (CRUD, upload, transitions) |
| Base de données | Supabase (PostgreSQL) | Stockage des données |
| Stockage fichiers | Supabase Storage (buckets `produits`, `actualites`) | Images produits et actualités |
| Authentification | Supabase Auth | Gestion de session |
| Hébergement | Vercel | Déploiement frontend + API |

### 2.2 Structure des fichiers

```
src/
├── app/admin/
│   ├── layout.tsx                # Layout admin
│   ├── page.tsx                  # Tableau de bord
│   ├── actions.ts                # Action de déconnexion
│   ├── login/page.tsx            # Page de connexion
│   ├── produits/
│   │   ├── page.tsx              # Liste des produits
│   │   ├── actions.ts            # CRUD produits
│   │   ├── nouveau/page.tsx      # Formulaire de création
│   │   ├── [id]/page.tsx         # Formulaire d'édition
│   │   └── ProduitToggle.tsx     # Toggle disponibilité
│   ├── marches/
│   │   ├── page.tsx              # Liste des marchés
│   │   ├── actions.ts            # CRUD marchés
│   │   ├── nouveau/page.tsx      # Formulaire de création
│   │   ├── [id]/page.tsx         # Formulaire d'édition
│   │   └── MarcheToggle.tsx      # Toggle actif/inactif
│   ├── commandes/
│   │   ├── page.tsx              # Liste des commandes
│   │   ├── actions.ts            # Transitions de statut
│   │   ├── CommandeFilters.tsx   # Filtres par statut
│   │   └── [id]/
│   │       ├── page.tsx          # Détail commande
│   │       └── StatutActions.tsx  # Boutons de transition
│   ├── categories/
│   │   ├── page.tsx              # Gestion des catégories
│   │   ├── actions.ts            # CRUD catégories
│   │   └── CategoriesList.tsx    # Composant liste
│   └── actualites/
│       ├── page.tsx              # Liste des actualités
│       ├── actions.ts            # CRUD actualités
│       ├── nouveau/page.tsx      # Formulaire de création
│       ├── [id]/page.tsx         # Formulaire d'édition
│       └── ActualiteToggle.tsx   # Toggle publié/brouillon
├── components/admin/
│   ├── AdminShell.tsx            # Shell commun (header, navigation)
│   ├── LogoutButton.tsx          # Bouton de déconnexion
│   ├── FormField.tsx             # Champ de formulaire réutilisable
│   ├── ImageUpload.tsx           # Composant upload d'image
│   ├── ToggleSwitch.tsx          # Composant toggle on/off
│   ├── ProduitForm.tsx           # Formulaire produit
│   ├── MarcheForm.tsx            # Formulaire marché
│   ├── ActualiteForm.tsx         # Formulaire actualité
│   └── ClickStop.tsx             # Utilitaire stop propagation
└── middleware.ts                  # Protection des routes (session)
```

### 2.3 Modèle de données

#### Table `produits`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | `uuid` (PK) | Identifiant unique |
| `nom` | `text` | Nom du produit |
| `slug` | `text` | Slug URL (généré automatiquement) |
| `description` | `text` | Description détaillée |
| `prix_cents` | `integer` | Prix en centimes d'euro |
| `unite_label` | `text` | Unité de vente (pièce, kg, etc.) |
| `categorie_id` | `uuid` (FK) | Catégorie rattachée |
| `image_url` | `text` | URL de l'image (Supabase Storage) |
| `stock` | `integer` | Stock disponible (nullable = illimité) |
| `disponible` | `boolean` | Affiché dans la boutique |
| `lait` | `text` | Type de lait |
| `affinage` | `text` | Durée/type d'affinage |
| `producteur` | `text` | Nom du producteur |
| `distance_km` | `integer` | Distance d'approvisionnement |
| `region` | `text` | Région d'origine |
| `aop` | `boolean` | Label AOP |
| `conseil_fromager` | `text` | Conseil de dégustation |
| `en_avant` | `boolean` | Mis en avant sur l'accueil |
| `position` | `integer` | Ordre d'affichage |
| `created_at` | `timestamptz` | Date de création |
| `updated_at` | `timestamptz` | Date de modification |

#### Table `categories`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | `uuid` (PK) | Identifiant unique |
| `nom` | `text` | Nom de la catégorie |
| `slug` | `text` | Slug URL |
| `position` | `integer` | Ordre d'affichage |
| `created_at` | `timestamptz` | Date de création |

#### Table `marches`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | `uuid` (PK) | Identifiant unique |
| `nom` | `text` | Nom du marché |
| `commune` | `text` | Ville |
| `code_postal` | `text` | Code postal |
| `departement` | `text` | Département |
| `adresse` | `text` | Adresse complète |
| `latitude` | `float` | Coordonnée GPS |
| `longitude` | `float` | Coordonnée GPS |
| `jour_semaine` | `integer` | Jour (1=lundi … 7=dimanche) |
| `heure_debut` | `time` | Heure d'ouverture |
| `heure_fin` | `time` | Heure de fermeture |
| `type` | `text` | `itinerant` ou `local_fixe` |
| `point_retrait` | `boolean` | Disponible pour le click & collect |
| `actif` | `boolean` | Affiché sur le site |
| `position` | `integer` | Ordre d'affichage |
| `created_at` | `timestamptz` | Date de création |
| `updated_at` | `timestamptz` | Date de modification |

#### Table `commandes`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | `uuid` (PK) | Identifiant unique |
| `numero` | `integer` | Numéro de commande (auto-incrémenté) |
| `client_nom` | `text` | Nom du client |
| `client_email` | `text` | Email du client |
| `client_telephone` | `text` | Téléphone du client |
| `total_cents` | `integer` | Montant total en centimes |
| `statut` | `text` | Statut de la commande |
| `paiement_statut` | `text` | Statut du paiement Stripe |
| `retrait_type` | `text` | `local` ou `marche` |
| `retrait_marche_id` | `uuid` (FK) | Marché de retrait |
| `retrait_date` | `date` | Date de retrait prévue |
| `retrait_creneau` | `text` | Créneau horaire de retrait |
| `stripe_session_id` | `text` | ID session Stripe Checkout |
| `stripe_payment_intent_id` | `text` | ID PaymentIntent Stripe |
| `created_at` | `timestamptz` | Date de création |

#### Table `commande_items`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | `uuid` (PK) | Identifiant unique |
| `commande_id` | `uuid` (FK) | Commande parente |
| `produit_id` | `uuid` (FK) | Produit commandé |
| `nom_produit` | `text` | Nom du produit (snapshot) |
| `quantite` | `integer` | Quantité commandée |
| `prix_unitaire_cents` | `integer` | Prix unitaire (snapshot) |
| `unite_label` | `text` | Unité de vente (snapshot) |

#### Table `actualites`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | `uuid` (PK) | Identifiant unique |
| `titre` | `text` | Titre de l'actualité |
| `contenu` | `text` | Corps de l'article |
| `image_url` | `text` | URL de l'image |
| `publie` | `boolean` | Publié ou brouillon |
| `position` | `integer` | Ordre d'affichage |
| `created_at` | `timestamptz` | Date de création |

### 2.4 Relations entre tables

```
categories ──1:N──> produits       (categorie_id)
marches    ──1:N──> commandes      (retrait_marche_id)
commandes  ──1:N──> commande_items (commande_id)
produits   ──1:N──> commande_items (produit_id)
```

---

## 3. Spécifications fonctionnelles

### 3.1 Tableau de bord (`/admin`)

Point d'entrée du back-office après connexion. Offre une vue synthétique de l'activité.

**Indicateurs affichés :**

| Indicateur | Source | Lien |
|------------|--------|------|
| Commandes en attente | `commandes` WHERE `statut = 'en_attente'` | `/admin/commandes` |
| Nombre de produits | `produits` (total) | `/admin/produits` |
| Marchés actifs | `marches` WHERE `actif = true` | `/admin/marches` |
| Actualités | Lien rapide | `/admin/actualites` |

**Accès rapides :** liens directs vers chaque section de gestion.

---

### 3.2 Gestion des produits (`/admin/produits`)

#### 3.2.1 Liste des produits

- Affichage de tous les produits triés par position puis par nom
- Pour chaque produit : miniature, nom, prix, catégorie, stock
- **Toggle rapide** de disponibilité (sans recharger la page)
- Bouton d'ajout et lien vers la gestion des catégories

#### 3.2.2 Création d'un produit (`/admin/produits/nouveau`)

Formulaire avec les champs suivants :

| Champ | Type | Obligatoire | Détails |
|-------|------|-------------|---------|
| Nom | texte | Oui | Le slug est généré automatiquement |
| Description | textarea | Non | Description longue |
| Prix | nombre | Oui | En euros, converti en centimes |
| Unité | texte | Non | Défaut : « pièce » |
| Catégorie | select | Non | Liste dynamique depuis la BDD |
| Image | fichier | Non | Upload vers Supabase Storage (`bucket: produits`) |
| Stock | nombre | Non | Vide = stock illimité |
| Disponible | toggle | Non | Défaut : inactif |
| Type de lait | texte | Non | Ex : chèvre, vache, brebis |
| Affinage | texte | Non | Ex : 3 mois |
| Producteur | texte | Non | Nom du producteur partenaire |
| Distance (km) | nombre | Non | Distance d'approvisionnement |
| Région | texte | Non | Région d'origine |
| AOP | toggle | Non | Label Appellation d'Origine Protégée |
| Conseil fromager | textarea | Non | Conseil de dégustation |
| En avant | toggle | Non | Affichage en page d'accueil |

#### 3.2.3 Modification d'un produit (`/admin/produits/[id]`)

- Pré-remplissage de tous les champs avec les valeurs existantes
- Remplacement d'image : l'ancienne image est supprimée du storage
- Bouton de suppression du produit (avec suppression de l'image associée)

#### 3.2.4 Suppression d'un produit

- Suppression de l'entrée en base de données
- Suppression de l'image associée dans Supabase Storage

---

### 3.3 Gestion des catégories (`/admin/categories`)

- Liste des catégories triées par position puis par nom
- **Ajout en ligne** : formulaire intégré directement dans la page (nom → slug auto-généré)
- **Suppression** d'une catégorie
- Les produits rattachés passent à « Sans catégorie »

---

### 3.4 Gestion des marchés (`/admin/marches`)

#### 3.4.1 Liste des marchés

- Affichage trié par jour de la semaine puis par position
- Pour chaque marché : nom, jour, commune, horaires, type (itinérant/local fixe), badge retrait
- **Toggle rapide** actif/inactif

#### 3.4.2 Création d'un marché (`/admin/marches/nouveau`)

| Champ | Type | Obligatoire | Détails |
|-------|------|-------------|---------|
| Nom | texte | Oui | Nom du marché |
| Commune | texte | Oui | Ville |
| Code postal | texte | Non | |
| Département | texte | Non | |
| Adresse | texte | Non | Adresse complète |
| Latitude | nombre | Non | Pour la carte Leaflet |
| Longitude | nombre | Non | Pour la carte Leaflet |
| Jour de la semaine | select | Non | 1 (lundi) à 7 (dimanche) |
| Heure de début | time | Non | |
| Heure de fin | time | Non | |
| Type | select | Non | `itinerant` (défaut) ou `local_fixe` |
| Point de retrait | toggle | Non | Disponible pour le click & collect |
| Actif | toggle | Non | Affiché sur le site |

#### 3.4.3 Modification et suppression

- Formulaire pré-rempli, même champs que la création
- Suppression directe

---

### 3.5 Gestion des commandes (`/admin/commandes`)

#### 3.5.1 Liste des commandes

- Affichage chronologique inversé (plus récente en premier)
- **Filtres par statut** : Toutes, En attente, Préparées, Retirées, Annulées
- Pour chaque commande : numéro, statut (badge coloré), nom du client, montant, lieu de retrait, date

#### 3.5.2 Détail d'une commande (`/admin/commandes/[id]`)

Quatre sections d'information :

| Section | Contenu |
|---------|---------|
| **Statut** | Badge statut actuel + statut paiement + boutons de transition |
| **Client** | Nom, email, téléphone (lien `tel:`) |
| **Retrait** | Type (local/marché), lieu, date, créneau |
| **Articles** | Liste des produits, quantité, prix unitaire, sous-total, total |

**Informations techniques** : date de création, ID Stripe PaymentIntent.

#### 3.5.3 Machine à états des commandes

Le cycle de vie d'une commande suit un automate fini strict :

```
                  ┌──────────────┐
                  │  en_attente  │
                  └──────┬───────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
       ┌─────────────┐      ┌─────────────┐
       │  preparee   │      │   annulee   │
       └──────┬──────┘      └─────────────┘
              │
       ┌──────┴──────────┐
       ▼                 ▼
┌─────────────┐   ┌─────────────┐
│   retiree   │   │   annulee   │
└─────────────┘   └─────────────┘
```

| Statut actuel | Transitions autorisées |
|---------------|----------------------|
| `en_attente` | → `preparee`, → `annulee` |
| `preparee` | → `retiree`, → `annulee` |
| `retiree` | *(état final)* |
| `annulee` | *(état final)* |

La validation des transitions est effectuée côté serveur (Server Action) avant mise à jour en base.

#### 3.5.4 Statuts de paiement

| Statut | Description |
|--------|-------------|
| `pending` | Paiement en attente |
| `paye` | Paiement confirmé par Stripe |
| `echoue` | Paiement échoué |
| `rembourse` | Paiement remboursé |

---

### 3.6 Gestion des actualités (`/admin/actualites`)

#### 3.6.1 Liste des actualités

- Affichage chronologique inversé
- Pour chaque actualité : miniature, titre, date, statut (Publié/Brouillon)
- **Toggle rapide** publié/brouillon

#### 3.6.2 Création d'une actualité (`/admin/actualites/nouveau`)

| Champ | Type | Obligatoire | Détails |
|-------|------|-------------|---------|
| Titre | texte | Oui | |
| Contenu | textarea | Non | Corps de l'article |
| Image | fichier | Non | Upload vers Supabase Storage (`bucket: actualites`) |
| Publié | toggle | Non | Brouillon par défaut |

#### 3.6.3 Modification et suppression

- Formulaire pré-rempli
- Remplacement d'image avec suppression de l'ancienne
- Suppression de l'actualité avec nettoyage du storage

---

## 4. Composants UI réutilisables

| Composant | Rôle |
|-----------|------|
| `AdminShell` | Layout commun : header avec titre, bouton retour, navigation, déconnexion |
| `FormField` | Champ de formulaire avec label, input et aide |
| `ImageUpload` | Zone d'upload avec preview de l'image |
| `ToggleSwitch` | Switch on/off stylisé |
| `ClickStop` | Wrapper empêchant la propagation du clic (pour les toggles dans les liens) |

---

## 5. Gestion des images

### 5.1 Upload

- Les images sont uploadées directement dans Supabase Storage via le SDK client
- Nommage : `{slug|prefix}-{timestamp}.{extension}`
- Buckets séparés : `produits` pour les photos de produits, `actualites` pour les illustrations

### 5.2 Suppression

- Lors du remplacement d'une image, l'ancienne est supprimée automatiquement
- Lors de la suppression d'un produit ou d'une actualité, l'image associée est supprimée

### 5.3 Accès public

- Les URLs publiques sont générées via `getPublicUrl()` de Supabase
- Elles sont stockées en base de données pour être servies directement au frontend

---

## 6. Sécurité

| Mesure | Détail |
|--------|--------|
| Authentification | Supabase Auth (email + mot de passe, bcrypt) |
| Session | Cookie HTTP-only géré par Supabase, renouvelé par le middleware |
| Protection des routes | Middleware Next.js interceptant toutes les requêtes |
| Validation serveur | Toutes les mutations passent par des Server Actions (`"use server"`) |
| Pas d'API REST exposée | Le CRUD passe exclusivement par les Server Actions (non accessible publiquement) |
| Transitions contrôlées | La machine à états des commandes valide côté serveur les transitions autorisées |
| Typage | Types TypeScript générés depuis le schéma Supabase (`database.types.ts`) |

---

## 7. Évolutions possibles (V2)

| Fonctionnalité | Description |
|----------------|-------------|
| Gestion multi-utilisateurs | Rôles (admin, employé) avec permissions différenciées |
| Notifications | Alertes email/push lors d'une nouvelle commande |
| Statistiques | Tableau de bord avec chiffre d'affaires, top produits, fréquentation |
| Export | Export CSV/PDF des commandes et du catalogue |
| Drag & drop | Réorganisation de l'ordre d'affichage par glisser-déposer |
| Historique | Journal des modifications avec horodatage et auteur |
| Recherche | Barre de recherche globale dans le back-office |
