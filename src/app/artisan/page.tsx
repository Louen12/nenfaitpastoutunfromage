import { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Eyebrow from "@/components/Eyebrow";
import PhotoSlot from "@/components/PhotoSlot";

export const metadata: Metadata = {
  title: "L'artisan",
  description:
    "Découvrez Maugan LE GAC, fromager itinérant en Bretagne. De Paris au Finistère : l'histoire d'un artisan passionné.",
  openGraph: {
    title: "L'artisan — N'en fais pas tout un fromage",
    description: "L'histoire de Maugan, fromager itinérant en Bretagne.",
  },
};

export default function ArtisanPage() {
  return (
    <div className="min-h-screen bg-creme-clair">
      <Topbar title="L'artisan" back />

      <main className="px-4 lg:px-10 py-6 space-y-8">
        {/* Header */}
        <section className="space-y-2">
          <Eyebrow>L&rsquo;artisan</Eyebrow>
          <h1 className="text-2xl font-serif font-bold text-encre leading-tight">
            De Paris <em className="text-vert italic">à la Bretagne</em>
          </h1>
          <p className="text-sm text-mute font-sans">
            par Maugan
          </p>
        </section>

        {/* Hero photo */}
        <PhotoSlot label="Portrait Maugan" height="h-56" tone="vert" />

        {/* Récit */}
        <section className="space-y-4">
          <p className="text-[15px] font-sans text-texte leading-relaxed">
            <span className="float-left text-5xl font-serif font-bold text-vert leading-none mr-2 mt-1">
              M
            </span>
            augan LE GAC a travaillé deux ans dans une fromagerie à Paris.
            Fort de cette expérience, il est revenu en Bretagne pour lancer
            son camion de fromages, basé à Plouégat-Guérand, dans le Finistère.
          </p>
          <p className="text-[15px] font-sans text-texte leading-relaxed">
            Ses fromages sont une sélection personnelle, issue
            d&rsquo;artisans fromagers. Chaque semaine, il sillonne les marchés
            du Finistère et des Côtes-d&rsquo;Armor pour partager sa passion
            et ses trouvailles.
          </p>
        </section>

        {/* À venir */}
        <section className="rounded-xl bg-vert-eau/30 border border-vert-eau p-5 space-y-2">
          <p className="text-xs font-medium text-vert-prof uppercase tracking-wide">
            À venir
          </p>
          <p className="text-sm text-texte leading-relaxed">
            Photos du camion, détails sur les producteurs partenaires et le
            parcours de Maugan — contenus à enrichir après le shooting.
          </p>
        </section>
      </main>
    </div>
  );
}
