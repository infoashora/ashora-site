// Simple localStorage cart + helpers
export type CartItem = {
  handle: string;
  title: string;
  priceText?: string;
  qty: number;
};

const KEY = "ashora:cart";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("ashora:cart:changed", { detail: { items } }));
}

export function addToCart(item: CartItem) {
  const cur = readCart();
  const idx = cur.findIndex((i) => i.handle === item.handle);
  if (idx >= 0) {
    cur[idx] = { ...cur[idx], qty: cur[idx].qty + item.qty };
  } else {
    cur.push(item);
  }
  writeCart(cur);
}

export function removeFromCart(handle: string) {
  const cur = readCart().filter((i) => i.handle !== handle);
  writeCart(cur);
}

export function totalQty(items = readCart()) {
  return items.reduce((n, i) => n + i.qty, 0);
}
