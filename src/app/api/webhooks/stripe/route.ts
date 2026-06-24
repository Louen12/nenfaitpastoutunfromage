import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }

    try {
      await handleCheckoutCompleted(session);
    } catch (err) {
      console.error("Error processing checkout:", err);
      return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const meta = session.metadata ?? {};
  const supabase = createAdminClient();

  const itemsRaw: { id: string; qty: number }[] = JSON.parse(
    meta.items_json || "[]"
  );

  if (itemsRaw.length === 0) {
    throw new Error("No items in session metadata");
  }

  const produitIds = itemsRaw.map((i) => i.id);
  const { data: produits } = await supabase
    .from("produits")
    .select("id, nom, prix_cents, unite_label, stock")
    .in("id", produitIds);

  if (!produits) throw new Error("Failed to fetch products");
  const produitsMap = new Map(produits.map((p) => [p.id, p]));

  let totalCents = 0;
  const commandeItems = itemsRaw.map((item) => {
    const produit = produitsMap.get(item.id);
    if (!produit) throw new Error(`Product not found: ${item.id}`);
    totalCents += produit.prix_cents * item.qty;
    return {
      produit_id: produit.id,
      nom_produit: produit.nom,
      unite_label: produit.unite_label,
      prix_unitaire_cents: produit.prix_cents,
      quantite: item.qty,
    };
  });

  const { data: commande, error: cmdError } = await supabase
    .from("commandes")
    .insert({
      client_nom: meta.client_nom,
      client_email: meta.client_email,
      client_telephone: meta.client_telephone || null,
      total_cents: totalCents,
      statut: "en_attente",
      paiement_statut: "paye",
      retrait_type: meta.retrait_type as "local" | "marche",
      retrait_marche_id: meta.retrait_marche_id || null,
      retrait_date: meta.retrait_date || null,
      retrait_creneau: meta.retrait_creneau || null,
      stripe_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
    })
    .select("id")
    .single();

  if (cmdError || !commande) {
    throw new Error(`Failed to create order: ${cmdError?.message}`);
  }

  const itemsWithCommande = commandeItems.map((item) => ({
    ...item,
    commande_id: commande.id,
  }));

  const { error: itemsError } = await supabase
    .from("commande_items")
    .insert(itemsWithCommande);

  if (itemsError) {
    throw new Error(`Failed to create order items: ${itemsError.message}`);
  }

  for (const item of itemsRaw) {
    const produit = produitsMap.get(item.id)!;
    if (produit.stock !== null) {
      await supabase
        .from("produits")
        .update({ stock: Math.max(0, produit.stock - item.qty) })
        .eq("id", item.id);
    }
  }

  // Point d'extension : envoyer un email de confirmation ici (ex. Resend)
  // await sendConfirmationEmail(meta.client_email, commande.id, ...);
}
