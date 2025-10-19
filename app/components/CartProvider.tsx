// app/components/CartProvider.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS_MAP } from "../product/content";

export type CartItem = {
  handle: string;
  qty: number;
  pricePence: number;
};

export type CartContextType = {
  items: CartItem[];
  add: (handle: string, qty?: number) => void;
  remove: (handle: string) => void;
  setQty: (handle: string, qty: number) => void;
  clear: () => void;
  subtotalPence: number;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "ashora.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on first client render
  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed: CartItem[] = JSON.parse(raw);
        // keep only products that exist AND have stock > 0
        const cleaned = parsed
          .map((it) => {
            const prod = PRODUCTS_MAP[it.handle];
            if (!prod || !prod.stock || prod.stock <= 0) return null;
            const safeQty = Math.max(1, Math.min(Math.floor(it.qty || 1), prod.stock));
            return {
              handle: it.handle,
              qty: safeQty,
              pricePence: prod.pricePence,
            } as CartItem;
          })
          .filter(Boolean) as CartItem[];
        setItems(cleaned);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
    } catch {
      /* ignore */
    }
  }, [items]);

  const api = useMemo<CartContextType>(() => {
    const add = (handle: string, qty = 1) => {
      const prod = PRODUCTS_MAP[handle];
      if (!prod) return;

      // Hard guard: block adding out-of-stock products
      if (!prod.stock || prod.stock <= 0) {
        if (typeof window !== "undefined") {
          window.alert("This item is currently sold out.");
        }
        return;
      }

      const delta = Math.max(1, Math.floor(qty));

      setItems((prev) => {
        const idx = prev.findIndex((i) => i.handle === handle);
        if (idx === -1) {
          const initialQty = Math.min(delta, prod.stock);
          return [
            ...prev,
            { handle, qty: initialQty, pricePence: prod.pricePence },
          ];
        }
        const next = prev.slice();
        const currentQty = next[idx].qty;
        const newQty = Math.min(currentQty + delta, prod.stock);
        if (newQty === currentQty && typeof window !== "undefined") {
          window.alert(`Only ${prod.stock} in stock.`);
        }
        next[idx] = {
          ...next[idx],
          qty: newQty,
          pricePence: prod.pricePence, // keep price in sync with catalogue
        };
        return next;
      });
    };

    const remove = (handle: string) =>
      setItems((prev) => prev.filter((i) => i.handle !== handle));

    const setQty = (handle: string, qty: number) =>
      setItems((prev) => {
        const prod = PRODUCTS_MAP[handle];
        if (!prod) return prev;

        // If product is now out of stock, remove it
        if (!prod.stock || prod.stock <= 0) {
          return prev.filter((i) => i.handle !== handle);
        }

        const idx = prev.findIndex((i) => i.handle === handle);
        if (idx === -1) return prev;

        const clamped = Math.max(1, Math.min(Math.floor(qty), prod.stock));
        const next = prev.slice();
        next[idx] = { ...next[idx], qty: clamped, pricePence: prod.pricePence };
        return next;
      });

    const clear = () => setItems([]);

    const subtotalPence = items.reduce(
      (sum, i) => sum + i.pricePence * i.qty,
      0
    );

    return { items, add, remove, setQty, clear, subtotalPence };
  }, [items]);

  return (
    <CartContext.Provider value={api}>{children}</CartContext.Provider>
  );
}

// Hook that reads the same context instance
export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within <CartProvider>");
  }
  return ctx;
}
