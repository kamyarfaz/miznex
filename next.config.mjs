import crypto from "crypto";
import serwistNext from "@serwist/next";

const isProd = process.env.NODE_ENV === "production";
const revision = crypto.randomUUID();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cafino.storage.c2.liara.space",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },

  async headers() {
    const devCSP =
      "default-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "connect-src 'self' http://localhost:3000 https://cafino.storage.c2.liara.space https://api.cafinoo.com; " +
      "img-src 'self' https://cafino.storage.c2.liara.space; " +
      "font-src 'self' data:; object-src 'none'; frame-ancestors 'none';";

    const prodCSP =
      "default-src 'self'; " +
      "script-src 'self'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "connect-src 'self' https://cafino.storage.c2.liara.space https://api.cafinoo.com; " +
      "img-src 'self' https://cafino.storage.c2.liara.space; " +
      "font-src 'self' data:; object-src 'none'; frame-ancestors 'none';";

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: isProd ? prodCSP : devCSP,
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: isProd
              ? "default-src 'self'; script-src 'self'; img-src 'self' https://cafino.storage.c2.liara.space; connect-src 'self' https://cafino.storage.c2.liara.space"
              : "default-src 'self'; script-src 'self' 'unsafe-eval'; img-src 'self' https://cafino.storage.c2.liara.space; connect-src 'self' https://cafino.storage.c2.liara.space",
          },
        ],
      },
    ];
  },
};

export default isProd
  ? serwistNext({
      swSrc: "src/app/sw.ts",
      swDest: "public/sw.js",
      cacheOnNavigation: true,
      register: true,
      reloadOnOnline: true,
      dontCacheBustURLsMatching:
        /^\/_next\/static\/(?:chunks|css)\/.*\.(?:js|css)$/,
      additionalPrecacheEntries: [
        { url: "/offline", revision },
        { url: "/", revision },
        { url: "/menu", revision },
        { url: "/about-us", revision },
        { url: "/contact-us", revision },
        { url: "/profile", revision },
        { url: "/checkout-cart", revision },
        { url: "/payment", revision },
        { url: "/favicon.ico", revision },
        { url: "/manifest.json", revision },
        { url: "/icon-192x192.png", revision },
        { url: "/icon-512x512.png", revision },
        { url: "/Main-logo-192x192.webp", revision },
        { url: "/Main-logo-512x512.webp", revision },
      ],
      exclude: [
        /\.map$/,
        /^manifest$/,
        /\.txt$/,
        /\.xml$/,
        /\.json$/,
        /^_next\/static\/chunks\/pages\/_error/,
      ],
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    })(nextConfig)
  : nextConfig;
