/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // IMPORTANT:
  // Do NOT set `output: 'export'` because we use API routes (Stripe).
  // Leaving `output` undefined keeps the default Node server runtime.
  //
  // If you want a production container later, you can use:
  //   output: 'standalone'
  // (never 'export' while API routes exist).
};

export default nextConfig;
