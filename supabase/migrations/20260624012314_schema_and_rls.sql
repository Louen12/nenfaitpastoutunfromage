-- ============================================================
-- Phase 1 : Schéma complet + RLS + policies
-- ============================================================

-- 1. CATEGORIES
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nom text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- 2. PRODUITS
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

-- 3. MARCHES
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

-- 5. COMMANDE_ITEMS
create table public.commande_items (
  id uuid primary key default gen_random_uuid(),
  commande_id uuid not null references public.commandes(id) on delete cascade,
  produit_id uuid references public.produits(id) on delete set null,
  nom_produit text not null,
  unite_label text,
  prix_unitaire_cents int not null check (prix_unitaire_cents >= 0),
  quantite int not null check (quantite > 0)
);

-- 6. ACTUALITES
create table public.actualites (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  titre text not null,
  contenu text,
  image_url text,
  publie boolean not null default false,
  position int not null default 0
);

-- ============================================================
-- Trigger updated_at automatique sur produits et marches
-- ============================================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_produits
  before update on public.produits
  for each row execute function public.handle_updated_at();

create trigger set_updated_at_marches
  before update on public.marches
  for each row execute function public.handle_updated_at();

-- ============================================================
-- Index utiles
-- ============================================================

create index idx_produits_categorie on public.produits(categorie_id);
create index idx_produits_slug on public.produits(slug);
create index idx_marches_jour on public.marches(jour_semaine);
create index idx_commandes_statut on public.commandes(statut);
create index idx_commandes_paiement on public.commandes(paiement_statut);
create index idx_commande_items_commande on public.commande_items(commande_id);

-- ============================================================
-- RLS : activation
-- ============================================================

alter table public.categories      enable row level security;
alter table public.produits        enable row level security;
alter table public.marches         enable row level security;
alter table public.commandes       enable row level security;
alter table public.commande_items  enable row level security;
alter table public.actualites      enable row level security;

-- ============================================================
-- RLS : policies — lecture publique
-- ============================================================

create policy "lecture publique categories"
  on public.categories for select
  using (true);

create policy "lecture publique produits"
  on public.produits for select
  using (true);

create policy "lecture publique marches"
  on public.marches for select
  using (true);

create policy "lecture publique actualites"
  on public.actualites for select
  using (publie = true);

-- ============================================================
-- RLS : policies — écriture admin (authenticated)
-- ============================================================

create policy "admin gere categories"
  on public.categories for all
  to authenticated
  using (true) with check (true);

create policy "admin gere produits"
  on public.produits for all
  to authenticated
  using (true) with check (true);

create policy "admin gere marches"
  on public.marches for all
  to authenticated
  using (true) with check (true);

create policy "admin gere actualites"
  on public.actualites for all
  to authenticated
  using (true) with check (true);

-- ============================================================
-- RLS : policies — commandes (aucun accès anon, lecture+maj admin)
-- ============================================================

create policy "admin lit commandes"
  on public.commandes for select
  to authenticated
  using (true);

create policy "admin maj commandes"
  on public.commandes for update
  to authenticated
  using (true) with check (true);

create policy "admin lit items"
  on public.commande_items for select
  to authenticated
  using (true);
