"use client";

import { useContext } from "react";
import { CartContext } from "../app/components/CartProvider";

export type { CartItem } from "../app/components/CartProvider";

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within <CartProvider>");
  }
  return ctx;
}
