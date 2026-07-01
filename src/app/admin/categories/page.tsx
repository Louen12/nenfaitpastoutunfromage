import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { SHOP_ENABLED } from "@/lib/config/features";
import AdminShell from "@/components/admin/AdminShell";
import CategoriesList from "./CategoriesList";

export default async function CategoriesPage() {
  if (!SHOP_ENABLED) notFound();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("position")
    .order("nom");

  return (
    <AdminShell titre="Catégories">
      <CategoriesList categories={categories ?? []} />
    </AdminShell>
  );
}
