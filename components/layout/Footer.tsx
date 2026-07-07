import Link from "next/link";
import { Globe, Mail, MessageCircle } from "lucide-react";
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
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

// Placeholder only — no real community social accounts exist yet.
const SOCIAL_LINKS = [
  { label: "Website", icon: Globe },
  { label: "Community chat", icon: MessageCircle },
];

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-muted/30 border-t">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Logo siteName={settings.siteName} />
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
            <div className="flex gap-3 pt-1">
              {SOCIAL_LINKS.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  role="img"
                  aria-label={`${label} (coming soon)`}
                  className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-border text-muted-foreground flex flex-col gap-3 border-t py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {settings.communityName}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="duration-fast hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
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
            <Link
              href={link.href}
              prefetch={link.prefetch}
              className="text-muted-foreground duration-fast hover:text-foreground text-sm transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
