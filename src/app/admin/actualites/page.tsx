import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import AdminShell from "@/components/admin/AdminShell";
import ActualiteToggle from "./ActualiteToggle";
import ClickStop from "@/components/admin/ClickStop";

export default async function ActualitesPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: actualites } = await supabase
    .from("actualites")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <AdminShell titre="Actualités">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-mute">{actualites?.length ?? 0} actualité(s)</p>
        <Link
          href="/admin/actualites/nouveau"
          className="rounded-full bg-vert text-creme-clair px-4 py-1.5 text-xs font-semibold hover:bg-vert-prof transition-colors"
        >
          + Ajouter
        </Link>
      </div>

      <div className="space-y-2">
        {actualites?.map((a) => (
          <Link
            key={a.id}
            href={`/admin/actualites/${a.id}`}
            className="flex items-center gap-3 rounded-lg bg-off border border-ligne p-3 hover:bg-creme transition-colors"
          >
            {a.image_url ? (
              <img
                src={a.image_url}
                alt={a.titre}
                className="size-12 rounded-lg object-cover shrink-0"
              />
            ) : (
              <div className="size-12 rounded-lg bg-creme flex items-center justify-center shrink-0">
                <span className="text-lg">📰</span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-encre truncate">{a.titre}</p>
              <p className="text-xs text-mute">
                {new Date(a.created_at).toLocaleDateString("fr-FR")}
                {" · "}
                {a.publie ? "Publié" : "Brouillon"}
              </p>
            </div>

            <ClickStop className="shrink-0">
              <ActualiteToggle id={a.id} publie={a.publie} />
            </ClickStop>
          </Link>
        ))}

        {(!actualites || actualites.length === 0) && (
          <p className="text-center text-sm text-mute py-8">Aucune actualité pour l&apos;instant.</p>
        )}
      </div>
    </AdminShell>
  );
}
