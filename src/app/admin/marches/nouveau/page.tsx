import AdminShell from "@/components/admin/AdminShell";
import MarcheForm from "@/components/admin/MarcheForm";

export default function NouveauMarche() {
  return (
    <AdminShell titre="Nouveau marché">
      <MarcheForm />
    </AdminShell>
  );
}
