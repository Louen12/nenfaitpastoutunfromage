import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import AdminShell from "@/components/admin/AdminShell";
import { SHOP_ENABLED } from "@/lib/config/features";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [{ count: commandesEnAttente }, { count: totalProduits }, { count: marchesActifs }] =
    await Promise.all([
      SHOP_ENABLED
        ? supabase
            .from("commandes")
            .select("*", { count: "exact", head: true })
            .eq("statut", "en_attente")
        : Promise.resolve({ count: null }),
      SHOP_ENABLED
        ? supabase
            .from("produits")
            .select("*", { count: "exact", head: true })
        : Promise.resolve({ count: null }),
      supabase
        .from("marches")
        .select("*", { count: "exact", head: true })
        .eq("actif", true),
    ]);

  return (
    <AdminShell titre="Tableau de bord">
      <div className="grid grid-cols-2 gap-3">
        {SHOP_ENABLED && (
          <DashCard
            label="Commandes en attente"
            value={commandesEnAttente ?? 0}
            href="/admin/commandes"
            accent
          />
        )}
        {SHOP_ENABLED && (
          <DashCard
            label="Produits"
            value={totalProduits ?? 0}
            href="/admin/produits"
          />
        )}
        <DashCard
          label="Marchés actifs"
          value={marchesActifs ?? 0}
          href="/admin/marches"
        />
        <DashCard
          label="Actualités"
          value="—"
          href="/admin/actualites"
        />
      </div>

      <nav className="mt-6 space-y-2">
        {SHOP_ENABLED && <QuickLink href="/admin/produits" label="Gérer les produits" />}
        <QuickLink href="/admin/marches" label="Gérer les marchés" />
        {SHOP_ENABLED && <QuickLink href="/admin/commandes" label="Voir les commandes" />}
        <QuickLink href="/admin/actualites" label="Gérer les actualités" />
      </nav>
    </AdminShell>
  );
}

function DashCard({
  label,
  value,
  href,
  accent,
}: {
  label: string;
  value: number | string;
  href: string;
  accent?: boolean;
}) {
  return (
    <a
      href={href}
      className={`block rounded-xl p-4 transition-colors ${
        accent
          ? "bg-vert text-creme-clair"
          : "bg-off border border-ligne text-encre"
      }`}
    >
      <p className={`text-2xl font-serif font-semibold ${accent ? "" : "text-vert"}`}>
        {value}
      </p>
      <p className={`text-xs mt-1 ${accent ? "text-creme/80" : "text-mute"}`}>
        {label}
      </p>
    </a>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="flex items-center justify-between rounded-lg bg-off border border-ligne px-4 py-3 text-sm font-medium text-texte hover:bg-creme transition-colors"
    >
      {label}
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 text-mute">
        <path
          fillRule="evenodd"
          d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  );
}
