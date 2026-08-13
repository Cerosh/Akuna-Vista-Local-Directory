import Link from "next/link";
import { Globe, Mail } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";
import type { Settings } from "@/types/settings";

interface FooterProps {
  settings: Settings;
}

const DIRECTORY_LINKS = [
  { label: "Browse businesses", href: "/businesses" },
  { label: "Categories", href: "/#categories" },
  { label: "Search", href: "/search" },
];

const COMMUNITY_LINKS = [
  { label: "About", href: "/about" },
  { label: "History", href: "/history" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-muted/30 border-t">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Logo siteName={settings.siteName} logo={settings.logo ?? "/images/logo-full.png"} />
            {settings.tagline ? (
              <p className="text-muted-foreground max-w-[280px] text-sm">{settings.tagline}</p>
            ) : null}
          </div>

          <FooterColumn title="Directory" links={DIRECTORY_LINKS} />
          <FooterColumn title="Community" links={COMMUNITY_LINKS} />

          <div className="flex min-w-0 flex-col gap-3">
            <h2 className="text-foreground text-sm font-semibold">Contact</h2>
            {settings.contactEmail ? (
              <a
                href={`mailto:${settings.contactEmail}`}
                className="text-muted-foreground duration-fast hover:text-foreground flex items-center gap-2 text-sm break-all transition-colors"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {settings.contactEmail}
              </a>
            ) : null}
            {settings.contactWebsite ? (
              <a
                href={settings.contactWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground duration-fast hover:text-foreground flex items-center gap-2 text-sm break-all transition-colors"
              >
                <Globe className="size-4 shrink-0" aria-hidden="true" />
                {settings.contactWebsite.replace(/^https?:\/\//, "")}
              </a>
            ) : null}
          </div>
        </div>

        <div className="border-border text-muted-foreground border-t py-6 text-sm">
          {/* No max-w constraint: at 720px this sentence wraps to two lines even on
              desktop — letting it use the full row width keeps it on one line at
              typical desktop/tablet widths without shrinking the font. */}
          <p>
            We acknowledge the Dharug people as the Traditional Owners of the land on which we work
            and live, and pay our respects to Elders past, present and emerging.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {settings.communityName}. All rights reserved.
            </p>
            <nav aria-label="Legal" className="flex gap-4">
              {LEGAL_LINKS.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string; prefetch?: boolean }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-foreground text-sm font-semibold">{title}</h2>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink {...link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

interface FooterLinkProps {
  label: string;
  href: string;
  prefetch?: boolean;
}

/** Single footer link style, shared by FooterColumn's vertical lists and the horizontal Legal nav. */
function FooterLink({ label, href, prefetch }: FooterLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className="text-muted-foreground duration-fast hover:text-foreground text-sm transition-colors"
    >
      {label}
    </Link>
  );
}
