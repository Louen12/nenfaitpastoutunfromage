"use client";

import { useTransition } from "react";
import { updateStatut } from "../actions";

const TRANSITIONS: Record<string, { label: string; target: string; style: string }[]> = {
  en_attente: [
    { label: "Marquer préparée", target: "preparee", style: "bg-vert text-creme-clair hover:bg-vert-prof" },
    { label: "Annuler", target: "annulee", style: "border border-rouge text-rouge hover:bg-rouge/5" },
  ],
  preparee: [
    { label: "Marquer retirée", target: "retiree", style: "bg-vert text-creme-clair hover:bg-vert-prof" },
    { label: "Annuler", target: "annulee", style: "border border-rouge text-rouge hover:bg-rouge/5" },
  ],
  retiree: [],
  annulee: [],
};

export default function StatutActions({
  id,
  statut,
}: {
  id: string;
  statut: string;
}) {
  const [isPending, startTransition] = useTransition();
  const actions = TRANSITIONS[statut] ?? [];

  if (actions.length === 0) return null;

  return (
    <div className="flex gap-2">
      {actions.map((a) => (
        <button
          key={a.target}
          disabled={isPending}
          onClick={() => startTransition(() => updateStatut(id, a.target))}
          className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold transition-colors disabled:opacity-50 ${a.style}`}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}
