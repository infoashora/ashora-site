// app/custom-orders/page.tsx
import CustomOrdersClient from "./CustomOrdersClient";

export const metadata = {
  title: "Custom Orders | ASHORA",
  description:
    "Bespoke intention candles handcrafted to your unique vision. Create a personalised ASHORA candle infused with herbs, crystals, and intention.",
};

export default function Page() {
  return <CustomOrdersClient />;
}