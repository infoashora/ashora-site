// components/CartSummary.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import { SHIPPING_PRICES_GBP, UK_VAT_RATE, calcVat, toPounds, type ShippingMethod } from "@/lib/pricing";

type Props = {
  subtotal: number; // in GBP
  onShippingChange?: (method: ShippingMethod, cost: number) => void;
};

export default function CartSummary({ subtotal, onShippingChange }: Props) {
  const [shipping, setShipping] = useState<ShippingMethod>("standard");

  // remember user choice per session
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.sessionStorage.getItem("ashora_shipping") : null;
    if (saved === "standard" || saved === "express" || saved === "free") setShipping(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") window.sessionStorage.setItem("ashora_shipping", shipping);
  }, [shipping]);

  const shippingCost = SHIPPING_PRICES_GBP[shipping];

  const { vat, total } = useMemo(() => {
    const vatBase = Math.max(0, subtotal + shippingCost);
    const vat = calcVat(vatBase, UK_VAT_RATE);
    const total = subtotal + shippingCost + vat;
    return { vat, total };
  }, [subtotal, shippingCost]);

  useEffect(() => {
    onShippingChange?.(shipping, shippingCost);
  }, [shipping, shippingCost, onShippingChange]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold tracking-wide">Order Summary</h3>

      <div className="space-y-3 text-sm">
        <Row label="Subtotal" value={toPounds(subtotal)} />
        <div className="flex items-center justify-between gap-3">
          <span className="text-gray-600">Shipping</span>
          <select
            aria-label="Choose shipping"
            className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
            value={shipping}
            onChange={(e) => setShipping(e.target.value as ShippingMethod)}
          >
            <option value="standard">Standard (UK) â€” {toPounds(SHIPPING_PRICES_GBP.standard)}</option>
            <option value="express">Express (UK) â€” {toPounds(SHIPPING_PRICES_GBP.express)}</option>
            <option value="free">Free (over £50) â€” {toPounds(SHIPPING_PRICES_GBP.free)}</option>
          </select>
        </div>
        <Row
          label={`+ VAT (${Math.round(UK_VAT_RATE * 100)}%)`}
          value={toPounds(vat)}
        />

        <div className="border-t pt-3">
          <Row label={<strong>Total</strong>} value={<strong>{toPounds(total)}</strong>} />
        </div>

        <p className="mt-2 text-xs text-gray-500">
          VAT estimate is shown for transparency. Final tax & shipping are confirmed at checkout.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
