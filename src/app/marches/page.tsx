import { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Topbar from "@/components/Topbar";
import Eyebrow from "@/components/Eyebrow";
import MarchesClient from "./MarchesClient";

export const metadata: Metadata = {
  title: "Marchés",
  description:
    "Retrouvez la fromagerie itinérante N'en fais pas tout un fromage sur les marchés de Bretagne. Carte interactive et horaires de la semaine.",
  openGraph: {
    title: "Nos marchés — N'en fais pas tout un fromage",
    description: "Carte et horaires des marchés de la semaine en Bretagne.",
  },
};

export default async function MarchesPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: marches } = await supabase
    .from("marches")
    .select("*")
    .eq("actif", true)
    .order("jour_semaine")
    .order("position");

  return (
    <div className="min-h-screen bg-creme-clair">
      <Topbar title="Marchés" />
      <div className="px-4 lg:px-10 pt-3 pb-2">
        <Eyebrow>Cette semaine</Eyebrow>
        <h2 className="mt-2 text-2xl font-serif font-bold text-encre leading-tight">
          Où me trouver
        </h2>
      </div>
      <MarchesClient marches={marches ?? []} />
    </div>
  );
}
