import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { SHOP_ENABLED } from "@/lib/config/features";
import Topbar from "@/components/Topbar";
import PanierClient from "./PanierClient";

export const metadata: Metadata = {
  title: "Panier",
  description: "Votre panier — finalisez votre commande click & collect.",
  robots: { index: false, follow: false },
};

export default async function PanierPage() {
  if (!SHOP_ENABLED) notFound();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: marches } = await supabase
    .from("marches")
    .select("id, nom, commune, jour_semaine, heure_debut, heure_fin, type")
    .eq("actif", true)
    .eq("point_retrait", true)
    .order("jour_semaine");

  return (
    <div className="min-h-screen bg-creme-clair">
      <Topbar title="Panier" back />
      <PanierClient marches={marches ?? []} />
    </div>
  );
}
