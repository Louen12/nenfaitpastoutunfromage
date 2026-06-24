import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { centsToEuros } from "@/lib/utils";
import AdminShell from "@/components/admin/AdminShell";
import StatutActions from "./StatutActions";

const STATUT_LABELS: Record<string, { label: string; class: string }> = {
  en_attente: { label: "En attente", class: "bg-yellow-100 text-yellow-800" },
  preparee: { label: "Préparée", class: "bg-blue-100 text-blue-800" },
  retiree: { label: "Retirée", class: "bg-vert-eau text-vert-prof" },
  annulee: { label: "Annulée", class: "bg-red-100 text-rouge" },
};

const PAIEMENT_LABELS: Record<string, string> = {
  pending: "En attente",
  paye: "Payé",
  echoue: "Échoué",
  rembourse: "Remboursé",
};

export default async function CommandeDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [{ data: commande }, { data: items }] = await Promise.all([
    supabase
      .from("commandes")
      .select("*, marches(nom, commune)")
      .eq("id", id)
      .single(),
    supabase
      .from("commande_items")
      .select("*")
      .eq("commande_id", id)
      .order("nom_produit"),
  ]);

  if (!commande) notFound();

  const s = STATUT_LABELS[commande.statut] ?? STATUT_LABELS.en_attente;
  const marche = commande.marches as { nom: string; commune: string } | null;

  return (
    <AdminShell titre={`Commande #${commande.numero}`}>
      {/* Statut + actions */}
      <div className="rounded-lg bg-off border border-ligne p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${s.class}`}>
            {s.label}
          </span>
          <span className="text-xs text-mute">
            Paiement : {PAIEMENT_LABELS[commande.paiement_statut] ?? commande.paiement_statut}
          </span>
        </div>
        <StatutActions id={commande.id} statut={commande.statut} />
      </div>

      {/* Client */}
      <section className="rounded-lg bg-off border border-ligne p-4 mb-4">
        <h2 className="text-xs font-medium text-mute uppercase tracking-wide mb-2">Client</h2>
        <p className="text-sm font-medium text-encre">{commande.client_nom}</p>
        <p className="text-sm text-texte">{commande.client_email}</p>
        {commande.client_telephone && (
          <a href={`tel:${commande.client_telephone}`} className="text-sm text-vert underline">
            {commande.client_telephone}
          </a>
        )}
      </section>

      {/* Retrait */}
      <section className="rounded-lg bg-off border border-ligne p-4 mb-4">
        <h2 className="text-xs font-medium text-mute uppercase tracking-wide mb-2">Retrait</h2>
        <p className="text-sm text-encre">
          {commande.retrait_type === "local" ? "Au local" : marche?.nom ?? "Marché"}
          {marche?.commune && ` — ${marche.commune}`}
        </p>
        {commande.retrait_date && (
          <p className="text-sm text-texte">
            {new Date(commande.retrait_date).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
            {commande.retrait_creneau && ` · ${commande.retrait_creneau}`}
          </p>
        )}
      </section>

      {/* Articles */}
      <section className="rounded-lg bg-off border border-ligne p-4 mb-4">
        <h2 className="text-xs font-medium text-mute uppercase tracking-wide mb-3">Articles</h2>
        <div className="space-y-2">
          {items?.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-encre">{item.nom_produit}</p>
                <p className="text-xs text-mute">
                  {item.quantite} × {centsToEuros(item.prix_unitaire_cents)} €
                  {item.unite_label && ` / ${item.unite_label}`}
                </p>
              </div>
              <p className="text-sm font-medium text-encre">
                {centsToEuros(item.prix_unitaire_cents * item.quantite)} €
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-ligne mt-3 pt-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-encre">Total</span>
          <span className="text-sm font-semibold text-encre">
            {centsToEuros(commande.total_cents)} €
          </span>
        </div>
      </section>

      {/* Infos techniques */}
      <section className="text-[10px] text-mute space-y-0.5">
        <p>Créée le {new Date(commande.created_at).toLocaleString("fr-FR")}</p>
        {commande.stripe_payment_intent_id && (
          <p>Stripe PI : {commande.stripe_payment_intent_id}</p>
        )}
      </section>
    </AdminShell>
  );
}
