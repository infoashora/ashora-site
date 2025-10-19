"use client";

import { useCallback } from "react";

export default function CustomOrderForm() {
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const entries = Array.from(fd.entries()) as [string, string][];
    const data = Object.fromEntries(entries);

    const subject = "Custom Order Request";
    const body = [
      "Custom Order Request",
      "---------------------",
      `Name: ${data.name || ""}`,
      `Email: ${data.email || ""}`,
      `Product Type: ${data.type || ""}`,
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
      <h2 className="font-cormorant text-xl font-semibold mb-2">Ready to Create Your Magic?</h2>
      <p className="text-sm opacity-85 mb-4">
        Please allow <strong>48 business hours</strong> for us to review your request and provide your personalized quote.
      </p>

      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="text-sm">
            <span className="block mb-1">Name</span>
            <input name="name" type="text" className="w-full rounded-md border border-ink/15 px-3 py-2" required />
          </label>
          <label className="text-sm">
            <span className="block mb-1">Email</span>
            <input name="email" type="email" className="w-full rounded-md border border-ink/15 px-3 py-2" required />
          </label>
        </div>

        <label className="text-sm">
          <span className="block mb-1">Product Type</span>
          <select name="type" className="w-full rounded-md border border-ink/15 px-3 py-2" required>
            <option value="">Selectâ€¦</option>
            <option>Custom Candle</option>
            <option>Ritual Box</option>
            <option>Crystal Kit</option>
            <option>Herb Pack</option>
          </select>
        </label>

        <label className="text-sm">
          <span className="block mb-1">Your Intention / Purpose</span>
          <textarea name="intention" className="w-full rounded-md border border-ink/15 px-3 py-2" rows={3} required />
        </label>

        <label className="text-sm">
          <span className="block mb-1">Specific Requests (colours, crystals, herbs)</span>
          <textarea name="requests" className="w-full rounded-md border border-ink/15 px-3 py-2" rows={3} />
        </label>

        <label className="text-sm">
          <span className="block mb-1">Special Significance (tell us your story)</span>
          <textarea name="significance" className="w-full rounded-md border border-ink/15 px-3 py-2" rows={3} />
        </label>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="text-sm">
            <span className="block mb-1">Timeline (date needed, if any)</span>
            <input name="timeline" type="text" className="w-full rounded-md border border-ink/15 px-3 py-2" />
          </label>
          <label className="text-sm">
            <span className="block mb-1">Additional Notes</span>
            <input name="notes" type="text" className="w-full rounded-md border border-ink/15 px-3 py-2" />
          </label>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm bg-parchment text-ink hover:text-gold shadow-sm no-underline"
          >
            Send request
          </button>
          <a href="mailto:info@ashora.co.uk" className="no-underline text-sm hover:text-gold">
            Or email us directly
          </a>
        </div>
      </form>
    </section>
  );
}
