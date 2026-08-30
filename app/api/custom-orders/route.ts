// app/api/custom-orders/route.ts
import { NextResponse } from "next/server";

type ProductType = "Custom Candle";

type CustomOrderBody = {
  name: string;
  email: string;
  productType?: ProductType;
  intention?: string;
  requests?: string;
  significance?: string;
  timeline?: string;
  notes?: string;
  website?: string;
  meta?: Record<string, unknown>;
};

/**
 * ENV required:
 * - N8N_CUSTOM_ORDERS_WEBHOOK_URL : n8n webhook production URL for Custom Orders flow
 * - ASHORA_FROM_EMAIL             : e.g. "info@ashora.co.uk"
 */
const N8N_WEBHOOK_URL = process.env.N8N_CUSTOM_ORDERS_WEBHOOK_URL;
const FROM_EMAIL = process.env.ASHORA_FROM_EMAIL ?? "info@ashora.co.uk";

const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((value ?? "").trim());

const clamp = (value: string, max = 5000) => (value || "").slice(0, max);

export async function POST(req: Request) {
  try {
    if (!N8N_WEBHOOK_URL) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Server not configured: missing N8N_CUSTOM_ORDERS_WEBHOOK_URL",
        },
        { status: 500 }
      );
    }

    const body = (await req.json()) as CustomOrderBody;

    if (body.website && body.website.trim() !== "") {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const name = clamp(body.name ?? "").trim();
    const email = clamp(body.email ?? "").trim().toLowerCase();
    const productType: ProductType = "Custom Candle";

    if (!name || !isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid name or email" },
        { status: 400 }
      );
    }

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
        referrer:
          typeof body.meta?.referrer === "string"
            ? body.meta.referrer
            : req.headers.get("referer"),
        userAgent: req.headers.get("user-agent"),
        ts: new Date().toISOString(),
      },
      emailTemplate: {
        customer: {
          subject: "We have received your custom ASHORA candle request",
          text: `Hi lovely ${name},

Thank you for your custom candle request. Our team will review your vision and reply within 48 business hours with a quote and timeline.

With love & intention,
ASHORA Team`,
        },
        internal: {
          subject: `New Custom Candle Request - ${name}`,
        },
      },
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    let res: Response;

    try {
      res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } catch (error) {
      throw new Error(`Failed to reach n8n webhook: ${String(error)}`);
    } finally {
      clearTimeout(timeout);
    }

    if (!res.ok) {
      const text = await res.text().catch(() => "");

      return NextResponse.json(
        {
          ok: false,
          error: "n8n webhook error",
          status: res.status,
          body: text.slice(0, 500),
        },
        { status: 502 }
      );
    }

    let data: unknown = null;

    try {
      data = await res.json();
    } catch {
      data = null;
    }

    return NextResponse.json({ ok: true, data });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected error";

    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}