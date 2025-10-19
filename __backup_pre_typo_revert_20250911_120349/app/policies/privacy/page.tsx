import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Ashora",
  description:
    "Learn how Ashora collects, uses, and protects your personal data. Contact info@ashora.co.uk for any privacy enquiries.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-neutral-600">Last updated: {new Date().getFullYear()}</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-medium">Who we are</h2>
        <p>
          Ashora is a premium intentional candle brand. This Privacy Policy explains
          how we collect, use, and protect your information when you visit our website
          and purchase our products.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Information we collect</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Order &amp; account data:</strong> name, email, shipping/billing
            address, and order details.
          </li>
          <li>
            <strong>Payment data:</strong> processed securely by Stripe; we do not
            store full card details on our servers.
          </li>
          <li>
            <strong>Usage data:</strong> device information, pages visited, and basic
            analytics to improve the site experience.
          </li>
          <li>
            <strong>Support:</strong> messages sent to{" "}
            <a href="mailto:info@ashora.co.uk" className="hover:text-gold">info@ashora.co.uk</a>.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">How we use your information</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>To process and fulfil your orders and provide customer support.</li>
          <li>To operate, secure, and improve our website and services.</li>
          <li>To communicate important updates about your purchase.</li>
          <li>To comply with legal and tax obligations.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Payments with Stripe</h2>
        <p>
          We use Stripe to process payments. When you complete checkout, your
          payment details are handled directly by Stripe according to their security
          standards. We receive confirmation of payment and limited data needed to
          fulfil your order.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Data retention</h2>
        <p>
          We retain order records as required for accounting and legal purposes. We
          keep other personal data only for as long as necessary for the purposes
          described in this policy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Your rights</h2>
        <p>
          You may request access, correction, or deletion of your personal data where
          applicable. Contact us at{" "}
          <a href="mailto:info@ashora.co.uk" className="hover:text-gold">info@ashora.co.uk</a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Cookies &amp; analytics</h2>
        <p>
          We may use essential cookies for site functionality and basic analytics to
          understand site performance. You can control cookies through your browser
          settings.
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
