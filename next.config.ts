import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: [
    'playwright-core',
    'playwright',
    '@sparticuz/chromium',
  ],
  distDir: 'dist',
};

export default nextConfig;
