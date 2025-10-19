// app/privacy/page.tsx

import Link from "next/link";

const GOLD = "#D1A954";

export const metadata = {
  title: "Privacy Policy | ASHORA",
  description:
    "How Ashora collects, uses, and safeguards your personal information in alignment with UK GDPR.",
};

function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="rounded-2xl border border-zinc-200 bg-white/70 p-6 md:p-7">
      <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
        {title}
      </h2>
      <div
        className="mt-2 h-px w-24 rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
        aria-hidden
      />
      <div className="mt-4 text-sm md:text-[15px] leading-7 text-zinc-700">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="relative">
      {/* Soft ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(209,169,84,0.08), transparent 60%), radial-gradient(45% 50% at 100% 10%, rgba(209,169,84,0.05), transparent 55%)",
        }}
      />

      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-zinc-600">
          <Link
            href="/"
            className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800"
          >
            Home
          </Link>{" "}
          / <span className="text-zinc-800">Privacy Policy</span>
        </nav>

        {/* Page header */}
        <header className="mb-8 text-center">
          <h1 className="font-cormorant text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm md:text-[15px] text-zinc-600">
            We respect your privacy and are committed to protecting your personal information.
          </p>
          <div
            className="mx-auto mt-5 h-px w-44 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
            aria-hidden
          />
        </header>

        <div className="grid gap-6">
          <Section title="Introduction" id="intro">
            <p>Hi lovely,</p>
            <p>
              At Ashora, we respect your privacy and are committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, and safeguard your data
              when you visit our website or make a purchase.
            </p>
          </Section>

          <Section title="Information We Collect" id="what-we-collect">
            <div className="grid gap-4">
              <div>
                <h3 className="font-cormorant text-xl md:text-2xl font-semibold text-zinc-900">
                  Personal Information You Provide
                </h3>
                <ul className="mt-2 grid gap-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                    <span>Name and email address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                    <span>Shipping and billing addresses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                    <span>Phone number (if provided)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                    <span>Order history and preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                    <span>Custom order requests and consultation details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                    <span>Any information you share through contact forms or emails</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-cormorant text-xl md:text-2xl font-semibold text-zinc-900">
                  Information Automatically Collected
                </h3>
                <ul className="mt-2 grid gap-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                    <span>Website usage data through cookies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                    <span>IP address and browser information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                    <span>Pages visited and time spent on our site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                    <span>Device and location information (general area, not specific address)</span>
                  </li>
                </ul>
              </div>
            </div>
          </Section>

          <Section title="How We Use Your Information" id="how-we-use">
            <div className="grid gap-4">
              <div>
                <h4 className="font-medium text-zinc-900">To Fulfil Your Orders</h4>
                <ul className="mt-2 grid gap-2">
                  <li>Process and ship your candles and spiritual products</li>
                  <li>Communicate about your order status and delivery</li>
                  <li>Provide customer support and respond to inquiries</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-zinc-900">To Improve Your Experience</h4>
                <ul className="mt-2 grid gap-2">
                  <li>Personalise your shopping experience</li>
                  <li>Send newsletters and promotional emails (with your consent)</li>
                  <li>Analyse website usage to improve our products and services</li>
                  <li>Respond to custom order requests and consultations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-zinc-900">Legal and Business Purposes</h4>
                <ul className="mt-2 grid gap-2">
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraud and maintain security</li>
                  <li>Enforce our terms of service</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section title="Information Sharing" id="sharing">
            <p>We never sell your personal information. We only share your data with:</p>
            <ul className="mt-2 grid gap-2">
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                <span>Shopify: our e-commerce platform that processes and stores your order information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                <span>Payment Processors: Stripe, PayPal, and other payment services to process transactions securely</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                <span>Shipping Partners: Royal Mail and courier services to deliver your orders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                <span>Email Services: to send order confirmations and newsletters (if subscribed)</span>
              </li>
            </ul>
            <div className="mt-4 rounded-lg border border-amber-100 bg-amber-50/60 p-4 text-[13px] text-zinc-700">
              <strong className="text-zinc-900">Legal Requirements:</strong> We may disclose your
              information if required by law or to protect our rights and safety.
            </div>
          </Section>

          <Section title="International Transfers" id="transfers">
            <p>
              As we ship internationally, your information may be transferred to and processed in
              countries outside the UK. We ensure adequate protection through appropriate safeguards and
              agreements with our service providers.
            </p>
          </Section>

          <Section title="Data Retention" id="retention">
            <ul className="grid gap-2">
              <li>Order Information: 7 years for tax and legal requirements</li>
              <li>Marketing Data: until you unsubscribe or request deletion</li>
              <li>Website Analytics: anonymised after 26 months</li>
            </ul>
          </Section>

          <Section title="Your Rights (UK GDPR)" id="rights">
            <ul className="grid gap-2">
              <li><strong>Access</strong>: request a copy of your personal data</li>
              <li><strong>Rectify</strong>: correct inaccurate or incomplete information</li>
              <li><strong>Erase</strong>: request deletion of your data (subject to legal requirements)</li>
              <li><strong>Restrict</strong>: limit how we process your information</li>
              <li><strong>Portability</strong>: receive your data in a usable format</li>
              <li><strong>Object</strong>: opt out of marketing communications or data processing</li>
              <li><strong>Withdraw Consent</strong>: stop us processing your data where consent was given</li>
            </ul>
          </Section>

          <Section title="Cookies" id="cookies">
            <p>Our website uses cookies to:</p>
            <ul className="mt-2 grid gap-2">
              <li>Remember items in your shopping cart</li>
              <li>Analyse website traffic and usage patterns</li>
              <li>Provide personalised experiences</li>
              <li>Enable social media features</li>
            </ul>
            <p className="mt-2">
              You can control cookies through your browser settings, though this may affect website functionality.
            </p>
          </Section>

          <Section title="Security" id="security">
            <p>We implement appropriate security measures to protect your personal information:</p>
            <ul className="mt-2 grid gap-2">
              <li>Secure data transmission (SSL encryption)</li>
              <li>Limited access to personal data</li>
              <li>Regular security assessments</li>
              <li>Secure payment processing through trusted providers</li>
            </ul>
            <p className="mt-2">
              However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="Third-Party Links" id="links">
            <p>
              Our website may contain links to other sites. We are not responsible for the privacy practices of
              these external websites. Please review their privacy policies before sharing personal information.
            </p>
          </Section>

          <Section title="Changes to This Policy" id="changes">
            <p>
              We may update this Privacy Policy occasionally. Changes will be posted on this page with an
              updated date. Continued use of our website after changes constitutes acceptance of the new policy.
            </p>
          </Section>

          <Section title="Contact Us" id="contact">
            <p>
              If you have questions about this Privacy Policy or want to exercise your rights, contact us:
            </p>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:info@ashora.co.uk"
                className="underline decoration-[#D1A954] underline-offset-4 hover:opacity-80"
              >
                info@ashora.co.uk
              </a>
              <br />
              Response Time: within 48 business hours
              <br />
              Business Hours: Monday – Friday, 9am – 4pm
            </p>
            <p className="mt-6 font-medium text-zinc-800">
              We&apos;re committed to protecting your privacy while supporting your spiritual journey.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
