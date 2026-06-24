"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function createMarche(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("marches").insert({
    nom: formData.get("nom") as string,
    commune: formData.get("commune") as string,
    code_postal: (formData.get("code_postal") as string) || null,
    departement: (formData.get("departement") as string) || null,
    adresse: (formData.get("adresse") as string) || null,
    latitude: formData.get("latitude")
      ? parseFloat(formData.get("latitude") as string)
      : null,
    longitude: formData.get("longitude")
      ? parseFloat(formData.get("longitude") as string)
      : null,
    jour_semaine: formData.get("jour_semaine")
      ? parseInt(formData.get("jour_semaine") as string, 10)
      : null,
    heure_debut: (formData.get("heure_debut") as string) || null,
    heure_fin: (formData.get("heure_fin") as string) || null,
    type: (formData.get("type") as string) || "itinerant",
    point_retrait: formData.get("point_retrait") === "on",
    actif: formData.get("actif") === "on",
  });

  if (error) throw new Error(error.message);
  redirect("/admin/marches");
}

export async function updateMarche(id: string, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("marches")
    .update({
      nom: formData.get("nom") as string,
      commune: formData.get("commune") as string,
      code_postal: (formData.get("code_postal") as string) || null,
      departement: (formData.get("departement") as string) || null,
      adresse: (formData.get("adresse") as string) || null,
      latitude: formData.get("latitude")
        ? parseFloat(formData.get("latitude") as string)
        : null,
      longitude: formData.get("longitude")
        ? parseFloat(formData.get("longitude") as string)
        : null,
      jour_semaine: formData.get("jour_semaine")
        ? parseInt(formData.get("jour_semaine") as string, 10)
        : null,
      heure_debut: (formData.get("heure_debut") as string) || null,
      heure_fin: (formData.get("heure_fin") as string) || null,
      type: (formData.get("type") as string) || "itinerant",
      point_retrait: formData.get("point_retrait") === "on",
      actif: formData.get("actif") === "on",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  redirect("/admin/marches");
}

export async function deleteMarche(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.from("marches").delete().eq("id", id);
  revalidatePath("/admin/marches");
}

export async function toggleActif(id: string, actif: boolean) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.from("marches").update({ actif }).eq("id", id);
  revalidatePath("/admin/marches");
}
