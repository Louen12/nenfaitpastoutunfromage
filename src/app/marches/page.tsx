import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Topbar from "@/components/Topbar";
import Eyebrow from "@/components/Eyebrow";
import MarchesClient from "./MarchesClient";

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
      <div className="px-4 pt-3 pb-2">
        <Eyebrow>Cette semaine</Eyebrow>
        <h2 className="mt-2 text-2xl font-serif font-bold text-encre leading-tight">
          Où me trouver
        </h2>
      </div>
      <MarchesClient marches={marches ?? []} />
    </div>
  );
}
