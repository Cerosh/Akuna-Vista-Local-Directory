# Sprint 15 – Directory Data Entries

Neighbourhood Directory Platform

Sprint Number: 15

Sprint Name: Directory Data Entries

Sprint Goal: An ongoing, content-only sprint for real business/service listings supplied directly
by the project owner in chat (as opposed to a themed feature/bugfix sprint like 11–14). Stays open
across multiple days as new listings arrive, rather than being closed and reopened per submission.

Sprint Status: 🔄 In Progress (ongoing — project owner has indicated more entries are coming in
the following days)

Start Date: 2026-07-16

End Date: (ongoing)

Owner: Cerosh Jacob

Last Updated: 2026-07-16

---

# Numbering

Sequential addition after Sprint 14 (UI Polish, complete locally). Per the Spec-Driven Development
process in `.ai/CLAUDE.md`, a content addition still needs a Feature entry with Acceptance
Criteria before any data file is touched; since Sprint 14 is marked Complete, this content stays in
its own sprint rather than reopening 14. Unlike prior sprints, this one is deliberately left open
(not marked Complete) so future data-entry requests can be added as new Features (F-002, F-003...)
without opening a new sprint folder each time.

---

# Sprint Objective

Add real-world content supplied directly by the project owner — primarily business/service listings
in `data/businesses.json`, and as of F-009, other directory content the project owner supplies
directly (e.g. `data/announcements.json`) — validated against the existing schema
(`scripts/lib/validation.ts`, `.ai/JSON_SCHEMA.md`) and existing category set
(`data/categories.json`) — no new categories, components, or schema fields introduced unless a
Feature explicitly calls for one. Broadened from businesses-only 2026-07-16, matching how Sprint 16
was similarly broadened from a single content type to a general ongoing bucket.

---

# Business Value

- Grows the directory's real (non-seed) content, which is the platform's actual value to visitors.
- JP (Justice of the Peace) coverage was previously limited to 3 fixed-location community desks
  (library, community centre, shopping centre) — adding individual, locally-based JPs gives
  visitors more "anytime"/flexible options.

---

# Success Criteria

Per Feature, the sprint is successful when:

- [x] The Feature's Acceptance Criteria are met.
- [x] `npm run validate:data` passes (schema + referential integrity + no duplicate id/slug).
- [x] Existing Playwright suite still passes (no regressions from the new data).
- [x] No known critical defects.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Add 3 new JP-services listings (JP/Ethiquity Mortgage Services, Praful Saparia, Anjul), all featured, each noting it's a local service | High | Completed |
| F-002 | Add new "Finance & Mortgage Broking" category | High | Completed |
| F-003 | Add a second, duplicate listing for Ethiquity Mortgage Services under the new Finance & Mortgage Broking category | High | Completed |
| F-004 | Add 2 new categories: "Arts & Performing Arts", "Accounting & Tax" | Medium | Completed |
| F-005 | Add 3 new business listings (Bharatanatyam Kalakshetra, Fortune8 Property Group, Knowledgetree) | Medium | Completed |
| F-006 | Add Arihant Party Essentials (new "Event & Party Hire" category) — local connection confirmed (Scout Street) | Low | Completed |
| F-007 | Backfill phone numbers for Fortune8 Property Group and Knowledgetree; name their local contacts in the description | Low | Completed |
| F-008 | Replace Arihant Party Essentials' placeholder content with real flyer content (prices, service areas, contacts, flyer image) | Low | Completed |
| F-009 | Replace "Schofields Park upgrade underway" announcement with "Aerodrome Drive to Quakers Hill Parkway link road planned", sorted first | Medium | Completed |
| F-010 | Name the Dharug people specifically in the footer's Acknowledgment of Country | High | Completed |
| F-011 | Rename Promotions section to "Akuna Vista residents-only promotions"; add Knowledgetree SMSF deal and new Simran's Detailing business + promotion; remove 4 unrelated promotions, keeping only 3 (tutoring, Knowledgetree, Simran's Detailing) | High | Completed |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1 (F-001)

As a visitor in Akuna Vista / Nirimba Fields needing a document witnessed or a statutory
declaration signed

I want to see the individual, locally-based JPs who serve this area (not just the 3 fixed-location
community desks already listed)

So that I can find someone flexible/available near me, including "anytime service" options.

### Source data (as supplied by the project owner, verbatim)

1. "I am JP and a mortgage broker here in Akuna Vista — Ethiquity Mortgage Services (Broker in
   Sneakers) — janstuteja@ethiquitymortgage.com / jannayaksingh@gmail.com — 0423829525 — Swordfish
   Street, Nirimba Fields"
2. "Praful Saparia (NSW JP) — +61 420 591 406 — Anytime service - Nirimba Fields Akuna Vista"
3. "I am a JP and lives in Akuna Vista — +61 456 754 732 — ~Anjul — Mariner Avenue"

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- **Email field (confirmed by project owner):** schema (`types/business.ts`) stores a single
  `email: string`, not an array. Project owner chose to store both addresses comma-separated in
  that one field: `"janstuteja@ethiquitymortgage.com, jannayaksingh@gmail.com"`.
- **Sprint placement (confirmed by project owner):** goes in this new, ongoing Sprint 15 rather
  than reopening Sprint 14, since more data-entry requests are expected in the coming days.
- **No full postal address for any of the 3** (no suburb/postcode supplied, and 2 of 3 are
  explicitly "anytime"/no-fixed-location services) — following the existing precedent set by
  `private-mathematics-english-tutoring` (`data/businesses.json:364-381`, no `address` object, only
  `serviceAreas`), all 3 new entries omit `address` and use `serviceAreas` instead. Street-level
  detail ("Swordfish Street", "Mariner Avenue") is preserved in `description`/`shortDescription`
  text rather than a structured address, since a partial address (missing postcode/state) would
  fail schema validation if forced into the `address` object.
- **"~Anjul" is treated as the person's first name** (`name: "Anjul"`, leading `~` dropped as a
  text-message sign-off convention, not part of the name) — matches the existing first-name-only
  precedent `"name": "Naren"` (driving instructor, `data/businesses.json:236-238`).
- **Phone numbers kept in the format supplied** (some `+61 4XX XXX XXX`, one `04XXXXXXXX`) —
  matches the existing data's own inconsistency (both formats already coexist in
  `data/businesses.json`), so no reformatting applied.
- **`categoryId: "jp-services"`** for all 3 — the category already exists
  (`data/categories.json:101-109`), no new category needed.
- **`featured: true`** for all 3, per explicit instruction ("make them all as featured in JP
  section").
- **`verified: false`** (default) for all 3 — no independent verification of JP registration
  status was performed; this only reflects data-entry sourcing, not doubt about the individuals.
- Descriptions/short descriptions/tags below are authored (not verbatim from the project owner) to
  fit the schema's required `description` field and match the existing JP listings' tone
  ("document witnessing, statutory declarations, and certified copies").
- **"Local" line (project owner request, this round):** each of the 3 descriptions now opens with
  "Local Justice of the Peace..." instead of just "Justice of the Peace...", and each
  `tags` array gains a `"Local"` tag, so it's visible both in the description text and as a
  scannable tag.
- **Dual-category listing for Ethiquity (project owner request, this round; confirmed via
  clarifying question):** the `Business` schema only supports one `categoryId` per entry (a single
  string, not a list) — there's no structural way for one listing to appear under two categories.
  Project owner chose **duplicate listing** over extending the schema to `categoryIds: string[]`
  (a bigger, all-businesses-affecting change) or leaving it single-category. This means the JP
  entry (F-001) and the new Finance entry (F-003) are two separate `Business` records with
  different `id`/`slug` but the same contact details — if either changes in future (e.g. a new
  phone number), both must be updated together; there is no shared source of truth between them.
  This tradeoff was surfaced and accepted, not silently assumed.
- **New category (project owner request, this round; confirmed via clarifying question):** no
  finance/mortgage category existed (`data/categories.json`'s 12 categories, closest was
  `real-estate`). Project owner chose to add a new `finance-mortgage-broking` category rather than
  reuse `real-estate`. Icon `"Landmark"` chosen (a real `lucide-react` export, dynamically resolved
  by `components/cards/CategoryCard.tsx` — no fixed icon whitelist beyond what the library exports).
  `displayOrder: 13` (after `jp-services` at 12). `featured: false` chosen as the default (8 of the
  existing 12 categories are `featured: false`; a brand-new category with a single business seemed
  a safer default than forcing it into the homepage's Popular Categories row) — flagged here in
  case the project owner wants it `featured: true` instead.

### Proposed entries

```json
{
  "id": "239195a1-06c0-4433-95c2-51ffcf22df49",
  "slug": "ethiquity-mortgage-services-jp",
  "name": "JP – Ethiquity Mortgage Services",
  "description": "Local Justice of the Peace and mortgage broker based in Nirimba Fields, Akuna Vista, trading as Ethiquity Mortgage Services (\"Broker in Sneakers\"). Offers JP services including document witnessing, statutory declarations, and certified copies, alongside mortgage broking.",
  "shortDescription": "Local JP & mortgage broker, Ethiquity Mortgage Services (\"Broker in Sneakers\"), Nirimba Fields.",
  "categoryId": "jp-services",
  "phone": "0423829525",
  "email": "janstuteja@ethiquitymortgage.com, jannayaksingh@gmail.com",
  "serviceAreas": ["Nirimba Fields", "Akuna Vista"],
  "images": ["/images/placeholder-business.svg"],
  "featured": true,
  "verified": false,
  "tags": ["Justice of the Peace", "Mortgage Broker", "Local"],
  "createdAt": "2026-07-16T00:00:00Z",
  "updatedAt": "2026-07-16T00:00:00Z"
}
```

```json
{
  "id": "8192f7b3-80a9-44f8-bc75-b28f08dc2dae",
  "slug": "praful-saparia-jp",
  "name": "Praful Saparia (NSW JP)",
  "description": "Local Justice of the Peace offering an anytime service in Nirimba Fields and Akuna Vista, for document witnessing, statutory declarations, and certified copies.",
  "shortDescription": "Local NSW JP, anytime service, Nirimba Fields / Akuna Vista.",
  "categoryId": "jp-services",
  "phone": "+61 420 591 406",
  "serviceAreas": ["Nirimba Fields", "Akuna Vista"],
  "images": ["/images/placeholder-business.svg"],
  "featured": true,
  "verified": false,
  "tags": ["Justice of the Peace", "Anytime Service", "Local"],
  "createdAt": "2026-07-16T00:00:00Z",
  "updatedAt": "2026-07-16T00:00:00Z"
}
```

```json
{
  "id": "4467ef01-49fa-41ae-8f82-d45b6a095f54",
  "slug": "anjul-jp",
  "name": "Anjul (JP)",
  "description": "Local Justice of the Peace living on Mariner Avenue, Akuna Vista, offering document witnessing, statutory declarations, and certified copies.",
  "shortDescription": "Local JP based on Mariner Avenue, Akuna Vista.",
  "categoryId": "jp-services",
  "phone": "+61 456 754 732",
  "serviceAreas": ["Akuna Vista"],
  "images": ["/images/placeholder-business.svg"],
  "featured": true,
  "verified": false,
  "tags": ["Justice of the Peace", "Local"],
  "createdAt": "2026-07-16T00:00:00Z",
  "updatedAt": "2026-07-16T00:00:00Z"
}
```

Acceptance Criteria

- [x] All 3 entries above are added to `data/businesses.json` with `categoryId: "jp-services"` and
      `featured: true`.
- [x] Each of the 3 descriptions opens with "Local Justice of the Peace..." and each `tags` array
      includes `"Local"`.
- [x] `npm run validate:data` passes — no schema violations, no duplicate `id`/`slug`, `categoryId`
      resolves to an existing category.
- [x] All 3 appear in the homepage's Featured Businesses section (`businessRepository.getFeatured()`
      filters on `featured: true`) and on the `jp-services` category page, alongside the existing 3
      JP desk listings.
- [x] Existing Playwright suite still passes (no regressions).

---

## Story 2 (F-002)

As a visitor looking for a mortgage broker or finance service in the directory

I want a dedicated category for finance/mortgage services

So that I'm not searching for them under an unrelated category like Real Estate.

### Proposed entry — `data/categories.json`

```json
{
  "id": "finance-mortgage-broking",
  "slug": "finance-mortgage-broking",
  "name": "Finance & Mortgage Broking",
  "icon": "Landmark",
  "description": "Mortgage brokers and finance services helping with home loans, refinancing, and lending advice.",
  "displayOrder": 13,
  "featured": false
}
```

Acceptance Criteria

- [x] New category added to `data/categories.json` with `id`/`slug: "finance-mortgage-broking"`.
- [x] `npm run validate:data` passes (category schema, no duplicate `id`/`slug`).
- [x] `/category/finance-mortgage-broking` renders via the existing dynamic category route with no
      code change required (confirms the category system needs no schema change to add a category).
- [x] Category icon (`Landmark`) renders correctly on the category card/page (not the `Store`
      fallback icon `CategoryCard.tsx` uses for an unresolved icon name).

---

## Story 3 (F-003)

As the site owner (JP, Ethiquity Mortgage Services)

I want my mortgage-broking service to also be discoverable under a Finance category, not just JP
Services

So that visitors searching for a mortgage broker specifically (not a JP) can still find me.

### Proposed entry — `data/businesses.json`

```json
{
  "id": "e7edeb39-cc72-48bc-9ce3-a459d81f9b49",
  "slug": "ethiquity-mortgage-services-finance",
  "name": "Ethiquity Mortgage Services",
  "description": "Local mortgage broker based in Nirimba Fields, Akuna Vista, trading as Ethiquity Mortgage Services (\"Broker in Sneakers\"). Also a Justice of the Peace, offering document witnessing, statutory declarations, and certified copies alongside mortgage broking.",
  "shortDescription": "Local mortgage broker, Ethiquity Mortgage Services (\"Broker in Sneakers\"), Nirimba Fields.",
  "categoryId": "finance-mortgage-broking",
  "phone": "0423829525",
  "email": "janstuteja@ethiquitymortgage.com, jannayaksingh@gmail.com",
  "serviceAreas": ["Nirimba Fields", "Akuna Vista"],
  "images": ["/images/placeholder-business.svg"],
  "featured": true,
  "verified": false,
  "tags": ["Mortgage Broker", "Justice of the Peace", "Local"],
  "createdAt": "2026-07-16T00:00:00Z",
  "updatedAt": "2026-07-16T00:00:00Z"
}
```

Acceptance Criteria

- [x] Entry added to `data/businesses.json` with `categoryId: "finance-mortgage-broking"` and
      `featured: true`.
- [x] Same contact details (`phone`, `email`, `serviceAreas`) as the F-001 JP entry, kept in sync at
      creation time (no shared source of truth — see Assumptions above for the tradeoff).
- [x] `npm run validate:data` passes (no duplicate `id`/`slug` against the F-001 entry or any other
      business; `categoryId` resolves to the new F-002 category).
- [x] Appears in Featured Businesses and on the `finance-mortgage-broking` category page.
- [x] Existing Playwright suite still passes.

---

## Story 4 (F-004 / F-005)

As a visitor

I want new local businesses (a dance school, a real estate agency, an accounting firm) to be
discoverable under a category that actually describes them

So that I'm not hunting for a Bharatanatyam school under "Tutoring" or an accountant under
"Finance & Mortgage Broking".

### Source data (as supplied by the project owner, verbatim)

1. "Indian classical dance - The Bharatanatyam Kalakshetra / Hashwini Shanthakumar /
   hashwiniskumar@gmail.com / 0490947681."
2. "Arihant Party Essentials, your one-stop shop for all your party equipment hire needs in North
   Sydney. We're committed to providing quality gazebos, chairs, tables, and lighting to make your
   event unforgettable." — see F-006 below; **not** implemented this pass.
3. "Can you also add our Fortune8 realestate business into the group? We at Fortune8 Property Group
   specialise in Buying, Selling, Leasing & Building Properties (including Investment Properties)
   throughout Australia. Our business verticals include: 1) Residential Sales (NSW) 2) Property
   Management (NSW) 3) H&L Packages across Australia 4) Buyers Agency (e.g. SMSF) ... Regards, Mohit
   Bindal / Fortune8 Property Group / Living on Hornet St. for 5 years"
4. "I run an accounting firm in AV / www.knowledgetree.com.au / swordfish street but office is in
   Castle Hill. / we are SMSF specialists. / Your financial future, expertly managed. / Australia's
   premier accounting and taxation firm — delivering exceptional solutions for individuals and
   businesses with integrity, expertise, and care."

### Category decisions (confirmed by project owner via clarifying questions, this round)

- **New category: `arts-performing-arts`** ("Arts & Performing Arts", icon `Drama`) — for
  Bharatanatyam Kalakshetra. Rejected reusing `tutoring-education` — dance is instruction but
  distinct enough to blur both if merged.
- **New category: `accounting-tax`** ("Accounting & Tax", icon `Calculator`) — for Knowledgetree.
  Rejected broadening `finance-mortgage-broking` — accounting/tax is meaningfully distinct from
  mortgage broking.
- **`real-estate`** (existing category, `data/categories.json:91-99`) — Fortune8 Property Group
  fits this cleanly, no new category needed.
- **`event-party-hire`** ("Event & Party Hire", icon `PartyPopper`) was scoped for Arihant Party
  Essentials but is **not created this pass** — see F-006 (deferred).

### Assumptions / gaps flagged (confirm or correct)

- **Bharatanatyam Kalakshetra has no address/suburb/service-area given at all** — unlike Arihant
  (explicitly North Sydney, flagged and deferred per the project owner's answer), this submission is
  simply silent on locality rather than affirmatively non-local, and was not flagged the way Arihant
  was. Assumed local and given `serviceAreas: ["Akuna Vista"]` — flag if this assumption is wrong.
- **Fortune8 Property Group has no phone, email, or website supplied** — only a business description
  and the submitter's own local residency ("Living on Hornet St. for 5 years"). The submitter
  explicitly invited a follow-up ("Please let me know if you need any other information"), so this
  is a real gap worth closing, not silently worked around — the listing is added with the
  information given, but it currently has **no way for a visitor to make contact**. Recommend
  following up with Mohit Bindal for a phone/email/website before this listing is genuinely useful.
- **Knowledgetree's exact registered business name isn't stated** — only the domain
  `knowledgetree.com.au` and "an accounting firm in AV" are given. Inferred display name
  "Knowledgetree" from the domain — flag if the real trading name differs.
- **Knowledgetree's office is in Castle Hill, not Akuna Vista** — same pattern as Sprint 15's
  Ethiquity Mortgage Services (F-001): the business itself isn't local, but the submitter's own
  residence is ("swordfish street", matching the same street as F-001's JP/Ethiquity entry in
  Nirimba Fields). No `address` object is added (Castle Hill street number/postcode weren't given);
  `serviceAreas: ["Akuna Vista", "Castle Hill"]` and the office location are noted in the
  description text instead, consistent with the F-001 precedent for partial/unavailable addresses.
- **No phone or email for Knowledgetree** — only the website. Same "worth following up" flag as
  Fortune8.
- **"Most people are looking for smsf firms since recent budget updates"** — this is the project
  owner's own market-context commentary, not a claim the business made about itself. It is **not**
  included in the listing's description (would read as an unverifiable promotional claim inserted
  into what should be neutral factual data) — instead, "SMSF specialists" (something Knowledgetree
  did say about itself) is captured as an explicit tag so it's still prominently discoverable.
- **`featured`** — none of these 3 submissions asked to be featured (unlike Sprint 15 F-001's explicit
  "make them all featured"), so all default to `featured: false`. Flag if any should be featured.
- **`verified: false`** (default) for all 3, consistent with every prior Sprint 15 entry — no
  independent verification performed.

### Proposed new categories — `data/categories.json`

```json
{
  "id": "arts-performing-arts",
  "slug": "arts-performing-arts",
  "name": "Arts & Performing Arts",
  "icon": "Drama",
  "description": "Dance, music, and performing arts schools and instruction.",
  "displayOrder": 14,
  "featured": false
}
```

```json
{
  "id": "accounting-tax",
  "slug": "accounting-tax",
  "name": "Accounting & Tax",
  "icon": "Calculator",
  "description": "Accounting, taxation, and SMSF specialists for individuals and businesses.",
  "displayOrder": 15,
  "featured": false
}
```

### Proposed new businesses — `data/businesses.json`

```json
{
  "id": "4f71fc6f-afd5-4171-bbb9-d84a2a38fe31",
  "slug": "the-bharatanatyam-kalakshetra",
  "name": "The Bharatanatyam Kalakshetra",
  "description": "Local Indian classical dance school teaching Bharatanatyam, run by Hashwini Shanthakumar.",
  "shortDescription": "Indian classical dance (Bharatanatyam) school, Akuna Vista.",
  "categoryId": "arts-performing-arts",
  "phone": "0490947681",
  "email": "hashwiniskumar@gmail.com",
  "serviceAreas": ["Akuna Vista"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Bharatanatyam", "Indian Classical Dance", "Local"],
  "createdAt": "2026-07-16T00:00:00Z",
  "updatedAt": "2026-07-16T00:00:00Z"
}
```

```json
{
  "id": "954fd972-8c63-49a6-9bf5-751eeeba5521",
  "slug": "fortune8-property-group",
  "name": "Fortune8 Property Group",
  "description": "Local real estate agency specialising in Buying, Selling, Leasing & Building Properties (including Investment Properties) throughout Australia. Verticals: Residential Sales (NSW), Property Management (NSW), House & Land Packages across Australia, and Buyers Agency (e.g. SMSF).",
  "shortDescription": "Real estate: residential sales, property management, H&L packages, buyers agency.",
  "categoryId": "real-estate",
  "serviceAreas": ["Akuna Vista"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Residential Sales", "Property Management", "H&L Packages", "Buyers Agency", "SMSF", "Local"],
  "createdAt": "2026-07-16T00:00:00Z",
  "updatedAt": "2026-07-16T00:00:00Z"
}
```

```json
{
  "id": "fa6fec2b-b4ae-4844-972c-86391e4537fa",
  "slug": "knowledgetree",
  "name": "Knowledgetree",
  "description": "Australia's premier accounting and taxation firm — delivering exceptional solutions for individuals and businesses with integrity, expertise, and care. SMSF specialists. Run by a local Akuna Vista resident; office based in Castle Hill.",
  "shortDescription": "Your financial future, expertly managed. Accounting, tax & SMSF specialists.",
  "categoryId": "accounting-tax",
  "website": "https://www.knowledgetree.com.au",
  "serviceAreas": ["Akuna Vista", "Castle Hill"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["SMSF Specialists", "Accounting", "Taxation", "Local"],
  "createdAt": "2026-07-16T00:00:00Z",
  "updatedAt": "2026-07-16T00:00:00Z"
}
```

Acceptance Criteria

- [x] Both new categories (`arts-performing-arts`, `accounting-tax`) added to `data/categories.json`.
- [x] All 3 business entries above added to `data/businesses.json`.
- [x] `npm run validate:data` passes — no schema violations, no duplicate `id`/`slug`, every
      `categoryId` resolves to a real category.
- [x] Each of the 3 appears on its respective category page (`/category/arts-performing-arts`,
      `/category/real-estate`, `/category/accounting-tax`).
- [x] Existing Playwright suite still passes.
- [x] The 3 gaps flagged above (Bharatanatyam's missing locality, Fortune8's missing contact
      details, Knowledgetree's missing phone/email) are surfaced back to the project owner, not
      silently dropped.

---

## Story 5 (F-006) — unblocked, implemented

As the directory

I want to only list genuinely locally-connected businesses

So that the directory keeps its "recommended by your neighbours" value proposition rather than
becoming a generic Australia-wide business listing site.

### Resolution

Originally held back — the initial submission ("your one-stop shop for all your party equipment
hire needs in North Sydney") gave no indication of a local Akuna Vista connection. The project owner
has since confirmed directly: "Arihant Party is from Scout street and its local" — this supersedes
the "North Sydney" framing from the original marketing blurb (treated as generic template copy, not
an accurate service-area claim). Unblocked and implemented this pass.

### Assumptions / gaps flagged (confirm or correct)

- **No phone, email, or website supplied** — same "worth following up" gap as Fortune8 (F-005) and
  Knowledgetree (F-005). The listing is added with the information given, but currently has no way
  for a visitor to make contact.
- **No suburb/postcode for Scout Street** — same pattern as every other Sprint 15 entry lacking a
  full address: `serviceAreas: ["Akuna Vista"]` used instead of a structured `address` object, with
  the street mentioned in the description text.
- The original North Sydney framing is dropped from the description entirely (superseded by the
  project owner's direct correction), rather than kept alongside the new local framing — flag if
  Arihant actually serves both areas and both should be mentioned.

### Proposed new category — `data/categories.json`

```json
{
  "id": "event-party-hire",
  "slug": "event-party-hire",
  "name": "Event & Party Hire",
  "icon": "PartyPopper",
  "description": "Party and event equipment hire — gazebos, chairs, tables, and lighting.",
  "displayOrder": 16,
  "featured": false
}
```

### Proposed new business — `data/businesses.json`

```json
{
  "id": "99b128c6-7c10-48bc-a040-d918c7c24638",
  "slug": "arihant-party-essentials",
  "name": "Arihant Party Essentials",
  "description": "Local party equipment hire based on Scout Street, Akuna Vista — your one-stop shop for gazebos, chairs, tables, and lighting to make your event unforgettable.",
  "shortDescription": "Local party equipment hire: gazebos, chairs, tables & lighting.",
  "categoryId": "event-party-hire",
  "serviceAreas": ["Akuna Vista"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Party Hire", "Event Equipment", "Local"],
  "createdAt": "2026-07-16T00:00:00Z",
  "updatedAt": "2026-07-16T00:00:00Z"
}
```

Acceptance Criteria

- [x] `event-party-hire` category added to `data/categories.json`.
- [x] Arihant Party Essentials entry added to `data/businesses.json`.
- [x] `npm run validate:data` passes.
- [x] `/category/event-party-hire` and `/business/arihant-party-essentials` render correctly.
- [x] Existing Playwright suite still passes.

---

## Story 6 (F-007)

As a visitor viewing Fortune8 Property Group or Knowledgetree

I want a phone number and a named local contact

So that these listings are actually contactable and read as recommended-by-a-neighbour, not just a
generic Australia-wide business.

### Source data (as supplied by the project owner, verbatim)

"+61 434 515 774 / ~Rishi Ketkar this for Knowledgetree and Mohit Bindal +61 478 005 566 for
Fortune8 Property Group can you include and update them as well please give them all the local
business touch"

### Changes

- **Fortune8 Property Group** (`data/businesses.json`) — `phone: "+61 478 005 566"` added;
  description now opens "Local real estate agency run by Akuna Vista resident Mohit Bindal..."
  (previously didn't name him, despite his name being known from the original F-005 submission).
- **Knowledgetree** (`data/businesses.json`) — `phone: "+61 434 515 774"` added; description now
  reads "...Run by local Akuna Vista resident Rishi Ketkar; office based in Castle Hill." (previously
  "a local Akuna Vista resident" with no name). `"~Rishi Ketkar"` treated as the contact's name with
  the leading `~` dropped, same convention as F-001's `"~Anjul"`.
- Website (Knowledgetree) and email (neither) remain as before — only the phone/named-contact gaps
  flagged after F-005/F-006 are closed here; still no email for either listing.

Acceptance Criteria

- [x] Both entries updated with the phone numbers above.
- [x] Both entries' descriptions name their local contact.
- [x] `npm run validate:data` passes.
- [x] Existing Playwright suite still passes.

---

## Story 7 (F-008)

As a visitor looking at Arihant Party Essentials

I want to see real pricing, real service areas, and real contact details

So that I can actually decide whether to book them, instead of seeing a generic placeholder
description.

### Source data

Real promotional flyer image supplied by the project owner (2026-07-16): "Arihant Party Essentials
— Event Rentals for Every Occasion! Serving Schofields, Marsden Park, The Ponds, Riverstone &
Quakers Hill. Best Prices in Town! Rental Items & Prices: Gazebos $50/day, Chairs $1 each, Tables
$15 each, Pooja Backdrop + Artificial Flower Decorations from $50, Flood Lights $20 each. Perfect
for Parties, Pooja. Pooja Backdrop & Decoration Packages Available. Trusted by many happy customers!
Call/Text: Jay Shah +61 451 237 658, Gunjan Shah +61 406 225 245."

### Changes

- **`description`/`shortDescription`** rewritten from the earlier generic placeholder text to the
  flyer's real content: per-item pricing, the "best prices in town" positioning, and both named
  contacts with their numbers.
- **`serviceAreas`** expanded from the earlier assumed `["Akuna Vista"]` to match the flyer's stated
  coverage — `["Akuna Vista", "Schofields", "Marsden Park", "The Ponds", "Riverstone", "Quakers Hill"]`.
  "Akuna Vista" is kept alongside the flyer's list since the project owner separately confirmed
  (F-006) the business is based on Scout Street, Akuna Vista — the flyer's "serving" list and the
  owner's own home base are two different, compatible facts, not a contradiction.
- **`phone`** added: `"+61 451 237 658"` (Jay Shah). **Assumption flagged:** the flyer lists two
  contacts (Jay Shah, Gunjan Shah) but `Business.phone` is a single string that
  `features/business-details/ContactInfo.tsx:28` uses directly as `tel:${business.phone}` — unlike
  F-001's comma-separated dual-email precedent, cramming two numbers into `phone` here would produce
  a broken `tel:` link, not just an odd-looking one. Jay Shah (listed first on the flyer) was chosen
  as the single structured/clickable `phone`; Gunjan Shah's name and number are preserved in the
  description text instead, so no contact information is lost, but only one is a clickable link.
  Flag if Gunjan Shah should be the primary instead.
- **`images`** replaced: the flyer image itself was supplied, resized/compressed from the original
  1024×1536 PNG (2.9MB) down to a 1200px-wide JPEG (~396KB, matching the size of the existing
  `private-mathematics-english-tutoring.jpg` precedent) and saved to
  `public/images/businesses/arihant-party-essentials.jpg`. `next/image` (used by
  `features/business-details/Gallery.tsx`) still further optimises/resizes at request time; the
  pre-resize was to avoid committing an unnecessarily large source asset.
- **`tags`** updated from generic ("Party Hire", "Event Equipment") to flyer-specific ("Party & Event
  Hire", "Pooja Backdrop & Decorations"), keeping "Local".

Acceptance Criteria

- [x] `description`/`shortDescription` reflect the flyer's real pricing, service areas, and both
      named contacts.
- [x] `serviceAreas` includes both the flyer's stated coverage and Akuna Vista.
- [x] `phone` is a single, valid number that produces a working `tel:` link.
- [x] `images` points at the real flyer image, saved locally at a reasonable file size.
- [x] `npm run validate:data` passes.
- [x] Verified visually: the business detail page renders the new image, description, and a working
      click-to-call phone link.
- [x] Existing Playwright suite still passes.

---

## Story 8 (F-009)

As a resident checking the Community noticeboard

I want to see current, relevant local infrastructure news

So that an announcement about a park upgrade that isn't the most newsworthy item right now doesn't
sit above genuinely major planned works.

### Source data

Real Blacktown City Council project page content, supplied verbatim by the project owner
(2026-07-16): "Aerodrome Drive to Quakers Hill Parkway link road ... Project type: Road construction
... Project value: To be confirmed ... Project schedule: Mid 2027 – 2029 (anticipated) ...
Contractor name: To be confirmed ... Blacktown City Council is planning the construction of a new
link road between Aerodrome Drive and Quakers Hill Parkway in Nirimba Fields... construction of a
new 2.3 kilometre road connecting Aerodrome Drive at Triton Parade to Quakers Hill Parkway... The
project is currently in the design phase... Construction is anticipated to commence in mid-2027...
funded by the NSW Government through the Special Infrastructure Contributions (SIC) program...
Scope of works: new four-lane road (two lanes each direction), a shared user path along the full
corridor, upgrade of the Quakers Hill Parkway intersection including traffic signals, and associated
drainage/road infrastructure works... Contact: Mark Bunch, 0407 006 537,
mark.bunch@blacktown.nsw.gov.au... LAST UPDATED 2 July 2026."

### Changes

- **Removed**: "Schofields Park upgrade underway" (`id: eb5ac6aa-d699-48a3-a4c9-8c7d201c5cc3`),
  per the project owner's explicit "replace X with Y" instruction.
- **Added**: "Aerodrome Drive to Quakers Hill Parkway link road planned" — `title`/`message`
  distilled from the source page down to the noticeboard's established one-paragraph style (matching
  the existing "Townson Road and Burdekin Road upgrades in planning" entry's tone, since this project
  is likewise still in the design/planning phase, not under construction).
- **`publishedAt: "2026-07-16T09:00:00Z"`** — the sort key `announcementRepository.getActiveAnnouncements()`
  uses (`sort by publishedAt desc`, `lib/repositories/announcementRepository.ts:27`) is what actually
  controls display order, not array position. Set to the most recent timestamp of any current
  announcement (later than the previous newest, "Woolworths supermarket proposed", `2026-07-06T09:00:00Z`)
  so this renders first, per the project owner's explicit "keep that as the first item."
- **`priority: "normal"`, `featured: false`, no `expiresAt`** — matches the closest existing precedent,
  "Townson Road and Burdekin Road upgrades in planning" (also NSW-government-funded, multi-km,
  design-phase, no confirmed construction start) rather than the "high priority"/dated-`expiresAt`
  treatment given to announcements about construction already underway.

### Assumptions / gaps flagged (confirm or correct)

- **No `sourceUrl` supplied.** The schema has a dedicated `sourceUrl` field (added Sprint 09b F-004
  specifically so noticeboard items can link back to their real source) and this is clearly a real
  council project page, but no URL was given — only pasted page content. Per this project's
  instruction never to guess/generate URLs, none was added. If the project owner has the actual
  Blacktown City Council project page link, it can be added as a follow-up.
- **Contact details (Mark Bunch, phone, email) and the "388 Quakers Rd" location from the source page
  are not included** — the `Announcement` schema has no fields for a contact person or address (only
  `title`/`message`/dates/`priority`/`featured`/`sourceUrl`), and the noticeboard's existing entries
  never include this level of detail (compare "Railway Terrace..." — contractor is named, but no
  personal contact info). Kept consistent with that existing pattern rather than introducing a new
  level of detail unique to this one entry.
- **Message length**: condensed from the source page's ~10 sections down to one paragraph, matching
  every existing announcement's length — flag if more detail (e.g. the full scope-of-works dot points)
  is wanted instead.

Acceptance Criteria

- [x] "Schofields Park upgrade underway" removed from `data/announcements.json`.
- [x] New announcement added, with `publishedAt` later than every other current entry so it sorts
      first in the Community Noticeboard.
- [x] `npm run validate:data` passes.
- [x] Verified visually: homepage's Community Noticeboard shows the new announcement as the first
      item, and the old Schofields Park entry no longer appears anywhere.
- [x] Existing Playwright suite still passes.

---

## Story 9 (F-010)

As a Dharug resident of Akuna Vista

I want the site's Acknowledgment of Country to name my people specifically

So that the acknowledgment reflects the actual Traditional Owners of the land the estate is built
on, not generic wording chosen only because the nation wasn't yet confirmed.

### Background — reopening a previously deferred decision

Sprint 12 (`sprints/sprint-12-branding-navigation-polish/notes.md`, "Acknowledgment of Country —
wording decision") explicitly considered naming Dharug Country at the time but the project owner
chose general wording instead — "the safer default when the exact Country for the site's
represented area isn't independently verified, since an incorrect attribution is a real, not
cosmetic, error" — and noted that "If a future sprint wants to name Dharug Country specifically,
that should be its own confirmed decision, not inferred from this note." This Story is that
confirmed decision: the project owner stated directly (2026-07-16) "this estate is in blacktown we
are also Dharug people so modify our acknowledgement to reflect that" — self-identifying as Dharug,
which is a materially stronger basis than the unverified inference Sprint 12 declined to act on.

### Changes

- **`components/layout/Footer.tsx`** — `"We acknowledge the Traditional Owners of the land..."` →
  `"We acknowledge the Dharug people as the Traditional Owners of the land..."`. The rest of the
  sentence (community-voice "land on which we work and live" framing, and the standard "pay our
  respects to Elders past, present and emerging" closing) is unchanged — only the specific naming
  was added, per a minimal-diff approach to an already-considered piece of wording.
- **`tests/e2e/homepage.spec.ts:30`** — updated the footer-text assertion from
  `"We acknowledge the Traditional Owners"` to `"We acknowledge the Dharug people"` to match.
- **`.ai/TODO.md`** — the Sprint 12 record of the original "general wording" decision is updated
  (not deleted) to note the 2026-07-16 supersession, so the documented history stays accurate rather
  than silently contradicting the current footer text.

### Regression caught and fixed during implementation

Sprint 14 (F-006) specifically fixed this same sentence to render on one line at ≥768px by removing
its `max-w` constraint, with Acceptance Criteria requiring single-line rendering at desktop/tablet
widths. Adding "Dharug people as the" makes the sentence long enough that it now wraps to 2 lines at
768–1024px (measured directly via a throwaway Playwright script, run from inside the project
directory per the Sprint 12 precedent for this exact kind of check). Tried two shorter phrasings
("as Traditional Owners" without "the"; dropping "our" before "respects") — neither actually fixed
the wrap at 768–1024px, so trimming words bought no layout benefit while making the sentence read
less naturally. Reverted to the full, standard phrasing and accepted the 2-line wrap at 768–1024px,
extending the same reasoning Sprint 14 already applied to mobile ("no font-shrinking hack" to force
one line) — correctly naming the Traditional Owners takes priority over a line-count preference.

Acceptance Criteria

- [x] Footer names the Dharug people as the Traditional Owners.
- [x] `tests/e2e/homepage.spec.ts`'s footer-text assertion updated to match.
- [x] `.ai/TODO.md`'s record of the original wording decision updated to note the supersession.
- [x] No horizontal overflow introduced at any breakpoint (2-line wrap at 768–1024px is vertical,
      not an overflow — verified via the same responsive Playwright coverage
      `tests/e2e/responsive.spec.ts` already runs).
- [x] Existing Playwright suite still passes.

---

## Story 10 (F-011)

As an Akuna Vista resident browsing the homepage Promotions section

I want it to be clear these deals are specifically for AV residents, and to see the two new local
offers (a Knowledgetree SMSF setup deal, a Simran's Detailing discount) instead of promotions that
are no longer wanted in that section

So that the section reflects the actual current, resident-specific offers the project owner wants
surfaced.

### Source data (as supplied by the project owner, verbatim)

1. "Yes, we have just launched a special for AV residents.. SUPER SMSF DEAL! www.knowledgetree.com.au
   Take advantage of old SMSF borrowing rules, which will finish on 10th August 2026. Create your
   SMSF by 10th August for $990 (normally $1650) We will also introduce your SMSF to 2 reputed
   buyers agents and 2 reputed mortgage brokers to build your property portfolio!"
2. "instead of Local promotions make it Akuna Vista Residents only Promotion. and keep Private
   Mathematics & English Tutoring Free Demo Lesson then keep www.knowledgetree.com.au"
3. "then a new advertisement I'm a car detailer on Hornet Street. My business is Simran's Detailing
   Here's the website https://simransdetailing.com.au ... I'm happy to offer 10% off final quotes
   for AV residents only"
4. "remove all others in that section. just keep three of them."

### Decisions confirmed via clarifying questions (this round)

- **New category for Simran's Detailing:** none of the 17 existing categories fit a car detailer.
  Added `automotive-detailing` ("Automotive & Detailing", icon `Car`, `displayOrder: 17`) rather than
  a narrower "Car Detailing" category, so future automotive listings have a home too.
- **Section heading wording:** `"Akuna Vista residents-only promotions"` — sentence case, matching
  every other homepage section heading (`"Featured businesses"`, `"Popular categories"`, `"Community
  spotlight"`), rather than the verbatim `"Akuna Vista Residents Only Promotion"` phrasing.
- **Simran's Detailing promo end date:** the 10% off has no stated deadline, but `Promotion.endDate`
  is required. Set to `2026-10-17` (3 months from today), matching the typical length of other
  open-ended promos already in the data (e.g. the taxi discount runs ~6 months, the lawn-mowing
  discount ~2 months).

### Assumptions / gaps flagged (confirm or correct)

- **Simran's Detailing has no phone or email supplied** — only a website. Same "worth following up"
  gap as Fortune8/Knowledgetree in Story 4 above; the listing is added with the information given.
- **Knowledgetree's promo `startDate`** set to today (2026-07-17, when the offer was supplied)
  through the stated `2026-08-10` deadline. `featured: true` chosen since it's a dated, dollar-figure,
  resident-only deal — this means 2 of the 3 remaining promotions are `featured: true` (Knowledgetree
  and the pre-existing tutoring Free Demo Lesson); `PromotionCard.tsx` shows a "Featured" badge
  per-card with no cap enforced, so this isn't a conflict, just worth noting since earlier sprints'
  data only ever had one `featured: true` promotion at once.
- **Removed promotions** (4, all currently in `data/promotions.json`, none reference AV-resident
  exclusivity): "$10 Off Your First Lawn Mowing Service" (Just Cut Grass), "15% Off for West & North
  Western Sydney Residents" (Windsor Marsden Park Richmond Taxi), "Free Roofing Quote" (Brar Roofing
  Solution), "Free Assessment for Term 2 Enrolment" (Educally). Only the **promotion** entries are
  removed — the underlying business listings themselves stay in `data/businesses.json` and remain
  browsable via category pages / search, just no longer promoted on the homepage section.
- **Existing "Free Demo Lesson" promotion (Private Mathematics & English Tutoring) is unchanged** —
  kept exactly as-is, per "keep Private Mathematics & English Tutoring Free Demo Lesson."
- **Section subtitle** (`"Current deals from businesses in the directory."`, directly under the
  heading) is left unchanged — only the heading rename was requested.

### Proposed new category — `data/categories.json`

```json
{
  "id": "automotive-detailing",
  "slug": "automotive-detailing",
  "name": "Automotive & Detailing",
  "icon": "Car",
  "description": "Car detailing, cleaning, and other automotive services.",
  "displayOrder": 17,
  "featured": false
}
```

### Proposed new business — `data/businesses.json`

```json
{
  "id": "f911829f-e952-4dc3-95d6-00ed9e6492ee",
  "slug": "simrans-detailing",
  "name": "Simran's Detailing",
  "description": "Local car detailing service based on Hornet Street, Akuna Vista.",
  "shortDescription": "Local car detailing, Hornet Street, Akuna Vista.",
  "categoryId": "automotive-detailing",
  "website": "https://simransdetailing.com.au",
  "serviceAreas": ["Akuna Vista"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Car Detailing", "Local"],
  "createdAt": "2026-07-17T00:00:00Z",
  "updatedAt": "2026-07-17T00:00:00Z"
}
```

### Proposed new promotions — `data/promotions.json`

```json
{
  "id": "8eee89d6-509f-4178-b67f-36a55c0e3a1d",
  "businessId": "fa6fec2b-b4ae-4844-972c-86391e4537fa",
  "title": "Super SMSF Deal — AV Residents Only",
  "description": "Take advantage of the old SMSF borrowing rules before they end on 10 August 2026. Create your SMSF by 10 August for $990 (normally $1,650) — Akuna Vista residents only. Knowledgetree will also introduce you to 2 reputed buyers agents and 2 reputed mortgage brokers to help build your property portfolio.",
  "startDate": "2026-07-17",
  "endDate": "2026-08-10",
  "featured": true
}
```

```json
{
  "id": "5dfb8c60-568f-4527-bc37-a7aff7f01561",
  "businessId": "f911829f-e952-4dc3-95d6-00ed9e6492ee",
  "title": "10% Off Final Quotes — AV Residents Only",
  "description": "Simran's Detailing offers 10% off final quotes for Akuna Vista residents.",
  "startDate": "2026-07-17",
  "endDate": "2026-10-17",
  "featured": false
}
```

### Promotions removed from `data/promotions.json`

- `e7c3c9bd-321e-4700-83fd-2016139b7fe4` — "$10 Off Your First Lawn Mowing Service"
- `d22b7763-3aaf-4bda-bfb7-e3d21153c250` — "15% Off for West & North Western Sydney Residents"
- `d45dd677-2dd6-47ec-be2e-6fe16544808a` — "Free Roofing Quote"
- `eee704c4-6bf2-4bb9-821e-26f25b4a068e` — "Free Assessment for Term 2 Enrolment"

### Code changes

- **`features/community/Promotions.tsx`** — heading text `"Local promotions"` →
  `"Akuna Vista residents-only promotions"`.
- **`tests/pages/HomePage.ts`** — `promotionsHeading` locator's `name` updated to match.
- **`tests/e2e/homepage.spec.ts`** — the `sectionOrder[0]` assertion string updated to match.

Acceptance Criteria

- [x] `automotive-detailing` category added to `data/categories.json`.
- [x] Simran's Detailing added to `data/businesses.json`.
- [x] Knowledgetree SMSF and Simran's Detailing promotions added to `data/promotions.json`; the 4
      listed promotions removed; the tutoring Free Demo Lesson promotion left untouched — exactly 3
      promotions remain in the file.
- [x] Promotions section heading reads "Akuna Vista residents-only promotions" on the homepage.
- [x] `npm run validate:data` passes.
- [x] `/category/automotive-detailing` and `/business/simrans-detailing` render correctly.
- [x] Homepage Promotions section shows exactly 3 cards: tutoring, Knowledgetree, Simran's Detailing.
- [x] Existing Playwright suite still passes (with the 2 test-file locator/assertion updates above).

---

# Dependencies

- F-002 must be added before F-003 (F-003's `categoryId` must resolve to F-002's category, or
  `validate:data`'s referential integrity check fails).
- Otherwise none — `jp-services` and the new `finance-mortgage-broking` categories, plus the
  `Business` schema, already support everything needed (`serviceAreas`, `featured`, optional
  `address`); no schema change required.

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| Comma-separated dual email in the single `email` field may render oddly if any UI treats it as a single mailto: link | Low | Confirmed acceptable by project owner; revisit as a dedicated `emails: string[]` schema change if it becomes a recurring pattern across future entries |
| Authored description/tags text doesn't verbatim match the project owner's intent | Low | Flagged explicitly above for confirmation before implementation |
| Duplicate JP/Finance listings for Ethiquity can drift out of sync (e.g. phone changes in one but not the other) since they're two independent records | Medium | Accepted tradeoff of the "duplicate listing" approach, confirmed by project owner; if this becomes a recurring pattern for future multi-category businesses, revisit as a `categoryIds: string[]` schema change instead |
| New `finance-mortgage-broking` category launches with only 1 business in it | Low | Acceptable for a real, project-owner-supplied listing; category page still renders correctly with a single result |

---

# Documentation Required

Before starting this sprint read:

- `.ai/CLAUDE.md`
- `.ai/JSON_SCHEMA.md`

---

# Next Steps

F-001–F-003 implemented and verified (2026-07-16):

- `finance-mortgage-broking` category added to `data/categories.json` (`displayOrder: 13`).
- 4 business entries added to `data/businesses.json`: the 3 JP listings (F-001) plus Ethiquity's
  duplicate finance listing (F-003).
- `npm run validate:data` — passes, no schema/referential-integrity errors.
- `npx playwright test` — 281 passed, 1 failed then passed on isolated rerun (flaky
  `community-pages.spec.ts` Firefox footer-link test, confirmed unrelated to this change — 6/6
  green when rerun alone), 16 skipped. No regression from the new data.
- Manually verified via a temporary local dev server: `/category/finance-mortgage-broking`,
  `/business/ethiquity-mortgage-services-finance`, and `/business/anjul-jp` all return 200; the
  finance category page renders "Ethiquity Mortgage Services"; the homepage renders "Local Justice
  of the Peace" text; `Landmark` confirmed as a real `lucide-react` export (won't fall back to the
  `Store` icon).

F-011 implemented and verified (2026-07-17):

- `automotive-detailing` category added to `data/categories.json` (`displayOrder: 17`).
- Simran's Detailing added to `data/businesses.json`.
- `data/promotions.json` rewritten: 4 promotions removed (lawn mowing, taxi, roofing, Educally),
  2 added (Knowledgetree SMSF deal, Simran's Detailing 10% off); tutoring's Free Demo Lesson kept
  unchanged — exactly 3 entries remain.
- `features/community/Promotions.tsx` heading changed to "Akuna Vista residents-only promotions";
  `tests/pages/HomePage.ts` locator and `tests/e2e/homepage.spec.ts`'s section-order assertion (plus
  its explanatory comment) updated to match.
- `npm run validate:data` — passes, no schema/referential-integrity errors.
- `npx playwright test` — 281 passed, 16 skipped, 0 failed.
- Manually verified via a temporary local dev server: `/`, `/business/simrans-detailing`, and
  `/category/automotive-detailing` all return 200; the homepage HTML confirms the new heading text
  and all 3 promotion cards (Free Demo Lesson, Super SMSF Deal — AV Residents Only, 10% Off Final
  Quotes — AV Residents Only) render with their correct descriptions.

Still open for future data-entry Features in this ongoing sprint (F-012...) as more listings arrive.
