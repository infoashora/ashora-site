// app/product/live.ts
import "server-only";

import type { IntentionKey } from "@/app/intention/content";
import { PRODUCTS, type Product } from "./content";

// Live stock overlay (server-only)
// Reads ./data/stock.json and overlays stock counts onto the static catalogue.

type StockMap = Record<string, number | string>;

/** Replace any unicode dash variants with ASCII hyphen-minus, trim, lower-case. */
function normHandle(s: string): string {
  if (!s) return "";
  // common unicode dashes
  const dashRegex = /[\u2010\u2011\u2012\u2013\u2014\u2015\u2212\uFE58\uFE63\uFF0D]/g;
  return s.replace(dashRegex, "-").trim().toLowerCase();
}

/** Remove UTF-8 BOM if present and strip leading/trailing whitespace. */
function stripBOM(s: string) {
  if (!s) return s;
  if (s.charCodeAt(0) === 0xfeff) return s.slice(1).trim();
  return s.replace(/^\uFEFF/, "").trim();
}

async function readStockOverrides(): Promise<Record<string, number>> {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const STOCK_PATH = path.join(process.cwd(), "data", "stock.json");

    const raw = await fs.readFile(STOCK_PATH, "utf8");
    const clean = stripBOM(raw);
    if (!clean) return {};

    let parsed: StockMap | null = null;
    try {
      parsed = JSON.parse(clean) as StockMap;
    } catch (e: any) {
      console.warn("[stock] Invalid JSON in data/stock.json:", e?.message || e);
      return {};
    }
    if (!parsed || typeof parsed !== "object") return {};

    // Build a normalised map: normalise keys, coerce numbers, clamp at 0+
    const out: Record<string, number> = {};
    for (const [k, v] of Object.entries(parsed)) {
      const nk = normHandle(k);
      let n: number = 0;
      if (typeof v === "number") n = v;
      else if (typeof v === "string") n = Number(v);
      if (!Number.isFinite(n)) continue;
      out[nk] = Math.max(0, Math.floor(n));
    }
    return out;
  } catch {
    // File missing or not readable — safe fallback
    return {};
  }
}

function applyOverrides(products: Product[], overrides: Record<string, number>): Product[] {
  if (!overrides || Object.keys(overrides).length === 0) return products;

  return products.map((p) => {
    const key = normHandle(p.handle);
    const override = overrides[key];
    if (typeof override === "number" && Number.isFinite(override)) {
      return { ...p, stock: Math.max(0, override) };
    }
    return p;
  });
}

export async function getLiveProducts(): Promise<Product[]> {
  const overrides = await readStockOverrides();
  return applyOverrides(PRODUCTS, overrides);
}

export async function getLiveProductsMap(): Promise<Record<string, Product>> {
  const list = await getLiveProducts();
  return Object.fromEntries(list.map((p) => [p.handle, p]));
}

export async function getLiveProductByHandle(handle: string): Promise<Product | undefined> {
  const list = await getLiveProducts();
  const norm = normHandle(handle);
  return list.find((p) => normHandle(p.handle) === norm);
}

export async function getLiveProductsByIntention(slug: IntentionKey): Promise<Product[]> {
  const list = await getLiveProducts();
  return list.filter((p) => p.intention === slug);
}

export async function getLiveRelatedProducts(handle: string): Promise<Product[]> {
  const list = await getLiveProducts();
  const current = list.find((p) => normHandle(p.handle) === normHandle(handle));
  if (!current) return list.slice(0, 4);
  const sameIntention = list.filter(
    (p) => p.handle !== current.handle && p.intention && p.intention === current.intention
  );
  return (sameIntention.length ? sameIntention : list.filter((p) => p.handle !== current.handle)).slice(0, 4);
}

export async function getEffectiveStock(handle: string): Promise<number | undefined> {
  const prod = await getLiveProductByHandle(handle);
  return prod?.stock;
}

export type { Product } from "./content";
