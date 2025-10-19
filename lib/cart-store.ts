import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "../data/products";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number; // pence
  quantity: number;
  image: string;
};

type CartState = {
  items: Record<string, CartItem>; // keyed by product.id
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: {},
      add: (product, qty = 1) => {
        const id = product.id;
        set((state) => {
          const existing = state.items[id];
          const nextQty = (existing?.quantity ?? 0) + qty;
          return {
            items: {
              ...state.items,
              [id]: {
                id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: nextQty,
              },
            },
          };
        });
      },
      remove: (id) =>
        set((state) => {
          const { [id]: _, ...rest } = state.items;
          return { items: rest };
        }),
      updateQuantity: (id, qty) =>
        set((state) => {
          if (qty <= 0) {
            const { [id]: _, ...rest } = state.items;
            return { items: rest };
          }
          const item = state.items[id];
          if (!item) return state;
          return {
            items: {
              ...state.items,
              [id]: { ...item, quantity: qty },
            },
          };
        }),
      clear: () => set({ items: {} }),
    }),
    {
      name: "ashora_cart",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (s) => ({ items: s.items }),
    }
  )
);
