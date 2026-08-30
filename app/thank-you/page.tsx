"use client";

import Link from "next/link";
import { useContext, useEffect } from "react";

import { CartContext } from "@/app/components/CartProvider";

const COUNT_KEY = "ashora:cartCount";

export default function ThankYouPage() {
  const cart = useContext(CartContext);

  useEffect(() => {
    try {
      cart?.clear?.();
    } catch {}

    try {
      localStorage.setItem(COUNT_KEY, "0");

      window.dispatchEvent(
        new CustomEvent("ashora:cart:set", {
          detail: {
            count: 0,
          },
        })
      );
    } catch {}
  }, [cart]);

  return (
    <main className="bg-[#faf8f4]">
      {/* Order Confirmation Hero */}
      <section className="border-b border-zinc-200 bg-[#f7f4ee]">
        <div className="mx-auto max-w-6xl px-6 py-7 sm:py-9">
          <nav className="flex items-center gap-2 text-xs text-zinc-500">
            <Link
              href="/"
              className="transition-colors hover:text-[#9b793d]"
            >
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <span className="text-zinc-900">Order Confirmed</span>
          </nav>
        </div>

        <div className="border-t border-zinc-200">
          <div className="mx-auto grid max-w-6xl lg:grid-cols-[0.86fr_1.14fr]">
            <div className="flex flex-col justify-between bg-zinc-950 px-6 py-10 text-white sm:px-10 sm:py-12 lg:min-h-[500px] lg:px-12 lg:py-14">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D1A954]">
                  Order Confirmed
                </p>

                <h1 className="mt-5 max-w-lg font-cormorant text-5xl font-semibold leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Thank you for choosing ASHORA.
                </h1>

                <p className="mt-6 max-w-lg text-base leading-8 text-zinc-300">
                  Your order has been received and will be prepared with care,
                  love and intention.
                </p>
              </div>

              <div className="mt-10 border-t border-zinc-700 pt-6">
                <p className="max-w-md font-cormorant text-2xl font-medium leading-[1.25] tracking-tight text-white">
                  The ritual begins before the candle is lit.
                </p>

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  With love &amp; intention, ASHORA
                </p>
              </div>
            </div>

            <div className="flex items-center bg-[#faf8f4] px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
              <div className="w-full">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                  What Happens Next
                </p>

                <h2 className="mt-4 max-w-xl font-cormorant text-3xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-4xl">
                  Your candle is now entering its next chapter.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600">
                  A confirmation email has been sent to you. Tracking details
                  will follow as soon as your order begins its journey.
                </p>

                <div className="mt-8 border-t border-zinc-300">
                  {[
                    {
                      number: "01",
                      title: "Order Received",
                      description:
                        "Your payment and order details have been securely confirmed.",
                    },
                    {
                      number: "02",
                      title: "Prepared With Care",
                      description:
                        "Your candle will be checked, wrapped and prepared by hand.",
                    },
                    {
                      number: "03",
                      title: "Dispatched",
                      description:
                        "You will receive tracking details when your order leaves us.",
                    },
                  ].map((step) => (
                    <div
                      key={step.number}
                      className="grid gap-3 border-b border-zinc-300 py-5 sm:grid-cols-[42px_1fr] sm:gap-6"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b793d]">
                        {step.number}
                      </p>

                      <div>
                        <h3 className="text-sm font-medium text-zinc-950">
                          {step.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-zinc-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-6">
                  <Link
                    href="/shop"
                    className="group inline-flex items-center gap-3 border-b border-zinc-900 pb-2 text-sm font-medium text-zinc-900 transition-colors hover:border-[#9b793d] hover:text-[#9b793d]"
                  >
                    Continue Shopping
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>

                  <Link
                    href="/faq"
                    className="group inline-flex items-center gap-3 text-sm font-medium text-zinc-600 transition-colors hover:text-[#9b793d]"
                  >
                    View FAQs
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Guidance */}
      <section className="bg-[#faf8f4]">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b793d]">
                Before It Arrives
              </p>

              <h2 className="mt-3 max-w-md font-cormorant text-3xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-4xl">
                A few helpful details.
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600">
                Keep your confirmation email somewhere safe until your order
                has arrived.
              </p>
            </div>

            <div className="border-t border-zinc-300">
              {[
                {
                  number: "01",
                  title: "Processing",
                  description:
                    "Please allow 2–4 business days for your order to be prepared before dispatch.",
                },
                {
                  number: "02",
                  title: "Shipping",
                  description:
                    "Your final shipping method and total were confirmed securely during checkout.",
                },
                {
                  number: "03",
                  title: "Support",
                  description:
                    "Reply to your confirmation email or contact us directly if you need help.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="grid gap-3 border-b border-zinc-300 py-5 sm:grid-cols-[42px_1fr] sm:gap-6"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b793d]">
                    {item.number}
                  </p>

                  <div>
                    <h3 className="text-sm font-medium text-zinc-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="bg-zinc-900">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:py-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D1A954]">
            Here When You Need Us
          </p>

          <div>
            <p className="max-w-3xl font-cormorant text-2xl font-medium leading-[1.25] tracking-tight text-white sm:text-3xl">
              Questions about your order? Our team is here to help.
            </p>

            <a
              href="mailto:info@ashora.co.uk"
              className="group mt-6 inline-flex items-center gap-3 border-b border-zinc-500 pb-2 text-sm font-medium text-white transition-colors hover:border-[#D1A954] hover:text-[#D1A954]"
            >
              info@ashora.co.uk
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}