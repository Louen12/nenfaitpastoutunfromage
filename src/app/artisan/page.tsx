import Topbar from "@/components/Topbar";
import Eyebrow from "@/components/Eyebrow";
import PhotoSlot from "@/components/PhotoSlot";

const producers = [
  { name: "Ferme du Vallon", region: "Jura", product: "Comté", distance: "410 km" },
  { name: "GAEC Bouvier", region: "Auvergne", product: "Bleus", distance: "380 km" },
  { name: "Chèvrerie de l'Yonne", region: "Bourgogne", product: "Crottins", distance: "180 km" },
  { name: "Fromagerie Marchand", region: "Normandie", product: "Camemberts", distance: "220 km" },
];

export default function ArtisanPage() {
  return (
    <div className="min-h-screen bg-creme-clair">
      <Topbar title="L'artisan" back />

      <main className="px-4 py-6 space-y-8">
        {/* Header */}
        <section className="space-y-2">
          <Eyebrow>Chapitre 01</Eyebrow>
          <h2 className="text-2xl font-serif font-bold text-encre leading-tight">
            Du laboratoire <em className="text-vert italic">au camion</em>
          </h2>
          <p className="text-sm text-mute font-sans">
            par Maxime · lecture 3 min
          </p>
        </section>

        {/* Hero photo */}
        <PhotoSlot label="atelier.jpg" height="h-56" tone="vert" />

        {/* Narrative text with drop cap */}
        <section className="space-y-4">
          <p className="text-[15px] font-sans text-texte leading-relaxed">
            <span className="float-left text-5xl font-serif font-bold text-vert leading-none mr-2 mt-1">
              J
            </span>
            e travaillais en laboratoire depuis huit ans. Les gestes étaient sûrs, les
            résultats réguliers, mais quelque chose manquait : le contact. Le jour où
            j&apos;ai chargé mes premiers plateaux dans un camion réfrigéré, j&apos;ai
            compris que le fromage ne prenait tout son sens qu&apos;au moment où on le
            partage.
          </p>
          <p className="text-[15px] font-sans text-texte leading-relaxed">
            Depuis, chaque marché est une scène ouverte. Je raconte les fermes, les
            saisons d&apos;affinage, les accidents heureux. Les clients deviennent des
            habitués, puis des complices. Le camion, c&apos;est mon atelier à ciel
            ouvert.
          </p>
        </section>

        {/* Producers section */}
        <section className="space-y-4">
          <Eyebrow>Les producteurs</Eyebrow>
          <h3 className="text-xl font-serif font-bold text-encre leading-tight">
            15 fermes, 0 intermédiaire
          </h3>

          <div className="space-y-3">
            {producers.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-ligne"
              >
                {/* Avatar */}
                <div className="flex items-center justify-center size-10 rounded-full bg-vert text-creme-clair text-sm font-serif font-bold shrink-0">
                  {p.name.charAt(0)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-sans font-semibold text-encre truncate">
                    {p.name}
                  </p>
                  <p className="text-xs font-sans text-mute">
                    {p.region} · {p.product}
                  </p>
                </div>

                {/* Distance */}
                <span className="text-xs font-mono text-mute whitespace-nowrap">
                  {p.distance}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
