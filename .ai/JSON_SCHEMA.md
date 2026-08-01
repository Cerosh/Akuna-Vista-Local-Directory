# JSON_SCHEMA.md

# Data Schema Specification

Neighbourhood Directory Platform

Version: 1.0

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

This document defines the JSON schemas used by the Neighbourhood Directory Platform.

It acts as the source of truth for all static data.

All JSON files must conform to these schemas.

The UI should only access data through repository classes.

---

# Design Principles

The data model should be:

- Simple
- Human-readable
- Extensible
- Backwards compatible where practical
- Easy to migrate to a relational database

Do not optimise for future complexity prematurely.

---

# Folder Structure

```
data/
├── businesses.json
├── categories.json
├── suburbs.json
├── events.json
├── promotions.json
├── announcements.json
├── settings.json
└── metadata.json
```

---

# Common Rules

- UTF-8 encoding
- Two-space indentation
- Camel case property names
- ISO 8601 dates
- UUIDs for identifiers
- Arrays sorted alphabetically unless business rules dictate otherwise

---

# Business Schema

File

```
businesses.json
```

Structure

```json
[
  {
    "id": "uuid",
    "slug": "business-slug",
    "name": "ABC Plumbing",
    "description": "Local family-owned plumbing business.",
    "shortDescription": "Trusted local plumber.",
    "categoryId": "plumbing",
    "phone": "+61 400 000 000",
    "email": "hello@example.com",
    "website": "https://example.com",
    "websiteLabel": "Enrol now",
    "address": {
      "street": "1 Example Street",
      "suburb": "Schofields",
      "state": "NSW",
      "postcode": "2762"
    },
    "serviceAreas": [
      "Schofields",
      "Tallawong",
      "The Ponds"
    ],
    "coordinates": {
      "latitude": -33.702,
      "longitude": 150.875
    },
    "openingHours": {
      "monday": "08:00-17:00",
      "tuesday": "08:00-17:00",
      "wednesday": "08:00-17:00",
      "thursday": "08:00-17:00",
      "friday": "08:00-17:00",
      "saturday": "09:00-13:00",
      "sunday": "Closed"
    },
    "socialLinks": {
      "facebook": "",
      "instagram": "",
      "linkedin": ""
    },
    "images": [
      "/images/businesses/example-1.jpg"
    ],
    "featured": false,
    "verified": false,
    "tags": [
      "Emergency",
      "Residential"
    ],
    "priceRange": "$$",
    "createdAt": "2026-07-06T00:00:00Z",
    "updatedAt": "2026-07-06T00:00:00Z"
  }
]
```

`priceRange` was added in schema `1.3.0` (Sprint 8 — Admin Preparation), as the demonstration case for this sprint's data migration helper (`scripts/migrate-add-price-range.ts`). It is optional (`"$"`, `"$$"` or `"$$$"`) and purely informational — no UI currently reads it. Every existing business was backfilled with `"$$"` by the migration helper.

`websiteLabel` was added in schema `1.5.0` (Sprint 11 follow-up), via `scripts/migrate-add-business-website-label.ts`. Optional display text for `website` — used when the link isn't the business's own domain (an enrolment form, booking page, etc.) and the bare URL wouldn't mean anything to a resident. `ContactInfo.tsx` renders `websiteLabel` in place of the URL text when present, falling back to the bare URL (`https://` stripped) otherwise. Not backfilled onto existing businesses — none needed it at migration time.

---

# Category Schema

File

```
categories.json
```

```json
[
  {
    "id": "plumbing",
    "slug": "plumbing",
    "name": "Plumbing",
    "icon": "Wrench",
    "description": "Plumbers and plumbing services.",
    "displayOrder": 1
  }
]
```

`featured` was removed in schema `1.6.0` (Sprint 16 F-018). The homepage's "Popular categories"
section now shows every category in a horizontal scroll carousel instead of a curated subset, so
the flag had no remaining consumer — `Category.featured` is retired everywhere `Business`,
`Event`, `Promotion`, and `Announcement`'s own separate `featured` flags are unaffected.

---

# Suburb Schema

File

```
suburbs.json
```

```json
[
  {
    "id": "schofields",
    "name": "Schofields",
    "postcode": "2762",
    "state": "NSW",
    "featured": true
  }
]
```

---

# Event Schema

Activated in schema `1.2.0` (Sprint 6 — Community Content). Previously
marked "(Future)"; the project owner deliberately pulled this forward
from Version 4 — see DECISIONS.md ADR-011.

File

```
events.json
```

```json
[
  {
    "id": "uuid",
    "title": "Community BBQ",
    "slug": "community-bbq",
    "description": "Monthly community gathering.",
    "startDate": "2026-09-10T10:00:00Z",
    "endDate": "2026-09-10T14:00:00Z",
    "location": "Akuna Vista Park",
    "image": "/images/events/bbq.jpg",
    "featured": true
  }
]
```

---

# Promotion Schema

Activated in schema `1.2.0` (Sprint 6 — Community Content). Previously
marked "(Future)"; the project owner deliberately pulled this forward
from Version 4 — see DECISIONS.md ADR-011.

File

```
promotions.json
```

```json
[
  {
    "id": "uuid",
    "businessId": "uuid",
    "title": "10% Off",
    "description": "Available this month.",
    "startDate": "2026-07-01",
    "endDate": "2026-07-31",
    "featured": true
  }
]
```

`title` is rendered `line-clamp-1` in `PromotionCard.tsx` (Sprint 16 F-020) — keep it to roughly 40
characters or fewer so it reads as one line on a `lg:grid-cols-3` homepage card. Longer titles still
work (the full text is in a `title=` hover tooltip and in `description`) but will visually truncate.

---

# Announcement Schema

New in schema `1.2.0` (Sprint 6 — Community Content). `sourceUrl` added
in `1.4.0` (Sprint 09b — Content Cleanup).

File

```
announcements.json
```

```json
[
  {
    "id": "uuid",
    "title": "Water main works — Vista Street",
    "message": "Planned maintenance from 9am–3pm. Expect brief water interruptions.",
    "publishedAt": "2026-07-05T09:00:00Z",
    "expiresAt": "2026-07-12T00:00:00Z",
    "priority": "high",
    "featured": true,
    "sourceUrl": "https://council.example.gov.au/notices/water-main-works"
  }
]
```

`expiresAt` is optional — an announcement with no `expiresAt` is always
considered active. `priority` is `"normal"` or `"high"`.

`featured` is included even though it goes beyond the minimal shape a
simple community noticeboard needs, because Sprint 6's Featured Content
mechanism aggregates `featured: true` records across events, promotions
and announcements alike — Event and Promotion schemas already had the
field, so Announcement needed it too for that mechanism to work
consistently across all three content types.

`sourceUrl?: string` is optional — added for real council/government/
developer news (e.g. a Transport for NSW project page, a council DA
notice) that has nowhere to link back to the source otherwise. Rendered
by `AnnouncementCard` as a "Read more" link when present, omitted
otherwise (same optional-field convention as `expiresAt`). Not
backfilled onto existing announcements without a real source link — see
`scripts/migrate-add-announcement-source-url.ts`.

---

# Settings Schema

File

```
settings.json
```

```json
{
  "communityName": "Akuna Vista",
  "siteName": "Akuna Vista Local Directory",
  "tagline": "Discover trusted local businesses.",
  "primaryColor": "#2563EB",
  "secondaryColor": "#0F172A",
  "logo": "/images/logo.svg",
  "heroImage": "/images/hero.jpg",
  "contactEmail": "community@example.com",
  "enableSearch": true,
  "enableFeaturedBusinesses": true,
  "enableEvents": false
}
```

---

# Metadata Schema

File

```
metadata.json
```

```json
{
  "schemaVersion": "1.1.0",
  "generatedAt": "2026-07-06T00:00:00Z",
  "lastUpdated": "2026-07-06T00:00:00Z",
  "totalBusinesses": 0,
  "totalCategories": 0,
  "communityMembers": 800
}
```

`communityMembers` was added in schema `1.1.0` (Sprint 2) to back the homepage's Community Statistics section with a real data field instead of hardcoded copy. It is optional for backwards compatibility with any `1.0.0` metadata files.

---

# Validation Rules

## Required Fields

Business

- id
- slug
- name
- description
- categoryId
- featured
- createdAt
- updatedAt

Category

- id
- slug
- name

Event

- id
- title
- slug
- description
- startDate
- endDate
- location
- featured

Promotion

- id
- businessId
- title
- description
- startDate
- endDate
- featured

Announcement

- id
- title
- message
- publishedAt
- priority
- featured

Settings

- communityName
- siteName

---

# Slug Rules

Slugs must:

- Be lowercase
- Use hyphens
- Contain only letters, numbers and hyphens
- Be unique

Example

```
good-plumbing-services
```

---

# Identifier Rules

Use UUIDs.

Identifiers must never change after creation.

---

# Dates

Use ISO 8601.

Example

```
2026-07-06T14:30:00Z
```

Never use locale-specific formats.

---

# Images

Store relative paths.

Example

```
/images/businesses/abc-plumbing.jpg
```

Do not store Base64 data.

Optimise images before adding them.

---

# Coordinates

Latitude

-90 to 90

Longitude

-180 to 180

Coordinates are optional until map functionality is introduced.

---

# Repository Rules

The UI must never read JSON files directly.

Always access data through repository classes.

Example

```
BusinessRepository

↓

JSON Repository

↓

businesses.json
```

This abstraction simplifies future migration to Supabase.

---

# Migration Strategy

Current

JSON

↓

Repository

↓

UI

Future

Supabase

↓

Repository

↓

UI

The UI should remain unchanged during migration.

---

# Versioning

Every schema change should:

- Increment `schemaVersion`
- Be documented in CHANGELOG.md
- Preserve compatibility where practical
- Be reflected in this document

Breaking schema changes should be avoided unless justified.

`1.2.0` (Sprint 6 — Community Content): activated the Event and
Promotion schemas (previously "(Future)") and added the new Announcement
schema. Deliberately pulls forward scope PROJECT.md and ROADMAP.md had
placed in Version 4 — see DECISIONS.md ADR-011.

`1.3.0` (Sprint 8 — Admin Preparation): added optional `Business.priceRange`
(`"$"` | `"$$"` | `"$$$"`), backfilled to `"$$"` on every existing business.
The demonstration case for this sprint's data migration helper
(`scripts/migrate-add-price-range.ts`) — see DECISIONS.md ADR-013.

`1.4.0` (Sprint 09b — Content Cleanup): added optional
`Announcement.sourceUrl` (`z.url().optional()`), so an announcement can
link back to its original source (council page, DA notice, etc). Not
backfilled onto existing announcements — none had a real source URL
supplied at migration time (`scripts/migrate-add-announcement-source-url.ts`).

`1.5.0` (Sprint 11 follow-up): added optional `Business.websiteLabel`
(plain string), so `ContactInfo.tsx` can show meaningful text (e.g.
"Enroll now") instead of a bare URL when `website` points somewhere
other than the business's own domain — an enrolment form, booking page,
etc. Not backfilled onto existing businesses
(`scripts/migrate-add-business-website-label.ts`).

`1.6.0` (Sprint 16 F-018): removed `Category.featured`. The homepage's "Popular categories"
section switched from a curated `featured: true` subset (only 3 of 21 categories) to a horizontal
scroll carousel showing every category, so the flag lost its only consumer
(`categoryRepository.getFeatured()` and the field itself were deleted, not just left unused).
`Business.featured`, `Event.featured`, `Promotion.featured`, and `Announcement.featured` are
separate flags on separate schemas and are unaffected — a removal, not a project-wide "featured"
deprecation.

---

# Tooling

Sprint 8 (Admin Preparation) turned this document's "Validation Rules"
and "Definition of a Valid JSON File" sections into actual, enforced
code, rather than prose alone:

- `npm run validate:data` — validates every file in `data/` against the
  schemas on this page (`scripts/lib/validation.ts`), enforced in Husky
  pre-commit and CI so invalid data cannot be committed or merged.
- `npm run backup:data` / `npm run restore:data` — timestamped, git-ignored
  snapshots of `data/`, recommended before any bulk operation below.
- `npm run export:csv` / `npm run import:csv` — JSON↔CSV for bulk spreadsheet
  edits (`scripts/lib/csv.ts` documents the flatten/unflatten convention);
  import runs the same validation as `validate:data` before writing.
- `npm run admin:data` — add/update/toggle a single record from the
  command line, validated before writing.
- `npm run seed:generate` — a configurable placeholder-data generator
  (`scripts/seed/wordbanks.ts`), for closing ROADMAP.md Phase 6's
  "Populate Content" gap with tooling; scratch output only by default.
- `scripts/migrate-add-price-range.ts` — the worked example of a
  mechanical `schemaVersion` bump described above.

See `sprints/sprint-08-admin/` for the full sprint plan and
`sprints/sprint-08-admin/notes.md` for why this is deliberately CLI/CI
tooling, not an authenticated admin dashboard (that remains ROADMAP.md's
🟡 Future Phase 14).

---

# Sample Directory Structure

```
data/
├── businesses.json
├── categories.json
├── suburbs.json
├── settings.json
├── metadata.json
├── events.json
├── promotions.json
└── announcements.json
```

---

# Definition of a Valid JSON File

A valid JSON file:

- Matches the documented schema
- Uses UTF-8 encoding
- Contains no duplicate IDs
- Uses unique slugs
- Has valid dates
- Contains no unused fields
- Is formatted consistently
- Passes schema validation

---

# Guiding Principle

The JSON files are the application's temporary database.

Treat them with the same discipline you would apply to a production database schema.

Well-structured data today makes tomorrow's migration straightforward.