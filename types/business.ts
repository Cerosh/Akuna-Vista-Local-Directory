export interface BusinessAddress {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
}

export interface BusinessCoordinates {
  latitude: number;
  longitude: number;
}

export interface BusinessOpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface BusinessSocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

/** Added in schema 1.3.0 (Sprint 8's data migration helper demonstration) — purely informational, no UI consumes it yet. */
export type BusinessPriceRange = "$" | "$$" | "$$$";

export interface Business {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  categoryId: string;
  phone?: string;
  email?: string;
  website?: string;
  /** Optional display text for `website` (e.g. "Enrol now") when the link isn't the business's own domain — an enrolment form, booking page, etc. Falls back to the bare URL when absent. */
  websiteLabel?: string;
  address?: BusinessAddress;
  serviceAreas?: string[];
  coordinates?: BusinessCoordinates;
  openingHours?: BusinessOpeningHours;
  socialLinks?: BusinessSocialLinks;
  images?: string[];
  featured: boolean;
  verified?: boolean;
  tags?: string[];
  priceRange?: BusinessPriceRange;
  createdAt: string;
  updatedAt: string;
}
