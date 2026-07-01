import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { SHOP_ENABLED } from "@/lib/config/features";
import AdminShell from "@/components/admin/AdminShell";
import ProduitForm from "@/components/admin/ProduitForm";

export default async function EditProduit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!SHOP_ENABLED) notFound();
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [{ data: produit }, { data: categories }] = await Promise.all([
    supabase.from("produits").select("*").eq("id", id).single(),
    supabase.from("categories").select("*").order("position").order("nom"),
  ]);

  if (!produit) notFound();

  return (
    <AdminShell titre={produit.nom}>
      <ProduitForm produit={produit} categories={categories ?? []} />
    </AdminShell>
  );
}
