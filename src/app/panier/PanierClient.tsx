"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { centsToEuros, jourLabel } from "@/lib/utils";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";

interface MarcheOption {
  id: string;
  nom: string;
  commune: string;
  jour_semaine: number | null;
  heure_debut: string | null;
  heure_fin: string | null;
  type: string;
}

type Step = "panier" | "infos" | "retrait";

export default function PanierClient({ marches }: { marches: MarcheOption[] }) {
  const { items, updateQuantity, clearCart, totalCents, totalItems } = useCart();

  const [step, setStep] = useState<Step>("panier");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [retraitType, setRetraitType] = useState<"local" | "marche">("marche");
  const [marcheId, setMarcheId] = useState(marches[0]?.id ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fmt = (cents: number) => centsToEuros(cents) + " €";

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    const selectedMarche = marches.find((m) => m.id === marcheId);
    const creneau =
      selectedMarche?.heure_debut && selectedMarche?.heure_fin
        ? `${selectedMarche.heure_debut.slice(0, 5)}–${selectedMarche.heure_fin.slice(0, 5)}`
        : undefined;

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ produit_id: i.produit_id, quantite: i.quantite })),
          client: { nom, email, telephone: telephone || undefined },
          retrait: {
            type: retraitType,
            marche_id: retraitType === "marche" ? marcheId : undefined,
            creneau,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur lors du paiement");
        setLoading(false);
        return;
      }

      clearCart();
      window.location.href = data.url;
    } catch {
      setError("Erreur réseau. Réessayez.");
      setLoading(false);
    }
  }

  if (totalItems === 0 && step === "panier") {
    return (
      <div className="px-4 py-16 text-center">
        <p className="text-4xl mb-4">🧀</p>
        <p className="text-sm text-mute">Votre panier est vide.</p>
        <a href="/boutique" className="inline-block mt-4 text-sm text-vert font-medium underline">
          Voir la boutique
        </a>
      </div>
    );
  }

  return (
    <main className="px-4 py-6 space-y-6">
      {/* Step: Panier */}
      {step === "panier" && (
        <>
          <section className="space-y-2">
            <Eyebrow>{totalItems} article{totalItems > 1 ? "s" : ""}</Eyebrow>
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-serif font-bold text-encre">Votre panier</h2>
              <button onClick={clearCart} className="text-xs font-sans text-mute underline underline-offset-2">
                Vider
              </button>
            </div>
          </section>

          <section className="space-y-3">
            {items.map((item) => (
              <div key={item.produit_id} className="flex gap-3 bg-white rounded-xl p-3 border border-ligne">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.nom} className="size-[72px] rounded-lg object-cover shrink-0" />
                ) : (
                  <div className="size-[72px] rounded-lg bg-kraft/30 flex items-center justify-center shrink-0">
                    <span className="text-xl">🧀</span>
                  </div>
                )}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-sans font-semibold text-encre truncate">{item.nom}</p>
                    <p className="text-xs font-sans text-mute">{item.unite_label}</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.produit_id, item.quantite - 1)}
                        className="flex items-center justify-center size-7 rounded-full border border-ligne text-texte text-sm"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold text-encre w-5 text-center">{item.quantite}</span>
                      <button
                        onClick={() => updateQuantity(item.produit_id, item.quantite + 1)}
                        className="flex items-center justify-center size-7 rounded-full border border-ligne text-texte text-sm"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-encre">{fmt(item.prix_cents * item.quantite)}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="bg-creme rounded-2xl p-4 space-y-3">
            <div className="flex justify-between text-sm text-texte">
              <span>Sous-total</span>
              <span className="font-semibold text-encre">{fmt(totalCents)}</span>
            </div>
            <div className="flex justify-between text-sm text-texte">
              <span>Frais de retrait</span>
              <span className="font-semibold text-vert">Gratuit</span>
            </div>
            <div className="border-t border-ligne pt-3 flex justify-between text-base font-bold text-encre">
              <span>Total</span>
              <span>{fmt(totalCents)}</span>
            </div>
          </section>

          <Button variant="primary" full onClick={() => setStep("infos")}>
            Continuer →
          </Button>
        </>
      )}

      {/* Step: Infos client */}
      {step === "infos" && (
        <>
          <section className="space-y-2">
            <Eyebrow>Étape 2/3</Eyebrow>
            <h2 className="text-2xl font-serif font-bold text-encre">Vos coordonnées</h2>
          </section>

          <div className="space-y-4">
            <label className="block">
              <span className="block text-sm font-medium text-texte mb-1">Nom *</span>
              <input
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full rounded-lg border border-ligne bg-off px-3 py-2.5 text-sm text-encre placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-vert/30 focus:border-vert"
                placeholder="Votre nom"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-texte mb-1">Email *</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-ligne bg-off px-3 py-2.5 text-sm text-encre placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-vert/30 focus:border-vert"
                placeholder="votre@email.fr"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-texte mb-1">Téléphone</span>
              <input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full rounded-lg border border-ligne bg-off px-3 py-2.5 text-sm text-encre placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-vert/30 focus:border-vert"
                placeholder="06 12 34 56 78"
              />
            </label>
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" full onClick={() => setStep("panier")}>← Retour</Button>
            <Button
              variant="primary"
              full
              onClick={() => {
                if (!nom || !email) return;
                setStep("retrait");
              }}
            >
              Continuer →
            </Button>
          </div>
        </>
      )}

      {/* Step: Retrait */}
      {step === "retrait" && (
        <>
          <section className="space-y-2">
            <Eyebrow>Étape 3/3</Eyebrow>
            <h2 className="text-2xl font-serif font-bold text-encre">Point de retrait</h2>
          </section>

          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setRetraitType("marche")}
                className={`flex-1 rounded-lg border p-3 text-sm font-medium transition-colors ${
                  retraitType === "marche"
                    ? "border-vert bg-vert-eau/30 text-vert-prof"
                    : "border-ligne bg-off text-texte"
                }`}
              >
                Sur un marché
              </button>
              <button
                onClick={() => setRetraitType("local")}
                className={`flex-1 rounded-lg border p-3 text-sm font-medium transition-colors ${
                  retraitType === "local"
                    ? "border-vert bg-vert-eau/30 text-vert-prof"
                    : "border-ligne bg-off text-texte"
                }`}
              >
                Au local
              </button>
            </div>

            {retraitType === "marche" && marches.length > 0 && (
              <div className="space-y-2">
                {marches
                  .filter((m) => m.type === "itinerant")
                  .map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMarcheId(m.id)}
                      className={`w-full text-left rounded-lg border p-3 transition-colors ${
                        marcheId === m.id
                          ? "border-vert bg-vert-eau/20"
                          : "border-ligne bg-off"
                      }`}
                    >
                      <p className="text-sm font-medium text-encre">{m.nom}</p>
                      <p className="text-xs text-mute">
                        {m.jour_semaine !== null ? jourLabel(m.jour_semaine) : ""} · {m.commune}
                        {m.heure_debut && m.heure_fin &&
                          ` · ${m.heure_debut.slice(0, 5)}–${m.heure_fin.slice(0, 5)}`}
                      </p>
                    </button>
                  ))}
              </div>
            )}

            {retraitType === "local" && (
              <div className="rounded-lg bg-off border border-ligne p-4">
                <p className="text-sm text-texte">
                  {marches.find((m) => m.type === "local_fixe")?.nom ?? "Local fixe"}
                </p>
                <p className="text-xs text-mute mt-1">
                  Horaires à convenir après confirmation de la commande.
                </p>
              </div>
            )}
          </div>

          {error && <p className="text-sm text-rouge text-center">{error}</p>}

          <div className="space-y-3">
            <section className="bg-creme rounded-2xl p-4">
              <div className="flex justify-between text-base font-bold text-encre">
                <span>Total</span>
                <span>{fmt(totalCents)}</span>
              </div>
            </section>

            <div className="flex gap-3">
              <Button variant="ghost" full onClick={() => setStep("infos")}>← Retour</Button>
              <Button variant="primary" full onClick={handleCheckout} disabled={loading}>
                {loading ? "Redirection…" : "Payer →"}
              </Button>
            </div>

            <p className="text-center text-[11px] text-mute">
              Paiement sécurisé Stripe · CGV
            </p>
          </div>
        </>
      )}
    </main>
  );
}
