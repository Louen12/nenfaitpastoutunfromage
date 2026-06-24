import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { jourLabel } from "@/lib/utils";
import AdminShell from "@/components/admin/AdminShell";
import MarcheToggle from "./MarcheToggle";

export default async function MarchesPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: marches } = await supabase
    .from("marches")
    .select("*")
    .order("jour_semaine")
    .order("position");

  return (
    <AdminShell titre="Marchés">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-mute">{marches?.length ?? 0} marché(s)</p>
        <Link
          href="/admin/marches/nouveau"
          className="rounded-full bg-vert text-creme-clair px-4 py-1.5 text-xs font-semibold hover:bg-vert-prof transition-colors"
        >
          + Ajouter
        </Link>
      </div>

      <div className="space-y-2">
        {marches?.map((m) => (
          <Link
            key={m.id}
            href={`/admin/marches/${m.id}`}
            className="flex items-center gap-3 rounded-lg bg-off border border-ligne p-3 hover:bg-creme transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-encre truncate">{m.nom}</p>
              <p className="text-xs text-mute">
                {jourLabel(m.jour_semaine)} · {m.commune}
                {m.heure_debut && m.heure_fin && ` · ${m.heure_debut.slice(0, 5)}–${m.heure_fin.slice(0, 5)}`}
              </p>
              <div className="flex gap-1 mt-1">
                <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  m.type === "local_fixe"
                    ? "bg-kraft/20 text-kraft"
                    : "bg-vert-eau text-vert-prof"
                }`}>
                  {m.type === "local_fixe" ? "Local fixe" : "Itinérant"}
                </span>
                {m.point_retrait && (
                  <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium bg-vert-eau text-vert-prof">
                    Retrait
                  </span>
                )}
              </div>
            </div>

            <div className="shrink-0" onClick={(e) => e.preventDefault()}>
              <MarcheToggle id={m.id} actif={m.actif} />
            </div>
          </Link>
        ))}

        {(!marches || marches.length === 0) && (
          <p className="text-center text-sm text-mute py-8">Aucun marché pour l&apos;instant.</p>
        )}
      </div>
    </AdminShell>
  );
}
