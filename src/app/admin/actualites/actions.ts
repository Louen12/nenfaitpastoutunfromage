"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { type TablesUpdate } from "@/utils/supabase/database.types";

async function uploadImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File,
  prefix: string,
) {
  const ext = file.name.split(".").pop() ?? "jpg";
  const fileName = `${prefix}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("actualites").upload(fileName, file);
  if (error) throw new Error(`Upload échoué: ${error.message}`);
  const { data } = supabase.storage.from("actualites").getPublicUrl(fileName);
  return data.publicUrl;
}

function deleteStorageFile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  url: string | null,
) {
  if (!url) return;
  const parts = url.split("/storage/v1/object/public/actualites/");
  if (parts.length < 2) return;
  return supabase.storage.from("actualites").remove([parts[1]]);
}

export async function createActualite(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let image_url: string | null = null;
  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    image_url = await uploadImage(supabase, file, "actu");
  }

  const { error } = await supabase.from("actualites").insert({
    titre: formData.get("titre") as string,
    contenu: (formData.get("contenu") as string) || null,
    image_url,
    publie: formData.get("publie") === "on",
  });

  if (error) throw new Error(error.message);
  redirect("/admin/actualites");
}

export async function updateActualite(id: string, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let image_url: string | undefined;
  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    const oldUrl = formData.get("old_image_url") as string | null;
    deleteStorageFile(supabase, oldUrl);
    image_url = await uploadImage(supabase, file, "actu");
  }

  const updates: TablesUpdate<"actualites"> = {
    titre: formData.get("titre") as string,
    contenu: (formData.get("contenu") as string) || null,
    publie: formData.get("publie") === "on",
    ...(image_url !== undefined && { image_url }),
  };

  const { error } = await supabase.from("actualites").update(updates).eq("id", id);
  if (error) throw new Error(error.message);
  redirect("/admin/actualites");
}

export async function deleteActualite(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("actualites")
    .select("image_url")
    .eq("id", id)
    .single();
  if (data?.image_url) {
    deleteStorageFile(supabase, data.image_url);
  }

  await supabase.from("actualites").delete().eq("id", id);
  revalidatePath("/admin/actualites");
}

export async function togglePublie(id: string, publie: boolean) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.from("actualites").update({ publie }).eq("id", id);
  revalidatePath("/admin/actualites");
}
