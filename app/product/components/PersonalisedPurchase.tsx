
"use client";

// app/product/components/PersonalisedPurchase.tsx

import { useState } from "react";
import AddToCartButton from "@/app/components/AddToCartButton";

type Props = {
  handle: string;
  stock: number;
  pricePence: number;
};

const PERSONALISATION_PRICE_PENCE = 500;
const MAX_NAME_LENGTH = 40;

export default function PersonalisedPurchase({
  handle,
  stock,
  pricePence,
}: Props) {
  const [personalised, setPersonalised] = useState(false);
  const [name, setName] = useState("");

  const cleanName = name.trim().replace(/\s+/g, " ");
  const nameValid =
    cleanName.length > 0 &&
    cleanName.length <= MAX_NAME_LENGTH;

  const totalPence =
    pricePence +
    (personalised ? PERSONALISATION_PRICE_PENCE : 0);

  const formatGBP = (pence: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(pence / 100);

  return (
    <div className="space-y-5">
      <div className="border border-[#E7DCC8] bg-[#FCFAF6] p-5 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9D7B38]">
          A Thoughtful Touch
        </p>

        <h2 className="mt-2 font-cormorant text-2xl font-medium text-zinc-900 sm:text-3xl">
          Make It Personal
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Add a personalised name to your candle box,
          making your chosen intention even more meaningful.
        </p>

        <label className="mt-5 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={personalised}
            onChange={(event) => {
              setPersonalised(event.target.checked);
              if (!event.target.checked) setName("");
            }}
            className="mt-1 h-4 w-4 accent-[#B99752]"
          />

          <span className="flex-1 text-sm font-medium text-zinc-800">
            Personalise my candle box
          </span>

          <span className="text-sm font-semibold text-[#9D7B38]">
            +£5.00
          </span>
        </label>

        {personalised && (
          <div className="mt-5">
            <label
              htmlFor={`personalisation-${handle}`}
              className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600"
            >
              Name for your box
            </label>

            <input
              id={`personalisation-${handle}`}
              type="text"
              maxLength={MAX_NAME_LENGTH}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter a name"
              autoComplete="off"
              className="mt-2 h-12 w-full border border-[#D9C9AD] bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-[#9D7B38]"
            />

            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Maximum 40 characters. Please check your spelling
              carefully before ordering.
            </p>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-[#E7DCC8] pt-4">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-600">
            Your Candle
          </span>

          <span className="font-cormorant text-2xl font-medium text-zinc-900">
            {formatGBP(totalPence)}
          </span>
        </div>
      </div>

      {personalised && !nameValid ? (
        <div>
          <button
            type="button"
            disabled
            className="min-h-14 w-full cursor-not-allowed rounded-sm bg-zinc-300 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600"
          >
            Enter a Name to Continue
          </button>
        </div>
      ) : (
        <AddToCartButton
          handle={handle}
          stock={stock}
          personalisationName={
            personalised ? cleanName : undefined
          }
          className="min-h-14 w-full rounded-sm border border-[#B99752] bg-[#B99752] px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_32px_rgba(185,151,82,0.2)] transition duration-300 hover:border-[#9D7B38] hover:bg-[#9D7B38] hover:shadow-[0_16px_38px_rgba(157,123,56,0.24)]"
        />
      )}
    </div>
  );
}
