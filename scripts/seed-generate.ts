#!/usr/bin/env tsx
import { randomUUID } from "node:crypto";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { ensureDir } from "./lib/backupPaths";
import { writeJsonFile } from "./lib/fileIO";
import { isMainModule } from "./lib/isMainModule";
import {
  ANNOUNCEMENT_TITLES,
  CATEGORY_SEEDS,
  DESCRIPTION_TEMPLATES,
  EVENT_TITLES,
  NAME_PREFIXES,
  PROMOTION_TITLES,
  SHORT_DESCRIPTION_TEMPLATES,
  SUBURB_SEEDS,
} from "./seed/wordbanks";

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => vars[key] ?? "");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const OPENING_HOURS_PATTERNS = [
  {
    monday: "08:00-17:00",
    tuesday: "08:00-17:00",
    wednesday: "08:00-17:00",
    thursday: "08:00-17:00",
    friday: "08:00-17:00",
    saturday: "09:00-13:00",
    sunday: "Closed",
  },
  {
    monday: "07:00-16:00",
    tuesday: "07:00-16:00",
    wednesday: "07:00-16:00",
    thursday: "07:00-16:00",
    friday: "07:00-16:00",
    saturday: "Closed",
    sunday: "Closed",
  },
  {
    monday: "09:00-18:00",
    tuesday: "09:00-18:00",
    wednesday: "09:00-18:00",
    thursday: "09:00-18:00",
    friday: "09:00-18:00",
    saturday: "09:00-14:00",
    sunday: "Closed",
  },
];

const STREET_NAMES = [
  "Vista",
  "Ridgeline",
  "Parkway",
  "Garden",
  "Hillcrest",
  "Main",
  "Wattle",
  "Willow",
];

export function generateCategories(count: number) {
  return CATEGORY_SEEDS.slice(0, count).map((seed, index) => ({
    id: seed.id,
    slug: seed.slug,
    name: seed.name,
    icon: seed.icon,
    description: seed.description,
    displayOrder: index + 1,
    featured: index < 4,
  }));
}

export function generateSuburbs(count: number) {
  return SUBURB_SEEDS.slice(0, count).map((seed, index) => ({
    id: seed.id,
    name: seed.name,
    postcode: seed.postcode,
    state: seed.state,
    featured: index < 3,
  }));
}

export function generateBusinesses(
  count: number,
  categories: { id: string }[],
  suburbs: { name: string; state: string; postcode: string }[],
) {
  if (categories.length === 0 || suburbs.length === 0) return [];

  const businesses = [];
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    const categorySeed = CATEGORY_SEEDS.find((c) => c.id === categories[i % categories.length].id);
    if (!categorySeed) continue;
    const suburb = suburbs[i % suburbs.length];

    let name = `${pick(NAME_PREFIXES)} ${pick(categorySeed.businessSuffixes)}`;
    let attempts = 0;
    while (usedNames.has(name) && attempts < 50) {
      name = `${pick(NAME_PREFIXES)} ${pick(categorySeed.businessSuffixes)}`;
      attempts++;
    }
    if (usedNames.has(name)) name = `${name} ${i}`;
    usedNames.add(name);
    const slug = slugify(name);

    const years = String(3 + Math.floor(Math.random() * 20));
    const startYear = String(2026 - Number(years));
    const vars = {
      category: categorySeed.name.toLowerCase(),
      suburb: suburb.name,
      years,
      startYear,
    };

    businesses.push({
      id: randomUUID(),
      slug,
      name,
      description: fillTemplate(pick(DESCRIPTION_TEMPLATES), vars),
      shortDescription: fillTemplate(pick(SHORT_DESCRIPTION_TEMPLATES), vars),
      categoryId: categorySeed.id,
      phone: `+61 4${String(Math.floor(Math.random() * 100000000)).padStart(8, "0")}`,
      email: `hello@${slug}.example`,
      address: {
        street: `${1 + Math.floor(Math.random() * 200)} ${pick(STREET_NAMES)} Street`,
        suburb: suburb.name,
        state: suburb.state,
        postcode: suburb.postcode,
      },
      openingHours: pick(OPENING_HOURS_PATTERNS),
      images: ["/images/placeholder-business.svg"],
      featured: i % 7 === 0,
      verified: i % 3 !== 0,
      tags: [],
      createdAt: "2026-07-06T00:00:00Z",
      updatedAt: "2026-07-06T00:00:00Z",
    });
  }
  return businesses;
}

export function generateEvents(count: number) {
  const events = [];
  for (let i = 0; i < count; i++) {
    const title = pick(EVENT_TITLES);
    const start = new Date(Date.UTC(2026, 6 + (i % 6), 5 + (i % 20), 10, 0, 0));
    const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
    events.push({
      id: randomUUID(),
      title,
      slug: slugify(`${title}-${i}`),
      description: `Join your neighbours for the ${title.toLowerCase()} at Akuna Vista Park.`,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      location: "Akuna Vista Park",
      featured: i % 5 === 0,
    });
  }
  return events;
}

export function generatePromotions(count: number, businesses: { id: string }[]) {
  if (businesses.length === 0) return [];
  const promotions = [];
  for (let i = 0; i < count; i++) {
    const business = businesses[i % businesses.length];
    const startMonth = 1 + ((6 + i) % 12);
    const start = new Date(Date.UTC(2026, startMonth - 1, 1));
    const end = new Date(Date.UTC(2026, startMonth, 0));
    promotions.push({
      id: randomUUID(),
      businessId: business.id,
      title: pick(PROMOTION_TITLES),
      description: "Available for a limited time — mention this listing when booking.",
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      featured: i % 4 === 0,
    });
  }
  return promotions;
}

export function generateAnnouncements(count: number) {
  const announcements = [];
  for (let i = 0; i < count; i++) {
    const title = pick(ANNOUNCEMENT_TITLES);
    const published = new Date(Date.UTC(2026, 6, 1 + i));
    announcements.push({
      id: randomUUID(),
      title,
      message: `${title} — details will be updated as they become available.`,
      publishedAt: published.toISOString(),
      priority: i % 3 === 0 ? "high" : ("normal" as const),
      featured: i % 6 === 0,
    });
  }
  return announcements;
}

/**
 * Usage: npm run seed:generate -- [--businesses=100] [--categories=25]
 *   [--suburbs=10] [--events=10] [--promotions=10] [--announcements=10]
 *   [--out=<dir>] [--target=data]
 *
 * Writes to scripts/seed/output/ (git-ignored scratch space) by default.
 * Populating the real data/ directory at production scale is a deliberate,
 * separate decision left to the project owner (sprints/sprint-08-admin/notes.md
 * Open Questions) — pass --target=data only when that decision has been made.
 */
function main() {
  const { values } = parseArgs({
    options: {
      businesses: { type: "string", default: "100" },
      categories: { type: "string", default: "25" },
      suburbs: { type: "string", default: "10" },
      events: { type: "string", default: "10" },
      promotions: { type: "string", default: "10" },
      announcements: { type: "string", default: "10" },
      target: { type: "string", default: "scratch" },
      out: { type: "string" },
    },
  });

  const counts = {
    businesses: Number(values.businesses),
    categories: Math.min(Number(values.categories), CATEGORY_SEEDS.length),
    suburbs: Math.min(Number(values.suburbs), SUBURB_SEEDS.length),
    events: Number(values.events),
    promotions: Number(values.promotions),
    announcements: Number(values.announcements),
  };

  const categories = generateCategories(counts.categories);
  const suburbs = generateSuburbs(counts.suburbs);
  const businesses = generateBusinesses(counts.businesses, categories, suburbs);
  const events = generateEvents(counts.events);
  const promotions = generatePromotions(counts.promotions, businesses);
  const announcements = generateAnnouncements(counts.announcements);

  let outputDir: string;
  if (values.target === "data") {
    outputDir = join(process.cwd(), "data");
    console.warn(
      "WARNING: writing generated data directly into data/ — this overwrites the real, committed dataset.",
    );
  } else {
    outputDir = values.out
      ? join(process.cwd(), values.out)
      : join(process.cwd(), "scripts/seed/output");
    ensureDir(outputDir);
  }

  writeJsonFile(join(outputDir, "categories.json"), categories);
  writeJsonFile(join(outputDir, "suburbs.json"), suburbs);
  writeJsonFile(join(outputDir, "businesses.json"), businesses);
  writeJsonFile(join(outputDir, "events.json"), events);
  writeJsonFile(join(outputDir, "promotions.json"), promotions);
  writeJsonFile(join(outputDir, "announcements.json"), announcements);

  console.log(
    `Generated ${counts.businesses} businesses, ${counts.categories} categories, ${counts.suburbs} suburbs, ${counts.events} events, ${counts.promotions} promotions, ${counts.announcements} announcements -> ${outputDir}`,
  );
  if (values.target !== "data") {
    console.log(
      "This is scratch output, not the real data/ directory. Populating data/ at production scale is an open decision for the project owner — see sprints/sprint-08-admin/notes.md.",
    );
  }
}

if (isMainModule(import.meta.url)) {
  main();
}
