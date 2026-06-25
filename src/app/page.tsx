import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { centsToEuros, jourLabel } from "@/lib/utils";
import { SITE } from "@/lib/config/site";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import Chip from "@/components/Chip";
import HomeAddButton from "@/components/HomeAddButton";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": SITE.url,
  name: SITE.nomCommercial,
  description: SITE.description,
  url: SITE.url,
  telephone: SITE.telephone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.adresse,
    addressLocality: SITE.ville,
    postalCode: SITE.codePostal,
    addressCountry: "FR",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 48.633, longitude: -3.583 },
    geoRadius: "50000",
  },
  sameAs: [SITE.instagram, SITE.facebook],
  priceRange: "€€",
};

const specs = [
  { label: "Comptoir réfrigéré", value: "+4 °C" },
  { label: "Marchés / semaine", value: "2 + local" },
  { label: "Zone", value: "Finistère · Côtes-d'Armor" },
];

const stats = [
  { value: "2025", label: "Création" },
  { value: "100%", label: "Artisanal" },
  { value: "0", label: "Intermédiaire" },
];

const JOUR_SHORT: Record<number, string> = {
  0: "Dim", 1: "Lun", 2: "Mar", 3: "Mer", 4: "Jeu", 5: "Ven", 6: "Sam",
};

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [{ data: marches }, { data: produits }, { data: actualites }] = await Promise.all([
    supabase
      .from("marches")
      .select("*")
      .eq("actif", true)
      .order("jour_semaine")
      .order("position"),
    supabase
      .from("produits")
      .select("*")
      .eq("disponible", true)
      .order("en_avant", { ascending: false })
      .order("position")
      .limit(4),
    supabase
      .from("actualites")
      .select("*")
      .eq("publie", true)
      .order("created_at", { ascending: false })
      .limit(2),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ───────── 1. Hero ───────── */}
      <section className="relative bg-vert-prof text-creme-clair" style={{ minHeight: 430 }}>
        <div className="flex items-start justify-between px-5 lg:px-10 pt-5">
          <Image
            src="/logo.png"
            alt={SITE.nomCommercial}
            width={56}
            height={56}
            className="size-14 rounded-full"
          />
          <div className="flex items-center gap-4 pt-1">
            <Link href="/panier" aria-label="Panier">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-6">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-10 pt-16 text-center">
          <h1 className="font-serif text-3xl font-bold uppercase leading-tight tracking-wide">
            N&rsquo;en fais pas<br />tout un fromage
          </h1>
          <p className="mt-3 text-xs font-mono uppercase tracking-[.25em] text-creme-clair/70">
            Fromagerie&ensp;·&ensp;Crèmerie
          </p>
        </div>
      </section>

      {/* ───────── 2. Hero Title ───────── */}
      <section className="bg-creme px-5 lg:px-10 py-10">
        <Eyebrow>Fromagerie itinérante</Eyebrow>
        <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug text-encre">
          Présent toute l&rsquo;année sur vos{" "}
          <em className="not-italic text-vert italic">marchés préférés</em>
        </h2>
        <div className="mt-6 flex gap-3">
          <Link href="/marches">
            <Button variant="primary">Voir les marchés&ensp;→</Button>
          </Link>
          <Link href="/boutique">
            <Button variant="ghost">La boutique</Button>
          </Link>
        </div>
      </section>

      {/* ───────── 3. L'artisan ───────── */}
      <section className="bg-off px-5 lg:px-10 py-12">
        <Eyebrow>L&rsquo;artisan · Maugan</Eyebrow>
        <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug text-encre">
          Un fromager itinérant,{" "}
          <em className="not-italic text-vert italic">une sélection d&rsquo;artisans</em>
        </h2>
        <div className="mt-6 overflow-hidden rounded-xl">
          <Image
            src="/images/camion-fromage.png"
            alt="Intérieur du camion — N'en fais pas tout un fromage"
            width={800}
            height={450}
            className="w-full h-56 object-cover"
          />
        </div>
        <p className="mt-6 text-sm leading-relaxed text-texte">
          Maugan a travaillé deux ans dans une fromagerie à Paris. Fort de cette
          expérience, il est revenu en Bretagne pour lancer son camion de fromages,
          basé à Plouégat-Guérand. Ses fromages sont une sélection personnelle,
          issue d&rsquo;artisans fromagers.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-2xl font-bold text-vert">{s.value}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-mute">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── 4. Le camion ───────── */}
      <section className="bg-vert-prof px-5 lg:px-10 py-12 text-creme-clair">
        <Eyebrow color="vert-sauge">Le camion</Eyebrow>
        <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug">
          Un fourgon-fromagerie,{" "}
          <em className="not-italic text-vert-sauge italic">aménagé sur-mesure</em>
        </h2>
        <div className="mt-6 overflow-hidden rounded-xl">
          <Image
            src="/images/rayon-fromage.png"
            alt="Comptoir réfrigéré du camion avec les fromages"
            width={800}
            height={400}
            className="w-full h-52 object-cover"
          />
        </div>
        <ul className="mt-8 space-y-4">
          {specs.map((s) => (
            <li key={s.label} className="flex items-baseline justify-between border-b border-ligne-sombre/30 pb-3">
              <span className="text-sm text-creme-clair/70">{s.label}</span>
              <span className="font-mono text-sm font-medium">{s.value}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── 5. Marchés cette semaine ───────── */}
      <section className="bg-creme py-10">
        <div className="px-5 lg:px-10">
          <div className="flex items-center gap-3">
            <Eyebrow>Marchés cette semaine</Eyebrow>
            <Chip tone="open" sm>{marches?.length ?? 0} marché{(marches?.length ?? 0) > 1 ? "s" : ""}</Chip>
          </div>
        </div>
        <div className="mt-5 flex gap-3 overflow-x-auto px-5 lg:px-10 pb-2 scrollbar-none">
          {marches && marches.length > 0 ? (
            marches.map((m) => (
              <article
                key={m.id}
                className="flex w-44 shrink-0 flex-col rounded-xl border border-ligne bg-creme-clair p-4"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-mute">
                  {m.jour_semaine !== null ? JOUR_SHORT[m.jour_semaine] : ""}
                </p>
                <p className="mt-1 font-serif text-lg font-semibold text-encre">{m.commune}</p>
                <p className="mt-auto pt-3 text-xs text-mute">
                  {m.heure_debut && m.heure_fin
                    ? `${m.heure_debut.slice(0, 5)}–${m.heure_fin.slice(0, 5)}`
                    : "Horaires à venir"}
                </p>
              </article>
            ))
          ) : (
            <p className="text-sm text-mute">Aucun marché cette semaine.</p>
          )}
        </div>
      </section>

      {/* ───────── 6. Boutique preview ───────── */}
      <section className="bg-off px-5 lg:px-10 py-12">
        <Eyebrow>La boutique</Eyebrow>
        <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug text-encre">
          Nos fromages
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {produits && produits.length > 0 ? (
            produits.map((p) => (
              <article
                key={p.id}
                className="relative flex flex-col overflow-hidden rounded-xl border border-ligne bg-creme-clair"
              >
                <Link href={`/boutique/${p.slug}`}>
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.nom} className="h-32 w-full object-cover" />
                  ) : (
                    <div className="h-32 w-full bg-kraft/30 flex items-center justify-center">
                      <span className="text-2xl">🧀</span>
                    </div>
                  )}
                </Link>
                <div className="flex flex-1 flex-col p-3">
                  <h3 className="text-sm font-semibold leading-snug text-encre">{p.nom}</h3>
                  <p className="mt-auto pt-2 text-xs text-mute">
                    <span className="font-semibold text-vert">{centsToEuros(p.prix_cents)}&nbsp;€</span>
                    <span className="ml-1">/ {p.unite_label}</span>
                  </p>
                </div>
                <HomeAddButton
                  produit={{
                    produit_id: p.id,
                    nom: p.nom,
                    slug: p.slug,
                    prix_cents: p.prix_cents,
                    unite_label: p.unite_label,
                    image_url: p.image_url,
                  }}
                />
              </article>
            ))
          ) : (
            <p className="col-span-2 text-sm text-mute text-center py-4">
              Produits bientôt disponibles.
            </p>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link href="/boutique">
            <Button variant="ghost">Voir toute la boutique&ensp;→</Button>
          </Link>
        </div>
      </section>

      {/* ───────── 7. Nouveautés ───────── */}
      {actualites && actualites.length > 0 && (
        <section className="bg-creme px-5 lg:px-10 py-12">
          <Eyebrow>Nouveautés</Eyebrow>
          <h2 className="mt-3 font-serif text-xl font-semibold text-encre">
            Quoi de <em className="text-vert italic">neuf</em>&nbsp;?
          </h2>
          <div className="mt-5 space-y-4">
            {actualites.map((a) => (
              <article
                key={a.id}
                className="overflow-hidden rounded-xl border border-ligne bg-creme-clair"
              >
                {a.image_url && (
                  <img
                    src={a.image_url}
                    alt={a.titre}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-mute">
                    {new Date(a.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                  <h3 className="mt-1 font-serif text-base font-semibold text-encre">
                    {a.titre}
                  </h3>
                  {a.contenu && (
                    <p className="mt-1 text-sm text-texte leading-relaxed line-clamp-2">
                      {a.contenu}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-5 text-center">
            <Link href="/actu">
              <Button variant="ghost">Toutes les actus&ensp;→</Button>
            </Link>
          </div>
        </section>
      )}

      {/* ───────── 8. Footer ───────── */}
      <footer className="bg-vert-prof px-5 lg:px-10 py-10 text-creme-clair">
        <Image
          src="/logo.png"
          alt={SITE.nomCommercial}
          width={48}
          height={48}
          className="size-12 rounded-full"
        />
        <p className="mt-4 font-serif text-sm italic leading-relaxed text-creme-clair/70">
          &laquo;&ensp;Le bon fromage, c&rsquo;est celui qu&rsquo;on choisit bien.&ensp;&raquo;
        </p>
        <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-wider text-creme-clair/60">
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-creme-clair transition-colors">Instagram</a>
          <span className="text-creme-clair/20">·</span>
          <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-creme-clair transition-colors">Facebook</a>
          <span className="text-creme-clair/20">·</span>
          <a href="/contact" className="hover:text-creme-clair transition-colors">Contact</a>
        </nav>
        <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-medium uppercase tracking-wider text-creme-clair/40">
          <a href="/mentions-legales" className="hover:text-creme-clair/60 transition-colors">Mentions légales</a>
          <span className="text-creme-clair/15">·</span>
          <a href="/cgv" className="hover:text-creme-clair/60 transition-colors">CGV</a>
          <span className="text-creme-clair/15">·</span>
          <a href="/confidentialite" className="hover:text-creme-clair/60 transition-colors">Confidentialité</a>
        </nav>
        <p className="mt-6 text-xs text-creme-clair/40">Plouégat-Guérand · Bretagne</p>
      </footer>

      <div className="h-16" />
    </>
  );
}
