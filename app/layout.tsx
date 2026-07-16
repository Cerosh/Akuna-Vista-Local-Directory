import type { Metadata } from "next";
import "./globals.css";
import { Geist, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { settingsRepository } from "@/lib/repositories/settingsRepository";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const SITE_NAME = "Akuna Vista Local Directory";
const SITE_DESCRIPTION = "Discover trusted local businesses, recommended by your neighbours.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  // Site-wide defaults — any page's own `openGraph`/`title`/`description`
  // (e.g. business/category pages) overrides these per-field, it doesn't
  // need to repeat siteName/type/locale itself.
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_AU",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await settingsRepository.get();

  return (
    <html lang="en" className={cn("font-sans", geist.variable, inter.variable)}>
      <body className="bg-background text-foreground flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Navigation siteName={settings.siteName} logo={settings.logo ?? "/images/logo-full.png"} />
        {/* tabIndex={-1}: without it the skip link only scrolls here, it
            never moves keyboard focus — found via Sprint 07's keyboard-nav
            Playwright coverage (tests/e2e/accessibility.spec.ts). */}
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer settings={settings} />
        {/* Rendered only on a real Vercel deployment (process.env.VERCEL,
            same signal next.config.ts uses for HSTS). @vercel/analytics's
            own docs say it's a "no-op" elsewhere, but confirmed via a full
            Playwright run that it still attempts to fetch
            /_vercel/insights/script.js unconditionally — a real endpoint
            only Vercel's platform serves, 404 (wrong MIME type) everywhere
            else, which is a genuine browser console error, not a silent
            no-op. Gating the component itself avoids the fetch entirely. */}
        {process.env.VERCEL === "1" ? <Analytics /> : null}
      </body>
    </html>
  );
}
