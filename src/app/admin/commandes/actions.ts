"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

const STATUT_TRANSITIONS: Record<string, string[]> = {
  en_attente: ["preparee", "annulee"],
  preparee: ["retiree", "annulee"],
  retiree: [],
  annulee: [],
};

export async function updateStatut(id: string, nouveauStatut: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: commande } = await supabase
    .from("commandes")
    .select("statut")
    .eq("id", id)
    .single();

  if (!commande) throw new Error("Commande introuvable");

  const allowed = STATUT_TRANSITIONS[commande.statut] ?? [];
  if (!allowed.includes(nouveauStatut)) {
    throw new Error(`Transition ${commande.statut} → ${nouveauStatut} non autorisée`);
  }

  const { error } = await supabase
    .from("commandes")
    .update({ statut: nouveauStatut })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/commandes");
  revalidatePath(`/admin/commandes/${id}`);
}
