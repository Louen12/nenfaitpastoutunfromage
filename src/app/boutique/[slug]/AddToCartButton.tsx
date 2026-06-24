"use client";

import { useState } from "react";
import { useCart, type CartItem } from "@/lib/cart";

export default function AddToCartButton({
  produit,
}: {
  produit: Omit<CartItem, "quantite">;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(produit);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-full bg-vert text-creme-clair font-semibold text-sm px-6 py-3 transition-colors hover:bg-vert-prof active:scale-[0.98]"
    >
      {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
    </button>
  );
}
