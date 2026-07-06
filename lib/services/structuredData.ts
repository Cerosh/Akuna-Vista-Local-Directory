import type { Business, BusinessOpeningHours } from "@/types/business";

const DAY_LABELS: Record<keyof BusinessOpeningHours, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

const TIME_RANGE_PATTERN = /^(\d{2}:\d{2})-(\d{2}:\d{2})$/;

interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string;
  opens: string;
  closes: string;
}

function buildOpeningHoursSpecification(
  openingHours: BusinessOpeningHours | undefined,
): OpeningHoursSpecification[] | undefined {
  if (!openingHours) {
    return undefined;
  }

  const specs: OpeningHoursSpecification[] = [];

  for (const [day, label] of Object.entries(DAY_LABELS) as [keyof BusinessOpeningHours, string][]) {
    const value = openingHours[day];
    const match = TIME_RANGE_PATTERN.exec(value ?? "");
    if (!match) {
      // Skips "Closed" and any unparseable value — schema.org has no
      // meaningful way to represent "closed" other than omission.
      continue;
    }
    specs.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: label,
      opens: match[1],
      closes: match[2],
    });
  }

  return specs.length > 0 ? specs : undefined;
}

/**
 * Produces schema.org LocalBusiness JSON-LD for a business detail page.
 * A pure function — no rendering, no I/O — so it's trivially testable
 * against both fully-populated and minimal business records (see
 * sprints/sprint-04-business-details).
 */
export function generateLocalBusinessJsonLd(business: Business, siteUrl: string): object {
  const url = `${siteUrl}/business/${business.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.shortDescription ?? business.description,
    url,
    ...(business.images?.[0] ? { image: `${siteUrl}${business.images[0]}` } : {}),
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(business.email ? { email: business.email } : {}),
    ...(business.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: business.address.street,
            addressLocality: business.address.suburb,
            addressRegion: business.address.state,
            postalCode: business.address.postcode,
            addressCountry: "AU",
          },
        }
      : {}),
    ...(business.coordinates
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: business.coordinates.latitude,
            longitude: business.coordinates.longitude,
          },
        }
      : {}),
    ...(buildOpeningHoursSpecification(business.openingHours)
      ? { openingHoursSpecification: buildOpeningHoursSpecification(business.openingHours) }
      : {}),
  };
}
