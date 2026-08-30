"use client";

import { useCallback } from "react";

export default function CustomOrderForm() {
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const entries = Array.from(fd.entries()) as [string, string][];
    const data = Object.fromEntries(entries);

    const subject = "Custom Candle Request";
    const body = [
      "Custom Candle Request",
      "---------------------",
      `Name: ${data.name || ""}`,
      `Email: ${data.email || ""}`,
      "Product Type: Custom Candle",
      `Intention/Purpose: ${data.intention || ""}`,
      `Specific Requests: ${data.requests || ""}`,
      `Special Significance: ${data.significance || ""}`,
      `Timeline: ${data.timeline || ""}`,
      `Additional Notes: ${data.notes || ""}`,
    ].join("\n");

    window.location.href = `mailto:info@ashora.co.uk?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, []);

  return (
    <section className="rounded-2xl border border-ink/10 bg-white p-5">
      <h2 className="mb-2 font-cormorant text-xl font-semibold">
        Ready to Create Your Candle?
      </h2>

      <p className="mb-4 text-sm opacity-85">
        Please allow <strong>48 business hours</strong> for us to review your
        request and provide your personalised quote.
      </p>

      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block">Name</span>
            <input
              name="name"
              type="text"
              className="w-full rounded-md border border-ink/15 px-3 py-2"
              required
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block">Email</span>
            <input
              name="email"
              type="email"
              className="w-full rounded-md border border-ink/15 px-3 py-2"
              required
            />
          </label>
        </div>

        <label className="text-sm">
          <span className="mb-1 block">Your Intention / Purpose</span>
          <textarea
            name="intention"
            className="w-full rounded-md border border-ink/15 px-3 py-2"
            rows={3}
            required
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block">
            Specific Requests (colours, crystals, herbs, fragrance)
          </span>
          <textarea
            name="requests"
            className="w-full rounded-md border border-ink/15 px-3 py-2"
            rows={3}
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block">
            Special Significance (tell us your story)
          </span>
          <textarea
            name="significance"
            className="w-full rounded-md border border-ink/15 px-3 py-2"
            rows={3}
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block">
              Timeline (date needed, if any)
            </span>
            <input
              name="timeline"
              type="text"
              className="w-full rounded-md border border-ink/15 px-3 py-2"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block">Additional Notes</span>
            <input
              name="notes"
              type="text"
              className="w-full rounded-md border border-ink/15 px-3 py-2"
            />
          </label>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center rounded-full bg-parchment px-5 py-2.5 text-sm text-ink no-underline shadow-sm hover:text-gold"
          >
            Send request
          </button>

          <a
            href="mailto:info@ashora.co.uk"
            className="text-sm no-underline hover:text-gold"
          >
            Or email us directly
          </a>
        </div>
      </form>
    </section>
  );
}