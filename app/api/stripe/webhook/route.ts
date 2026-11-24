import { NextResponse } from "next/server";
import { headers } from "next/headers";
import type Stripe from "stripe";
import { promises as fs } from "fs";
import path from "path";
import { PRODUCTS_MAP } from "@/app/product/content";
import { sendOrderConfirmation } from "@/lib/email/order-confirmation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---------- Stock utilities ----------

const STOCK_DIR = path.join(process.cwd(), "data");
const STOCK_PATH = path.join(STOCK_DIR, "stock.json");

type StockMap = Record<string, number>;

async function ensureStockDir() {
  await fs.mkdir(STOCK_DIR, {
    recursive: true,
  }).catch(() => {});
}

async function readStock(): Promise<StockMap> {
  try {
    const raw = await fs.readFile(STOCK_PATH, "utf8");
    const parsed = JSON.parse(raw);

    if (parsed && typeof parsed === "object") {
      return parsed as StockMap;
    }
  } catch {}

  return {};
}

async function writeStock(map: StockMap) {
  await ensureStockDir();

  await fs.writeFile(
    STOCK_PATH,
    JSON.stringify(map, null, 2),
    "utf8"
  );
}

function resolveHandleFromLineItem(
  li: any
): string | null {
  const price = li?.price ?? null;
  const prod = price?.product ?? null;

  const metaHandle =
    prod?.metadata?.handle ||
    price?.metadata?.handle;

  if (metaHandle && PRODUCTS_MAP[metaHandle]) {
    return metaHandle;
  }

  const candidates = [
    prod?.name || "",
    li?.description || "",
    price?.nickname || "",
  ]
    .map((s) => (s || "").trim())
    .filter(Boolean);

  for (const [handle, product] of Object.entries(
    PRODUCTS_MAP
  )) {
    const title = (product.title || "")
      .trim()
      .toLowerCase();

    if (
      candidates.some(
        (candidate) =>
          candidate.toLowerCase() === title
      )
    ) {
      return handle;
    }
  }

  return null;
}

async function decrementStockFor(
  handles: Array<{
    handle: string;
    qty: number;
  }>
) {
  if (!handles.length) return;

  const current = await readStock();

  for (const { handle } of handles) {
    if (current[handle] === undefined) {
      const product = PRODUCTS_MAP[handle];

      if (
        product &&
        typeof product.stock === "number"
      ) {
        current[handle] = product.stock;
      }
    }
  }

  for (const { handle, qty } of handles) {
    if (current[handle] === undefined) continue;

    current[handle] = Math.max(
      0,
      current[handle] - Math.max(1, qty)
    );
  }

  await writeStock(current);
}

// ---------- Stripe client ----------

async function getStripe(): Promise<Stripe> {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is missing");
  }

  const mod = await import("stripe");
  const StripeCtor = mod.default;

  return new StripeCtor(key, {
    apiVersion: "2025-08-27.basil",
  }) as unknown as Stripe;
}

// ---------- Delivery details ----------

function getShippingDetails(session: any) {
  return (
    session.collected_information?.shipping_details ||
    session.shipping_details ||
    null
  );
}

function getShippingAddress(
  session: any
): string[] {
  const shipping = getShippingDetails(session);
  const address = shipping?.address;

  if (!address) return [];

  return [
    shipping?.name,
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.postal_code,
    address.country,
  ].filter(
    (value): value is string =>
      typeof value === "string" &&
      value.trim().length > 0
  );
}

async function getShippingMethod(
  stripe: Stripe,
  session: Stripe.Checkout.Session
): Promise<string | undefined> {
  const shippingRate =
    session.shipping_cost?.shipping_rate;

  if (!shippingRate) return undefined;

  if (typeof shippingRate === "object") {
    return shippingRate.display_name || undefined;
  }

  try {
    const rate =
      await stripe.shippingRates.retrieve(
        shippingRate
      );

    return rate.display_name || undefined;
  } catch {
    console.warn(
      "[stripe:webhook] Could not retrieve shipping method"
    );

    return undefined;
  }
}

// ---------- Main webhook handler ----------

export async function POST(req: Request) {
  const signature = headers().get(
    "stripe-signature"
  );

  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret || !signature) {
    console.error(
      "[stripe:webhook] Missing webhook configuration"
    );

    return NextResponse.json(
      { error: "Missing signature" },
      { status: 400 }
    );
  }

  const rawBody = await req.text();

  let stripe: Stripe;
  let event: Stripe.Event;

  try {
    stripe = await getStripe();

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      secret
    );
  } catch {
    console.error(
      "[stripe:webhook] Signature verification failed"
    );

    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Only process completed or asynchronously paid
  // Checkout sessions.

  if (
    event.type !== "checkout.session.completed" &&
    event.type !==
      "checkout.session.async_payment_succeeded"
  ) {
    return NextResponse.json({
      received: true,
    });
  }

  try {
    const sessionObject =
      event.data.object as Stripe.Checkout.Session;

    const session =
      await stripe.checkout.sessions.retrieve(
        sessionObject.id,
        {
          expand: ["payment_intent"],
        }
      );

    // Never send a paid-order confirmation
    // for an unpaid session.

    if (session.payment_status !== "paid") {
      console.log(
        "[stripe:webhook] Session is not paid"
      );

      return NextResponse.json({
        received: true,
        skipped: "unpaid",
      });
    }

    if (session.mode !== "payment") {
      return NextResponse.json({
        received: true,
        skipped: "unsupported_mode",
      });
    }

    // Retrieve every line item, including product
    // metadata containing personalised names.

    const stripeLineItems: Stripe.LineItem[] = [];

    for await (const item of stripe.checkout.sessions.listLineItems(
      session.id,
      {
        limit: 100,
        expand: ["data.price.product"],
      }
    )) {
      stripeLineItems.push(item);
    }

    if (!stripeLineItems.length) {
      throw new Error("Order contains no line items");
    }

    const lineItems = stripeLineItems.map(
      (li: any) => {
        const product = li?.price?.product ?? null;

        return {
          id: li.id,

          description:
            li.description ||
            product?.name ||
            li.price?.nickname ||
            "ASHORA Item",

          quantity: li.quantity ?? 1,

          unit_amount:
            li.price?.unit_amount ?? null,

          amount_total:
            li.amount_total ?? null,

          currency:
            li.currency ?? session.currency,

          product: product
            ? {
                id: product.id,
                name: product.name,
                images: product.images ?? [],
                metadata: product.metadata ?? {},
              }
            : null,
        };
      }
    );

    // ---------- Order confirmation email ----------

    const confirmationAlreadySent =
      session.metadata?.ashora_confirmation_sent ===
      "true";

    if (!confirmationAlreadySent) {
      const customerEmail =
        session.customer_details?.email ||
        session.customer_email;

      if (!customerEmail) {
        throw new Error(
          "Paid order has no customer email"
        );
      }

      const customerName =
        session.customer_details?.name ||
        getShippingDetails(session)?.name ||
        undefined;

      const orderReference =
        `ASH-${session.id.slice(-12).toUpperCase()}`;

      const shippingMethod =
        await getShippingMethod(stripe, session);

      const emailItems = stripeLineItems.map(
        (li: any) => {
          const product = li?.price?.product;
          const quantity = li.quantity ?? 1;

          return {
            title:
              product?.name ||
              li.description ||
              "ASHORA Candle",

            quantity,

            unitAmount:
              li.price?.unit_amount ??
              Math.round(
                li.amount_subtotal / quantity
              ),

            personalisationName:
              product?.metadata
                ?.personalisation_name ||
              undefined,
          };
        }
      );

      const emailResult =
        await sendOrderConfirmation({
          sessionId: session.id,

          customerEmail,

          customerName,

          orderReference,

          items: emailItems,

          subtotal:
            session.amount_subtotal ?? 0,

          discount:
            session.total_details
              ?.amount_discount ?? 0,

          shipping:
            session.total_details
              ?.amount_shipping ?? 0,

          total:
            session.amount_total ?? 0,

          currency:
            session.currency || "gbp",

          shippingAddress:
            getShippingAddress(session),

          shippingMethod,
        });

      // Store a persistent confirmation marker
      // in Stripe after Resend accepts the email.

      await stripe.checkout.sessions.update(
        session.id,
        {
          metadata: {
            ashora_confirmation_sent: "true",

            ashora_confirmation_email_id:
              emailResult?.id || "accepted",

            ashora_confirmation_sent_at:
              new Date().toISOString(),
          },
        }
      );

      console.log(
        "[email] ASHORA order confirmation accepted"
      );
    } else {
      console.log(
        "[email] Confirmation already sent"
      );
    }

    // ---------- Existing stock functionality ----------

    // Vercel's deployed application filesystem
    // cannot be used for permanent inventory updates.
    // Preserve local stock functionality until
    // persistent inventory storage is implemented.

    if (
      process.env.VERCEL !== "1" &&
      session.metadata?.ashora_stock_processed !==
        "true"
    ) {
      try {
        const decrements: Array<{
          handle: string;
          qty: number;
        }> = [];

        for (const li of stripeLineItems) {
          const handle =
            resolveHandleFromLineItem(li);

          const qty = Math.max(
            1,
            li.quantity ?? 1
          );

          if (handle) {
            decrements.push({ handle, qty });
          }
        }

        if (decrements.length) {
          await decrementStockFor(decrements);

          await stripe.checkout.sessions.update(
            session.id,
            {
              metadata: {
                ashora_stock_processed: "true",
              },
            }
          );
        }
      } catch {
        console.error(
          "[stock] Stock deduction failed"
        );
      }
    }

    // ---------- Existing n8n integration ----------

    const n8nUrl =
      process.env.N8N_ORDER_WEBHOOK_URL;

    if (
      n8nUrl &&
      session.metadata?.ashora_n8n_forwarded !==
        "true"
    ) {
      try {
        const response = await fetch(n8nUrl, {
          method: "POST",

          headers: {
            "content-type": "application/json",
          },

          body: JSON.stringify({
            event,

            session: {
              ...session,
              line_items: {
                object: "list",
                data: stripeLineItems,
                has_more: false,
              },
            },

            lineItems,
          }),
        });

        if (!response.ok) {
          throw new Error(
            `n8n returned ${response.status}`
          );
        }

        await stripe.checkout.sessions.update(
          session.id,
          {
            metadata: {
              ashora_n8n_forwarded: "true",
            },
          }
        );

        console.log(
          "[n8n] Order forwarded successfully"
        );
      } catch {
        console.error(
          "[n8n] Order forwarding failed"
        );
      }
    }

    console.log(
      "[stripe:webhook] Paid order processed"
    );

    return NextResponse.json({
      received: true,
    });
  } catch {
    console.error(
      "[stripe:webhook] Order processing failed"
    );

    // Allow Stripe to retry if the confirmation
    // email or essential order processing fails.

    return NextResponse.json(
      { error: "Order processing failed" },
      { status: 500 }
    );
  }
}