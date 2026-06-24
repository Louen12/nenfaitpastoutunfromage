# Mission — Backend & back-office « N'enFaitPasToutUnFromage »

Tu es mon agent de développement sur ce projet. L'app front (Next.js App Router + TypeScript + Tailwind) et la connexion Supabase (`utils/supabase/client.ts`, `server.ts`, `middleware.ts`) sont **déjà en place**. Ta mission : construire toute la couche **backend + back-office** décrite ci-dessous.

Travaille **par phases** (voir la fin du document), en t'arrêtant après chaque phase pour me laisser vérifier. N'invente pas de secrets, ne les expose jamais côté client, et active la RLS sur **toutes** les tables.

---

## 1. Contexte produit (résumé)

Site mobile-first pour un **fromager artisanal itinérant** (un camion, plusieurs marchés par semaine + un marché fixe au local). Stack : **Next.js + Tailwind + Supabase (PostgreSQL) + Stripe + Leaflet + Vercel**.

Le site public propose : présentation de l'artisan, carte + liste des marchés de la semaine, boutique avec fiches produits, et un tunnel **click & collect** (panier → choix du point de retrait → paiement Stripe → confirmation).

Le **back-office** est utilisé par l'artisan **depuis son smartphone**. Il doit pouvoir : gérer ses fromages (CRUD + stock + photos), gérer les marchés de la semaine, consulter et faire avancer le statut des commandes, et gérer une section « actualités/nouveautés ».

## 2. Hypothèses de conception (à respecter)

- **Un seul utilisateur** : l'artisan. Désactiver l'inscription publique dans Supabase Auth. Toute personne authentifiée est considérée comme admin (pas de table de rôles nécessaire à ce stade).
- **Marchés récurrents hebdomadaires** : chaque marché a un `jour_semaine` et un booléen `actif` (présent cette semaine ou non). L'artisan active/désactive plutôt que de recréer.
- **Argent en centimes** : tous les montants sont des entiers (`prix_cents`, `total_cents`). Jamais de float.
- **Les commandes ne sont JAMAIS écrites depuis le navigateur.** Elles sont créées côté serveur, dans le webhook Stripe, après confirmation du paiement (avec la clé secrète Supabase qui contourne la RLS). Le client n'a pas de compte.
- **Migrations versionnées** : tout le schéma passe par des fichiers de migration Supabase CLI (`supabase/migrations`), pas par des modifs manuelles dans le dashboard.

## 3. Modèle de données (migrations SQL)

Crée une migration Supabase contenant le schéma suivant. Adapte si une contrainte te paraît incorrecte, mais garde les noms de champs (ils mappent sur les maquettes).

```sql
-- 1. CATEGORIES (familles de fromages : pâtes pressées, pâtes molles, bleus…)
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nom text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- 2. PRODUITS (fromages)
create table public.produits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  nom text not null,
  slug text unique not null,
  description text,
  prix_cents int not null check (prix_cents >= 0),
  unite_label text not null default 'pièce',
  categorie_id uuid references public.categories(id) on delete set null,
  image_url text,
  stock int,
  disponible boolean not null default true,
  lait text,
  affinage text,
  producteur text,
  distance_km int,
  region text,
  aop boolean not null default false,
  conseil_fromager text,
  en_avant boolean not null default false,
  position int not null default 0
);

-- 3. MARCHES (tournée hebdomadaire + local fixe)
create table public.marches (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  nom text not null,
  commune text not null,
  code_postal text,
  departement text,
  adresse text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  jour_semaine int check (jour_semaine between 0 and 6),
  heure_debut time,
  heure_fin time,
  type text not null default 'itinerant' check (type in ('itinerant','local_fixe')),
  point_retrait boolean not null default true,
  actif boolean not null default true,
  position int not null default 0
);

-- 4. COMMANDES
create table public.commandes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  numero serial,
  client_nom text not null,
  client_email text not null,
  client_telephone text,
  total_cents int not null check (total_cents >= 0),
  statut text not null default 'en_attente'
    check (statut in ('en_attente','preparee','retiree','annulee')),
  paiement_statut text not null default 'pending'
    check (paiement_statut in ('pending','paye','echoue','rembourse')),
  retrait_type text not null check (retrait_type in ('local','marche')),
  retrait_marche_id uuid references public.marches(id) on delete set null,
  retrait_date date,
  retrait_creneau text,
  stripe_session_id text,
  stripe_payment_intent_id text
);

-- 5. COMMANDE_ITEMS (lignes de commande, avec snapshot du produit)
create table public.commande_items (
  id uuid primary key default gen_random_uuid(),
  commande_id uuid not null references public.commandes(id) on delete cascade,
  produit_id uuid references public.produits(id) on delete set null,
  nom_produit text not null,
  unite_label text,
  prix_unitaire_cents int not null check (prix_unitaire_cents >= 0),
  quantite int not null check (quantite > 0)
);

-- 6. ACTUALITES (nouveautés gérées depuis le back-office)
create table public.actualites (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  titre text not null,
  contenu text,
  image_url text,
  publie boolean not null default false,
  position int not null default 0
);
```

## 4. Sécurité — Row Level Security (RLS)

```sql
alter table public.categories      enable row level security;
alter table public.produits        enable row level security;
alter table public.marches         enable row level security;
alter table public.commandes       enable row level security;
alter table public.commande_items  enable row level security;
alter table public.actualites      enable row level security;

-- Lecture publique (anon + authenticated)
create policy "lecture publique categories" on public.categories for select using (true);
create policy "lecture publique produits"   on public.produits   for select using (true);
create policy "lecture publique marches"    on public.marches    for select using (true);
create policy "lecture publique actualites" on public.actualites for select using (publie = true);

-- Écriture réservée à l'artisan (authenticated)
create policy "admin gere categories" on public.categories for all to authenticated using (true) with check (true);
create policy "admin gere produits"   on public.produits   for all to authenticated using (true) with check (true);
create policy "admin gere marches"    on public.marches    for all to authenticated using (true) with check (true);
create policy "admin gere actualites" on public.actualites for all to authenticated using (true) with check (true);

-- COMMANDES : aucune policy pour anon => aucun accès navigateur.
create policy "admin lit commandes"     on public.commandes      for select to authenticated using (true);
create policy "admin maj commandes"     on public.commandes      for update to authenticated using (true) with check (true);
create policy "admin lit items"         on public.commande_items for select to authenticated using (true);
```

## 5. Stockage des images (Supabase Storage)

- Deux buckets **publics** : `produits` et `actualites`.
- Policies storage : lecture publique, upload/suppression réservés au rôle `authenticated`.

## 6. Types TypeScript

Génère les types depuis le schéma et place-les dans `utils/supabase/database.types.ts`.

## 7. Authentification de l'artisan

- Désactiver l'inscription publique (Auth settings).
- Page `/admin/login` : connexion email + mot de passe via `signInWithPassword`.
- Protection de toutes les routes `/admin/*` via middleware.

## 8. Back-office (écrans, mobile-first)

- `/admin` — tableau de bord
- `/admin/produits` — CRUD + toggle disponibilité + stock + upload photo
- `/admin/marches` — liste + toggle actif + édition
- `/admin/commandes` — liste filtrable + changement de statut
- `/admin/actualites` — CRUD + publication

## 9. Stripe — checkout & création de commande

- Route Handler `/api/checkout` (POST)
- Webhook `/api/webhooks/stripe` (POST)
- Page de confirmation

## 10. Données de seed

Catégories, fromages, marchés franciliens, actualités de test.

---

## Ordre d'exécution

1. **Schéma + RLS** : migration des 6 tables + activation RLS + policies.
2. **Storage + types** : buckets + policies storage, puis génération des types TS.
3. **Auth + protection `/admin`** : login, garde des routes, désactivation des inscriptions.
4. **Back-office CRUD** : produits, marchés, actualités.
5. **Commandes (lecture)** : écran `/admin/commandes` + changement de statut.
6. **Stripe** : route `/api/checkout` + webhook.
7. **(Si demandé) Câblage des pages publiques** sur les données réelles.
