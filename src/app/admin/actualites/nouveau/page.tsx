import AdminShell from "@/components/admin/AdminShell";
import ActualiteForm from "@/components/admin/ActualiteForm";

export default function NouvelleActualite() {
  return (
    <AdminShell titre="Nouvelle actualité">
      <ActualiteForm />
    </AdminShell>
  );
}
