import Topbar from "./Topbar";

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-creme-clair">
      <Topbar title={title} back />
      <article className="px-4 lg:px-10 py-8 prose-legal">
        <div className="rounded-lg border border-vert-eau bg-vert-eau/30 px-4 py-3 text-sm text-vert-prof mb-8">
          <strong>Modèle à faire valider par un professionnel du droit avant mise en production réelle.</strong>
        </div>
        {children}
      </article>
    </div>
  );
}
