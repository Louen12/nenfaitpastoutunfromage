"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { type Tables } from "@/utils/supabase/database.types";
import { jourLabel } from "@/lib/utils";

const MarchesMap = dynamic(() => import("@/components/MarchesMap"), {
  ssr: false,
  loading: () => (
    <div className="mx-4 rounded-xl bg-vert-eau/30 h-[70vh] flex items-center justify-center">
      <p className="text-sm text-mute animate-pulse">Chargement de la carte…</p>
    </div>
  ),
});

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
  const router = useRouter();

  return (
    <>
      {/* Toggle Carte / Liste */}
      <div className="px-4 lg:px-10 pb-3">
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
        <div className="pb-6">
          <MarchesMap
            marches={marches}
            onSelectForRetrait={(id) => router.push(`/panier?retrait=marche&marche_id=${id}`)}
          />
          <div className="mx-4 mt-3 flex items-center gap-4 text-xs text-mute">
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-3 rounded-full" style={{ background: "#1d5b3a" }} />
              Itinérant
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-3 rounded-full" style={{ background: "#b5651d" }} />
              Local fixe
            </span>
          </div>
        </div>
      )}

      {/* Liste view */}
      {view === "liste" && (
        <div className="px-4 lg:px-10 pb-8">
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
