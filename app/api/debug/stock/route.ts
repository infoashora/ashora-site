// app/api/debug/stock/route.ts
import { NextResponse } from "next/server";
import { getLiveProducts } from "@/app/product/live";

export const runtime = "nodejs";

export async function GET() {
  try {
    const products = await getLiveProducts();
    // Return just handle + stock so it’s easy to read
    const summary = products.map(p => ({ handle: p.handle, stock: p.stock }));
    return NextResponse.json({ ok: true, summary });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 500 });
  }
}
