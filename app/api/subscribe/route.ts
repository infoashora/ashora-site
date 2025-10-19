// app/api/subscribe/route.ts
import { NextResponse } from "next/server";

type SubscribePayload = {
  email: string;
  consent?: boolean;
  website?: string; // honeypot
  meta?: Record<string, unknown>;
};

/**
 * ENV required:
 * - N8N_JOIN_CIRCLE_WEBHOOK_URL : your n8n webhook URL for Join Ashora Circle
 * - ASHORA_FROM_EMAIL           : set to "info@ashora.co.uk"
 */
const N8N_WEBHOOK_URL = process.env.N8N_JOIN_CIRCLE_WEBHOOK_URL;
const FROM_EMAIL = process.env.ASHORA_FROM_EMAIL ?? "info@ashora.co.uk";

// Basic email check (keep it light — UX handled on client too)
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export async function POST(req: Request) {
  try {
    if (!N8N_WEBHOOK_URL) {
      return NextResponse.json(
        { ok: false, error: "Server not configured: missing N8N_JOIN_CIRCLE_WEBHOOK_URL" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as SubscribePayload;

    // Honeypot: if "website" is filled, treat as bot and no-op
    if (body.website && body.website.trim() !== "") {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const email = (body.email ?? "").trim().toLowerCase();
    const consent = Boolean(body.consent);

    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ ok: false, error: "Consent required" }, { status: 400 });
    }

    // Compose payload for n8n. Keep it flexible so you can branch in your workflow.
    const payload = {
      type: "join_circle",
      email,
      consent,
      from: FROM_EMAIL,
      meta: {
        ...((body.meta as object) ?? {}),
        referrer:
          typeof (body.meta as any)?.referrer === "string"
            ? (body.meta as any).referrer
            : req.headers.get("referer"),
        userAgent: req.headers.get("user-agent"),
        ts: new Date().toISOString(),
      },
      // Suggest a default subject/body. Your n8n Email node can override/format as needed.
      emailTemplate: {
        subject: "Welcome to ASHORA Circle ✨",
        // Keep copy simple here; craft final HTML inside n8n for full control/branding.
        text: `Hi lovely,

Welcome to the ASHORA Circle. You’ll be the first to hear about intention-led drops, ritual guides, and members-only perks.

With love & intention,
ASHORA Team
`,
      },
    };

    // Send to n8n webhook
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    }).catch((err) => {
      // Network/abort errors
      throw new Error(`Failed to reach n8n webhook: ${String(err)}`);
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { ok: false, error: "n8n webhook error", status: res.status, body: text?.slice(0, 500) },
        { status: 502 }
      );
    }

    // Optionally parse n8n response (often empty 200)
    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      // ignore non-JSON
    }

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    const message = typeof err?.message === "string" ? err.message : "Unexpected error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
