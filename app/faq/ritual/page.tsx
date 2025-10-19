import Link from "next/link";
import Accordion from "@/app/components/Accordion";

const TITLE = "Ritual FAQ";

export default function RitualFaqPage() {
  // Your exact wording â€” no edits
  const intro = `Hi lovely,
Welcome to your spiritual sanctuary. This guide is here to help you bring intention, calm, and energy alignment into your daily life. Rituals donâ€™t need to be complicated â€“ they simply require presence, clarity, and a little magic.`;

  const items = [
    {
      title: "Intention Candles",
      content: `Lighting a candle bridges your inner world with outer reality.
Get clear on your intention.
Light your candle and state your desire.
Visualise the outcome.
Give thanks when extinguishing.
Each ASHORA candle comes with its own ritual guide to make this process simple and powerful.`,
    },
    {
      title: "Crystals",
      content: `Crystals hold and amplify energy, each with unique properties.
Clear Quartz: Amplification.
Amethyst: Peace & protection.
Citrine: Confidence & success.
Trust your intuition â€“ youâ€™ll be drawn to what you need.`,
    },
    {
      title: "Herbs & Botanicals",
      content: `Sacred herbs support intentions on both energetic and sensory levels.
Rosemary: Clarity.
Lavender: Peace.
Basil: Prosperity.
Lighting a herb-infused candle layers extra support into your practice.`,
    },
    {
      title: "Cleansing Your Space",
      content: `Keep your energy fresh and balanced:
Light a candle with intention.
Open windows for fresh air.
Burn cleansing herbs (sage, palo santo).
Use sound or place protective crystals.`,
    },
    {
      title: "Moon Phases",
      content: `Work with lunar rhythms to enhance your practice:
New Moon: New beginnings, fresh intentions.
Full Moon: Manifestation, gratitude, release.
Waning Moon: Letting go, cleansing.`,
    },
    {
      title: "Meditation & Mindfulness",
      content: `Rituals are most powerful when you slow down. Try:
Candle gazing for focus.
Breathing exercises.
Gratitude reflection.
Even 5 minutes daily can transform your energy.`,
    },
    {
      title: "Build Your Ritual Toolkit",
      content: `Start simple and grow naturally:
Intention candles.
Crystals & herbs.
Cleansing tools.
A journal or sacred space.
Our ritual kits combine these essentials into one complete set.

Your journey starts here. Explore ASHORA candles, ritual kits, and custom spiritual tools to create rituals that support your highest self.
With love & intention,
ASHORA Team x
Questions? Weâ€™re here to support you â€“ contact us at info@ashora.co.uk.`,
    },
  ];

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-zinc-600">
        <Link href="/" className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800">
          Home
        </Link>{" "}
        / <Link href="/faq" className="underline decoration-amber-300 underline-offset-4 hover:text-zinc-800">
          FAQ
        </Link>{" "}
        / <span className="text-zinc-800">{TITLE}</span>
      </nav>

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">{TITLE}</h1>
      </header>

      <p className="mx-auto mb-6 max-w-2xl text-sm leading-6 text-zinc-700 whitespace-pre-line">
        {intro}
      </p>

      <Accordion
        items={items.map((it, i) => ({
          title: it.title,
          content: <p className="whitespace-pre-line leading-6">{it.content}</p>,
          defaultOpen: i === 0, // open the first by default
        }))}
      />
    </main>
  );
}
