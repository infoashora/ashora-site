// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WLEPV9B1PP"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WLEPV9B1PP');
          `}
        </Script>

        <CartProvider>
          <WishlistProvider>
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