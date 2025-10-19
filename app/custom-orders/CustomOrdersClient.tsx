// app/custom-orders/CustomOrdersClient.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type ProductType = "Custom Candle" | "Ritual Box" | "Crystal Kit" | "Herb Box" | "Other";
const GOLD = "#D1A954";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v ?? "").trim());

export default function CustomOrdersClient() {
  const router = useRouter();

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [productType, setProductType] = useState<ProductType>("Custom Candle");
  const [intention, setIntention] = useState("");
  const [requests, setRequests] = useState("");
  const [significance, setSignificance] = useState("");
  const [timeline, setTimeline] = useState("");
  const [notes, setNotes] = useState("");

  // Honeypot
  const [website, setWebsite] = useState("");

  // UTM/meta
  const meta = useMemo(
    () => ({
      referrer: typeof document !== "undefined" ? document.referrer : "",
      page: typeof window !== "undefined" ? window.location.href : "",
    }),
    []
  );

  // UX state
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState(
    "We’ve received your request. We’ll reply within 48 business hours."
  );
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  // Keep your original mailto fallback
  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Custom Order Request");
    const bodyLines = [
      `Hi ASHORA,`,
      ``,
      `I'd love to place a custom order.`,
      ``,
      `Name: ${name || "[your name]"}`,
      `Email: ${email || "[your email]"}`,
      `Product Type: ${productType}`,
      `Intention/Purpose: ${intention || "[what you want to manifest/heal/attract]"}`,
      `Specific Requests (colours/crystals/herbs): ${requests || "[optional]"}`,
      `Special Significance: ${significance || "[optional]"}`,
      `Timeline / Needed by: ${timeline || "[date or asap]"}`,
      `Additional Notes: ${notes || "[anything else to share]"}`,
      ``,
      `Thank you,`,
      `${name || "[your name]"}`
    ].join("\n");
    return `mailto:info@ashora.co.uk?subject=${subject}&body=${encodeURIComponent(bodyLines)}`;
  }, [name, email, productType, intention, requests, significance, timeline, notes]);

  const emailInvalid = touched && !isEmail(email);
  const nameInvalid = touched && !name.trim();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);

    // Honeypot or invalid basic fields → do nothing
    if (website) return;
    if (!name.trim() || !isEmail(email)) return;

    try {
      setLoading(true);
      const payload = {
        name,
        email,
        productType,
        intention,
        requests,
        significance,
        timeline,
        notes,
        website, // honeypot
        meta,
      };

      const res = await fetch("/api/custom-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // ignore non-JSON
      }

      if (!res.ok || data?.ok === false) {
        const msg =
          (data?.error as string) ||
          "Something went wrong sending your request. Please try again in a moment.";
        setToastText(msg);
        setShowToast(true);
        return;
      }

      // Success UX — show toast, then soft-navigate to success page
      setToastText("We’ve received your request. We’ll reply within 48 business hours.");
      setShowToast(true);

      // Reset form for cleanliness
      setName("");
      setEmail("");
      setProductType("Custom Candle");
      setIntention("");
      setRequests("");
      setSignificance("");
      setTimeline("");
      setNotes("");
      setTouched(false);

      // Let the toast breathe, then navigate
      window.setTimeout(() => {
        router.push("/custom-orders/success");
      }, 800);
    } catch {
      setToastText("Something went wrong sending your request. Please try again in a moment.");
      setShowToast(true);
    } finally {
      setLoading(false);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setShowToast(false);
        timeoutRef.current = null;
      }, 3500);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      {/* Header */}
      <header className="mb-8 md:mb-10">
        <h1 className="font-cormorant text-3xl md:text-4xl font-semibold tracking-tight">Custom Orders</h1>
        <p className="mt-3 max-w-3xl text-sm md:text-base text-zinc-700">Hi lovely,</p>
        <p className="mt-2 max-w-3xl text-sm md:text-base text-zinc-700">
          Your spiritual journey is beautifully unique, and sometimes you need something created just for you.
          That’s where our custom orders come in – bespoke spiritual tools crafted with your specific intentions, desires,
          and energy in mind.
        </p>
        <p className="mt-2 max-w-3xl text-sm md:text-base text-zinc-700">
          Every custom creation is handmade with the same love and ritual as our signature collection, but tailored perfectly to your individual path.
          From personalised candles to complete ritual experiences, we’re here to bring your vision to life.
        </p>
      </header>

      {/* What we customise */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
        <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight">What We Customise</h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 p-4">
            <h3 className="font-medium">Custom Candles</h3>
            <p className="mt-2 text-zinc-700">
              Transform your dreams into flame with a candle created specifically for your intention. Choose from our available scent blends while we select
              the perfect crystal and herb combinations for your unique purpose. Each custom candle includes a collectible Custom Candle Affirmation Card to
              treasure as part of your ASHORA collection.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 p-4">
            <h3 className="font-medium">Ritual Boxes</h3>
            <p className="mt-2 text-zinc-700">
              Complete spiritual experiences curated for your specific needs. Each ritual box contains a custom candle, carefully selected crystals, sacred herbs,
              and a collectible affirmation card – everything you need for powerful intention work.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 p-4">
            <h3 className="font-medium">Crystal Kits</h3>
            <p className="mt-2 text-zinc-700">
              Handpicked crystal collections aligned with your personal goals and energy. Whether you’re seeking love, protection, abundance, or healing, we’ll
              source the perfect stones to support your manifestation practice.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 p-4">
            <h3 className="font-medium">Herb Boxes</h3>
            <p className="mt-2 text-zinc-700">
              Sacred botanical blends crafted for your unique intentions. Each custom herb box includes a collectible Custom Herb Box Affirmation Card as part of
              your ASHORA set.
            </p>
            <p className="mt-2 text-zinc-700">
              Want something even more personal? You also have the option to commission your very own one-of-a-kind affirmation card, created just for you, for an additional fee.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
        <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight">How It Works</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 p-4">
            <h3 className="font-medium">Consultation</h3>
            <p className="mt-2 text-zinc-700">
              Share your vision with us using our custom order form. We’ll discuss your intentions, preferences, and any special significance to ensure every detail is perfect.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4">
            <h3 className="font-medium">Creation</h3>
            <p className="mt-2 text-zinc-700">
              Your order is handcrafted with pure intention over 2–3 weeks. Rush orders are available with additional fees depending on the timeline required.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4">
            <h3 className="font-medium">Delivery</h3>
            <p className="mt-2 text-zinc-700">
              Your personalised spiritual tools arrive beautifully packaged with care instructions and your custom affirmation materials.
            </p>
          </div>
        </div>
      </section>

      {/* Inspiration & Examples */}
      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
        <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight">Inspiration &amp; Examples</h2>
        <ul className="mt-3 grid gap-3 text-zinc-700">
          <li>
            <span className="font-medium">Career Success Candle</span> – Green Aventurine for opportunity, Citrine for motivation and success,
            Basil for professional growth, and Cinnamon for confidence and recognition.
          </li>
          <li>
            <span className="font-medium">Healing from Heartbreak Ritual Box</span> – Rose Quartz for self-love, Amethyst for emotional healing,
            Lavender for soothing release, and Cornflower for renewal.
          </li>
          <li>
            <span className="font-medium">New Home Blessing Crystal Kit</span> – Selenite for cleansing, Clear Quartz for positive energy,
            Black Tourmaline for protection, and Jade for harmony and prosperity.
          </li>
          <li>
            <span className="font-medium">Exam Success Herb Box</span> – Rosemary for mental clarity, Peppermint for focus, Bay Leaf for wisdom,
            and Sage for clear thinking.
          </li>
          <li>
            <span className="font-medium">Fertility &amp; New Beginnings Candle</span> – Moonstone for feminine energy, Carnelian for vitality and creation,
            Rose petals for love, and Chamomile for gentle growth.
          </li>
        </ul>
      </section>

      {/* Pricing & Process */}
      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
        <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight">Pricing &amp; Process</h2>
        <p className="mt-2 text-zinc-700">
          Each custom order receives personalised pricing based on materials, complexity, and timeline. We’ll confirm all details and provide your quote before beginning creation.
        </p>
        <ul className="mt-3 list-disc pl-5 text-zinc-700">
          <li>Timeline: <span className="font-medium">2–3 weeks</span> for standard custom orders</li>
          <li>Rush Orders: <span className="font-medium">Available</span> with additional fees</li>
        </ul>
      </section>

      {/* Contact form (wired to API) */}
      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
        <h2 className="font-cormorant text-2xl md:text-3xl font-semibold tracking-tight">Ready to Create Your Magic?</h2>
        <p className="mt-2 text-zinc-700">
          Use the form below to tell us about your custom order vision. We’ll respond within <span className="font-medium">48 business hours</span> with your quote and timeline.
        </p>

        <form className="mt-4 grid gap-4" onSubmit={onSubmit} noValidate>
          {/* Honeypot */}
          <div className="hidden" aria-hidden>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-zinc-700">Name</label>
              <input
                className={`mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition focus:border-[${GOLD}] ${
                  nameInvalid ? "border-red-400" : "border-zinc-300"
                }`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="Your name"
                required
              />
              {nameInvalid && (
                <p className="mt-1 text-xs text-red-600">Please enter your name.</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-zinc-700">Email</label>
              <input
                type="email"
                className={`mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition focus:border-[${GOLD}] ${
                  emailInvalid ? "border-red-400" : "border-zinc-300"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="you@example.com"
                required
              />
              {emailInvalid && (
                <p className="mt-1 text-xs text-red-600">Please enter a valid email.</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-zinc-700">Product Type</label>
              <select
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#D1A954]"
                value={productType}
                onChange={(e) => setProductType(e.target.value as ProductType)}
              >
                <option>Custom Candle</option>
                <option>Ritual Box</option>
                <option>Crystal Kit</option>
                <option>Herb Box</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-700">Timeline / Needed by</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#D1A954]"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="e.g., 25 Oct 2025 or ASAP"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-700">Your Intention / Purpose</label>
            <textarea
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#D1A954]"
              rows={3}
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="What do you want to manifest, heal, or attract?"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-700">Specific Requests (colours, crystals, herbs)</label>
            <textarea
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#D1A954]"
              rows={3}
              value={requests}
              onChange={(e) => setRequests(e.target.value)}
              placeholder="Any colours, crystals, or herbs you're drawn to?"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-700">Special Significance</label>
            <textarea
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#D1A954]"
              rows={3}
              value={significance}
              onChange={(e) => setSignificance(e.target.value)}
              placeholder="Tell us your story — why is this meaningful to you?"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-700">Additional Notes</label>
            <textarea
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#D1A954]"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything else that feels important to share?"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading || !name.trim() || !isEmail(email)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[${GOLD}]/30 ${
                loading || !name.trim() || !isEmail(email)
                  ? "cursor-not-allowed border-zinc-300 bg-zinc-100 text-zinc-400"
                  : "border border-zinc-300 bg-white text-zinc-800 hover:border-[#D1A954] hover:text-[#D1A954]"
              }`}
            >
              {loading ? "Sending…" : "Send Request"}
            </button>

            {/* Keep your original mailto fallback */}
            <a
              href={mailtoHref}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-[#D1A954] hover:text-[#D1A954]"
            >
              Open Email App
            </a>
            <Link
              href="/ritual-faqs"
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-[#D1A954] hover:text-[#D1A954]"
            >
              Read Ritual FAQs
            </Link>
          </div>

          <p className="mt-4 text-sm text-zinc-600">
            Please allow <span className="font-medium">48 business hours</span> for us to review your custom order request and provide your personalised quote.
          </p>
        </form>
      </section>

      {/* Closing */}
      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
        <p className="text-zinc-700">
          Ready to manifest something magical? Let’s create something beautiful together.
        </p>
        <p className="mt-2 text-zinc-700">
          With love &amp; intention,<br />ASHORA Team x
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          Prefer to email directly?{" "}
          <a
            href="mailto:info@ashora.co.uk"
            className="underline decoration-[#D1A954] underline-offset-4 hover:opacity-80"
          >
            info@ashora.co.uk
          </a>
        </p>
      </section>

      {/* Toast */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-4 flex justify-center px-4 transition ${
          showToast ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
        role="status"
      >
        <div className="pointer-events-auto rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-lg">
          {toastText}
        </div>
      </div>
    </main>
  );
}
