import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import AdminShell from "@/components/admin/AdminShell";
import ProduitForm from "@/components/admin/ProduitForm";

export default async function NouveauProduit() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("position")
    .order("nom");

  return (
    <AdminShell titre="Nouveau produit">
      <ProduitForm categories={categories ?? []} />
    </AdminShell>
  );
}
