import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Information | Ashora",
  description:
    "Processing times, delivery estimates, packaging details, and lost parcel guidance for Ashora orders.",
};

export default function ShippingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Shipping Information</h1>
        <p className="text-sm text-neutral-600">Last updated: {new Date().getFullYear()}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Processing Times</h2>
        <p>
          Orders are typically processed within 1â€“3 business days. During launches or
          promotions, processing may take slightly longer. Youâ€™ll receive a shipping
          confirmation email once your order is dispatched.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Delivery Estimates (UK)</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Standard: 2â€“4 business days after dispatch</li>
          <li>Express: 1â€“2 business days after dispatch</li>
        </ul>
        <p className="text-sm text-neutral-600">
          Estimates are provided by the carrier and may vary during peak periods or due
          to external factors outside our control.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Packaging &amp; Care</h2>
        <p>
          Candles are packed securely to minimise transit movement. Please allow the
          candle to reach room temperature before first burn if exposed to cold during
          delivery.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Lost or Damaged Parcels</h2>
        <p>
          If your order arrives damaged or does not arrive within a reasonable time,
          contact us at{" "}
          <a href="mailto:info@ashora.co.uk" className="hover:text-gold">info@ashora.co.uk</a>{" "}
          with your order number and photos (if applicable). Weâ€™ll work with the carrier
          to resolve the issue.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">International Shipping</h2>
        <p>
          International shipping is not yet enabled at launch. If youâ€™re outside the UK,
          please email{" "}
          <a href="mailto:info@ashora.co.uk" className="hover:text-gold">info@ashora.co.uk</a>{" "}
          to express interest and weâ€™ll let you know as soon as itâ€™s available.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Contact &amp; Compliance</h2>
        <p>
          For any enquiries, please contact{" "}
          <a href="mailto:info@ashora.co.uk" className="hover:text-gold">info@ashora.co.uk</a>.
        </p>
        <p>
          <strong>CLP Compliance:</strong> Each candle includes a CLP circle sticker on
          the base with the required safety and substance information. Labels are plain
          white with black text and are provided for compliance (not aesthetic).
        </p>
      </section>
    </main>
  );
}
