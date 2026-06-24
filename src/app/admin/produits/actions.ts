"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { type TablesUpdate } from "@/utils/supabase/database.types";
import { slugify } from "@/lib/utils";

async function uploadImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  bucket: string,
  file: File,
  slug: string,
) {
  const ext = file.name.split(".").pop() ?? "jpg";
  const fileName = `${slug}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(fileName, file);
  if (error) throw new Error(`Upload échoué: ${error.message}`);
  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return data.publicUrl;
}

function deleteStorageFile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  bucket: string,
  url: string | null,
) {
  if (!url) return;
  const parts = url.split(`/storage/v1/object/public/${bucket}/`);
  if (parts.length < 2) return;
  return supabase.storage.from(bucket).remove([parts[1]]);
}

export async function createProduit(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const nom = formData.get("nom") as string;
  const slug = slugify(nom);
  const prixStr = formData.get("prix") as string;
  const prix_cents = Math.round(parseFloat(prixStr.replace(",", ".")) * 100);

  let image_url: string | null = null;
  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    image_url = await uploadImage(supabase, "produits", file, slug);
  }

  const stockRaw = formData.get("stock") as string;

  const { error } = await supabase.from("produits").insert({
    nom,
    slug,
    description: (formData.get("description") as string) || null,
    prix_cents,
    unite_label: (formData.get("unite_label") as string) || "pièce",
    categorie_id: (formData.get("categorie_id") as string) || null,
    image_url,
    stock: stockRaw === "" ? null : parseInt(stockRaw, 10),
    disponible: formData.get("disponible") === "on",
    lait: (formData.get("lait") as string) || null,
    affinage: (formData.get("affinage") as string) || null,
    producteur: (formData.get("producteur") as string) || null,
    distance_km: formData.get("distance_km")
      ? parseInt(formData.get("distance_km") as string, 10)
      : null,
    region: (formData.get("region") as string) || null,
    aop: formData.get("aop") === "on",
    conseil_fromager: (formData.get("conseil_fromager") as string) || null,
    en_avant: formData.get("en_avant") === "on",
  });

  if (error) throw new Error(error.message);
  redirect("/admin/produits");
}

export async function updateProduit(id: string, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const nom = formData.get("nom") as string;
  const slug = slugify(nom);
  const prixStr = formData.get("prix") as string;
  const prix_cents = Math.round(parseFloat(prixStr.replace(",", ".")) * 100);

  let image_url: string | undefined;
  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    const oldUrl = formData.get("old_image_url") as string | null;
    deleteStorageFile(supabase, "produits", oldUrl);
    image_url = await uploadImage(supabase, "produits", file, slug);
  }

  const stockRaw = formData.get("stock") as string;

  const updates: TablesUpdate<"produits"> = {
    nom,
    slug,
    description: (formData.get("description") as string) || null,
    prix_cents,
    unite_label: (formData.get("unite_label") as string) || "pièce",
    categorie_id: (formData.get("categorie_id") as string) || null,
    stock: stockRaw === "" ? null : parseInt(stockRaw, 10),
    disponible: formData.get("disponible") === "on",
    lait: (formData.get("lait") as string) || null,
    affinage: (formData.get("affinage") as string) || null,
    producteur: (formData.get("producteur") as string) || null,
    distance_km: formData.get("distance_km")
      ? parseInt(formData.get("distance_km") as string, 10)
      : null,
    region: (formData.get("region") as string) || null,
    aop: formData.get("aop") === "on",
    conseil_fromager: (formData.get("conseil_fromager") as string) || null,
    en_avant: formData.get("en_avant") === "on",
    ...(image_url !== undefined && { image_url }),
  };

  const { error } = await supabase.from("produits").update(updates).eq("id", id);
  if (error) throw new Error(error.message);
  redirect("/admin/produits");
}


export async function deleteProduit(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from("produits").select("image_url").eq("id", id).single();
  if (data?.image_url) {
    deleteStorageFile(supabase, "produits", data.image_url);
  }

  await supabase.from("produits").delete().eq("id", id);
  revalidatePath("/admin/produits");
}

export async function toggleDisponible(id: string, disponible: boolean) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.from("produits").update({ disponible }).eq("id", id);
  revalidatePath("/admin/produits");
}
