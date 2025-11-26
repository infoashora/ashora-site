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
            {/* Black Friday top bar banner */}
            <div className="w-full bg-black text-white text-xs sm:text-sm text-center py-2 px-4 tracking-wide">
              Black Friday Ritual Sale — 20% off sitewide with code{" "}
              <span className="font-semibold">ASHORA20</span>. Limited time only.
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
