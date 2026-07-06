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
  address?: BusinessAddress;
  serviceAreas?: string[];
  coordinates?: BusinessCoordinates;
  openingHours?: BusinessOpeningHours;
  socialLinks?: BusinessSocialLinks;
  images?: string[];
  featured: boolean;
  verified?: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}
