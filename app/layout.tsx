// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

import { CartProvider } from "@/app/components/CartProvider";
import { WishlistProvider } from "@/app/components/WishlistProvider";

export const metadata: Metadata = {
  title: "ASHORA",
  description: "The Seed To The Garden You Can Grow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            {/* 🎄 Christmas Seasonal Top Banner
                To disable after Christmas, remove this block or wrap in a feature flag. */}
            <div className="w-full bg-[#D1A954] text-zinc-900 text-[11px] sm:text-xs md:text-sm text-center py-2 px-4 tracking-wide">
              <span className="mr-1">✧</span>
              <span className="font-semibold">Christmas Offer:</span>
              <span className="ml-1">
                Buy 2 or more Intention Candles and get 10% off the total. Seasonal offer.
              </span>
              <span className="ml-1">✧</span>
            </div>

            <Header />
            <main>{children}</main>
            <Footer />

            {/* Drawer mounted at root so the Header button can open it */}
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
