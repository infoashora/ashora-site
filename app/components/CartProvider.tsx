
"use client";

// app/components/CartProvider.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS_MAP } from "../product/content";

export const PERSONALISATION_PRICE_PENCE = 500;
const STORAGE_KEY = "ashora.cart.v1";
const MAX_NAME_LENGTH = 40;

export type CartItem = {
  id: string;
  handle: string;
  qty: number;
  pricePence: number;
  personalisationName?: string;
};

export type CartContextType = {
  items: CartItem[];
  add: (
    handle: string,
    qty?: number,
    personalisationName?: string
  ) => void;
  remove: (idOrHandle: string) => void;
  setQty: (idOrHandle: string, qty: number) => void;
  setPersonalisation: (
    idOrHandle: string,
    name: string | null
  ) => void;
  clear: () => void;
  subtotalPence: number;
};

export const CartContext = createContext<
  CartContextType | undefined
>(undefined);

function cleanName(value: unknown): string {
  if (typeof value !== "string") return "";

  return value.trim().replace(/\s+/g, " ").slice(0, MAX_NAME_LENGTH);
}

function createId(): string {
  return `personalised-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 11)}`;
}

function countProduct(
  items: CartItem[],
  handle: string
): number {
  return items.reduce(
    (total, item) =>
      total + (item.handle === handle ? item.qty : 0),
    0
  );
}

function normaliseItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];

  const result: CartItem[] = [];
  const totals: Record<string, number> = {};

  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;

    const item = raw as Partial<CartItem>;
    const handle = item.handle;

    if (typeof handle !== "string") continue;

    const product = PRODUCTS_MAP[handle];

    if (!product || product.stock <= 0) continue;

    const alreadyAdded = totals[handle] ?? 0;
    const remaining = Math.max(0, product.stock - alreadyAdded);

    if (remaining <= 0) continue;

    const requestedQty = Number.isFinite(Number(item.qty))
      ? Math.max(1, Math.floor(Number(item.qty)))
      : 1;

    const qty = Math.min(requestedQty, remaining);
    const name = cleanName(item.personalisationName);

    if (name) {
      // Every personalised box is an individual unit.
      for (let index = 0; index < qty; index++) {
        result.push({
          id: createId(),
          handle,
          qty: 1,
          pricePence: product.pricePence,
          personalisationName: name,
        });
      }
    } else {
      const existing = result.find(
        (entry) =>
          entry.handle === handle &&
          !entry.personalisationName
      );

      if (existing) {
        existing.qty += qty;
      } else {
        result.push({
          id: handle,
          handle,
          qty,
          pricePence: product.pricePence,
        });
      }
    }

    totals[handle] = alreadyAdded + qty;
  }

  return result;
}

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (raw) {
        setItems(normaliseItems(JSON.parse(raw)));
      }
    } catch {
      setItems([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage may be unavailable.
    }
  }, [items, hydrated]);

  const api = useMemo<CartContextType>(() => {
    const add = (
      handle: string,
      qty = 1,
      personalisationName?: string
    ) => {
      const product = PRODUCTS_MAP[handle];

      if (!product || product.stock <= 0) {
        window.alert("This item is currently sold out.");
        return;
      }

      const name = cleanName(personalisationName);

      const requestedQty = Number.isFinite(qty)
        ? Math.max(1, Math.floor(qty))
        : 1;

      setItems((previous) => {
        const alreadyInCart = countProduct(previous, handle);
        const remaining = Math.max(
          0,
          product.stock - alreadyInCart
        );

        if (remaining <= 0) {
          window.alert(`Only ${product.stock} in stock.`);
          return previous;
        }

        const amount = Math.min(requestedQty, remaining);
        const next = [...previous];

        if (name) {
          for (let index = 0; index < amount; index++) {
            next.push({
              id: createId(),
              handle,
              qty: 1,
              pricePence: product.pricePence,
              personalisationName: name,
            });
          }
        } else {
          const existingIndex = next.findIndex(
            (item) =>
              item.handle === handle &&
              !item.personalisationName
          );

          if (existingIndex >= 0) {
            next[existingIndex] = {
              ...next[existingIndex],
              qty: next[existingIndex].qty + amount,
              pricePence: product.pricePence,
            };
          } else {
            next.push({
              id: handle,
              handle,
              qty: amount,
              pricePence: product.pricePence,
            });
          }
        }

        return next;
      });
    };

    const remove = (idOrHandle: string) => {
      setItems((previous) =>
        previous.filter(
          (item) =>
            item.id !== idOrHandle
        )
      );
    };

    const setQty = (
      idOrHandle: string,
      requestedQty: number
    ) => {
      setItems((previous) => {
        const index = previous.findIndex(
          (item) => item.id === idOrHandle
        );

        if (index < 0) return previous;

        const item = previous[index];
        const product = PRODUCTS_MAP[item.handle];

        if (!product || product.stock <= 0) {
          return previous.filter(
            (entry) => entry.id !== item.id
          );
        }

        // Personalised boxes always have quantity one.
        if (item.personalisationName) return previous;

        const otherQty = countProduct(
          previous.filter((entry) => entry.id !== item.id),
          item.handle
        );

        const maximum = product.stock - otherQty;

        if (maximum <= 0) return previous;

        const quantity = Number.isFinite(requestedQty)
          ? Math.max(
              1,
              Math.min(Math.floor(requestedQty), maximum)
            )
          : 1;

        const next = [...previous];

        next[index] = {
          ...item,
          qty: quantity,
          pricePence: product.pricePence,
        };

        return next;
      });
    };

    const setPersonalisation = (
      idOrHandle: string,
      requestedName: string | null
    ) => {
      const name = cleanName(requestedName);

      setItems((previous) => {
        const index = previous.findIndex(
          (item) => item.id === idOrHandle
        );

        if (index < 0) return previous;

        const item = previous[index];
        const next = [...previous];

        if (name) {
          if (item.personalisationName) {
            next[index] = {
              ...item,
              personalisationName: name,
            };
            return next;
          }

          // Split one ordinary candle from its quantity group.
          if (item.qty > 1) {
            next[index] = {
              ...item,
              qty: item.qty - 1,
            };

            next.push({
              id: createId(),
              handle: item.handle,
              qty: 1,
              pricePence: item.pricePence,
              personalisationName: name,
            });
          } else {
            next[index] = {
              ...item,
              id: createId(),
              personalisationName: name,
            };
          }

          return next;
        }

        if (!item.personalisationName) return previous;

        // Remove personalisation and merge into ordinary stock.
        next.splice(index, 1);

        const ordinaryIndex = next.findIndex(
          (entry) =>
            entry.handle === item.handle &&
            !entry.personalisationName
        );

        if (ordinaryIndex >= 0) {
          next[ordinaryIndex] = {
            ...next[ordinaryIndex],
            qty: next[ordinaryIndex].qty + 1,
          };
        } else {
          next.push({
            id: item.handle,
            handle: item.handle,
            qty: 1,
            pricePence: item.pricePence,
          });
        }

        return next;
      });
    };

    const clear = () => setItems([]);

    const subtotalPence = items.reduce(
      (total, item) =>
        total +
        item.pricePence * item.qty +
        (item.personalisationName
          ? PERSONALISATION_PRICE_PENCE
          : 0),
      0
    );

    return {
      items,
      add,
      remove,
      setQty,
      setPersonalisation,
      clear,
      subtotalPence,
    };
  }, [items]);

  return (
    <CartContext.Provider value={api}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within <CartProvider>"
    );
  }

  return context;
}

