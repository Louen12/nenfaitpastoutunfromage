import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import AdminShell from "@/components/admin/AdminShell";
import MarcheForm from "@/components/admin/MarcheForm";

export default async function EditMarche({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: marche } = await supabase
    .from("marches")
    .select("*")
    .eq("id", id)
    .single();

  if (!marche) notFound();

  return (
    <AdminShell titre={marche.nom}>
      <MarcheForm marche={marche} />
    </AdminShell>
  );
}
