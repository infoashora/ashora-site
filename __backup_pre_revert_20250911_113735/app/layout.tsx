import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import { Inter, Cormorant_Garamond } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Ashora | Intentional Candles",
  description:
    "Premium intentional candles infused with herbs & crystals. Vegan, eco-conscious, and crafted for ritual.",
  openGraph: {
    title: "Ashora | Intentional Candles",
    description:
      "Premium intentional candles infused with herbs & crystals. Vegan, eco-conscious, and crafted for ritual.",
    images: ["/og.jpg"],
  },
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-parchment text-ink antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        {/* Mini cart drawer lives at root so it can overlay everything */}
        <CartDrawer />
      </body>
    </html>
  );
}
