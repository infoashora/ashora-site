"use client";

import React, { createContext, useMemo, useState } from "react";

export type WishlistContextType = {
  toggle: (handle: string) => void;
  isWishlisted: (handle: string) => boolean;
};

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [handles, setHandles] = useState<string[]>([]);

  const toggle = (handle: string) => {
    setHandles((prev) =>
      prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle]
    );
  };

  const isWishlisted = (handle: string) => handles.includes(handle);

  const value = useMemo<WishlistContextType>(
    () => ({ toggle, isWishlisted }),
    [handles]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export default WishlistProvider;
