import Link from "next/link";
import Accordion from "@/app/components/Accordion";

const GOLD = "#D1A954";
const TITLE = "FAQ: Frequently Asked Questions";

export default function FaqPage() {
  // Clean, corrected copy (apostrophes, en dashes, fractions)
  const sections: { name: string; items: { q: string; a: string }[] }[] = [
    {
      name: "Product Information",
      items: [
        {
          q: "Are the crystals in your candles real?",
          a: `Yes — every crystal is 100% genuine, cleansed, and charged before being placed into your candle.`,
        },
        {
          q: "Are your herbs safe and organic?",
          a: `We use high-quality herbs chosen for their energy and scent. Always check each product for details if you have allergies or pets.`,
        },
        {
          q: "What are the affirmation cards?",
          a: `Each product includes a unique A5 collectible affirmation card, designed to be kept as part of your growing ASHORA deck.`,
        },
        {
          q: "What ingredients do you use?",
          a: `Our candles are made with a premium soy wax blend, genuine crystals, natural herbs, and carefully chosen fragrance oils. Everything is vegan and eco-conscious.`,
        },
      ],
    },
    {
      name: "Ordering & Shipping",
      items: [
        {
          q: "How long does processing take?",
          a: `Orders are hand-poured and packed with care. Most are shipped within 2–4 business days.`,
        },
        {
          q: "Do you use eco-friendly packaging?",
          a: `Yes — all packaging is recyclable, from tissue to shipping boxes. Please recycle to help us protect the planet.`,
        },
        {
          q: "Which countries do you ship to?",
          a: `UK: £3.99 standard, £5.99 express, FREE over £50
Europe: £7.99
USA, Canada & Australia: £12.99`,
        },
        {
          q: "How do I track my order?",
          a: `You’ll receive a tracking email once your order has been dispatched (where available).`,
        },
        {
          q: "Do international orders include customs fees?",
          a: `No — international customers may need to pay duties or taxes in their own country.`,
        },
      ],
    },
    {
      name: "Candle Care & Safety",
      items: [
        {
          q: "How do I burn my ASHORA candle safely?",
          a: `Never leave a candle unattended.
Remove crystals once the wax softens around them.
Trim wick to 1/4 inch (6 mm) before each burn.
Burn on a heat-resistant surface away from drafts.
Do not burn for more than 4 hours at a time.
Keep away from children, pets, and flammable items.
Stop burning when 1/2 inch (12 mm) of wax remains.`,
        },
        {
          q: "How can I reuse my candle jar?",
          a: `Once finished, clean your jar and repurpose it. Ideas can be found in our Jar Reuse Guide and on your care card.`,
        },
        {
          q: "How should I care for my crystals after removing them?",
          a: `Cleanse them with moonlight, sunlight, smoke (sage/incense), or running water (if the crystal is water-safe). Then use them in rituals, carry them, or place them in your sacred space.`,
        },
      ],
    },
    {
      name: "Custom Orders",
      items: [
        {
          q: "How long do custom orders take?",
          a: `Standard: 2–3 weeks. Rush orders may be possible — email us to discuss timelines.`,
        },
        {
          q: "Can I change my custom order after placing it?",
          a: `Email us as soon as possible. We’ll try, but changes can’t be guaranteed once creation has started.`,
        },
      ],
    },
    {
      name: "Returns & Exchanges",
      items: [
        {
          q: "What is your return policy?",
          a: `We cannot accept returns on lit or used candles. Unopened items may be returned within 7 days in original condition. See our full policy for details.`,
        },
        {
          q: "What if my order arrives damaged?",
          a: `Email info@ashora.co.uk within 48 hours with photos. We’ll arrange a replacement or refund.`,
        },
      ],
    },
    {
      name: "Contact & Support",
      items: [
        {
          q: "How can I contact you?",
          a: `Email info@ashora.co.uk. We reply within 48 business hours (Mon–Fri, 9am–4pm).`,
        },
        {
          q: "Do you offer wholesale?",
          a: `Yes — email us for wholesale enquiries and we’ll send our trade information.`,
        },
        {
          q: "Can you create candles for events or weddings?",
          a: `Absolutely — see our Custom Orders page for details.`,
        },
      ],
    },
  ];

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-zinc-600">
        <Link
          href="/"
          className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800"
        >
          Home
        </Link>{" "}
        / <span className="text-zinc-800">FAQ</span>
      </nav>

      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="font-cormorant text-3xl font-semibold tracking-tight">{TITLE}</h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-600">
          Answers to your most common questions — if you need anything else, we’re right here.
        </p>
        <div
          className="mx-auto mt-5 h-px w-40 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
          aria-hidden
        />
      </header>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((sec) => (
          <section key={sec.name}>
            <h2 className="mb-3 text-base font-semibold tracking-tight">{sec.name}</h2>
            <Accordion
              items={sec.items.map((it) => ({
                title: it.q,
                content: <p className="whitespace-pre-line leading-6">{it.a}</p>,
              }))}
            />
          </section>
        ))}
      </div>

      {/* Closing line */}
      <p className="mt-10 text-center text-sm text-zinc-700">
        Still have questions? We’re here to help. Contact us at{" "}
        <a href="mailto:info@ashora.co.uk" className="underline decoration-amber-300 underline-offset-4">
          info@ashora.co.uk
        </a>{" "}
        and we’ll guide you with love and intention.
      </p>
    </main>
  );
}
