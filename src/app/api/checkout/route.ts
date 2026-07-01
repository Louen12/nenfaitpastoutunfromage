import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/utils/supabase/admin";
import { SHOP_ENABLED } from "@/lib/config/features";

export const dynamic = "force-dynamic";

interface CartItem {
  produit_id: string;
  quantite: number;
}

interface CheckoutBody {
  items: CartItem[];
  client: {
    nom: string;
    email: string;
    telephone?: string;
  };
  retrait: {
    type: "local" | "marche";
    marche_id?: string;
    date?: string;
    creneau?: string;
  };
}

export async function POST(request: NextRequest) {
  if (!SHOP_ENABLED) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const body: CheckoutBody = await request.json();

    if (!body.items?.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }
    if (!body.client?.nom || !body.client?.email) {
      return NextResponse.json({ error: "Informations client manquantes" }, { status: 400 });
    }
    if (!body.retrait?.type) {
      return NextResponse.json({ error: "Type de retrait manquant" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const produitIds = body.items.map((i) => i.produit_id);
    const { data: produits, error } = await supabase
      .from("produits")
      .select("id, nom, prix_cents, unite_label, stock, disponible")
      .in("id", produitIds);

    if (error || !produits) {
      return NextResponse.json({ error: "Erreur lors de la vérification des produits" }, { status: 500 });
    }

    const produitsMap = new Map(produits.map((p) => [p.id, p]));

    for (const item of body.items) {
      const produit = produitsMap.get(item.produit_id);
      if (!produit) {
        return NextResponse.json({ error: `Produit introuvable: ${item.produit_id}` }, { status: 400 });
      }
      if (!produit.disponible) {
        return NextResponse.json({ error: `${produit.nom} n'est plus disponible` }, { status: 400 });
      }
      if (produit.stock !== null && produit.stock < item.quantite) {
        return NextResponse.json({ error: `Stock insuffisant pour ${produit.nom}` }, { status: 400 });
      }
    }

    const lineItems = body.items.map((item) => {
      const produit = produitsMap.get(item.produit_id)!;
      return {
        price_data: {
          currency: "eur",
          unit_amount: produit.prix_cents,
          product_data: {
            name: produit.nom,
            ...(produit.unite_label && { description: produit.unite_label }),
          },
        },
        quantity: item.quantite,
      };
    });

    const origin = request.headers.get("origin") ?? "http://localhost:3000";
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: body.client.email,
      success_url: `${origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/panier`,
      metadata: {
        client_nom: body.client.nom,
        client_email: body.client.email,
        client_telephone: body.client.telephone ?? "",
        retrait_type: body.retrait.type,
        retrait_marche_id: body.retrait.marche_id ?? "",
        retrait_date: body.retrait.date ?? "",
        retrait_creneau: body.retrait.creneau ?? "",
        items_json: JSON.stringify(
          body.items.map((i) => ({ id: i.produit_id, qty: i.quantite }))
        ),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}
