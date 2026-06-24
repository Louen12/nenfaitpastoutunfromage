"use client";

import Link from "next/link";

const FILTERS = [
  { key: "tous", label: "Toutes" },
  { key: "en_attente", label: "En attente" },
  { key: "preparee", label: "Préparées" },
  { key: "retiree", label: "Retirées" },
  { key: "annulee", label: "Annulées" },
];

export default function CommandeFilters({ current }: { current: string }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
      {FILTERS.map((f) => (
        <Link
          key={f.key}
          href={f.key === "tous" ? "/admin/commandes" : `/admin/commandes?statut=${f.key}`}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            current === f.key
              ? "bg-vert text-creme-clair"
              : "bg-off border border-ligne text-texte hover:bg-creme"
          }`}
        >
          {f.label}
        </Link>
      ))}
    </div>
  );
}
