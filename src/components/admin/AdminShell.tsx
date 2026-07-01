import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { SHOP_ENABLED } from "@/lib/config/features";

const allNavItems = [
  { label: "Accueil", href: "/admin", shop: false },
  { label: "Produits", href: "/admin/produits", shop: true },
  { label: "Marchés", href: "/admin/marches", shop: false },
  { label: "Commandes", href: "/admin/commandes", shop: true },
  { label: "Actus", href: "/admin/actualites", shop: false },
];

const navItems = SHOP_ENABLED
  ? allNavItems
  : allNavItems.filter((i) => !i.shop);

export default function AdminShell({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-creme-clair">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-vert text-creme-clair">
        <div className="flex items-center justify-between px-4 h-12">
          <Link href="/admin" className="font-serif text-base font-semibold">
            NFTUF Admin
          </Link>
          <LogoutButton />
        </div>

        {/* Nav horizontale scrollable */}
        <nav className="flex gap-1 px-4 pb-2 overflow-x-auto scrollbar-none">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full px-3 py-1 text-xs font-medium text-creme/80 hover:text-creme-clair hover:bg-white/10 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Titre de page */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="font-serif text-xl font-semibold text-encre">{titre}</h1>
      </div>

      {/* Contenu */}
      <div className="px-4 pb-8">{children}</div>
    </div>
  );
}
