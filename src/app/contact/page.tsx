import { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Eyebrow from "@/components/Eyebrow";
import { SITE } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez N'en fais pas tout un fromage (nenfaitpastoutunfromage), fromagerie artisanale itinérante en Bretagne. Email, téléphone, horaires du local à Plouégat-Guérand et réseaux sociaux.`,
};

const horaires = [
  { jour: "Lundi", horaire: null },
  { jour: "Mardi", horaire: "10h–12h / 16h–19h" },
  { jour: "Mercredi", horaire: null },
  { jour: "Jeudi", horaire: null },
  { jour: "Vendredi", horaire: "10h–12h / 16h–19h" },
  { jour: "Samedi", horaire: "9h30–12h30" },
  { jour: "Dimanche", horaire: null },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-creme-clair">
      <Topbar title="Contact" />

      <div className="px-4 lg:px-10 py-8 space-y-8">
        <section>
          <Eyebrow>Nous contacter</Eyebrow>
          <h1 className="mt-2 text-2xl font-serif font-bold text-encre leading-tight">
            Un mot, une question ?
          </h1>
          <p className="mt-2 text-sm text-texte leading-relaxed">
            Pour toute question sur nos fromages, une commande click&nbsp;&amp;&nbsp;collect
            ou nos prochains marchés, n&rsquo;hésitez pas à nous écrire ou nous appeler.
          </p>
        </section>

        {/* Coordonnées */}
        <section className="space-y-4">
          <div className="rounded-xl border border-ligne bg-white p-5 space-y-5">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-vert-eau text-vert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-mute">Email</p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm font-semibold text-vert hover:underline underline-offset-2"
                >
                  {SITE.email}
                </a>
              </div>
            </div>

            {/* Téléphone */}
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-vert-eau text-vert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-mute">Téléphone</p>
                <a
                  href={`tel:${SITE.telephone.replace(/\s/g, "")}`}
                  className="text-sm font-semibold text-vert hover:underline underline-offset-2"
                >
                  {SITE.telephone}
                </a>
              </div>
            </div>

            {/* Adresse */}
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-vert-eau text-vert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-mute">Local de retrait</p>
                <p className="text-sm font-semibold text-encre">{SITE.adresse}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Horaires du local */}
        <section className="space-y-3">
          <Eyebrow>Horaires du local</Eyebrow>
          <div className="rounded-xl border border-ligne bg-white overflow-hidden">
            {horaires.map((h) => (
              <div
                key={h.jour}
                className={`flex items-center justify-between px-4 py-2.5 border-b border-ligne/50 last:border-0 ${
                  h.horaire ? "" : "opacity-40"
                }`}
              >
                <span className="text-sm font-medium text-encre">{h.jour}</span>
                <span className="text-sm text-mute">
                  {h.horaire ?? "Fermé"}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-mute leading-relaxed">
            Retrait des commandes click&nbsp;&amp;&nbsp;collect le vendredi de 16h à 19h.
            Retrouvez-nous aussi sur les{" "}
            <a href="/marches" className="text-vert underline underline-offset-2">marchés de la semaine</a>.
          </p>
        </section>

        {/* Réseaux sociaux */}
        <section className="space-y-3">
          <Eyebrow>Sur les réseaux</Eyebrow>
          <div className="flex gap-3">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-ligne bg-white px-5 py-2.5 text-sm font-semibold text-encre hover:border-vert hover:text-vert transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-ligne bg-white px-5 py-2.5 text-sm font-semibold text-encre hover:border-vert hover:text-vert transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              Facebook
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
