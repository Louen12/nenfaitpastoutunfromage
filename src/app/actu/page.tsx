import { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Topbar from "@/components/Topbar";
import Eyebrow from "@/components/Eyebrow";
import InstagramFeed from "@/components/InstagramFeed";

export const metadata: Metadata = {
  title: "Actu",
  description:
    "Actualités et coulisses de la fromagerie itinérante N'en fais pas tout un fromage. Nouveautés, marchés et Instagram.",
  openGraph: {
    title: "Actu — N'en fais pas tout un fromage",
    description: "Nouveautés et coulisses du fromager ambulant.",
  },
};

export default async function ActuPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: actualites } = await supabase
    .from("actualites")
    .select("*")
    .eq("publie", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-creme-clair">
      <Topbar title="Actu" />

      <main className="px-4 lg:px-10 py-6 space-y-8">
        {/* Nouveautés */}
        {actualites && actualites.length > 0 && (
          <section className="space-y-4">
            <Eyebrow>Nouveautés</Eyebrow>
            <h2 className="text-2xl font-serif font-bold text-encre leading-tight">
              Quoi de <em className="text-vert italic">neuf</em> ?
            </h2>

            <div className="space-y-4">
              {actualites.map((a) => (
                <article
                  key={a.id}
                  className="bg-white rounded-2xl overflow-hidden border border-ligne"
                >
                  {a.image_url && (
                    <img
                      src={a.image_url}
                      alt={a.titre}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-mute">
                      {new Date(a.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="mt-1 text-base font-serif font-semibold text-encre">
                      {a.titre}
                    </h3>
                    {a.contenu && (
                      <p className="mt-2 text-sm text-texte leading-relaxed">
                        {a.contenu}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Instagram — Elfsight widget avec repli gracieux */}
        <InstagramFeed />
      </main>
    </div>
  );
}
