"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type ProductType = "Custom Candle";

const CUSTOMISATIONS = [
  {
    number: "01",
    title: "Intention",
    description:
      "Your candle can be created around a personal goal, emotional season, life transition, celebration, or intention you want to nurture.",
  },
  {
    number: "02",
    title: "Crystals and Herbs",
    description:
      "We select crystal and herb combinations that align with your purpose while keeping the candle safe, balanced, and beautiful.",
  },
  {
    number: "03",
    title: "Colour and Scent",
    description:
      "Share the colours and scent profile you are drawn to. We will guide you through the available options and shape a blend that suits the intention.",
  },
  {
    number: "04",
    title: "Affirmation Card",
    description:
      "Each custom candle includes a personalised affirmation card created to complement your candle and support your ritual.",
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Consultation",
    description:
      "Share your intention, preferences, and the meaning behind your request using the form below.",
  },
  {
    number: "02",
    title: "Creation",
    description:
      "Your candle is designed and hand-poured with care. Standard custom orders usually take 2–3 weeks.",
  },
  {
    number: "03",
    title: "Delivery",
    description:
      "Your finished candle arrives beautifully packaged with candle care guidance and your personalised affirmation card.",
  },
];

const EXAMPLES = [
  {
    title: "Career Success Candle",
    description:
      "Green Aventurine for opportunity, Citrine for motivation, Basil for growth, and Cinnamon for confidence.",
  },
  {
    title: "Healing from Heartbreak Candle",
    description:
      "Rose Quartz for self-love, Amethyst for emotional healing, Lavender for calm, and Cornflower for renewal.",
  },
  {
    title: "New Home Candle",
    description:
      "Clear Quartz for positive energy, Jade for harmony, Rosemary for cleansing, and a grounding scent profile.",
  },
  {
    title: "Exam Success Candle",
    description:
      "Rosemary for clarity, Peppermint for focus, Bay Leaf for wisdom, and Citrine for confidence.",
  },
  {
    title: "New Beginnings Candle",
    description:
      "Moonstone for transition, Carnelian for vitality, Rose petals for love, and Chamomile for gentle growth.",
  },
];

const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((value ?? "").trim());

export default function CustomOrdersClient() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [productType] = useState<ProductType>("Custom Candle");
  const [intention, setIntention] = useState("");
  const [requests, setRequests] = useState("");
  const [significance, setSignificance] = useState("");
  const [timeline, setTimeline] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState(
    "We’ve received your request. We’ll reply within 48 business hours."
  );

  const timeoutRef = useRef<number | null>(null);

  const meta = useMemo(
    () => ({
      referrer: typeof document !== "undefined" ? document.referrer : "",
      page: typeof window !== "undefined" ? window.location.href : "",
    }),
    []
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Custom Candle Request");

    const bodyLines = [
      "Hi ASHORA,",
      "",
      "I'd love to place a custom candle order.",
      "",
      `Name: ${name || "[your name]"}`,
      `Email: ${email || "[your email]"}`,
      `Product Type: ${productType}`,
      `Intention/Purpose: ${
        intention || "[what you want to manifest, heal, or attract]"
      }`,
      `Specific Requests (colours, crystals, herbs, scent): ${
        requests || "[optional]"
      }`,
      `Special Significance: ${significance || "[optional]"}`,
      `Timeline / Needed by: ${timeline || "[date or ASAP]"}`,
      `Additional Notes: ${notes || "[anything else to share]"}`,
      "",
      "Thank you,",
      name || "[your name]",
    ].join("\n");

    return `mailto:info@ashora.co.uk?subject=${subject}&body=${encodeURIComponent(
      bodyLines
    )}`;
  }, [
    email,
    intention,
    name,
    notes,
    productType,
    requests,
    significance,
    timeline,
  ]);

  const emailInvalid = touched && !isEmail(email);
  const nameInvalid = touched && !name.trim();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);

    if (website || !name.trim() || !isEmail(email)) {
      return;
    }

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
        website,
        meta,
      };

      const response = await fetch("/api/custom-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data: { ok?: boolean; error?: string } | null = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok || data?.ok === false) {
        setToastText(
          data?.error ||
            "Something went wrong sending your request. Please try again in a moment."
        );
        setShowToast(true);
        return;
      }

      setToastText(
        "We’ve received your request. We’ll reply within 48 business hours."
      );
      setShowToast(true);

      setName("");
      setEmail("");
      setIntention("");
      setRequests("");
      setSignificance("");
      setTimeline("");
      setNotes("");
      setTouched(false);

      window.setTimeout(() => {
        router.push("/custom-orders/success");
      }, 800);
    } catch {
      setToastText(
        "Something went wrong sending your request. Please try again in a moment."
      );
      setShowToast(true);
    } finally {
      setLoading(false);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setShowToast(false);
        timeoutRef.current = null;
      }, 3500);
    }
  }

  return (
    <main className="bg-[#faf8f4]">
      {/* Introduction */}
      <section className="border-b border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-8 sm:py-9 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-12">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                Created For You
              </p>

              <h1 className="mt-2 max-w-xl font-cormorant text-3xl font-semibold leading-[1] tracking-tight text-zinc-950 sm:text-4xl">
                Custom Candles
              </h1>
            </div>

            <div className="border-l border-zinc-300 pl-5 sm:pl-6">
              <p className="text-sm font-medium text-zinc-950">Hi lovely,</p>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
                Your journey is beautifully unique, and sometimes your
                intention calls for something created especially for you.
              </p>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
                Each custom candle is handcrafted around your vision, energy,
                and purpose, with personalised crystals, herbs, colour, scent
                direction and affirmation guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Customise */}
      <section className="bg-[#faf8f4]">
        <div className="mx-auto max-w-6xl px-6 py-8 sm:py-9 lg:py-10">
          <div className="grid gap-5 border-b border-zinc-300 pb-5 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                Personalised Details
              </p>

              <h2 className="mt-2 font-cormorant text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                What We Customise
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-zinc-600 lg:justify-self-end">
              Every element is considered together so your candle feels
              personal, harmonious and aligned with its purpose.
            </p>
          </div>

          <div className="grid border-x border-b border-zinc-300 sm:grid-cols-2">
            {CUSTOMISATIONS.map((item, index) => (
              <article
                key={item.title}
                className={`min-h-[160px] border-t border-zinc-300 p-5 ${
                  index % 2 !== 0 ? "sm:border-l" : ""
                } ${index === 1 ? "bg-zinc-900" : "bg-white"}`}
              >
                <p
                  className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${
                    index === 1 ? "text-[#D1A954]" : "text-[#9b793d]"
                  }`}
                >
                  {item.number}
                </p>

                <h3
                  className={`mt-5 font-cormorant text-xl font-semibold tracking-tight ${
                    index === 1 ? "text-white" : "text-zinc-950"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`mt-2 text-sm leading-6 ${
                    index === 1 ? "text-zinc-300" : "text-zinc-600"
                  }`}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-8 sm:py-9 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D1A954]">
                From Vision To Flame
              </p>

              <h2 className="mt-2 max-w-sm font-cormorant text-2xl font-semibold leading-[1.05] tracking-tight text-white sm:text-3xl">
                How It Works
              </h2>
            </div>

            <div className="border-t border-zinc-700">
              {PROCESS.map((item) => (
                <article
                  key={item.title}
                  className="grid gap-3 border-b border-zinc-700 py-4 sm:grid-cols-[42px_135px_1fr] sm:gap-5"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#D1A954]">
                    {item.number}
                  </p>

                  <h3 className="font-cormorant text-lg font-semibold tracking-tight text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-6 text-zinc-300">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 sm:py-9 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                Possibilities
              </p>

              <h2 className="mt-2 max-w-sm font-cormorant text-2xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-3xl">
                Inspiration and Examples
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600">
                These are examples only. Your own candle can be created around
                an intention that is completely personal to you.
              </p>
            </div>

            <div className="border-t border-zinc-300">
              {EXAMPLES.map((example, index) => (
                <article
                  key={example.title}
                  className="grid gap-3 border-b border-zinc-300 py-4 sm:grid-cols-[40px_190px_1fr] sm:gap-5"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9b793d]">
                    0{index + 1}
                  </p>

                  <h3 className="font-cormorant text-lg font-semibold tracking-tight text-zinc-950">
                    {example.title}
                  </h3>

                  <p className="text-sm leading-6 text-zinc-600">
                    {example.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-y border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-8 sm:py-9">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-12">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                Before Creation Begins
              </p>

              <h2 className="mt-2 font-cormorant text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                Pricing and Process
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-sm leading-6 text-zinc-600">
                Each custom candle receives personalised pricing based on
                materials, complexity, and timeline. We will confirm all
                details and provide your quote before creation begins.
              </p>

              <div className="mt-4 grid border-x border-b border-zinc-300 sm:grid-cols-2">
                <div className="border-t border-zinc-300 bg-white p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9b793d]">
                    Standard Timeline
                  </p>

                  <p className="mt-2 font-cormorant text-xl font-semibold text-zinc-950">
                    2–3 weeks
                  </p>
                </div>

                <div className="border-t border-zinc-300 bg-white p-4 sm:border-l">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9b793d]">
                    Rush Orders
                  </p>

                  <p className="mt-2 font-cormorant text-xl font-semibold text-zinc-950">
                    Subject to availability
                  </p>

                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    Additional fees may apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="bg-[#faf8f4]">
        <div className="mx-auto max-w-6xl px-6 py-8 sm:py-9 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9b793d]">
                Begin Your Request
              </p>

              <h2 className="mt-2 max-w-sm font-cormorant text-2xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-3xl">
                Ready to Create Your Candle?
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600">
                Tell us about your vision. We will respond within 48 business
                hours with your quote and estimated timeline.
              </p>

              <div className="mt-5 border-t border-zinc-300 pt-4">
                <p className="text-xs leading-5 text-zinc-500">
                  Prefer to email directly?
                </p>

                <a
                  href="mailto:info@ashora.co.uk"
                  className="mt-1 inline-flex border-b border-zinc-400 pb-1 text-sm font-medium text-zinc-900 transition-colors hover:border-[#9b793d] hover:text-[#9b793d]"
                >
                  info@ashora.co.uk
                </a>
              </div>
            </div>

            <form
              className="border-t border-zinc-300"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              <div className="grid gap-4 border-b border-zinc-300 py-4 sm:grid-cols-2">
                <FieldGroup
                  label="Name"
                  required
                  error={nameInvalid ? "Please enter your name." : undefined}
                >
                  <input
                    className={inputClassName(nameInvalid)}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onBlur={() => setTouched(true)}
                    placeholder="Your name"
                    required
                  />
                </FieldGroup>

                <FieldGroup
                  label="Email"
                  required
                  error={
                    emailInvalid ? "Please enter a valid email." : undefined
                  }
                >
                  <input
                    type="email"
                    className={inputClassName(emailInvalid)}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onBlur={() => setTouched(true)}
                    placeholder="you@example.com"
                    required
                  />
                </FieldGroup>
              </div>

              <div className="grid gap-4 border-b border-zinc-300 py-4 sm:grid-cols-2">
                <FieldGroup label="Product Type">
                  <input
                    className="h-10 w-full border border-zinc-300 bg-zinc-100 px-3 text-sm text-zinc-600 outline-none"
                    value={productType}
                    readOnly
                  />
                </FieldGroup>

                <FieldGroup label="Timeline / Needed by">
                  <input
                    type="text"
                    className={inputClassName(false)}
                    value={timeline}
                    onChange={(event) => setTimeline(event.target.value)}
                    placeholder="e.g. 25 August 2026 or ASAP"
                  />
                </FieldGroup>
              </div>

              <div className="border-b border-zinc-300 py-4">
                <FieldGroup label="Your Intention / Purpose">
                  <textarea
                    className={textareaClassName}
                    rows={2}
                    value={intention}
                    onChange={(event) => setIntention(event.target.value)}
                    placeholder="What do you want to manifest, heal, celebrate, or invite in?"
                  />
                </FieldGroup>
              </div>

              <div className="border-b border-zinc-300 py-4">
                <FieldGroup label="Specific Requests">
                  <textarea
                    className={textareaClassName}
                    rows={2}
                    value={requests}
                    onChange={(event) => setRequests(event.target.value)}
                    placeholder="Share any colours, scent notes, crystals, or herbs you are drawn to."
                  />
                </FieldGroup>
              </div>

              <div className="border-b border-zinc-300 py-4">
                <FieldGroup label="Special Significance">
                  <textarea
                    className={textareaClassName}
                    rows={2}
                    value={significance}
                    onChange={(event) => setSignificance(event.target.value)}
                    placeholder="Tell us why this candle is meaningful to you."
                  />
                </FieldGroup>
              </div>

              <div className="border-b border-zinc-300 py-4">
                <FieldGroup label="Additional Notes">
                  <textarea
                    className={textareaClassName}
                    rows={2}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Anything else that feels important to share?"
                  />
                </FieldGroup>
              </div>

              <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={mailtoHref}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-[#9b793d]"
                  >
                    Open Email App
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>

                  <Link
                    href="/ritual-faqs"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-[#9b793d]"
                  >
                    Ritual FAQs
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading || !name.trim() || !isEmail(email)}
                  className="group inline-flex h-10 items-center justify-center gap-3 bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-[#9b793d] disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500"
                >
                  {loading ? "Sending…" : "Send Request"}

                  {!loading && (
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  )}
                </button>
              </div>

              <p className="mt-4 text-xs leading-5 text-zinc-500">
                Please allow 48 business hours for us to review your request
                and provide your personalised quote.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-zinc-900">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-7 sm:py-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-12">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D1A954]">
            With Love &amp; Intention
          </p>

          <div>
            <p className="max-w-3xl font-cormorant text-xl font-medium leading-[1.2] tracking-tight text-white sm:text-2xl">
              Ready to create something meaningful? Let&apos;s bring your
              vision to life.
            </p>

            <p className="mt-3 text-sm text-zinc-400">ASHORA Team</p>
          </div>
        </div>
      </section>

      <div
        className={`pointer-events-none fixed inset-x-0 bottom-4 z-[9999] flex justify-center px-4 transition-opacity duration-300 ${
          showToast ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
        role="status"
      >
        <div className="pointer-events-auto border border-zinc-700 bg-zinc-950 px-5 py-3 text-sm text-white shadow-2xl">
          {toastText}
        </div>
      </div>
    </main>
  );
}

function FieldGroup({
  label,
  required = false,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
        {label}
        {required ? <span className="text-[#9b793d]"> *</span> : null}
      </label>

      <div className="mt-2">{children}</div>

      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function inputClassName(invalid: boolean) {
  return `h-10 w-full border bg-white px-3 text-sm text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-[#9b793d] ${
    invalid ? "border-red-400" : "border-zinc-300"
  }`;
}

const textareaClassName =
  "w-full resize-y border border-zinc-300 bg-white px-3 py-2.5 text-sm leading-6 text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-[#9b793d]";