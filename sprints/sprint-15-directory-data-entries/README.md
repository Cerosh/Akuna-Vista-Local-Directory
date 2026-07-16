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

Add real-world business/service data supplied directly by the project owner to `data/businesses.json`,
validated against the existing schema (`scripts/lib/validation.ts`, `.ai/JSON_SCHEMA.md`) and
existing category set (`data/categories.json`) — no new categories, components, or schema fields
introduced unless a Feature explicitly calls for one.

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
| F-006 | Arihant Party Essentials (North Sydney party/event hire) — deferred, blocked on confirming a local Akuna Vista connection | Low | Blocked |

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

## Story 5 (F-006) — deferred, blocked

As the directory

I want to only list genuinely locally-connected businesses

So that the directory keeps its "recommended by your neighbours" value proposition rather than
becoming a generic Australia-wide business listing site.

### Why this is blocked

"Arihant Party Essentials, your one-stop shop for all your party equipment hire needs in North
Sydney" — unlike the other 3 submissions in this Story, nothing indicates a local Akuna Vista
connection (no resident endorsement, no local service area, no owner residency). North Sydney is a
genuinely distant, unrelated suburb. Per the project owner's explicit answer to a clarifying
question this round, this listing is **held back** pending a local connection — not added, not
rejected outright.

Acceptance Criteria (for when this is picked up)

- [ ] Follow up with the Arihant Party Essentials submitter to establish a local connection (do they
      service Akuna Vista/Nirimba Fields? Were they recommended by a resident?).
- [ ] If confirmed local: create the `event-party-hire` category (icon `PartyPopper`) and add the
      listing, following the same pattern as F-004/F-005.
- [ ] If no local connection can be established: explicitly decide with the project owner whether to
      reject the submission or broaden the directory's scope, rather than leaving it in limbo.

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

Still open for future data-entry Features in this ongoing sprint (F-004, F-005...) as more listings
arrive.
