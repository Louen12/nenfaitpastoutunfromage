# Architecture et structure technique — N'en fais pas tout un fromage

**Projet** : Site web de fromagerie artisanale itinérante  
**Version** : 1.0  
**Date** : 1er juillet 2026  
**Auteur** : Louen Le Gac — M2 MBA Expert UX/UI Design, MyDigitalSchool

---

## 1. Contexte et besoins client

Le client, Maugan LE GAC, est un fromager artisanal itinérant basé à Plouégat-Guérand (Finistère). Il sillonne les marchés de Bretagne avec son camion réfrigéré et dispose d'un local fixe pour le retrait des commandes.

### 1.1 Besoins identifiés (note de cadrage)

| Besoin | Description |
|--------|-------------|
| **Visibilité** | Faire connaître l'activité, raconter l'histoire de l'artisan, montrer les marchés de la semaine |
| **Vente en ligne** | Proposer un catalogue de fromages avec commande en click & collect (pas de livraison) |
| **Gestion autonome** | Permettre au fromager de gérer seul son catalogue, ses marchés et ses commandes depuis son smartphone |
| **Proximité** | Refléter l'image artisanale, locale et humaine de la fromagerie dans le design |
| **Mobile-first** | Le fromager (back-office) et les clients (site public) utilisent majoritairement un smartphone |

### 1.2 Contraintes du projet

- **Utilisateur unique** : un seul administrateur (le fromager), pas de gestion multi-utilisateurs
- **Budget limité** : stack gratuite ou à très faible coût (tiers gratuits Vercel, Supabase, Stripe)
- **Pas de livraison** : uniquement du click & collect (retrait sur un marché ou au local)
- **Marchés récurrents** : l'activité est hebdomadaire ; le fromager active/désactive ses marchés chaque semaine plutôt que de recréer des événements

---

## 2. Choix de la stack technique

### 2.1 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVIGATEUR                           │
│  ┌─────────────────────┐   ┌─────────────────────────────┐  │
│  │   Site public        │   │   Back-office admin         │  │
│  │   (React + Tailwind) │   │   (React + Server Actions)  │  │
│  └──────────┬──────────┘   └──────────────┬──────────────┘  │
└─────────────┼──────────────────────────────┼────────────────┘
              │ HTTPS                        │ HTTPS
┌─────────────┼──────────────────────────────┼────────────────┐
│             ▼          VERCEL              ▼                │
│  ┌──────────────────────────────────────────────────┐       │
│  │          Next.js 16 (App Router)                 │       │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐ │       │
│  │  │ Pages SSR  │  │  API Routes│  │ Server     │ │       │
│  │  │ + RSC      │  │ /api/*     │  │ Actions    │ │       │
│  │  └────────────┘  └─────┬──────┘  └─────┬──────┘ │       │
│  └────────────────────────┼───────────────┼────────┘       │
│                           │               │                 │
│  ┌───────────┐    ┌───────▼───┐   ┌───────▼──────┐         │
│  │ Middleware│    │  Stripe   │   │  Supabase    │         │
│  │ (Auth)    │    │  Checkout │   │  Client      │         │
│  └───────────┘    │  Webhook  │   │  (anon key)  │         │
│                   └───────────┘   └──────────────┘         │
└─────────────────────────────────────────────────────────────┘
              │                            │
              ▼                            ▼
┌──────────────────┐          ┌──────────────────────────┐
│    Stripe API    │          │    Supabase Cloud         │
│  (paiement CB)   │          │  ┌──────────────────────┐│
└──────────────────┘          │  │  PostgreSQL (BDD)    ││
                              │  │  + Row Level Security││
┌──────────────────┐          │  ├──────────────────────┤│
│    Resend API    │          │  │  Storage (images)    ││
│  (email transac.)│          │  ├──────────────────────┤│
└──────────────────┘          │  │  Auth (sessions)     ││
                              │  └──────────────────────┘│
┌──────────────────┐          └──────────────────────────┘
│  Elfsight Widget │
│  (Instagram feed)│
└──────────────────┘
```

### 2.2 Justification de chaque technologie

| Technologie | Rôle | Justification par rapport au besoin |
|-------------|------|-------------------------------------|
| **Next.js 16 (App Router)** | Framework full-stack | SSR pour le SEO (vitrine), Server Components pour la performance, Server Actions pour le back-office. Un seul projet couvre le site public et l'admin, sans séparer front et back. |
| **TypeScript** | Typage statique | Fiabilité du code sur les données critiques (prix en centimes, stocks, statuts de commande). Types Supabase auto-générés. |
| **Tailwind CSS v4** | Styles | Développement rapide mobile-first sans CSS custom. Thème centralisé (couleurs artisanales, polices). |
| **Supabase (PostgreSQL)** | BDD + Auth + Storage | Tier gratuit généreux, SDK TypeScript natif, Row Level Security intégrée, authentification prête à l'emploi. Couvre 3 besoins (données, auth, images) en un seul service. |
| **Stripe Checkout** | Paiement en ligne | Sessions hébergées par Stripe : conformité PCI-DSS sans toucher aux données bancaires. Webhook fiable pour créer les commandes uniquement après paiement confirmé. |
| **Leaflet.js + OpenStreetMap** | Carte interactive | Gratuit et open source, parfait pour afficher les marchés géolocalisés. Pas de clé API requise. |
| **Resend** | Email transactionnel | Envoi de l'email de confirmation de retrait au client. API simple, tier gratuit suffisant. |
| **Elfsight** | Widget Instagram | Intégration du flux Instagram sans passer par l'API Meta (complexité OAuth évitée). Fallback gracieux si le widget ne charge pas. |
| **Vercel** | Hébergement | Déploiement automatique depuis Git, edge functions, CDN global. Intégration native avec Next.js. |

---

## 3. Architecture applicative

### 3.1 Organisation du code (App Router)

```
src/
├── app/                          # Routes et pages (App Router)
│   ├── layout.tsx                # Layout racine (polices, metadata, LayoutShell)
│   ├── globals.css               # Styles globaux + thème Tailwind
│   ├── page.tsx                  # Page d'accueil
│   ├── artisan/page.tsx          # Page artisan (storytelling)
│   ├── marches/page.tsx          # Page marchés (carte + liste)
│   ├── boutique/
│   │   ├── page.tsx              # Catalogue produits
│   │   └── [slug]/page.tsx       # Fiche produit détaillée
│   ├── actu/page.tsx             # Actualités + Instagram
│   ├── panier/page.tsx           # Tunnel de commande (3 étapes)
│   ├── confirmation/page.tsx     # Confirmation post-paiement
│   ├── contact/page.tsx          # Coordonnées et horaires
│   ├── mentions-legales/page.tsx # Mentions légales
│   ├── cgv/page.tsx              # Conditions générales de vente
│   ├── confidentialite/page.tsx  # Politique RGPD
│   ├── robots.ts                 # robots.txt dynamique
│   ├── sitemap.ts                # Sitemap XML dynamique
│   ├── api/
│   │   ├── checkout/route.ts     # Création de session Stripe
│   │   └── webhooks/stripe/route.ts  # Webhook Stripe
│   └── admin/                    # Back-office (protégé par middleware)
│       ├── layout.tsx            # Layout admin
│       ├── page.tsx              # Tableau de bord
│       ├── login/page.tsx        # Connexion
│       ├── produits/             # CRUD produits
│       ├── marches/              # CRUD marchés
│       ├── commandes/            # Gestion des commandes
│       ├── categories/           # Gestion des catégories
│       └── actualites/           # CRUD actualités
├── components/                   # Composants réutilisables
│   ├── TabBar.tsx                # Navigation bottom bar (5 onglets)
│   ├── Topbar.tsx                # Barre supérieure (titre + retour)
│   ├── LayoutShell.tsx           # Shell global (TabBar conditionnel)
│   ├── MarchesMap.tsx            # Carte Leaflet
│   ├── InstagramFeed.tsx         # Widget Instagram Elfsight
│   ├── Button.tsx, Eyebrow.tsx, Chip.tsx, PhotoSlot.tsx  # Design system
│   └── admin/                    # Composants back-office
│       ├── AdminShell.tsx        # Shell admin
│       ├── FormField.tsx         # Champs de formulaire
│       ├── ImageUpload.tsx       # Upload vers Supabase Storage
│       ├── ProduitForm.tsx, MarcheForm.tsx, ActualiteForm.tsx
│       └── ToggleSwitch.tsx, ClickStop.tsx, LogoutButton.tsx
├── lib/                          # Logique métier et configuration
│   ├── cart.tsx                  # Context React panier (localStorage)
│   ├── stripe.ts                 # Client Stripe (côté serveur)
│   ├── utils.ts                  # Utilitaires
│   ├── config/site.ts            # Constantes du site (infos légales)
│   ├── email/sendPickupEmail.ts  # Template email de confirmation
│   └── supabase.ts               # Client Supabase (legacy)
├── utils/supabase/               # Clients Supabase par contexte
│   ├── client.ts                 # Client navigateur (anon key)
│   ├── server.ts                 # Client Server Component (cookies)
│   ├── admin.ts                  # Client admin (service_role key)
│   ├── middleware.ts             # Renouvellement session + garde /admin
│   └── database.types.ts        # Types TypeScript auto-générés
└── middleware.ts                 # Point d'entrée middleware Next.js
```

### 3.2 Séparation des responsabilités

L'application distingue trois couches claires, justifiées par les besoins du projet :

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| **Présentation** (UI) | React (RSC + Client Components) + Tailwind | Le site vitrine utilise des Server Components pour le SEO et la performance. Les interactions (panier, carte, toggles) utilisent des Client Components. |
| **Logique métier** (serveur) | Server Actions + API Routes | Les Server Actions gèrent le CRUD du back-office (validation serveur, pas d'API REST exposée). Les API Routes gèrent le checkout Stripe et le webhook. |
| **Données** | Supabase (PostgreSQL + RLS) | La base de données est protégée par Row Level Security : les policies définissent qui peut lire/écrire quoi, indépendamment du code applicatif. |

---

## 4. Modèle de données

### 4.1 Schéma relationnel (6 tables)

```
┌──────────────┐      ┌──────────────────┐
│  categories  │──1:N──▶    produits      │
│  (familles)  │       │  (fromages)      │
└──────────────┘       └────────┬─────────┘
                                │
                                │ 1:N
                                ▼
                       ┌──────────────────┐
┌──────────────┐       │ commande_items   │
│   marches    │       │ (lignes cmd)     │
│ (tournée)    │       └────────┬─────────┘
└──────┬───────┘                │ N:1
       │ 1:N                   │
       ▼                       ▼
┌──────────────────────────────────────┐
│            commandes                 │
│  (créées uniquement par webhook)     │
└──────────────────────────────────────┘

┌──────────────┐
│  actualites  │  (table indépendante)
└──────────────┘
```

### 4.2 Justification des choix de modélisation

| Choix | Raison |
|-------|--------|
| **Prix en centimes (int)** | Éviter les erreurs d'arrondi avec les nombres flottants. `590` = 5,90 EUR. Standard du e-commerce. |
| **Snapshot dans `commande_items`** | Le nom et le prix du produit sont figés au moment de la commande. Si le fromager modifie un prix ensuite, les commandes passées restent correctes. |
| **`jour_semaine` + `actif`** | Le fromager ne recrée pas ses marchés chaque semaine : il active/désactive un marché récurrent. Adapté à son rythme de travail itinérant. |
| **`stock` nullable** | Certains produits (fromages coupés) n'ont pas de stock suivi (`null` = illimité). D'autres (pièces entières) sont suivis en stock. |
| **Machine à états `statut`** | Cycle de vie clair : `en_attente` -> `preparee` -> `retiree` (ou `annulee`). Transitions validées côté serveur. |
| **Pas de table `users`** | Un seul utilisateur (le fromager). Supabase Auth gère l'authentification sans table custom. |

---

## 5. Sécurité

### 5.1 Row Level Security (RLS)

Chaque table a des policies RLS activées qui contrôlent l'accès au niveau de la base de données :

| Table | Lecture (anon) | Lecture (authenticated) | Écriture (authenticated) |
|-------|---------------|------------------------|--------------------------|
| `categories` | Toutes | Toutes | CRUD complet |
| `produits` | Toutes | Toutes | CRUD complet |
| `marches` | Toutes | Toutes | CRUD complet |
| `actualites` | Uniquement `publie = true` | Toutes | CRUD complet |
| `commandes` | Aucun accès | Lecture + mise à jour | Via webhook uniquement (service_role) |
| `commande_items` | Aucun accès | Lecture | Via webhook uniquement (service_role) |

**Justification** : Les commandes ne sont jamais créées depuis le navigateur. Le webhook Stripe utilise la clé `service_role` (qui contourne la RLS) pour écrire les commandes uniquement après confirmation du paiement.

### 5.2 Authentification et protection des routes

```
Requête HTTP
    │
    ▼
middleware.ts  ──▶  updateSession()
    │                   │
    │    ┌──────────────┴──────────────┐
    │    │ Route /admin/* ?             │
    │    │   └─ Pas de session ?        │
    │    │       └─ Redirect /admin/login│
    │    │   └─ Déjà sur /login + user ? │
    │    │       └─ Redirect /admin      │
    │    └─────────────────────────────┘
    │
    ▼
Page rendue
```

- **Middleware Next.js** : intercepte toutes les requêtes, renouvelle la session Supabase, et redirige les utilisateurs non authentifiés vers `/admin/login`
- **Supabase Auth** : connexion par email + mot de passe, session cookie HTTP-only
- **Pas d'inscription publique** : le compte admin est créé manuellement dans Supabase

### 5.3 Sécurité du paiement

- **Stripe Checkout (sessions hébergées)** : les données bancaires ne transitent jamais par le serveur, conformité PCI-DSS assurée par Stripe
- **Vérification de signature** : le webhook vérifie la signature Stripe avant de traiter l'événement
- **Validation serveur** : l'API `/api/checkout` vérifie la disponibilité et le stock de chaque produit avant de créer la session Stripe
- **Prix recalculés serveur** : le webhook relit les prix en base (pas ceux envoyés par le client) pour calculer le total

---

## 6. Flux de données

### 6.1 Tunnel de commande (click & collect)

```
CLIENT (navigateur)                    SERVEUR (Next.js / Vercel)              SERVICES TIERS
─────────────────                      ──────────────────────────              ──────────────

1. Ajouter au panier
   └─ localStorage (nftuf-cart)

2. Remplir coordonnées
   └─ State React (PanierClient)

3. Choisir point de retrait
   └─ State React

4. Cliquer « Payer »
   └─ POST /api/checkout ──────────▶ Validation panier + stock
                                      Création session Stripe ──────────────▶ Stripe API
                                      Retour URL checkout    ◀──────────────
   ◀───── Redirect vers Stripe

5. Paiement sur Stripe                                                       Stripe Checkout
                                                                              │
6.                                    POST /api/webhooks/stripe ◀─────────── Webhook (session.completed)
                                      │
                                      ├─ Vérification signature
                                      ├─ Lecture produits en BDD ──────────▶ Supabase
                                      ├─ Création commande ────────────────▶ Supabase
                                      ├─ Création commande_items ──────────▶ Supabase
                                      ├─ Décrémentation stock ─────────────▶ Supabase
                                      └─ Envoi email confirmation ─────────▶ Resend
                                                                              │
7. Page /confirmation                                                         └─▶ Email au client
   └─ Vide le panier (localStorage)                                               + BCC artisan
```

### 6.2 Gestion du panier (côté client)

Le panier est entièrement géré côté client via un Context React (`CartProvider`) et persisté en `localStorage` :

- **Aucune donnée panier ne transite par le serveur** avant le checkout
- **Raison** : pas de compte client, pas de panier serveur. Simplicité maximale pour un usage mobile rapide
- **Clé de stockage** : `nftuf-cart`
- **Fonctions** : `addItem`, `updateQuantity`, `removeItem`, `clearCart`
- **Valeurs calculées** : `totalCents`, `totalItems`

### 6.3 Back-office (Server Actions)

```
Artisan (smartphone)                   Serveur (Next.js)                     Supabase
────────────────────                   ──────────────────                     ────────

Formulaire React
    │
    └─ Submit ──────────────────────▶ Server Action ("use server")
                                      │
                                      ├─ Validation des données
                                      ├─ Upload image (si fichier) ────────▶ Storage (bucket)
                                      ├─ Insert/Update/Delete ─────────────▶ PostgreSQL
                                      └─ revalidatePath() ──▶ Cache invalidé
                                      │
    ◀── Redirect ou revalidation ────┘
```

**Justification de Server Actions vs API REST** : les Server Actions sont appelées directement depuis le formulaire React. Aucune API REST n'est exposée publiquement pour les opérations CRUD, ce qui réduit la surface d'attaque.

---

## 7. Design system et approche mobile-first

### 7.1 Polices

| Police | Usage | Justification |
|--------|-------|---------------|
| **Fraunces** (serif) | Titres, hero, storytelling | Typographie organique avec des courbes artisanales, cohérente avec l'image de la fromagerie |
| **Inter** (sans-serif) | Corps de texte, formulaires | Lisibilité optimale sur mobile, excellente gestion des petits corps |
| **JetBrains Mono** (monospace) | Tags, badges, données techniques | Distinction visuelle pour les informations structurées (prix, unités) |

### 7.2 Palette

| Couleur | Hex | Usage |
|---------|-----|-------|
| Vert profond | `#1d5b3a` | Couleur primaire, CTAs, hero, sections fortes |
| Crème | `#f4ecd8` | Fond principal, texte sur vert |
| Encre | `#1a1a17` | Texte principal, contrastes |

### 7.3 Navigation mobile-first

- **TabBar fixe en bas** : 5 onglets (Accueil, Marchés, Boutique, Actu, Panier) avec badge panier
- **Topbar contextuelle** : titre de page + bouton retour sur les pages internes
- **Masquage automatique** : la TabBar est masquée sur les pages admin et légales via `LayoutShell`

---

## 8. Performance et SEO

### 8.1 Server-Side Rendering et React Server Components

| Type de page | Rendu | Justification |
|--------------|-------|---------------|
| Accueil, Artisan, Contact | RSC (Server) | Contenu éditorial statique ou semi-dynamique, SEO critique |
| Boutique, Marchés, Actu | RSC + données Supabase | Catalogue et marchés rendus côté serveur pour l'indexation |
| Fiche produit (`/boutique/[slug]`) | RSC dynamique | Metadata dynamiques + JSON-LD pour le SEO produit |
| Panier | Client Component | Interactivité pure, pas de SEO nécessaire |
| Admin | Client + Server Actions | Pas indexé par les moteurs de recherche |

### 8.2 SEO technique

- **Metadata dynamiques** : `title`, `description`, Open Graph et Twitter Cards sur chaque page
- **JSON-LD** : Schema.org `LocalBusiness` sur l'accueil, `Product` sur les fiches produit
- **Sitemap XML dynamique** (`/sitemap.ts`) : toutes les pages publiques + fiches produits
- **robots.txt dynamique** (`/robots.ts`) : autorise l'indexation, bloque `/admin`

---

## 9. Services tiers et variables d'environnement

### 9.1 Services utilisés

| Service | Tier | Usage |
|---------|------|-------|
| **Vercel** | Hobby (gratuit) | Hébergement, CDN, edge functions |
| **Supabase** | Free tier | PostgreSQL, Auth, Storage |
| **Stripe** | Commission par transaction | Paiement sécurisé |
| **Resend** | Free tier (100 emails/jour) | Email de confirmation de retrait |
| **Elfsight** | Free tier | Widget Instagram |

### 9.2 Variables d'environnement requises

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clé publique (anon) Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé admin Supabase (serveur uniquement) |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe |
| `STRIPE_WEBHOOK_SECRET` | Secret de signature du webhook |
| `RESEND_API_KEY` | Clé API Resend |

**Sécurité** : seules les variables préfixées `NEXT_PUBLIC_` sont exposées au navigateur. Les clés secrètes (Supabase service_role, Stripe, Resend) ne sont jamais envoyées au client.

---

## 10. Déploiement

### 10.1 Pipeline

```
Git push (master)
    │
    ▼
Vercel (CI/CD automatique)
    │
    ├─ Build Next.js (npm run build)
    ├─ Déploiement edge + serverless functions
    └─ URL de production : nenfaitpastoutunfromage.fr
```

### 10.2 Commandes

```bash
npm run dev     # Serveur de développement (localhost:3000)
npm run build   # Build de production
npm run lint    # Vérification ESLint
```

---

## 11. Évolutions possibles (V2)

| Fonctionnalité | Motivation |
|----------------|------------|
| Notifications push | Alerter l'artisan d'une nouvelle commande en temps réel |
| Statistiques / dashboard | Chiffre d'affaires, top produits, fréquentation par marché |
| Export CSV/PDF | Export des commandes pour la comptabilité |
| Multi-utilisateurs | Rôles (admin, employé) si l'activité se développe |
| Programme de fidélité | Fidéliser la clientèle récurrente des marchés |
| PWA | Installation sur l'écran d'accueil pour le back-office mobile |
