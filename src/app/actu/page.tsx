import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Topbar from "@/components/Topbar";
import Eyebrow from "@/components/Eyebrow";
import PhotoSlot from "@/components/PhotoSlot";

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

      <main className="px-4 py-6 space-y-8">
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

        {/* Instagram */}
        <section className="space-y-2">
          <Eyebrow>@nenfaispas.fromage</Eyebrow>
          <h2 className="text-2xl font-serif font-bold text-encre leading-tight">
            Côté <em className="text-vert italic">coulisses</em>
          </h2>
          <p className="text-sm text-mute font-sans leading-relaxed">
            Notre quotidien de fromager ambulant, en images.
          </p>
        </section>

        {/* Featured Instagram post (placeholder — API Instagram à brancher) */}
        <section className="bg-white rounded-2xl overflow-hidden border border-ligne">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex items-center justify-center size-9 rounded-full bg-vert text-creme-clair text-sm font-serif font-bold">
              N
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-sans font-semibold text-encre truncate">
                nenfaispas.fromage
              </p>
              <p className="text-[11px] font-sans text-mute">Flux Instagram bientôt connecté</p>
            </div>
          </div>
          <PhotoSlot label="Post Instagram" height="h-72" tone="vert" className="rounded-none" />
        </section>

        {/* More posts grid (placeholder) */}
        <section className="space-y-4">
          <Eyebrow>Plus de publications</Eyebrow>
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <PhotoSlot
                key={i}
                label={`Photo ${i + 1}`}
                height="h-28"
                tone={i % 2 === 0 ? "kraft" : "vert"}
                className="rounded-md"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
