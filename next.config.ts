import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
