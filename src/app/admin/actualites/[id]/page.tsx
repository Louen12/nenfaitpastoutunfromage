import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import AdminShell from "@/components/admin/AdminShell";
import ActualiteForm from "@/components/admin/ActualiteForm";

export default async function EditActualite({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: actualite } = await supabase
    .from("actualites")
    .select("*")
    .eq("id", id)
    .single();

  if (!actualite) notFound();

  return (
    <AdminShell titre={actualite.titre}>
      <ActualiteForm actualite={actualite} />
    </AdminShell>
  );
}
