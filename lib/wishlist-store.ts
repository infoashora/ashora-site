import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "../data/products";

export type WishItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  intention: string;
};

type WishlistState = {
  items: Record<string, WishItem>;
  add: (p: Product) => void;
  remove: (id: string) => void;
  toggle: (p: Product) => void;
  clear: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: {},
      add: (p) =>
        set((s) => ({
          items: {
            ...s.items,
            [p.id]: {
              id: p.id,
              slug: p.slug,
              name: p.name,
              price: p.price,
              image: p.images[0],
              intention: p.intention,
            },
          },
        })),
      remove: (id) =>
        set((s) => {
          const copy = { ...s.items };
          delete copy[id];
          return { items: copy };
        }),
      toggle: (p) => {
        const exists = !!get().items[p.id];
        if (exists) {
          get().remove(p.id);
        } else {
          get().add(p);
        }
      },
      clear: () => set({ items: {} }),
    }),
    {
      name: "ashora_wishlist",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
