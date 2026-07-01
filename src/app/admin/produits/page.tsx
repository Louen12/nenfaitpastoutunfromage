import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { centsToEuros } from "@/lib/utils";
import { SHOP_ENABLED } from "@/lib/config/features";
import AdminShell from "@/components/admin/AdminShell";
import ProduitToggle from "./ProduitToggle";
import ClickStop from "@/components/admin/ClickStop";

export default async function ProduitsPage() {
  if (!SHOP_ENABLED) notFound();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: produits } = await supabase
    .from("produits")
    .select("*, categories(nom)")
    .order("position")
    .order("nom");

  return (
    <AdminShell titre="Produits">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-mute">{produits?.length ?? 0} produit(s)</p>
        <div className="flex gap-2">
          <Link
            href="/admin/categories"
            className="rounded-full border border-ligne bg-off px-3 py-1.5 text-xs font-medium text-texte hover:bg-creme transition-colors"
          >
            Catégories
          </Link>
          <Link
            href="/admin/produits/nouveau"
            className="rounded-full bg-vert text-creme-clair px-4 py-1.5 text-xs font-semibold hover:bg-vert-prof transition-colors"
          >
            + Ajouter
          </Link>
        </div>
      </div>

      <div className="space-y-2">
        {produits?.map((p) => (
          <Link
            key={p.id}
            href={`/admin/produits/${p.id}`}
            className="flex items-center gap-3 rounded-lg bg-off border border-ligne p-3 hover:bg-creme transition-colors"
          >
            {p.image_url ? (
              <img
                src={p.image_url}
                alt={p.nom}
                className="size-12 rounded-lg object-cover shrink-0"
              />
            ) : (
              <div className="size-12 rounded-lg bg-creme flex items-center justify-center shrink-0">
                <span className="text-lg">🧀</span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-encre truncate">{p.nom}</p>
              <p className="text-xs text-mute">
                {centsToEuros(p.prix_cents)} € · {(p.categories as { nom: string } | null)?.nom ?? "Sans catégorie"}
                {p.stock !== null && ` · Stock: ${p.stock}`}
              </p>
            </div>

            <ClickStop className="shrink-0">
              <ProduitToggle id={p.id} disponible={p.disponible} />
            </ClickStop>
          </Link>
        ))}

        {(!produits || produits.length === 0) && (
          <p className="text-center text-sm text-mute py-8">Aucun produit pour l&apos;instant.</p>
        )}
      </div>
    </AdminShell>
  );
}
