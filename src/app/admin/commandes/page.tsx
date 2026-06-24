import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { centsToEuros } from "@/lib/utils";
import AdminShell from "@/components/admin/AdminShell";
import CommandeFilters from "./CommandeFilters";

const STATUT_LABELS: Record<string, { label: string; class: string }> = {
  en_attente: { label: "En attente", class: "bg-yellow-100 text-yellow-800" },
  preparee: { label: "Préparée", class: "bg-blue-100 text-blue-800" },
  retiree: { label: "Retirée", class: "bg-vert-eau text-vert-prof" },
  annulee: { label: "Annulée", class: "bg-red-100 text-rouge" },
};

export default async function CommandesPage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string }>;
}) {
  const { statut } = await searchParams;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let query = supabase
    .from("commandes")
    .select("*, marches(nom)")
    .order("created_at", { ascending: false });

  if (statut && statut !== "tous") {
    query = query.eq("statut", statut);
  }

  const { data: commandes } = await query;

  return (
    <AdminShell titre="Commandes">
      <CommandeFilters current={statut ?? "tous"} />

      <div className="space-y-2 mt-4">
        {commandes?.map((c) => {
          const s = STATUT_LABELS[c.statut] ?? STATUT_LABELS.en_attente;
          return (
            <Link
              key={c.id}
              href={`/admin/commandes/${c.id}`}
              className="block rounded-lg bg-off border border-ligne p-3 hover:bg-creme transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-encre">
                  #{c.numero}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${s.class}`}>
                  {s.label}
                </span>
              </div>
              <p className="text-sm text-texte">{c.client_nom}</p>
              <p className="text-xs text-mute">
                {centsToEuros(c.total_cents)} € ·{" "}
                {c.retrait_type === "local" ? "Local" : (c.marches as { nom: string } | null)?.nom ?? "Marché"}
                {c.retrait_date && ` · ${new Date(c.retrait_date).toLocaleDateString("fr-FR")}`}
              </p>
              <p className="text-[10px] text-mute mt-1">
                {new Date(c.created_at).toLocaleString("fr-FR")}
              </p>
            </Link>
          );
        })}

        {(!commandes || commandes.length === 0) && (
          <p className="text-center text-sm text-mute py-8">Aucune commande.</p>
        )}
      </div>
    </AdminShell>
  );
}
