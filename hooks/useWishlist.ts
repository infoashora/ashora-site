"use client";

import { useContext } from "react";
import { WishlistContext, type WishlistContextType } from "../app/components/WishlistProvider";

export function useWishlist(): WishlistContextType {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within <WishlistProvider>");
  return ctx;
}
