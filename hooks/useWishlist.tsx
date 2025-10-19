"use client";

import { useContext } from "react";
import {
  WishlistContext,
  type WishlistContextType,
} from "../app/components/WishlistProvider";

/**
 * Thin hook that reads the WishlistContext provided by <WishlistProvider>.
 * Do not create a new context here — we must use the same instance.
 */
export function useWishlist(): WishlistContextType {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within <WishlistProvider>");
  }
  return ctx;
}

export default useWishlist;
