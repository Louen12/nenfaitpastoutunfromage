-- ============================================================
-- Phase 2 : Buckets Storage + policies
-- ============================================================

-- Bucket "produits" (photos fromages)
insert into storage.buckets (id, name, public)
values ('produits', 'produits', true);

-- Bucket "actualites" (visuels nouveautés)
insert into storage.buckets (id, name, public)
values ('actualites', 'actualites', true);

-- ============================================================
-- Policies Storage — lecture publique
-- ============================================================

create policy "lecture publique produits"
  on storage.objects for select
  using (bucket_id = 'produits');

create policy "lecture publique actualites"
  on storage.objects for select
  using (bucket_id = 'actualites');

-- ============================================================
-- Policies Storage — upload (authenticated)
-- ============================================================

create policy "admin upload produits"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'produits');

create policy "admin upload actualites"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'actualites');

-- ============================================================
-- Policies Storage — update (authenticated)
-- ============================================================

create policy "admin update produits"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'produits');

create policy "admin update actualites"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'actualites');

-- ============================================================
-- Policies Storage — suppression (authenticated)
-- ============================================================

create policy "admin delete produits"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'produits');

create policy "admin delete actualites"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'actualites');
