import type { NextConfig } from "next";

// `script-src 'unsafe-inline'` is a deliberate, documented exception (per
// SECURITY.md: "avoid unless there is a documented exception"), not an
// oversight. Next.js injects ~50 inline <script> tags per page for
// hydration/RSC streaming (self.__next_f.push(...)) that are invisible in
// this app's own source — grepping app/ for inline scripts before this
// header existed only found one JSON-LD block (data, not executable, not
// governed by script-src at all). A first attempt used a per-request nonce
// via middleware.ts, which is the CSP-correct way to allow exactly these
// scripts without a blanket exception — but Next.js 15's Turbopack build
// (confirmed via this project's own build output: /_next/static/chunks
// includes turbopack-*.js) never applied the nonce to its own injected
// scripts despite the CSP header and x-nonce request header both being set
// correctly, so every one of them was blocked and the entire app broke
// (client navigation, keyboard focus — anything needing hydrated JS).
// Confirmed via a full Playwright run against a live server, not assumed.
// `style-src 'unsafe-inline'` is separately needed for app/global-error.tsx
// (Next.js's last-resort error boundary), which uses raw `style={{}}` props
// since it must render even if the app's own CSS/layout has failed.
// `process.env.VERCEL` is set to "1" on every Vercel deployment (Preview and
// Production alike), never locally — a more precise "are we actually served
// over HTTPS" signal than NODE_ENV, which is also "production" for a local
// `npm run build && npm run start`. HSTS and CSP's upgrade-insecure-requests
// both instruct the browser to force every request onto HTTPS; sent over
// plain `http://localhost:3000`, WebKit takes this literally and tries to
// upgrade every resource request to a `https://localhost:3000` that doesn't
// exist, failing every single one with an SSL error — confirmed via a full
// Playwright run (28 WebKit-only failures, every one showing "Failed to
// load resource: An SSL error has occurred") after adding these two
// unconditionally. Chromium/Firefox tolerated it; WebKit didn't. Real
// production (Vercel, always HTTPS) never hits this — there's no HTTP-to-
// HTTPS upgrade to make since it's already HTTPS — so gating these two
// behind `process.env.VERCEL` costs nothing in production and fixes local
// testing everywhere, not just WebKit.
const isVercelDeployment = process.env.VERCEL === "1";

const SECURITY_HEADERS = [
  ...(isVercelDeployment
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      ...(isVercelDeployment ? ["upgrade-insecure-requests"] : []),
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },
  // Next.js 15.2+ streams generateMetadata() output to real browsers and
  // only renders it synchronously into <head> for user agents matched by
  // htmlLimitedBots (Googlebot, Bingbot, Slackbot, ...) — see
  // https://github.com/vercel/next.js/discussions/81452 and
  // https://github.com/vercel/next.js/issues/79313. Confirmed via Playwright
  // during Sprint 07's SEO audit: /business/[slug]'s title/description/
  // Open Graph tags never landed in <head> for a plain browser UA, only for
  // UAs Next.js recognises as bots — a real Lighthouse SEO regression this
  // project's own quality bar (ARCHITECTURE.md) would otherwise miss, since
  // Lighthouse's UA isn't on that bot list. All metadata here resolves
  // instantly from local JSON, so the streaming optimisation buys nothing;
  // matching every user agent restores synchronous, reliable metadata.
  htmlLimitedBots: /.*/,
  images: {
    // Only the self-authored /public/images/placeholder-business.svg needs
    // this today — it's a trusted static asset, not user-uploaded content.
    // Real business photos will be JPG/PNG and won't need this flag.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
