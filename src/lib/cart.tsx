"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface CartItem {
  produit_id: string;
  nom: string;
  slug: string;
  prix_cents: number;
  unite_label: string;
  image_url: string | null;
  quantite: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Omit<CartItem, "quantite">, qty?: number) => void;
  updateQuantity: (produit_id: string, qty: number) => void;
  removeItem: (produit_id: string) => void;
  clearCart: () => void;
  totalCents: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "nftuf-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // quota exceeded — silently ignore
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveCart(items);
  }, [items, loaded]);

  const addItem = useCallback(
    (product: Omit<CartItem, "quantite">, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.produit_id === product.produit_id);
        if (existing) {
          return prev.map((i) =>
            i.produit_id === product.produit_id
              ? { ...i, quantite: i.quantite + qty }
              : i
          );
        }
        return [...prev, { ...product, quantite: qty }];
      });
    },
    []
  );

  const updateQuantity = useCallback((produit_id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.produit_id !== produit_id)
        : prev.map((i) => (i.produit_id === produit_id ? { ...i, quantite: qty } : i))
    );
  }, []);

  const removeItem = useCallback((produit_id: string) => {
    setItems((prev) => prev.filter((i) => i.produit_id !== produit_id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalCents = items.reduce((s, i) => s + i.prix_cents * i.quantite, 0);
  const totalItems = items.reduce((s, i) => s + i.quantite, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, totalCents, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
