import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import AdminShell from "@/components/admin/AdminShell";
import CategoriesList from "./CategoriesList";

export default async function CategoriesPage() {
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
