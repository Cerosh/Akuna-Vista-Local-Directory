import { Globe, Mail, MapPin, Phone } from "lucide-react";
import type { Business } from "@/types/business";

interface ContactInfoProps {
  business: Business;
}

/**
 * Contact details. Every row is independently optional — omit rather
 * than render an empty row when a field is missing (DESIGN_SYSTEM.md
 * "never a broken UI" / graceful degradation).
 */
export function ContactInfo({ business }: ContactInfoProps) {
  const hasAnyContact = business.phone || business.email || business.website || business.address;

  if (!hasAnyContact) {
    return null;
  }

  return (
    <section aria-labelledby="contact-heading" className="flex flex-col gap-3">
      <h2 id="contact-heading" className="text-foreground text-lg font-semibold">
        Contact
      </h2>
      <div className="flex flex-col gap-2.5 text-sm">
        {business.phone ? (
          <a
            href={`tel:${business.phone}`}
            className="text-foreground duration-fast hover:text-primary flex items-center gap-2.5 transition-colors"
          >
            <Phone className="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
            {business.phone}
          </a>
        ) : null}
        {business.email ? (
          <a
            href={`mailto:${business.email}`}
            className="text-foreground duration-fast hover:text-primary flex items-center gap-2.5 transition-colors"
          >
            <Mail className="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
            {business.email}
          </a>
        ) : null}
        {business.website ? (
          <a
            href={business.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground duration-fast hover:text-primary flex items-center gap-2.5 transition-colors"
          >
            <Globe className="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
            {business.website.replace(/^https?:\/\//, "")}
          </a>
        ) : null}
        {business.address ? (
          <div className="text-foreground flex items-start gap-2.5">
            <MapPin className="text-muted-foreground mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              {business.address.street}, {business.address.suburb} {business.address.state}{" "}
              {business.address.postcode}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
