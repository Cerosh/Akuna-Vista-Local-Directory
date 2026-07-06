import { Link2 } from "lucide-react";
import type { Business, BusinessSocialLinks } from "@/types/business";

interface SocialLinksProps {
  business: Business;
}

const PLATFORM_LABELS: Record<keyof BusinessSocialLinks, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
};

/**
 * No brand icons are used here — lucide-react doesn't ship them — so
 * each link is labelled by platform name rather than relying on icon
 * recognition alone (never rely on colour/icon alone, UI_GUIDELINES.md).
 */
export function SocialLinks({ business }: SocialLinksProps) {
  const links = business.socialLinks;
  const entries = links
    ? (Object.entries(links) as [keyof BusinessSocialLinks, string | undefined][]).filter(
        ([, url]) => Boolean(url),
      )
    : [];

  if (entries.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="social-links-heading" className="flex flex-col gap-3">
      <h2 id="social-links-heading" className="text-foreground text-lg font-semibold">
        Follow
      </h2>
      <div className="flex flex-col gap-2 text-sm">
        {entries.map(([platform, url]) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground duration-fast hover:text-primary flex items-center gap-2.5 transition-colors"
          >
            <Link2 className="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
            {PLATFORM_LABELS[platform]}
          </a>
        ))}
      </div>
    </section>
  );
}
