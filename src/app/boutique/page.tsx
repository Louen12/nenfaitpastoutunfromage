import { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Topbar from "@/components/Topbar";
import Eyebrow from "@/components/Eyebrow";
import BoutiqueGrid from "./BoutiqueGrid";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Commandez nos fromages artisanaux en click & collect. Fromages fermiers, paniers composés — retrait au local ou sur un marché.",
  openGraph: {
    title: "La boutique — N'en fais pas tout un fromage",
    description: "Fromages fermiers en click & collect. Retrait au local ou sur marché.",
  },
};

export default async function BoutiquePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [{ data: produits }, { data: categories }] = await Promise.all([
    supabase
      .from("produits")
      .select("*, categories(nom)")
      .eq("disponible", true)
      .order("position")
      .order("nom"),
    supabase.from("categories").select("*").order("position").order("nom"),
  ]);

  return (
    <div className="min-h-screen bg-creme-clair">
      <Topbar title="Boutique" />

      <div className="px-4 lg:px-10 pt-5">
        <Eyebrow>Click &amp; collect</Eyebrow>
        <h2 className="mt-2 text-2xl font-serif font-bold text-encre leading-tight">
          Notre sélection
        </h2>
        <p className="mt-1 text-xs font-sans text-mute">
          {produits?.length ?? 0} référence{(produits?.length ?? 0) > 1 ? "s" : ""}
        </p>
      </div>

      <BoutiqueGrid
        produits={produits ?? []}
        categories={categories ?? []}
      />
    </div>
  );
}
