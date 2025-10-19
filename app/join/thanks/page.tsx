import Link from "next/link";

export const metadata = {
  title: "Thank You â€¢ Ashora",
  description:
    "Youâ€™re on the list. Welcome to Ashora â€” vegan, eco-conscious, spiritual-meets-luxury candles.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-[70vh] bg-[#FAF8F4]">
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-zinc-300 via-amber-300 to-zinc-300"
      />
      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-amber-300 bg-white shadow-sm">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="11" stroke="#D1A954" strokeWidth="1.2" />
            <path d="M7 12.5l3 3 7-7" stroke="#D1A954" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          Thank You, Lovely
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-balance text-zinc-600">
          Youâ€™re all set. Weâ€™ve received your details and added you to our
          circle. Expect intentional updates, early drops, and rituals crafted
          with love &amp; intention. âœ¨
        </p>

        <ul className="mx-auto mt-8 grid grid-cols-1 gap-3 text-sm text-zinc-700 sm:grid-cols-3">
          <li className="rounded-md border border-zinc-200 bg-white px-4 py-3">Early Access</li>
          <li className="rounded-md border border-zinc-200 bg-white px-4 py-3">Launch Ritual Cards</li>
          <li className="rounded-md border border-zinc-200 bg-white px-4 py-3">Limited Drops</li>
        </ul>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/shop" className="inline-flex items-center justify-center rounded-md border border-amber-300 bg-amber-200/60 px-5 py-3 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-amber-200">
            Shop Candles
          </Link>
          <Link href="/" className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50">
            Back Home
          </Link>
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          If this wasnâ€™t you, please ignore this message or{" "}
          <a href="mailto:info@ashora.co.uk" className="underline decoration-amber-300 underline-offset-2 hover:text-zinc-700">
            contact us
          </a>.
        </p>
      </section>
    </main>
  );
}
