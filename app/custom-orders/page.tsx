// app/custom-orders/page.tsx
import CustomOrdersClient from "./CustomOrdersClient";

export const metadata = {
  title: "Custom Orders | ASHORA",
  description:
    "Bespoke spiritual tools crafted to your intention — custom candles, ritual boxes, crystal kits and herb boxes. Hand-poured with love & intention.",
};

export default function Page() {
  return <CustomOrdersClient />;
}
