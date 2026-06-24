# N'en fais pas tout un fromage — Site Web

## Projet
Site web mobile-first pour une fromagerie artisanale itinérante. Workshop client M2 MBA Expert UX/UI Design — MyDigitalSchool.

## Stack technique
- **Frontend**: Next.js (App Router) + Tailwind CSS v4
- **Backend**: Next.js API Routes
- **Base de données**: Supabase (PostgreSQL)
- **Paiement**: Stripe
- **Carte**: Leaflet.js
- **Instagram**: Instagram Basic Display API
- **Hébergement**: Vercel + Supabase cloud

## Design System
- **Fonts**: Fraunces (serif), Inter (sans), JetBrains Mono (mono)
- **Couleurs principales**: vert (#1d5b3a), creme (#f4ecd8), encre (#1a1a17)
- **Approche**: Mobile-first, artisanal, storytelling fort

## Pages (V1)
- `/` — Accueil (hero, artisan, camion, marchés, boutique preview, instagram)
- `/artisan` — Histoire du fromager
- `/marches` — Carte interactive + liste des marchés
- `/boutique` — Catalogue produits click & collect
- `/boutique/[id]` — Fiche produit
- `/actu` — Flux Instagram + actualités
- `/panier` — Panier + checkout (retrait + paiement)

## Commandes
```bash
npm run dev     # Serveur de développement
npm run build   # Build production
npm run lint    # Linter
```

## Référence
Les maquettes et documents de cadrage sont dans `reference/`.
