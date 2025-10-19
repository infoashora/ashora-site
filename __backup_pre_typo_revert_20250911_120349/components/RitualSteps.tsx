"use client";

import Link from "next/link";

type Step = {
  icon: JSX.Element;
  title: string;
  text: string;
};

const steps: Step[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M12 3l1.6 3.7L17 8.4l-3.4 1.6L12 14l-1.6-4L7 8.4l3.4-1.7L12 3Z" fill="currentColor" />
        <path d="M19 15l.7 1.6L21 17l-1.3.6L19 19l-.7-1.4L17 17l1.3-1.1L19 15Z" fill="currentColor" />
      </svg>
    ),
    title: "Set your intention",
    text: "A quiet breath, a clear wish. Name what youâ€™re calling in.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M7 12c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
        <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    title: "Dress & place crystals",
    text: "Sprinkle herbs, arrange crystals, and create a gentle altar.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M12 3s3 3 3 6-1.5 5-3 7c-1.5-2-3-4-3-7s3-6 3-6Z" fill="currentColor"/>
        <path d="M6 20h12" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    title: "Light & recite",
    text: "Ignite the wick, speak your affirmation, let the flame carry it.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M4 12c4 0 4 4 8 4s4-4 8-4" stroke="currentColor" strokeWidth="1.4" fill="none"/>
        <circle cx="12" cy="7" r="2" fill="currentColor"/>
      </svg>
    ),
    title: "Close & ground",
    text: "Give thanks, snuff the candle, and keep the crystal close.",
  },
];

export default function RitualSteps() {
  return (
    <section className="relative">
      {/* soft parchment glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(80%_60%_at_50%_0%,rgba(198,168,100,0.10),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-6 py-14 space-y-6">
        <header className="space-y-1 max-w-prose">
          <h2 className="text-xl font-medium">How the ritual works</h2>
          <p className="text-sm opacity-70">
            A simple, soothing practice to anchor your intention.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-gold/30 bg-white/80 backdrop-blur p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-gold/50 text-gold">
                  {s.icon}
                </span>
                <div>
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className="text-xs opacity-70">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <Link
            href="/collections#ritual-boxes"
            className="btn bg-parchment hover:text-gold no-underline"
          >
            Explore Ritual Boxes
          </Link>
        </div>
      </div>
    </section>
  );
}
