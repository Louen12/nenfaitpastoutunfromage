"use client";

import { useCart, type CartItem } from "@/lib/cart";

export default function HomeAddButton({
  produit,
}: {
  produit: Omit<CartItem, "quantite">;
}) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(produit)}
      className="absolute bottom-3 right-3 flex items-center justify-center size-8 rounded-full bg-vert text-creme-clair shadow-sm hover:bg-vert-prof transition-colors"
      aria-label={`Ajouter ${produit.nom}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="size-4">
        <path d="M12 5v14M5 12h14" />
      </svg>
    </button>
  );
}
