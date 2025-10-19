export const metadata = {
  title: "Ashora Circle | Account",
  description:
    "Join the Ashora Circle to save your wishlist, sync your cart, and get early access to drops and rituals.",
};

export default function AccountPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-14 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Ashora Circle</h1>
      <p className="opacity-80">
        Create an account to save your favourites, keep your cart across devices, and receive
        first access to new candles and ritual boxes.
      </p>

      <div className="card p-6 space-y-4">
        <label className="block text-sm font-medium">Email address</label>
        <input
          type="email"
          placeholder="you@ashora.co.uk"
          className="w-full rounded-md border border-ink/10 px-3 py-2"
          disabled
        />
        <button className="btn bg-ink/20 text-ink cursor-not-allowed">
          Sign in / Sign up (coming soon)
        </button>
        <p className="text-xs opacity-70">
          Weâ€™ll enable secure magic-link sign in when checkout goes live.
        </p>
      </div>
    </main>
  );
}
