/**
 * Curated, Akuna Vista-plausible content for scripts/seed-generate.ts.
 * Deliberately hand-written rather than "Business 1"/lorem-ipsum style
 * placeholders — a risk flagged back in Sprint 2's notes and restated in
 * this sprint's README.md Risks.
 */

export interface CategorySeed {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  businessSuffixes: string[];
}

/** The 9 real categories, plus 16 more to comfortably reach ROADMAP.md Phase 6's 25-category target. */
export const CATEGORY_SEEDS: CategorySeed[] = [
  {
    id: "plumbing",
    slug: "plumbing",
    name: "Plumbing",
    icon: "Wrench",
    description: "Plumbers and plumbing services.",
    businessSuffixes: ["Plumbing", "Plumbing Co", "Plumbing Services", "Plumbing & Gas"],
  },
  {
    id: "electrical",
    slug: "electrical",
    name: "Electrical",
    icon: "Zap",
    description: "Licensed electricians and electrical services.",
    businessSuffixes: [
      "Electrical",
      "Electrical Services",
      "Electrical Co",
      "Electrical Solutions",
    ],
  },
  {
    id: "cleaning",
    slug: "cleaning",
    name: "Cleaning",
    icon: "Sparkles",
    description: "Residential and commercial cleaning services.",
    businessSuffixes: ["Cleaning", "Cleaning Services", "Cleaning Co", "Home Cleaning"],
  },
  {
    id: "landscaping",
    slug: "landscaping",
    name: "Landscaping & Gardening",
    icon: "Trees",
    description: "Landscaping, gardening and lawn care.",
    businessSuffixes: ["Landscaping", "Gardening", "Landscapes", "Garden Care"],
  },
  {
    id: "childcare",
    slug: "childcare",
    name: "Childcare",
    icon: "Baby",
    description: "Early learning and childcare services.",
    businessSuffixes: ["Early Learning", "Childcare", "Early Learning Centre", "Kids Academy"],
  },
  {
    id: "cafes-restaurants",
    slug: "cafes-restaurants",
    name: "Cafés & Restaurants",
    icon: "Coffee",
    description: "Local cafés, restaurants and eateries.",
    businessSuffixes: ["Café", "Kitchen", "Eatery", "Coffee House"],
  },
  {
    id: "builders-renovations",
    slug: "builders-renovations",
    name: "Builders & Renovations",
    icon: "Hammer",
    description: "Builders, renovators and construction services.",
    businessSuffixes: ["Builders", "Renovations", "Building Co", "Construction"],
  },
  {
    id: "pet-services",
    slug: "pet-services",
    name: "Pet Services",
    icon: "Dog",
    description: "Pet grooming, walking and care services.",
    businessSuffixes: ["Pet Care", "Pet Services", "Grooming", "Pet Minding"],
  },
  {
    id: "fitness-wellness",
    slug: "fitness-wellness",
    name: "Fitness & Wellness",
    icon: "Dumbbell",
    description: "Gyms, personal training and wellness studios.",
    businessSuffixes: ["Fitness", "Wellness Studio", "Personal Training", "Health Club"],
  },
  {
    id: "hairdressers-barbers",
    slug: "hairdressers-barbers",
    name: "Hairdressers & Barbers",
    icon: "Scissors",
    description: "Hairdressing and barbering services.",
    businessSuffixes: ["Hair Studio", "Barbershop", "Hair & Beauty", "Hairdressing"],
  },
  {
    id: "real-estate",
    slug: "real-estate",
    name: "Real Estate Agents",
    icon: "Home",
    description: "Real estate sales and property management.",
    businessSuffixes: ["Real Estate", "Property Group", "Realty", "Property Partners"],
  },
  {
    id: "accounting-tax",
    slug: "accounting-tax",
    name: "Accounting & Tax",
    icon: "Calculator",
    description: "Accounting, bookkeeping and tax services.",
    businessSuffixes: ["Accounting", "Tax Services", "Bookkeeping", "Accountants"],
  },
  {
    id: "legal-services",
    slug: "legal-services",
    name: "Legal Services",
    icon: "Scale",
    description: "Solicitors and legal services.",
    businessSuffixes: ["Legal", "Solicitors", "Law", "Legal Services"],
  },
  {
    id: "photography",
    slug: "photography",
    name: "Photography",
    icon: "Camera",
    description: "Photography and videography services.",
    businessSuffixes: ["Photography", "Photo Studio", "Photography Co", "Imagery"],
  },
  {
    id: "florists",
    slug: "florists",
    name: "Florists",
    icon: "Flower2",
    description: "Florists and flower delivery.",
    businessSuffixes: ["Florist", "Flowers", "Floral Studio", "Flower Co"],
  },
  {
    id: "bakeries",
    slug: "bakeries",
    name: "Bakeries",
    icon: "Cookie",
    description: "Bakeries and patisseries.",
    businessSuffixes: ["Bakery", "Bread Co", "Patisserie", "Baking Co"],
  },
  {
    id: "mechanics",
    slug: "mechanics",
    name: "Mechanics & Auto Repair",
    icon: "Car",
    description: "Car servicing and auto repair.",
    businessSuffixes: ["Auto Repair", "Mechanical", "Auto Care", "Motors"],
  },
  {
    id: "pest-control",
    slug: "pest-control",
    name: "Pest Control",
    icon: "Bug",
    description: "Residential and commercial pest control.",
    businessSuffixes: ["Pest Control", "Pest Solutions", "Pest Management", "Termite & Pest"],
  },
  {
    id: "removalists",
    slug: "removalists",
    name: "Removalists & Moving",
    icon: "Truck",
    description: "Removalists and moving services.",
    businessSuffixes: ["Removals", "Moving Co", "Removalists", "Relocations"],
  },
  {
    id: "painters-decorators",
    slug: "painters-decorators",
    name: "Painters & Decorators",
    icon: "Paintbrush",
    description: "Residential and commercial painting.",
    businessSuffixes: ["Painting", "Painters", "Decorating Co", "Painting Services"],
  },
  {
    id: "locksmiths",
    slug: "locksmiths",
    name: "Locksmiths",
    icon: "KeyRound",
    description: "Locksmith and security services.",
    businessSuffixes: ["Locksmiths", "Locks & Security", "Locksmith Services", "Lock Co"],
  },
  {
    id: "tutoring-education",
    slug: "tutoring-education",
    name: "Tutoring & Education",
    icon: "GraduationCap",
    description: "Tutoring and educational support.",
    businessSuffixes: ["Tutoring", "Learning Centre", "Education Co", "Tuition"],
  },
  {
    id: "physiotherapy",
    slug: "physiotherapy",
    name: "Physiotherapy",
    icon: "HeartPulse",
    description: "Physiotherapy and rehabilitation services.",
    businessSuffixes: ["Physiotherapy", "Physio Clinic", "Rehab Co", "Physio & Wellness"],
  },
  {
    id: "dentists",
    slug: "dentists",
    name: "Dentists",
    icon: "Smile",
    description: "Dental clinics and oral health services.",
    businessSuffixes: ["Dental", "Dental Clinic", "Dentistry", "Family Dental"],
  },
  {
    id: "computer-it-repair",
    slug: "computer-it-repair",
    name: "Computer & IT Repair",
    icon: "Laptop",
    description: "Computer repair and IT support.",
    businessSuffixes: ["IT Solutions", "Computer Repairs", "Tech Support", "IT Services"],
  },
];

/** A shared pool of location/style words combined with each category's suffix. */
export const NAME_PREFIXES: string[] = [
  "Akuna Vista",
  "Hills District",
  "Vista",
  "Riverside",
  "Northwest",
  "Community",
  "Local",
  "Premier",
  "Family",
  "Trusted",
  "Sunrise",
  "Blue Gum",
  "Wattle",
  "Ridgeline",
  "Parkside",
  "Greenway",
  "Heritage",
  "Summit",
];

export interface SuburbSeed {
  id: string;
  name: string;
  postcode: string;
  state: string;
}

/** The 5 real suburbs, plus 5 more real, nearby Sydney Hills District suburbs for variety. */
export const SUBURB_SEEDS: SuburbSeed[] = [
  { id: "schofields", name: "Schofields", postcode: "2762", state: "NSW" },
  { id: "tallawong", name: "Tallawong", postcode: "2762", state: "NSW" },
  { id: "the-ponds", name: "The Ponds", postcode: "2769", state: "NSW" },
  { id: "box-hill", name: "Box Hill", postcode: "2765", state: "NSW" },
  { id: "kellyville", name: "Kellyville", postcode: "2155", state: "NSW" },
  { id: "riverstone", name: "Riverstone", postcode: "2765", state: "NSW" },
  { id: "marsden-park", name: "Marsden Park", postcode: "2765", state: "NSW" },
  { id: "rouse-hill", name: "Rouse Hill", postcode: "2155", state: "NSW" },
  { id: "beaumont-hills", name: "Beaumont Hills", postcode: "2155", state: "NSW" },
  { id: "glenwood", name: "Glenwood", postcode: "2768", state: "NSW" },
];

export const DESCRIPTION_TEMPLATES: string[] = [
  "Family-owned {category} business serving {suburb} and surrounding suburbs for over {years} years.",
  "Trusted local {category} team based in {suburb}, known for reliable, friendly service.",
  "{suburb}'s local choice for {category} — servicing the Akuna Vista community since {startYear}.",
  "A community favourite for {category} in {suburb}, recommended by neighbours across the area.",
];

export const SHORT_DESCRIPTION_TEMPLATES: string[] = [
  "Trusted local {category}, {years}+ years in the area.",
  "{suburb}'s go-to for {category}.",
  "Friendly, reliable {category} service.",
];

export const EVENT_TITLES: string[] = [
  "Community BBQ",
  "Farmers Market",
  "Movie Night in the Park",
  "Neighbourhood Clean-Up Day",
  "Kids' Fun Run",
  "Twilight Markets",
  "Community Garage Sale",
  "Family Fun Day",
];

export const PROMOTION_TITLES: string[] = [
  "10% Off",
  "Free Quote This Month",
  "Refer a Friend Discount",
  "Seasonal Special",
  "New Customer Offer",
];

export const ANNOUNCEMENT_TITLES: string[] = [
  "Planned water main works",
  "Road closure notice",
  "Park upgrade update",
  "Community centre opening hours change",
  "Bin collection schedule change",
];
