import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { centsToEuros } from "@/lib/utils";
import Topbar from "@/components/Topbar";
import Chip from "@/components/Chip";
import AddToCartButton from "./AddToCartButton";

export default async function ProduitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: produit } = await supabase
    .from("produits")
    .select("*, categories(nom)")
    .eq("slug", slug)
    .single();

  if (!produit) notFound();

  const cat = produit.categories as { nom: string } | null;
  const rupture = produit.stock !== null && produit.stock <= 0;

  const details = [
    { label: "Lait", value: produit.lait },
    { label: "Affinage", value: produit.affinage },
    { label: "Producteur", value: produit.producteur },
    { label: "Région", value: produit.region },
    { label: "Distance", value: produit.distance_km ? `${produit.distance_km} km` : null },
  ].filter((d) => d.value);

  return (
    <div className="min-h-screen bg-creme-clair">
      <Topbar title={produit.nom} back />

      {/* Image */}
      {produit.image_url ? (
        <img src={produit.image_url} alt={produit.nom} className="w-full h-64 object-cover" />
      ) : (
        <div className="w-full h-64 bg-kraft/30 flex items-center justify-center">
          <span className="text-4xl">🧀</span>
        </div>
      )}

      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            {cat && <Chip tone="open" sm>{cat.nom}</Chip>}
            {produit.aop && <Chip tone="vert" sm>AOP</Chip>}
            {produit.en_avant && <Chip tone="cream" sm>Nouveauté</Chip>}
          </div>
          <h1 className="mt-2 text-2xl font-serif font-bold text-encre">{produit.nom}</h1>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-serif font-bold text-vert">
              {centsToEuros(produit.prix_cents)}&nbsp;€
            </span>
            <span className="text-sm text-mute">/ {produit.unite_label}</span>
          </div>
        </div>

        {/* Description */}
        {produit.description && (
          <p className="text-sm text-texte leading-relaxed">{produit.description}</p>
        )}

        {/* Fiche détaillée */}
        {details.length > 0 && (
          <div className="rounded-xl bg-off border border-ligne p-4 space-y-3">
            <h2 className="text-xs font-medium text-mute uppercase tracking-wide">Fiche</h2>
            {details.map((d) => (
              <div key={d.label} className="flex items-baseline justify-between border-b border-ligne/50 pb-2 last:border-0 last:pb-0">
                <span className="text-sm text-mute">{d.label}</span>
                <span className="text-sm font-medium text-encre">{d.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Conseil du fromager */}
        {produit.conseil_fromager && (
          <div className="rounded-xl bg-vert-eau/30 border border-vert-eau p-4">
            <p className="text-xs font-medium text-vert-prof uppercase tracking-wide mb-1">
              Conseil du fromager
            </p>
            <p className="text-sm text-texte leading-relaxed">{produit.conseil_fromager}</p>
          </div>
        )}

        {/* Stock */}
        {rupture ? (
          <p className="text-center text-sm font-medium text-rouge">Actuellement en rupture de stock</p>
        ) : (
          <AddToCartButton
            produit={{
              produit_id: produit.id,
              nom: produit.nom,
              slug: produit.slug,
              prix_cents: produit.prix_cents,
              unite_label: produit.unite_label,
              image_url: produit.image_url,
            }}
          />
        )}
      </div>
    </div>
  );
}
