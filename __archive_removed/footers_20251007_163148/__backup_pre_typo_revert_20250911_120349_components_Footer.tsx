import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-ink/10 bg-parchment">
      {/* Top: signup + links */}
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 md:grid-cols-3">
        {/* Join the Ashora Circle */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Join the Ashora Circle</h3>
          <p className="text-sm opacity-80">
            Early access to drops, gentle rituals, and intentional notes. No spam.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 pt-1" aria-label="Newsletter sign up (coming soon)">
            <input
              type="email"
              placeholder="you@example.com"
              disabled
              className="w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-sm opacity-70"
            />
            <button
              type="submit"
              disabled
              className="btn bg-ink/20 text-ink cursor-not-allowed"
              title="Coming soon"
            >
              Sign up
            </button>
          </form>
          <p className="text-xs opacity-60">Magic-link sign in coming with checkout.</p>
        </div>

        {/* Shop */}
        <nav aria-label="Shop" className="space-y-3">
          <h4 className="text-sm font-medium">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="no-underline hover:text-gold">Shop all</Link></li>
            <li><Link href="/collections" className="no-underline hover:text-gold">All products (sections)</Link></li>
            <li><Link href="/#intentions" className="no-underline hover:text-gold">Choose your intention</Link></li>
            <li><Link href="/account" className="no-underline hover:text-gold">Account</Link></li>
            <li><Link href="/cart" className="no-underline hover:text-gold">Cart</Link></li>
          </ul>
        </nav>

        {/* Support & Legal */}
        <nav aria-label="Support & legal" className="space-y-3">
          <h4 className="text-sm font-medium">Support &amp; Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/policies/shipping" className="no-underline hover:text-gold">Shipping</Link></li>
            <li><Link href="/policies/privacy" className="no-underline hover:text-gold">Privacy</Link></li>
            <li><Link href="/policies/terms" className="no-underline hover:text-gold">Terms</Link></li>
            <li>
              <span className="block opacity-80">
                CLP compliant labelling on all candles.
              </span>
            </li>
            <li>
              <a href="mailto:info@ashora.co.uk" className="no-underline hover:text-gold">
                info@ashora.co.uk
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
          <p className="text-xs opacity-70">Â© {year} Ashora. All rights reserved.</p>
          <p className="text-xs opacity-70">
            Safety first â€” CLP details included beneath each candle.
          </p>
        </div>
      </div>
    </footer>
  );
}
