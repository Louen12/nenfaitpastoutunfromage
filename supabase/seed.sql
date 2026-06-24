-- ============================================================
-- Seed : données de test cohérentes avec les maquettes
-- ============================================================

-- Catégories
insert into public.categories (slug, nom, position) values
  ('pates-pressees', 'Pâtes pressées', 1),
  ('pates-molles', 'Pâtes molles', 2),
  ('bleus', 'Bleus', 3),
  ('chevres', 'Chèvres', 4),
  ('paniers', 'Paniers', 5);

-- Produits
insert into public.produits (nom, slug, description, prix_cents, unite_label, categorie_id, disponible, lait, affinage, producteur, distance_km, region, aop, conseil_fromager, en_avant, position) values
  (
    'Comté 24 mois',
    'comte-24-mois',
    'Un Comté longuement affiné aux arômes de noisette et de fruits secs. Pâte dorée, texture fondante.',
    890, '200g',
    (select id from public.categories where slug = 'pates-pressees'),
    true, 'Vache (Montbéliarde)', '24 mois', 'Ferme du Vallon', 410, 'Jura', true,
    'Se marie parfaitement avec un vin jaune du Jura ou un pain aux noix.',
    true, 1
  ),
  (
    'Camembert fermier',
    'camembert-fermier',
    'Camembert au lait cru, croûte fleurie et cœur crémeux. Affiné dans nos caves.',
    650, 'pièce',
    (select id from public.categories where slug = 'pates-molles'),
    true, 'Vache (Normande)', '4 semaines', 'Fromagerie Marchand', 220, 'Normandie', false,
    'À déguster à température ambiante, sorti 1h avant. Accompagnez-le d''un cidre brut.',
    false, 2
  ),
  (
    'Bleu d''Auvergne AOP',
    'bleu-dauvergne-aop',
    'Un bleu puissant et crémeux, persillé de moisissures nobles. Caractère affirmé.',
    720, '200g',
    (select id from public.categories where slug = 'bleus'),
    true, 'Vache', '3 mois', 'GAEC Bouvier', 380, 'Auvergne', true,
    'Idéal avec un Sauternes ou un porto. Essayez-le avec du miel de châtaignier.',
    false, 3
  ),
  (
    'Crottin de Chavignol',
    'crottin-de-chavignol',
    'Petit fromage de chèvre au goût délicat, du mi-sec au sec selon l''affinage.',
    480, 'pièce',
    (select id from public.categories where slug = 'chevres'),
    true, 'Chèvre', '3 à 8 semaines', 'Chèvrerie de l''Yonne', 180, 'Berry', true,
    'Mi-sec sur une salade de mesclun, ou sec rapé sur des pâtes.',
    false, 4
  ),
  (
    'Saint-Nectaire AOP',
    'saint-nectaire-aop',
    'Fromage onctueux à croûte grise, aux saveurs de noisette et de cave.',
    940, '250g',
    (select id from public.categories where slug = 'pates-pressees'),
    true, 'Vache (Salers)', '6 semaines', 'Ferme des Volcans', 390, 'Auvergne', true,
    'Excellent fondu sur des pommes de terre ou simplement avec du bon pain de campagne.',
    true, 5
  ),
  (
    'Panier découverte',
    'panier-decouverte',
    '4 fromages sélectionnés par le fromager : un assortiment pour découvrir nos terroirs.',
    3200, '4 fromages',
    (select id from public.categories where slug = 'paniers'),
    true, null, null, null, null, null, false,
    'Le cadeau idéal pour les amateurs. Composition variable selon les arrivages.',
    true, 6
  );

-- Marchés
insert into public.marches (nom, commune, code_postal, departement, adresse, latitude, longitude, jour_semaine, heure_debut, heure_fin, type, point_retrait, actif, position) values
  (
    'Marché Notre-Dame',
    'Versailles', '78000', '78',
    'Place du Marché Notre-Dame',
    48.8049, 2.1204,
    3, '07:00', '13:00',
    'itinerant', true, true, 1
  ),
  (
    'Marché de Boulogne',
    'Boulogne-Billancourt', '92100', '92',
    'Place Marcel Sembat',
    48.8354, 2.2428,
    4, '08:00', '14:00',
    'itinerant', true, true, 2
  ),
  (
    'Marché d''Antony',
    'Antony', '92160', '92',
    'Place du Marché',
    48.7539, 2.2975,
    5, '07:00', '13:30',
    'itinerant', true, true, 3
  ),
  (
    'Local · Massy',
    'Massy', '91300', '91',
    '12 rue du Fromage',
    48.7304, 2.2713,
    6, '09:00', '12:00',
    'local_fixe', true, true, 4
  ),
  (
    'Marché de Sceaux',
    'Sceaux', '92330', '92',
    'Place du Marché',
    48.7761, 2.2889,
    0, '08:00', '13:00',
    'itinerant', true, true, 5
  );

-- Actualités
insert into public.actualites (titre, contenu, publie, position) values
  (
    'Nouvel arrivage de Comté 24 mois',
    'Tout droit venu des caves du Jura, notre Comté 24 mois est de retour ! Une pâte dorée, un goût de noisette incroyable. Disponible dès samedi sur les marchés.',
    true, 1
  ),
  (
    'Fermeture exceptionnelle le 14 juillet',
    'Le local de Massy sera fermé le 14 juillet. Retrouvez-nous dès le lendemain sur le marché de Versailles !',
    true, 2
  );
