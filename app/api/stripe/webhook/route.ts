// app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import type Stripe from "stripe";
import { promises as fs } from "fs";
import path from "path";
import { PRODUCTS_MAP } from "@/app/product/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---------- utils ----------
function gbp(pence?: number | null) {
  if (typeof pence !== "number") return "—";
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);
}
const safe = (v?: string | null) => (v ?? "").toString();

const STOCK_DIR = path.join(process.cwd(), "data");
const STOCK_PATH = path.join(STOCK_DIR, "stock.json");
type StockMap = Record<string, number>;

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

function resolveHandleFromLineItem(li: any): string | null {
  const price = li?.price ?? null;
  const prod = price && (price as any).product ? (price as any).product : null;

  const metaHandle =
    (prod?.metadata?.handle as string | undefined) ||
    (price?.metadata?.handle as string | undefined);

  if (metaHandle && PRODUCTS_MAP[metaHandle]) return metaHandle;

  const candidates = [prod?.name || "", li?.description || "", price?.nickname || ""]
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

async function getStripe(): Promise<Stripe> {
  const key = process.env.STRIPE_SECRET_KEY || "";
  const mod = await import("stripe");
  const StripeCtor = mod.default;
  return new StripeCtor(key, { apiVersion: "2025-08-27.basil" }) as unknown as Stripe;
}

// ---------- main webhook handler ----------
export async function POST(req: Request) {
  const sig = headers().get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret || !sig) {
    console.error("[stripe:webhook] Missing STRIPE_WEBHOOK_SECRET or signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    const stripe = await getStripe();
    // ✅ Use instance method for correct signature verification
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err: any) {
    console.error("[stripe:webhook] Signature verification failed:", err?.message || err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const stripe = await getStripe();
      const sessionObj = event.data.object as any;

      const session = await stripe.checkout.sessions.retrieve(sessionObj.id, {
        expand: ["line_items.data.price.product", "payment_intent", "customer_details", "shipping_details"],
      });

      const lineItems = (session.line_items?.data || []).map((li: any) => {
        const prod = (li?.price as any)?.product ?? null;
        return {
          id: li.id,
          description: li.description || prod?.name || li.price?.nickname || "ASHORA Item",
          quantity: li.quantity ?? 1,
          unit_amount: li.price?.unit_amount ?? null,
          amount_total: li.amount_total ?? null,
          currency: li.currency ?? session.currency,
          product: prod ? { id: prod.id, name: prod.name, images: prod.images ?? [], metadata: prod.metadata ?? {} } : null,
        };
      });

      const decrements: Array<{ handle: string; qty: number }> = [];
      for (const li of session.line_items?.data || []) {
        const handle = resolveHandleFromLineItem(li);
        const qty = Math.max(1, li.quantity ?? 1);
        if (handle) decrements.push({ handle, qty });
        else console.warn("[stock] Could not resolve handle:", li.description);
      }
      if (decrements.length) await decrementStockFor(decrements);

      // Forward to n8n if set
      const n8nUrl = process.env.N8N_ORDER_WEBHOOK_URL;
      if (n8nUrl) {
        try {
          await fetch(n8nUrl, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ event, session, lineItems }),
          });
        } catch (e: any) {
          console.error("[n8n] POST failed:", e?.message);
        }
      }

      console.log("[stripe:webhook] checkout.session.completed processed OK");
    }

    // ✅ Always acknowledge Stripe to avoid retries
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (e: any) {
    console.error("[stripe:webhook] handler error:", e?.message || e);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}
