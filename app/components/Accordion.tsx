"use client";

import { useState } from "react";

export default function Accordion({
  items,
}: {
  items: { title: string; content: React.ReactNode; defaultOpen?: boolean }[];
}) {
  return (
    <div className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
      {items.map((it, idx) => (
        <Row
          key={idx}
          title={it.title}
          defaultOpen={!!it.defaultOpen}
          content={it.content}
          first={idx === 0}
          last={idx === items.length - 1}
        />
      ))}
    </div>
  );
}

function Row({
  title,
  content,
  defaultOpen,
  first,
  last,
}: {
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
  first?: boolean;
  last?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={open ? "bg-white" : "bg-white"}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-zinc-900">{title}</span>
        <span
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs transition ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {open && <div className="px-5 pb-5 text-sm text-zinc-700">{content}</div>}
    </div>
  );
}
