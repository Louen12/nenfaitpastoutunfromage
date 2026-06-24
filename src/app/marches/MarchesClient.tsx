"use client";

import { useState } from "react";
import { type Tables } from "@/utils/supabase/database.types";
import { jourLabel } from "@/lib/utils";
import Button from "@/components/Button";

type Marche = Tables<"marches">;

const JOUR_SHORT: Record<number, string> = {
  0: "Dim",
  1: "Lun",
  2: "Mar",
  3: "Mer",
  4: "Jeu",
  5: "Ven",
  6: "Sam",
};

export default function MarchesClient({ marches }: { marches: Marche[] }) {
  const [view, setView] = useState<"carte" | "liste">("liste");
  const [selected, setSelected] = useState<Marche | null>(marches[0] ?? null);

  return (
    <>
      {/* Toggle Carte / Liste */}
      <div className="px-4 pb-3">
        <div className="inline-flex rounded-full bg-encre p-0.5">
          <button
            onClick={() => setView("carte")}
            className={`rounded-full px-5 py-1.5 text-xs font-sans font-semibold transition-colors ${
              view === "carte"
                ? "bg-creme-clair text-encre"
                : "bg-transparent text-creme-clair/70 hover:text-creme-clair"
            }`}
          >
            Carte
          </button>
          <button
            onClick={() => setView("liste")}
            className={`rounded-full px-5 py-1.5 text-xs font-sans font-semibold transition-colors ${
              view === "liste"
                ? "bg-creme-clair text-encre"
                : "bg-transparent text-creme-clair/70 hover:text-creme-clair"
            }`}
          >
            Liste
          </button>
        </div>
      </div>

      {/* Carte view */}
      {view === "carte" && (
        <div className="relative">
          <div className="relative mx-4 rounded-xl bg-vert-eau/50 h-[52vh] overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle, var(--color-vert-sauge) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            {marches
              .filter((m) => m.latitude && m.longitude)
              .map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-[10px] font-mono font-bold shadow-sm whitespace-nowrap transition-colors ${
                    selected?.id === m.id
                      ? "bg-vert text-creme-clair ring-2 ring-creme-clair"
                      : "bg-creme-clair text-encre"
                  }`}
                  style={{
                    top: `${20 + i * 18}%`,
                    left: `${25 + ((i * 20) % 55)}%`,
                  }}
                >
                  {m.jour_semaine !== null ? JOUR_SHORT[m.jour_semaine] : ""} · {m.commune}
                </button>
              ))}
            <p className="absolute bottom-2 right-2 text-[9px] text-vert/50 font-mono">
              Carte Leaflet bientôt
            </p>
          </div>

          {selected && (
            <div className="mx-4 mt-3 rounded-xl bg-white p-4 shadow-sm border border-ligne">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-serif font-semibold text-encre">{selected.nom}</p>
                  <p className="mt-0.5 text-xs font-sans text-mute">
                    {selected.jour_semaine !== null ? jourLabel(selected.jour_semaine) : ""}
                    {selected.heure_debut && selected.heure_fin &&
                      ` · ${selected.heure_debut.slice(0, 5)}–${selected.heure_fin.slice(0, 5)}`}
                  </p>
                  {selected.adresse && (
                    <p className="text-xs text-mute mt-0.5">{selected.adresse}</p>
                  )}
                </div>
                <span className="shrink-0 rounded-full bg-vert-eau px-2.5 py-0.5 text-[10px] font-mono font-medium text-vert-prof">
                  {selected.type === "local_fixe" ? "Local fixe" : "Itinérant"}
                </span>
              </div>
              {selected.point_retrait && (
                <div className="mt-3">
                  <Button variant="primary" sm full>
                    Commander pour ce retrait
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Liste view */}
      {view === "liste" && (
        <div className="px-4 pb-8">
          {marches.length === 0 ? (
            <p className="text-center text-sm text-mute py-8">Aucun marché cette semaine.</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-3">
              {marches.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center gap-4 rounded-xl bg-white p-3 border border-ligne"
                >
                  <div className="flex flex-col items-center w-12 shrink-0">
                    <span className="text-2xl font-serif font-bold text-vert leading-none">
                      {m.jour_semaine !== null ? JOUR_SHORT[m.jour_semaine] : "—"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-sans font-semibold text-encre truncate">{m.nom}</p>
                    <p className="text-xs font-sans text-mute">
                      {m.commune}
                      {m.heure_debut && m.heure_fin &&
                        ` · ${m.heure_debut.slice(0, 5)}–${m.heure_fin.slice(0, 5)}`}
                    </p>
                    {m.type === "local_fixe" && (
                      <span className="mt-1 inline-block rounded-full bg-vert-eau px-2 py-0.5 text-[10px] font-mono text-vert-prof">
                        Point fixe
                      </span>
                    )}
                  </div>
                  {m.point_retrait && (
                    <span className="shrink-0 text-[10px] font-medium text-vert bg-vert-eau rounded-full px-2 py-0.5">
                      Retrait
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
