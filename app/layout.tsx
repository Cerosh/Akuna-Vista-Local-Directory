import type { Metadata } from "next";
import "./globals.css";
import { Geist, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { settingsRepository } from "@/lib/repositories/settingsRepository";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Akuna Vista Local Directory",
  description: "Discover trusted local businesses, recommended by your neighbours.",
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
        <Navigation siteName={settings.siteName} />
        {/* tabIndex={-1}: without it the skip link only scrolls here, it
            never moves keyboard focus — found via Sprint 07's keyboard-nav
            Playwright coverage (tests/e2e/accessibility.spec.ts). */}
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
