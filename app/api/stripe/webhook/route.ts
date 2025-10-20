// app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { Resend } from "resend";
import { promises as fs } from "fs";
import path from "path";
import { PRODUCTS_MAP } from "@/app/product/content";

export const runtime = "nodejs";              // ensure Node runtime (fs/path support)
export const dynamic = "force-dynamic";       // never try to prerender this route

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

// ---------- utils ----------
function gbp(pence?: number | null) {
  if (typeof pence !== "number") return "—";
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);
}
const safe = (v?: string | null) => (v ?? "").toString();

const STOCK_DIR = path.join(process.cwd(), "data");
const STOCK_PATH = path.join(STOCK_DIR, "stock.json");

type StockMap = Record<string, number>; // handle -> stock (override)

async function ensureStockDir() {
  await fs.mkdir(STOCK_DIR, { recursive: true }).catch(() => {});
}
async function readStock(): Promise<StockMap> {
  try {
    const raw = await fs.readFile(STOCK_PATH, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as StockMap;
  } catch {}
  return {};
}
async function writeStock(map: StockMap) {
  await ensureStockDir();
  await fs.writeFile(STOCK_PATH, JSON.stringify(map, null, 2), "utf8");
}

function resolveHandleFromLineItem(li: Stripe.LineItem): string | null {
  // prefer metadata on expanded product or price
  const price = li.price ?? null;
  const prod = (price && (price as any).product) ?? null;

  const metaHandle =
    (prod?.metadata?.handle as string | undefined) ||
    (price?.metadata?.handle as string | undefined);

  if (metaHandle && PRODUCTS_MAP[metaHandle]) return metaHandle;

  // fallback: try names
  const candidates = [prod?.name || "", li.description || "", price?.nickname || ""]
    .map((s) => (s || "").trim())
    .filter(Boolean);
  if (candidates.length) {
    for (const [handle, p] of Object.entries(PRODUCTS_MAP)) {
      const title = (p.title || "").trim().toLowerCase();
      if (candidates.some((c) => c.toLowerCase() === title)) return handle;
    }
  }
  return null;
}

async function decrementStockFor(handles: Array<{ handle: string; qty: number }>) {
  if (!handles.length) return;
  const current = await readStock();

  for (const { handle } of handles) {
    if (current[handle] === undefined) {
      const cat = PRODUCTS_MAP[handle];
      if (cat && typeof cat.stock === "number") current[handle] = cat.stock;
    }
  }
  for (const { handle, qty } of handles) {
    if (current[handle] === undefined) continue;
    current[handle] = Math.max(0, (current[handle] ?? 0) - Math.max(1, qty));
  }
  await writeStock(current);
}

// ---------- webhook handler ----------
export async function POST(req: Request) {
  const sig = headers().get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret || !sig) {
    console.error("[stripe] Missing STRIPE_WEBHOOK_SECRET or stripe-signature");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err: any) {
    console.error("[stripe] Signature verification failed:", err?.message || err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const sessionObj = event.data.object as Stripe.Checkout.Session;

      const session = await stripe.checkout.sessions.retrieve(sessionObj.id, {
        expand: ["line_items.data.price.product", "payment_intent", "customer_details", "shipping_details"],
      });

      // flatten line items
      const lineItems = (session.line_items?.data || []).map((li) => {
        const prod = (li?.price as any)?.product ?? null;
        return {
          id: li.id,
          description: li.description || prod?.name || li.price?.nickname || "ASHORA Item",
          quantity: li.quantity ?? 1,
          unit_amount: li.price?.unit_amount ?? null,
          amount_subtotal: li.amount_subtotal ?? null,
          amount_total: li.amount_total ?? null,
          currency: li.currency ?? session.currency,
          product: prod
            ? {
                id: prod.id,
                name: prod.name,
                images: Array.isArray(prod.images) ? prod.images : [],
                metadata: prod.metadata ?? {},
              }
            : null,
          price_metadata: li.price?.metadata ?? {},
        };
      });

      // stock decrement
      const decrements: Array<{ handle: string; qty: number }> = [];
      for (const li of session.line_items?.data || []) {
        const handle = resolveHandleFromLineItem(li);
        const qty = Math.max(1, li.quantity ?? 1);
        if (handle) decrements.push({ handle, qty });
        else
          console.warn("[stock] Could not resolve handle for line item:", {
            li_id: li.id,
            desc: li.description,
          });
      }
      if (decrements.length) {
        try {
          await decrementStockFor(decrements);
        } catch (e: any) {
          console.error("[stock] decrement failed:", e?.message || e);
        }
      }

      // forward to n8n
      const payload = {
        type: event.type,
        event_id: event.id,
        created: session.created,
        session_id: session.id,
        payment_status: session.payment_status,
        payment_intent_id:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id || null,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_details?.email || session.customer_email || null,
        customer_name: session.customer_details?.name || null,
        customer_details: session.customer_details || null,
        shipping_details: (session as any).shipping_details || null, // type not in older defs
        line_items: lineItems,
        metadata: session.metadata || {},
      };

      const n8nUrl = process.env.N8N_ORDER_WEBHOOK_URL;
      if (!n8nUrl) {
        console.warn("[n8n] N8N_ORDER_WEBHOOK_URL not set — skipping forward.");
      } else {
        try {
          const r = await fetch(n8nUrl, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!r.ok) {
            console.error("[n8n] Webhook responded with", r.status, await r.text().catch(() => ""));
          }
        } catch (e: any) {
          console.error("[n8n] POST failed:", e?.message || e);
        }
      }

      // optional customer email via Resend
      try {
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        const toEmail = safe(session.customer_details?.email) || safe(session.customer_email);
        if (RESEND_API_KEY && toEmail) {
          const itemsHtml = lineItems
            .map((li) => {
              const qty = li.quantity ?? 1;
              const line = (li.unit_amount ?? 0) * qty;
              return `<tr>
                <td style="padding:8px 0">${li.description}</td>
                <td style="padding:8px 0; text-align:center">×${qty}</td>
                <td style="padding:8px 0; text-align:right">${gbp(line)}</td>
              </tr>`;
            })
            .join("");

          const html = `
            <div style="font-family: system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; color:#111;">
              <h2 style="margin:0 0 8px 0;">Thank you for your order${session.customer_details?.name ? `, ${session.customer_details.name}` : ""}.</h2>
              <p style="margin:0 0 14px 0;">We’re preparing your ASHORA items with love & intention.</p>
              <div style="border:1px solid #e5e7eb; border-radius:12px; padding:16px; background:#fff;">
                <div style="font-weight:600; font-size:14px; margin-bottom:8px;">Order Summary</div>
                <table style="width:100%; border-collapse:collapse; font-size:14px;">
                  ${itemsHtml}
                  <tr><td colspan="3" style="border-top:1px solid #e5e7eb; padding-top:8px"></td></tr>
                  <tr>
                    <td style="padding:8px 0; font-weight:600">Total</td>
                    <td></td>
                    <td style="padding:8px 0; text-align:right; font-weight:600">${gbp(session.amount_total)}</td>
                  </tr>
                </table>
                <p style="margin:12px 0 0 0; font-size:12px; color:#52525b;">A full receipt has been issued by Stripe.</p>
              </div>
              <p style="margin:14px 0 0 0; font-size:13px;">Questions? Email <a href="mailto:info@ashora.co.uk">info@ashora.co.uk</a>.</p>
              <p style="margin:6px 0 0 0; font-size:12px; color:#6b7280;">With love & intention, ASHORA Team</p>
            </div>
          `;

          const resend = new Resend(RESEND_API_KEY);
          await resend.emails.send({
            from: process.env.RESEND_FROM || "ASHORA <info@ashora.co.uk>",
            to: [toEmail],
            bcc: ["info@ashora.co.uk"],
            subject: "Your ASHORA order is confirmed",
            html,
          });
        }
      } catch (e) {
        console.error("[email] Resend send failed:", e);
      }
    }

    // Always 200 so Stripe doesn’t retry aggressively (tune to your preference)
    return NextResponse.json({ received: true });
  } catch (e: any) {
    console.error("[stripe:webhook] handler error:", e?.message || e);
    return NextResponse.json({ received: true });
  }
}
