// app/api/join/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type JoinPayload = {
  name?: string;
  email?: string;
  message?: string;
  source?: string; // e.g. "footer", "modal", etc.
};

/** Very light email check (we still rely on n8n / ESP for true validation). */
function looksLikeEmail(s?: string) {
  if (!s) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

/** Build a JSON response helper. */
function json(data: any, init?: number | ResponseInit) {
  const status = typeof init === "number" ? init : undefined;
  const initObj: ResponseInit =
    typeof init === "object" ? init : status ? { status } : {};
  return NextResponse.json(data, initObj);
}

/** Allow simple CORS (for future if form ever posts cross-origin). */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function POST(req: Request) {
  try {
    const n8nUrl = process.env.N8N_JOIN_CIRCLE_WEBHOOK_URL;
    if (!n8nUrl) {
      console.error("[join] Missing N8N_JOIN_CIRCLE_WEBHOOK_URL in env");
      return json({ ok: false, error: "Service not configured" }, 500);
    }

    let body: JoinPayload | undefined;
    try {
      body = (await req.json()) as JoinPayload;
    } catch {
      return json({ ok: false, error: "Invalid JSON body" }, 400);
    }

    const name = (body?.name ?? "").toString().trim();
    const email = (body?.email ?? "").toString().trim();
    const message = (body?.message ?? "").toString().trim();
    const source = (body?.source ?? "").toString().trim();

    if (!looksLikeEmail(email)) {
      return json({ ok: false, error: "Valid email is required" }, 400);
    }

    // Compose payload for n8n
    const payload = {
      name: name || null,
      email,
      message: message || null,
      source: source || "join",
      meta: {
        userAgent: req.headers.get("user-agent") || null,
        referer: req.headers.get("referer") || null,
        ts: Date.now(),
      },
    };

    // Forward to n8n
    const r = await fetch(n8nUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => "");
      console.error("[join] n8n responded with", r.status, txt);
      return json({ ok: false, error: "Upstream error" }, 502);
    }

    return json({ ok: true });
  } catch (err: any) {
    console.error("[join] Unhandled error:", err?.message || err);
    return json({ ok: false, error: "Server error" }, 500);
  }
}
