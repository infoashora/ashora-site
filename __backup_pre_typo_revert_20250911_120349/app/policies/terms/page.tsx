import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Ashora",
  description:
    "Read Ashoraâ€™s terms of service for ordering, pricing, returns, and safety guidance.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="text-sm text-neutral-600">Last updated: {new Date().getFullYear()}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Ordering &amp; Pricing</h2>
        <p>
          All prices are shown in GBP (Â£) and include VAT where applicable. Placing an
          order constitutes an offer to purchase. We reserve the right to refuse or
          cancel any order, for example due to suspected fraud or inventory issues.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Payment</h2>
        <p>
          Payments are processed securely via Stripe. Your card is charged when your
          order is confirmed. We do not store full card details on our servers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Shipping &amp; Delivery</h2>
        <p>
          Orders are typically dispatched within the processing time stated on our
          Shipping page. Delivery timeframes may vary by carrier and destination.
          Risk of loss passes to you upon delivery to the address provided at checkout.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Returns &amp; Refunds</h2>
        <p>
          If thereâ€™s an issue with your order, contact us at{" "}
          <a href="mailto:info@ashora.co.uk" className="hover:text-gold">info@ashora.co.uk</a>{" "}
          within 14 days of delivery. For safety reasons, used candles and opened
          consumables may not be eligible for return unless the product is defective.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Safety Guidance</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Never leave a burning candle unattended.</li>
          <li>Keep away from children, pets, drafts, and flammable materials.</li>
          <li>Trim wick to ~5mm before each use; burn on a heat-resistant surface.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Ashora is not liable for indirect or
          consequential losses. Nothing limits liability where it cannot be excluded by
          law.
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
