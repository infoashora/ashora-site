"use client";

import React from "react";
import { CartProvider } from "../components/CartProvider";
import { WishlistProvider } from "../components/WishlistProvider";

/**
 * Central place to mount all client-side providers.
 * Anything that needs context (cart, wishlist, toasts, etc.) goes here.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </CartProvider>
  );
}
