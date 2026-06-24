"use client";

import { useState } from "react";
import Link from "next/link";
import { type Tables } from "@/utils/supabase/database.types";
import { centsToEuros } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import Chip from "@/components/Chip";

type Produit = Tables<"produits"> & { categories: { nom: string } | null };
type Categorie = Tables<"categories">;

export default function BoutiqueGrid({
  produits,
  categories,
}: {
  produits: Produit[];
  categories: Categorie[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { addItem } = useCart();

  const filtered = activeCategory
    ? produits.filter((p) => p.categorie_id === activeCategory)
    : produits;

  function handleAdd(p: Produit) {
    addItem({
      produit_id: p.id,
      nom: p.nom,
      slug: p.slug,
      prix_cents: p.prix_cents,
      unite_label: p.unite_label,
      image_url: p.image_url,
    });
  }

  const isRupture = (p: Produit) => p.stock !== null && p.stock <= 0;
  const isLow = (p: Produit) => p.stock !== null && p.stock > 0 && p.stock <= 3;

  return (
    <>
      {/* Category filters */}
      <div className="mt-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none">
        <button
          onClick={() => setActiveCategory(null)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-sans font-semibold transition-colors ${
            activeCategory === null
              ? "bg-encre text-creme-clair"
              : "bg-creme text-texte hover:bg-ligne"
          }`}
        >
          Tous
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-sans font-semibold transition-colors ${
              activeCategory === cat.id
                ? "bg-encre text-creme-clair"
                : "bg-creme text-texte hover:bg-ligne"
            }`}
          >
            {cat.nom}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="px-4 pt-3 pb-8 grid grid-cols-2 gap-3">
        {filtered.map((p) => {
          const rupture = isRupture(p);
          return (
            <div
              key={p.id}
              className="relative flex flex-col rounded-xl bg-white border border-ligne overflow-hidden"
            >
              <Link href={`/boutique/${p.slug}`} className="relative block">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.nom} className="h-36 w-full object-cover" />
                ) : (
                  <div className="h-36 w-full bg-kraft/30 flex items-center justify-center">
                    <span className="text-2xl">🧀</span>
                  </div>
                )}
                {rupture && (
                  <div className="absolute inset-0 flex items-center justify-center bg-encre/40 backdrop-blur-[2px]">
                    <Chip tone="dark" sm>Rupture</Chip>
                  </div>
                )}
                {isLow(p) && !rupture && (
                  <div className="absolute top-2 left-2">
                    <Chip tone="rouge" sm>Plus que {p.stock}</Chip>
                  </div>
                )}
                {p.aop && !rupture && (
                  <div className="absolute top-2 right-2">
                    <Chip tone="open" sm>AOP</Chip>
                  </div>
                )}
              </Link>

              <div className="flex flex-col gap-1 p-3 flex-1">
                <Link href={`/boutique/${p.slug}`}>
                  <p className="text-sm font-serif font-medium text-encre leading-snug line-clamp-2">
                    {p.nom}
                  </p>
                </Link>
                <div className="flex items-baseline gap-1 mt-auto">
                  <span className="text-base font-serif font-bold text-encre">
                    {centsToEuros(p.prix_cents)}&nbsp;€
                  </span>
                  <span className="text-[10px] font-sans text-mute">
                    / {p.unite_label}
                  </span>
                </div>
              </div>

              {!rupture && (
                <button
                  onClick={() => handleAdd(p)}
                  className="absolute bottom-3 right-3 flex items-center justify-center size-8 rounded-full bg-vert text-creme-clair shadow-sm hover:bg-vert-prof transition-colors"
                  aria-label={`Ajouter ${p.nom}`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="size-4">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
