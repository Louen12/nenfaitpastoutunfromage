"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { slugify } from "@/lib/utils";

export async function createCategorie(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const nom = formData.get("nom") as string;
  const { error } = await supabase.from("categories").insert({
    nom,
    slug: slugify(nom),
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidatePath("/admin/produits");
}

export async function deleteCategorie(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.from("categories").delete().eq("id", id);
  revalidatePath("/admin/categories");
  revalidatePath("/admin/produits");
}
