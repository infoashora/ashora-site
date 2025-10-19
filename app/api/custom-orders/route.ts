// app/api/custom-orders/route.ts
import { NextResponse } from "next/server";

type ProductType = "Custom Candle" | "Ritual Box" | "Crystal Kit" | "Herb Box" | "Other";

type CustomOrderBody = {
  name: string;
  email: string;
  productType: ProductType;
  intention?: string;
  requests?: string;
  significance?: string;
  timeline?: string;
  notes?: string;
  website?: string; // honeypot
  meta?: Record<string, unknown>;
};

/**
 * ENV required:
 * - N8N_CUSTOM_ORDERS_WEBHOOK_URL : n8n webhook (Production URL) for Custom Orders flow
 * - ASHORA_FROM_EMAIL             : e.g. "info@ashora.co.uk"
 */
const N8N_WEBHOOK_URL = process.env.N8N_CUSTOM_ORDERS_WEBHOOK_URL;
const FROM_EMAIL = process.env.ASHORA_FROM_EMAIL ?? "info@ashora.co.uk";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v ?? "").trim());
const clamp = (s: string, max = 5000) => (s || "").slice(0, max);

export async function POST(req: Request) {
  try {
    if (!N8N_WEBHOOK_URL) {
      return NextResponse.json(
        { ok: false, error: "Server not configured: missing N8N_CUSTOM_ORDERS_WEBHOOK_URL" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as CustomOrderBody;

    // Honeypot — if filled, silently pretend success
    if (body.website && body.website.trim() !== "") {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const name = clamp(body.name ?? "").trim();
    const email = clamp(body.email ?? "").trim().toLowerCase();
    const productType = (body.productType ?? "Custom Candle") as ProductType;

    if (!name || !isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid name or email" },
        { status: 400 }
      );
    }

    // Compose payload for n8n
    const payload = {
      type: "custom_order_request",
      from: FROM_EMAIL,
      customer: {
        name,
        email,
      },
      details: {
        productType,
        intention: clamp(body.intention ?? ""),
        requests: clamp(body.requests ?? ""),
        significance: clamp(body.significance ?? ""),
        timeline: clamp(body.timeline ?? ""),
        notes: clamp(body.notes ?? ""),
      },
      meta: {
        ...(body.meta ?? {}),
        referrer: (body.meta as any)?.referrer || req.headers.get("referer"),
        userAgent: req.headers.get("user-agent"),
        ts: new Date().toISOString(),
      },
      emailTemplate: {
        // Optional suggestions for your n8n Email nodes
        customer: {
          subject: "We’ve received your custom ASHORA request 💫",
          text: `Hi lovely ${name},

Thank you for your custom order request. Our team will review your vision and reply within 48 business hours with a quote and timeline.

With love & intention,
ASHORA Team`,
        },
        internal: {
          subject: `New Custom Order Request — ${name} • ${productType}`,
        },
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

    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      // ignore if not JSON
    }

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    const message = typeof err?.message === "string" ? err.message : "Unexpected error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
