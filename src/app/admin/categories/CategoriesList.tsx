"use client";

import { useTransition } from "react";
import { type Tables } from "@/utils/supabase/database.types";
import { createCategorie, deleteCategorie } from "./actions";

type Categorie = Tables<"categories">;

export default function CategoriesList({
  categories,
}: {
  categories: Categorie[];
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string, nom: string) {
    if (confirm(`Supprimer la catégorie « ${nom} » ?`)) {
      startTransition(() => deleteCategorie(id));
    }
  }

  return (
    <div className="space-y-4">
      <form action={createCategorie} className="flex gap-2">
        <input
          name="nom"
          required
          placeholder="Nouvelle catégorie…"
          className="flex-1 rounded-lg border border-ligne bg-off px-3 py-2.5 text-sm text-encre placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-vert/30 focus:border-vert"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-vert text-creme-clair px-4 py-2.5 text-xs font-semibold hover:bg-vert-prof transition-colors"
        >
          Ajouter
        </button>
      </form>

      <div className="space-y-2">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-lg bg-off border border-ligne p-3"
          >
            <span className="text-sm font-medium text-encre">{c.nom}</span>
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleDelete(c.id, c.nom)}
              className="text-xs text-rouge hover:text-rouge/80 disabled:opacity-50"
            >
              Supprimer
            </button>
          </div>
        ))}

        {categories.length === 0 && (
          <p className="text-center text-sm text-mute py-4">
            Aucune catégorie. Ajoutez-en une ci-dessus.
          </p>
        )}
      </div>
    </div>
  );
}
