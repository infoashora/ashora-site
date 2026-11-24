
"use client";

// app/cart/page.tsx

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  PERSONALISATION_PRICE_PENCE,
  useCart,
} from "@/app/components/CartProvider";
import { PRODUCTS_MAP } from "@/app/product/content";

const MAX_NAME_LENGTH = 40;

function formatGBP(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100);
}

export default function CartPage() {
  const {
    items,
    setQty,
    remove,
    setPersonalisation,
    clear,
    subtotalPence,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [addingNameId, setAddingNameId] = useState<string | null>(
    null
  );
  const [newName, setNewName] = useState("");

  const hasItems = items.length > 0;

  const handleClearAll = () => {
    if (!hasItems) return;

    if (window.confirm("Remove all items from your cart?")) {
      clear();
      setEditingId(null);
      setAddingNameId(null);
    }
  };

  const startEditing = (id: string, name: string) => {
    setAddingNameId(null);
    setEditingId(id);
    setEditingName(name);
  };

  const saveName = (id: string) => {
    const name = editingName.trim().replace(/\s+/g, " ");

    if (!name || name.length > MAX_NAME_LENGTH) return;

    setPersonalisation(id, name);
    setEditingId(null);
    setEditingName("");
  };

  const startAddingName = (id: string) => {
    setEditingId(null);
    setAddingNameId(id);
    setNewName("");
  };

  const addName = (id: string) => {
    const name = newName.trim().replace(/\s+/g, " ");

    if (!name || name.length > MAX_NAME_LENGTH) return;

    setPersonalisation(id, name);
    setAddingNameId(null);
    setNewName("");
  };

  const handleCheckout = async () => {
    if (!hasItems || loading) return;

    setLoading(true);

    try {
      const payload = {
        items: items.map((item) => {
          const product = PRODUCTS_MAP[item.handle];

          return {
            handle: item.handle,
            name: product?.title || item.handle,
            unitAmount: item.pricePence,
            quantity: item.qty,
            image:
              product?.image ||
              product?.images?.[0] ||
              undefined,
            personalisationName:
              item.personalisationName || undefined,
          };
        }),
        promoCode: promoCode.trim() || undefined,
      };

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Checkout failed");
      }

      const data = (await response.json()) as {
        url?: string;
      };

      if (!data.url) {
        throw new Error("Checkout URL missing");
      }

      window.location.assign(data.url);
    } catch (error) {
      console.error("[cart] checkout error", error);

      window.alert(
        "Checkout failed. Please try again in a moment or contact info@ashora.co.uk."
      );

      setLoading(false);
    }
  };

  return (
    <main className="bg-[#faf8f4]">
      <section className="border-b border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-8 sm:py-9">
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                Your Selection
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                Your Cart
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-600">
                Review your chosen candles and continue when your
                ritual feels complete.
              </p>
            </div>

            {hasItems && (
              <button
                type="button"
                onClick={handleClearAll}
                className="group inline-flex w-fit items-center gap-3 border-b border-zinc-400 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-950"
              >
                Clear Cart
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 sm:py-12 lg:py-14">
        {!hasItems ? (
          <div className="border-y border-zinc-300 py-14 text-center sm:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
              Nothing Here Yet
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">
              Your cart is waiting.
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-zinc-600">
              Explore the collection and choose the intention that
              feels right for this chapter.
            </p>

            <Link
              href="/shop"
              className="group mt-7 inline-flex items-center gap-3 border-b border-zinc-900 pb-2 text-sm font-medium text-zinc-900 transition-colors hover:text-[#9b793d]"
            >
              Explore Candles
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-12">
            <section aria-label="Cart items">
              <div className="border-t border-zinc-300">
                {items.map((item) => {
                  const product = PRODUCTS_MAP[item.handle];
                  const title = product?.title || item.handle;
                  const image =
                    product?.image || product?.images?.[0];

                  const personalised = Boolean(
                    item.personalisationName
                  );

                  const unitPrice =
                    item.pricePence +
                    (personalised
                      ? PERSONALISATION_PRICE_PENCE
                      : 0);

                  const isEditing = editingId === item.id;
                  const isAddingName = addingNameId === item.id;

                  return (
                    <article
                      key={item.id}
                      className="grid gap-5 border-b border-zinc-300 py-6 sm:grid-cols-[130px_1fr] sm:gap-7"
                    >
                      <Link
                        href={`/product/${item.handle}`}
                        className="group relative aspect-square overflow-hidden bg-[#eee9df]"
                      >
                        {image ? (
                          <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                            sizes="(min-width: 640px) 130px, 100vw"
                          />
                        ) : null}
                      </Link>

                      <div className="flex min-w-0 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-5">
                            <div>
                              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                                Intention Candle
                              </p>

                              <Link
                                href={`/product/${item.handle}`}
                                className="mt-2 block text-xl font-medium tracking-tight text-zinc-950 transition-colors hover:text-[#9b793d]"
                              >
                                {title}
                              </Link>

                              {personalised && (
                                <span className="mt-2 inline-block border border-[#d9c9ad] bg-[#fcfaf6] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9b793d]">
                                  Personalised Box
                                </span>
                              )}
                            </div>

                            <p className="shrink-0 text-base font-medium text-zinc-950">
                              {formatGBP(unitPrice * item.qty)}
                            </p>
                          </div>

                          <p className="mt-3 text-sm text-zinc-500">
                            {formatGBP(item.pricePence)} candle
                            {personalised && (
                              <span>
                                {" "}+ {formatGBP(
                                  PERSONALISATION_PRICE_PENCE
                                )} personalisation
                              </span>
                            )}
                          </p>

                          {personalised && !isEditing && (
                            <div className="mt-4 border-l-2 border-[#b99752] pl-4">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                                Name on Box
                              </p>

                              <p className="mt-1 text-sm font-medium text-zinc-900">
                                {item.personalisationName}
                              </p>

                              <div className="mt-3 flex flex-wrap gap-5">
                                <button
                                  type="button"
                                  onClick={() =>
                                    startEditing(
                                      item.id,
                                      item.personalisationName || ""
                                    )
                                  }
                                  className="border-b border-zinc-400 pb-1 text-xs text-zinc-600 hover:border-zinc-950 hover:text-zinc-950"
                                >
                                  Edit Name
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setPersonalisation(item.id, null)
                                  }
                                  className="border-b border-zinc-400 pb-1 text-xs text-zinc-600 hover:border-zinc-950 hover:text-zinc-950"
                                >
                                  Remove Personalisation
                                </button>
                              </div>
                            </div>
                          )}

                          {isEditing && (
                            <div className="mt-4 border border-[#e7dcc8] bg-[#fcfaf6] p-4">
                              <label
                                htmlFor={`edit-name-${item.id}`}
                                className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600"
                              >
                                Edit Name on Box
                              </label>

                              <input
                                id={`edit-name-${item.id}`}
                                type="text"
                                maxLength={MAX_NAME_LENGTH}
                                value={editingName}
                                onChange={(event) =>
                                  setEditingName(event.target.value)
                                }
                                className="mt-2 h-11 w-full border border-[#d9c9ad] bg-white px-3 text-sm text-zinc-900 outline-none focus:border-[#9b793d]"
                              />

                              <div className="mt-3 flex gap-3">
                                <button
                                  type="button"
                                  onClick={() => saveName(item.id)}
                                  disabled={!editingName.trim()}
                                  className="bg-zinc-900 px-4 py-2 text-xs font-medium text-white disabled:opacity-50"
                                >
                                  Save Name
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setEditingId(null)}
                                  className="px-3 py-2 text-xs text-zinc-600"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}

                          {!personalised && !isAddingName && (
                            <button
                              type="button"
                              onClick={() => startAddingName(item.id)}
                              className="mt-4 w-fit border-b border-[#9b793d] pb-1 text-xs font-medium text-[#9b793d] transition hover:text-zinc-900"
                            >
                              Personalise One Box +£5.00
                            </button>
                          )}

                          {isAddingName && (
                            <div className="mt-4 border border-[#e7dcc8] bg-[#fcfaf6] p-4">
                              <label
                                htmlFor={`new-name-${item.id}`}
                                className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600"
                              >
                                Name for Your Box
                              </label>

                              <input
                                id={`new-name-${item.id}`}
                                type="text"
                                maxLength={MAX_NAME_LENGTH}
                                value={newName}
                                onChange={(event) =>
                                  setNewName(event.target.value)
                                }
                                placeholder="Enter a name"
                                className="mt-2 h-11 w-full border border-[#d9c9ad] bg-white px-3 text-sm text-zinc-900 outline-none focus:border-[#9b793d]"
                              />

                              <p className="mt-2 text-xs text-zinc-500">
                                One candle box will be personalised.
                                Additional boxes can have different names.
                              </p>

                              <div className="mt-3 flex gap-3">
                                <button
                                  type="button"
                                  onClick={() => addName(item.id)}
                                  disabled={!newName.trim()}
                                  className="bg-zinc-900 px-4 py-2 text-xs font-medium text-white disabled:opacity-50"
                                >
                                  Add Personalisation
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setAddingNameId(null)
                                  }
                                  className="px-3 py-2 text-xs text-zinc-600"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-6 flex flex-wrap items-end justify-between gap-5">
                          {personalised ? (
                            <div>
                              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                                Quantity
                              </p>
                              <p className="mt-2 text-sm font-medium text-zinc-900">
                                1 personalised box
                              </p>
                            </div>
                          ) : (
                            <div>
                              <label
                                htmlFor={`quantity-${item.id}`}
                                className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                              >
                                Quantity
                              </label>

                              <div className="mt-2 inline-flex items-center border border-zinc-300 bg-white">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setQty(
                                      item.id,
                                      Math.max(1, item.qty - 1)
                                    )
                                  }
                                  className="inline-flex h-10 w-10 items-center justify-center text-lg text-zinc-700 transition-colors hover:bg-[#f7f4ee] hover:text-zinc-950"
                                  aria-label={`Decrease quantity of ${title}`}
                                >
                                  −
                                </button>

                                <input
                                  id={`quantity-${item.id}`}
                                  type="number"
                                  min={1}
                                  step={1}
                                  value={item.qty}
                                  onChange={(event) =>
                                    setQty(
                                      item.id,
                                      Math.max(
                                        1,
                                        Number(
                                          event.currentTarget.value || 1
                                        )
                                      )
                                    )
                                  }
                                  className="h-10 w-12 border-x border-zinc-300 bg-white text-center text-sm text-zinc-950 outline-none"
                                />

                                <button
                                  type="button"
                                  onClick={() =>
                                    setQty(item.id, item.qty + 1)
                                  }
                                  className="inline-flex h-10 w-10 items-center justify-center text-lg text-zinc-700 transition-colors hover:bg-[#f7f4ee] hover:text-zinc-950"
                                  aria-label={`Increase quantity of ${title}`}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => remove(item.id)}
                            className="border-b border-zinc-400 pb-1 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-950 hover:text-zinc-950"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <Link
                href="/shop"
                className="group mt-7 inline-flex items-center gap-3 text-sm font-medium text-zinc-700 transition-colors hover:text-[#9b793d]"
              >
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                >
                  ←
                </span>
                Continue Shopping
              </Link>
            </section>

            <aside className="border border-zinc-300 bg-white p-6 sm:p-7 lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                Order Summary
              </p>

              <div className="mt-5 border-y border-zinc-200 py-5">
                <dl className="space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-zinc-600">Subtotal</dt>
                    <dd className="font-medium text-zinc-950">
                      {formatGBP(subtotalPence)}
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-zinc-600">Shipping</dt>
                    <dd className="max-w-[170px] text-right text-zinc-500">
                      Calculated at checkout
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Shipping Options
                </p>

                <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-600">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-zinc-900">
                        UK Standard
                      </p>
                      <p className="text-xs text-zinc-500">
                        2–4 business days
                      </p>
                    </div>
                    <p className="shrink-0 text-zinc-900">
                      £3.99
                    </p>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-zinc-900">
                        UK Express
                      </p>
                      <p className="text-xs text-zinc-500">
                        Next working day
                      </p>
                    </div>
                    <p className="shrink-0 text-zinc-900">
                      £6.99
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-zinc-200 pt-5">
                <label
                  htmlFor="promotion-code"
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Promotion Code
                </label>

                <input
                  id="promotion-code"
                  type="text"
                  value={promoCode}
                  onChange={(event) =>
                    setPromoCode(event.currentTarget.value)
                  }
                  placeholder="Enter code, if applicable"
                  className="mt-3 h-12 w-full border border-zinc-300 bg-white px-4 text-sm text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-[#9b793d]"
                />
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={!hasItems || loading}
                className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-3 bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-[#9b793d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Redirecting..."
                  : "Continue to Checkout"}

                {!loading && (
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-zinc-500">
                Your final shipping total will be confirmed
                securely at checkout.
              </p>

              <p className="mt-5 border-t border-zinc-200 pt-5 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Secure Checkout Powered by Stripe
              </p>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
