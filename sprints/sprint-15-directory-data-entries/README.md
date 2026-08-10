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
| F-012 | Add new business "Capital Hub" (mortgage broker, Firefly Street) to the existing Finance & Mortgage Broking category, plus a "Free Consultancy — AV Residents Only" promotion | Medium | Completed |
| F-013 | Add new "Arts & Crafts" category and new business "Pankhuri's Artistry Avenue" (handmade art/décor/gifts, Akuna Vista resident), with logo image | Medium | Completed |
| F-014 | Update Simran's Detailing promotion to "Mention AV10 to receive 10% off Paint Protection Packages — AV Residents Only"; add phone number and name contact Manisha | Low | Completed |
| F-015 | Remove `featured` from Knowledgetree's "Super SMSF Deal — AV Residents Only" promotion | Low | Completed |
| F-016 | Add new business "SAVAA Properties" (real estate, Phantom Street) to existing Real Estate category | Low | Completed |
| F-017 | Add new "Migration & Visa Services" category and new business "Elite Australia Immigration" (Valiant Street), with logo image | Low | Completed |
| F-018 | Update Simran's Detailing phone number from +61 410 094 574 to +61 411 913 251 | Low | Completed |
| F-019 | Add new "Digital Marketing" category and new business "Solution Savvy" (digital marketing agency, Seagull Street, Schofields) | Medium | Completed |
| F-020 | Add "FREE 1 Month SEO + AEO + GEO" promotion for Solution Savvy — AV residents only, featured, 2026-07-30 to 2026-10-30 | Medium | Completed |
| F-021 | Replace Solution Savvy's placeholder image with its real logo, composited onto a dark background tile | Low | Completed |
| F-022 | Add new "Security & Home Automation" category and new business "Danish" (CCTV, alarms, intercom, home theatre, home automation, 17 Mariner Avenue, Schofields) | Medium | Completed |
| F-023 | Add new "Builders & Construction" category and new business "Accura Homes" (custom homes, duplexes, knockdown rebuilds, Bella Vista, local connection via Nabthorpe Parade) | Medium | Completed |
| F-024 | Remove "Just Cut Grass" and "Arshdeep Landscaping" (no longer in business) and remove the now-empty "Landscaping & Gardening" category | Medium | Completed |
| F-025 | Add new business "iConsult Mortgage Solutions" (mortgage broker, Bhavna Dada, Nirimba Fields) to the existing Finance & Mortgage Broking category | Medium | Completed |
| F-026 | Remove the ACL/Credit Representative parenthetical from iConsult Mortgage Solutions' description, per Bhavna's request | Low | Completed |
| F-027 | Add new business "Sydpro Electrical" (solar/battery/EV charger installer, Jomon Joseph) to the existing Electrical category | Medium | Completed |
| F-028 | Add new business "Best and Less Arvil" (blinds/curtains supply & install) to the existing Furniture & Homewares category | Low | Completed |
| F-029 | Add new "Food & Catering" category and 6 businesses advertised in the Akuna Vista WhatsApp group (Shobhit's Fresh Malai Paneer, Arpita's Homemade Snacks, Krishna Barot's Methi Thepla, Priyanka's Idly & Dosa Batter, Pooja Mehta's Mumbai Vada Pav, Surti House) | Medium | Completed |
| F-030 | Add new business "Tutehub Schofields" to the existing Tutoring & Education category | Low | Completed |
| F-031 | Add new business "HA Sydney Airport & Cruise Terminal Transfers" to the existing Taxi & Transport category | Low | Completed |
| F-032 | Re-add the "Landscaping & Gardening" category (removed in F-024) with 5 businesses recommended in the WhatsApp thread that prompted F-024's removal | Medium | Completed |
| F-033 | Add new "Tailoring & Alterations" category and new business "KS Webwear" (Sindhu Telugubadi, blouse pieces, resizing, saree fall stitching, custom printed t-shirts, Tallawong) | Medium | Completed |
| F-034 | Add new "Florists & Flower Delivery" category and new business "Uma Garlands" (fresh flower garlands & floral jewellery, Nirimba Fields) | Medium | Completed |
| F-035 | Rename business `ethiquity-mortgage-services-jp` (Featured, JP Services) from "JP – Ethiquity Mortgage Services" to "Jan Nayak Singh – JP, Mortgage Broker", per Jan's request (revised twice 2026-08-05: first to "Ethiquity Mortgage Services – Jan Nayak Singh", then reordered to "Jan Nayak Singh – Ethiquity Mortgage Services", then finally dropped the "Ethiquity Mortgage Services" trading name in favour of "JP, Mortgage Broker" — 37 chars. Verified visually this still clips on the directory card's `line-clamp-1` title, cutting off "Broker" — the actual safe threshold for a *Featured* card turned out to be ~24 chars, not the ~45-char figure that held for non-Featured cards, since the Featured badge narrows the available title width. Project owner reviewed a shorter alternative ("Jan Nayak Singh (JP)", 20 chars, fits fully) and explicitly chose to keep the current text and accept the clipping instead) | Low | Completed |
| F-036 | Add new "Handyman" category and 3 businesses sourced from phone-contact screenshots the project owner shared after residents asked for a handyman recommendation: "Craig Handyman" (+61 401 476 114), "Rajiv Dhiman Handyman" (+61 421 248 961), "Kumar Handyman Services" (+61 430 025 092) | Medium | Completed |
| F-037 | *(Retroactively captured 2026-08-06 — see note below)* Add new "Travel & Tourism" category, "King of Tours" (Taxi & Transport), and "Travel Crafters" (Travel & Tourism) | Medium | Completed |
| F-038 | Add new "Medical & Health" category and 10 businesses sourced from a WhatsApp group thread about an urgent child fever: Our Medical Marsden Park, Our Medical Kellyville, Doonside Medical Centre, Rouse Hill Urgent Care Clinic, Swift Emergency Care, WiSE Specialist Emergency, Mount Druitt Hospital Emergency, Westmead Hospital Emergency, 13cure After-Hours Home Doctor, and Castle Medical Marsden Park | Medium | Completed |
| F-039 | Add new "Plumbing" category and 4 businesses recommended by the Akuna Vista community: Allan Plumber, Campbell Plumber, Glenn Plumber (phone-contact screenshots), and Big Red Plumbing Services (bigredplumbingservices.com.au) | Medium | Completed |
| F-040 | Add new "Kids' Classes & Activities" category and 2 businesses sourced from a WhatsApp thread asking for karate/boxing recommendations for kids under 10: GKR Karate (3 independent endorsements — Rouse Hill Prime, also servicing Blacktown, Glendenning, Riverstone) and Kang's Taekwondo Australia (1 endorsement — Rouse Hill HQ). Contact details, addresses, and reviews backfilled via web research since the thread itself only named the businesses | Medium | Completed |
| F-041 | Update GKR Karate's primary contact location from Rouse Hill Prime to Riverstone Prime (14 Melbourne Road, Riverstone), per a follow-up community comment that many Akuna Vista kids attend the Riverstone dojo specifically | Low | Completed |

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

## Story 11 (F-012)

As an Akuna Vista resident looking to buy or refinance a home loan

I want to find Capital Hub, a local mortgage broker, in the directory with a way to get free
consultancy as an AV resident

So that I have another local finance option, alongside the existing Ethiquity Mortgage Services
listing (Story 4/F-003).

### Source data (as supplied by the project owner, verbatim)

"AV local mortgage broker ,Capital Hub, Firefly street,https://www.capitalhub.au/Ph - 0433670434 /
0451815822 / 02 8631 6429,Looking to buy or refinance your home loan? Get free help from an Capital
Hub* any offers for av residence:free consultancy please add this."

### Decisions — PROPOSED, awaiting project owner confirmation before implementation

- **Category:** existing `finance-mortgage-broking` — no new category needed, matching Ethiquity
  Mortgage Services (Story 4/F-003).
- **Address:** only "Firefly Street" supplied, no suburb/state/postcode — following the Simran's
  Detailing precedent (Story 10/F-011), no formal `address` object; the street is named in
  `description` instead, with `serviceAreas: ["Akuna Vista"]`.
- **Phone:** three numbers supplied with no indication of which is primary — following the
  Ethiquity dual-email precedent (Story 4/F-003, comma-separated in a single field), all three
  combined into the single `phone` string field, separated by " / ":
  `"0433 670 434 / 0451 815 822 / 02 8631 6429"`.
- **Promotion:** "free consultancy" for AV residents → new promotion "Free Consultancy — AV
  Residents Only", linked to the new business, following the resident-only promotion pattern from
  Story 10/F-011.
- **Promotion `endDate`:** no deadline stated — following the Simran's Detailing precedent, set 3
  months from today (2026-07-19 → 2026-10-19).
- **`featured`:** `false` for both the business and the promotion — no stated reason to feature
  this over other unfeatured listings (unlike Knowledgetree's dated, dollar-figure deal).

### Assumptions / gaps flagged (confirm or correct)

- Business name taken as "Capital Hub" — the trailing "*" in "Capital Hub*" and the merged
  "https://www.capitalhub.au/Ph -" text look like copy/paste artifacts, not intended content.
- No suburb/state/postcode for Firefly Street supplied — if available, a full `address` object can
  be added instead of just naming the street in the description.
- No email address supplied — left unset.

### Proposed new business — `data/businesses.json`

```json
{
  "id": "bbd5c287-20ac-46d5-87a2-1b33b89a6971",
  "slug": "capital-hub",
  "name": "Capital Hub",
  "description": "Looking to buy or refinance your home loan? Get free help from Capital Hub, a local mortgage broker based on Firefly Street, Akuna Vista.",
  "shortDescription": "Local mortgage broker, Firefly Street, Akuna Vista.",
  "categoryId": "finance-mortgage-broking",
  "phone": "0433 670 434 / 0451 815 822 / 02 8631 6429",
  "website": "https://www.capitalhub.au/",
  "serviceAreas": ["Akuna Vista"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Mortgage Broker", "Home Loans", "Local"],
  "createdAt": "2026-07-19T00:00:00Z",
  "updatedAt": "2026-07-19T00:00:00Z"
}
```

### Proposed new promotion — `data/promotions.json`

```json
{
  "id": "bca7ec92-faa2-4e8c-ae22-098b4dfba323",
  "businessId": "bbd5c287-20ac-46d5-87a2-1b33b89a6971",
  "title": "Free Consultancy — AV Residents Only",
  "description": "Capital Hub offers a free consultancy for Akuna Vista residents looking to buy or refinance their home loan.",
  "startDate": "2026-07-19",
  "endDate": "2026-10-19",
  "featured": false
}
```

Acceptance Criteria

- [x] Capital Hub added to `data/businesses.json` under `finance-mortgage-broking`.
- [x] "Free Consultancy — AV Residents Only" promotion added to `data/promotions.json`, linked to
      Capital Hub.
- [x] `npm run validate:data` passes.
- [x] `/business/capital-hub` renders correctly (verified 200 + "Capital Hub" text via a temporary
      local dev server).
- [x] Homepage "Akuna Vista residents-only promotions" section includes the new Capital Hub
      promotion card (4th card — no test asserts a fixed card count, confirmed by inspecting
      `tests/e2e/homepage.spec.ts` and `tests/pages/HomePage.ts`; "Free Consultancy" text confirmed
      present on `/`).
- [x] Existing Playwright suite still passes — no new regressions. 271 passed, 16 skipped, 10 failed,
      all `[firefox]`, all a pre-existing "no console errors" CSP `unsafe-eval` failure
      (`next dev`'s HMR runtime tripping the strict CSP in Firefox specifically) confirmed present
      on `main` before this change too (re-ran the same failing test after `git stash`ing F-012's
      changes) — unrelated to this Feature, not a new regression.

---

## Story 12 (F-013)

As a visitor interested in handmade art, resin art, or personalized home décor/gifts

I want to find a local artist/maker in the directory

So that I can discover and support a small, locally-based creative business (Pankhuri's Artistry
Avenue) instead of only generic retail options.

### Source data (as supplied by the project owner, verbatim)

"Exploring the intersection of art and imagination. Capturing moments of wonder and color. I create
handcrafted home décor, personalized gifts, and unique art pieces made with love and attention to
detail. From resin art and wooden name plates to Lippan art, MDF décor, festive creations, and
custom gifts, every piece is carefully designed to add beauty to your space. Whether you're looking
for a thoughtful gift, elegant home décor, or a personalized keepsake, I'm here to bring your ideas
to life with creativity and craftsmanship. Thank you for supporting small business. Business name -
Pankhuri's Artistry Avenue / Contact Number - +61469714644 / Instagram handle -
https://www.instagram.com/pankhuri_artistry_avenue8" — plus a circular logo image (dark
background, rose-gold "A" monogram and floral line art, "Pankhuri's Artistry Avenue" text).

### Decisions confirmed by project owner (this round, via clarifying questions)

- **New category: `arts-crafts`** ("Arts & Craft s", icon `Palette`) — none of the 17 existing
  categories fit a handmade-art/resin-art/home-décor/gifts business (closest, `arts-performing-arts`,
  is for dance/music instruction, not craft/product businesses; `furniture-homewares` is general
  retail homewares, not handmade art). Rejected reusing either.
- **Local connection:** confirmed directly by project owner — "Yes local and Lives in Akuna Vista"
  — so unlike the Bharatanatyam/Fortune8 precedent (silent-on-locality, only assumed),
  `serviceAreas: ["Akuna Vista"]` here is a confirmed fact, not an assumption.
- **`featured: false`** — confirmed by project owner, matching the default for most recent additions
  (Simran's Detailing, Capital Hub) rather than being featured.

### Assumptions / gaps flagged (confirm or correct)

- **No street address, email, or website supplied** — only a phone number and an Instagram handle.
  `socialLinks.instagram` (existing schema field, `types/business.ts`) is used for the Instagram URL;
  no `address`/`email`/`website` fields are set.
- **Logo image usage:** the supplied circular logo (dark background, rose-gold monogram/floral
  design) is used as the listing's card/gallery image (`images[0]`), per the project owner's explicit
  request ("add this logo as the card image"). This differs from the Arihant Party Essentials
  precedent (a real product/pricing flyer used as the image) — here the source image is a brand logo,
  not a photo of work/products, which is what's available.
- **Image processing:** source PNG (1324×1102, fully opaque despite RGBA mode — no real transparency)
  resized/converted to a ~1200px-wide JPEG and saved to
  `public/images/businesses/pankhuris-artistry-avenue.jpg`, matching the size/format precedent set by
  the Arihant flyer and tutoring images.
- **Description text** is condensed from the project owner's supplied paragraph (verbatim brand
  copy) rather than rewritten, since it already reads as natural business-facing description text
  (unlike raw flyer/text-message data in earlier stories that needed authoring).

### Proposed new category — `data/categories.json`

```json
{
  "id": "arts-crafts",
  "slug": "arts-crafts",
  "name": "Arts & Crafts",
  "icon": "Palette",
  "description": "Handmade art, resin art, home décor, and personalized gifts from local makers.",
  "displayOrder": 18,
  "featured": false
}
```

### Proposed new business — `data/businesses.json`

```json
{
  "id": "f33752d6-ebc8-4df5-b835-95b854c9a7c1",
  "slug": "pankhuris-artistry-avenue",
  "name": "Pankhuri's Artistry Avenue",
  "description": "Exploring the intersection of art and imagination — capturing moments of wonder and colour. Local Akuna Vista artist creating handcrafted home décor, personalized gifts, and unique art pieces. From resin art and wooden name plates to Lippan art, MDF décor, festive creations, and custom gifts, every piece is carefully designed to add beauty to your space.",
  "shortDescription": "Local handmade art, resin art & personalized gifts, Akuna Vista.",
  "categoryId": "arts-crafts",
  "phone": "+61 469 714 644",
  "serviceAreas": ["Akuna Vista"],
  "socialLinks": {
    "instagram": "https://www.instagram.com/pankhuri_artistry_avenue8"
  },
  "images": ["/images/businesses/pankhuris-artistry-avenue.jpg"],
  "featured": false,
  "verified": false,
  "tags": ["Resin Art", "Handmade Gifts", "Home Décor", "Local"],
  "createdAt": "2026-07-21T00:00:00Z",
  "updatedAt": "2026-07-21T00:00:00Z"
}
```

Acceptance Criteria

- [x] `arts-crafts` category added to `data/categories.json`.
- [x] Pankhuri's Artistry Avenue added to `data/businesses.json` with the supplied logo as its
      `images[0]`.
- [x] `npm run validate:data` passes — no schema violations, no duplicate `id`/`slug`, `categoryId`
      resolves to the new category.
- [x] `/category/arts-crafts` and `/business/pankhuris-artistry-avenue` render correctly, including
      the logo image (verified 200 + "Pankhuri's Artistry Avenue" text + logo filename present, via
      a temporary local dev server).
- [x] Existing Playwright suite still passes — 271 passed, 16 skipped, 10 failed, all `[firefox]`,
      all the same pre-existing "no console errors" CSP `unsafe-eval` failure documented in F-012
      (unrelated to this change, not a new regression).

---

## Story 13 (F-014)

As a visitor viewing Simran's Detailing

I want to see the current, correct promotion offer and have a phone number and named contact

So that I know exactly what the AV-resident discount applies to and can actually reach the business.

### Source data (as supplied by the project owner, verbatim)

"update this business offer https://akuna-vista-local-directory.vercel.app/business/simrans-detailing
to 'Mention AV10 to receive 10% off Paint Protection Packages' also include a phone number
+61 410 094 574 and contact Manisha" — plus a follow-up confirming the new offer title should also
carry the existing "— AV Residents Only" suffix convention used by this promotion and others in the
same homepage section (Story 10/F-011, Story 11/F-012).

### Changes

- **`data/promotions.json`** (id `5dfb8c60-568f-4527-bc37-a7aff7f01561`) — `title` changed from
  "10% Off Final Quotes — AV Residents Only" to "Mention AV10 to receive 10% off Paint Protection
  Packages — AV Residents Only"; `description` rewritten to match. `startDate`/`endDate` left
  unchanged (`2026-07-17` – `2026-10-17`) — no new deadline was supplied.
- **`data/businesses.json`** (`simrans-detailing`) — `phone: "+61 410 094 574"` added; `description`
  updated to name Manisha as the contact, following the existing "run by [name]" precedent
  (Fortune8/Knowledgetree, Story 6/F-007; Bharatanatyam, Story 4/F-005).

### Assumptions flagged (confirm or correct)

- No email supplied — left unset, same gap as originally flagged in Story 10/F-011.
- Only the promotion's `title`/`description` change; its offer now covers "Paint Protection
  Packages" specifically rather than "final quotes" generally — treated as the project owner
  replacing the old offer, not adding a second one.

### Acceptance Criteria

- [x] Promotion title/description updated as above.
- [x] Business phone and contact name added as above.
- [x] `npm run validate:data` passes.
- [x] `/business/simrans-detailing` renders the new phone, contact, and offer text.
- [x] Existing Playwright suite still passes.

---

## Story 14 (F-015)

As the project owner viewing the Knowledgetree business page / homepage promotions section

I want the "Super SMSF Deal — AV Residents Only" promotion no longer marked as featured

So that it no longer shows a "Featured" badge on the homepage's promotions section.

### Clarification (confirmed via clarifying question this round)

The request referenced `/business/knowledgetree`, but Knowledgetree's own `Business.featured` field
was already `false` (no "Featured" badge exists on the business detail page itself — confirmed by
checking both the local data and the live production page). The only `featured: true` anywhere tied
to Knowledgetree is its promotion (`data/promotions.json`, id `8eee89d6-509f-4178-b67f-36a55c0e3a1d`),
which is what renders a "Featured" badge on the homepage's "Akuna Vista residents-only promotions"
section (`PromotionCard.tsx:37`). Confirmed this is the intended target before editing.

### Change

- `data/promotions.json` — Knowledgetree's "Super SMSF Deal — AV Residents Only" promotion:
  `featured: true` → `featured: false`.

### Acceptance Criteria

- [x] Promotion's `featured` field set to `false`.
- [x] `npm run validate:data` passes.
- [x] Homepage promotions section no longer shows a "Featured" badge on the Knowledgetree card.
- [x] Existing Playwright suite still passes.

---

## Story 15 (F-016)

As a visitor looking for a local real estate agent

I want to find SAVAA Properties in the directory

So that I have another local option alongside the existing Fortune8 Property Group listing.

### Source data (as supplied by the project owner, verbatim)

"hantom St / Real Estate - SAVAA Properties / BUY | SELL | LEASE | INVEST / ROHAN BAROT /
0406 700 777" — plus a follow-up supplying the website `https://savaaproperties.com.au/`.

### Clarification (confirmed via clarifying question this round)

The street name was supplied as "hantom St" — clearly missing a leading letter from a paste
artifact. Confirmed by the project owner as **Phantom St**.

### Change — `data/businesses.json`

```json
{
  "id": "2b397f2f-cdf7-4af3-bee6-a88d84ea49d7",
  "slug": "savaa-properties",
  "name": "SAVAA Properties",
  "description": "Local real estate agency run by Rohan Barot, based on Phantom Street, Akuna Vista, offering buying, selling, leasing, and investment services.",
  "shortDescription": "Local real estate: buy, sell, lease, invest. Phantom Street, Akuna Vista.",
  "categoryId": "real-estate",
  "phone": "0406 700 777",
  "website": "https://savaaproperties.com.au/",
  "serviceAreas": ["Akuna Vista"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Real Estate", "Buy", "Sell", "Lease", "Invest", "Local"],
  "createdAt": "2026-07-23T00:00:00Z",
  "updatedAt": "2026-07-23T00:00:00Z"
}
```

- Existing `real-estate` category reused — no new category needed (matches Fortune8 Property Group
  precedent, Sprint 15 Story 4).
- No email supplied — left unset.
- **No promotion created** — the project owner explicitly confirmed no offer was supplied for this
  business, unlike the resident-only-promo pattern used elsewhere in this sprint.

### Acceptance Criteria

- [x] SAVAA Properties added to `data/businesses.json` under `real-estate`, with the confirmed
      website link.
- [x] `npm run validate:data` passes.
- [x] `/business/savaa-properties` renders correctly.
- [x] Existing Playwright suite still passes.

---

## Story 16 (F-017)

As a visitor needing migration/visa advice

I want to find a registered migration agent in the directory

So that I can discover a local, MARN-registered agent instead of searching generically.

### Source data (as supplied by the project owner, verbatim)

"Valiant Street. Our business name is Elite Australia Immigration. Website is under construction!
Elite Australia Immigration — Trusted, personalised migration advice from a MARN-registered agent
(MARN: 2519015, Giriraj Joshi). We specialise in Parent Visas, Tourist Visas, Student Visas,
Employer Sponsored Visas, and Permanent Visas — guiding you through every step with accuracy and
care. Free initial consultation for Akuna Vista residents, plus special discounts on professional
fees. 📞 0469 351 259 ✉️ office@eliteaustraliaimmigration.com.au" — plus a supplied logo image
(circular-cropped globe-and-arrow mark, "ELITE AUSTRALIA IMMIGRATION" text).

### Decisions and assumptions

- **New category: `migration-visa-services`** ("Migration & Visa Services", icon `PlaneTakeoff`,
  `displayOrder: 19`) — none of the 18 existing categories fit a migration agent; closest,
  `jp-services`, is a different kind of professional service. Icon verified as a real
  `lucide-react` export before use (won't fall back to the `Store` icon).
- **No `website`** — explicitly stated as "under construction," so omitted rather than left as a
  dead/placeholder link, consistent with never fabricating a URL.
- **Logo image**: supplied file was small (150×150px, ~3.5KB) — used as-is at `images[0]` rather
  than upscaled, since upscaling wouldn't add real detail; saved to
  `public/images/businesses/elite-australia-immigration.jpg`. Flag if a higher-resolution version
  becomes available later.
- **"Free initial consultation... discounts" is kept in the business description text** (it's real,
  factual content about the business) **but does not get a separate homepage Promotion entry** —
  the project owner explicitly confirmed neither this nor SAVAA Properties supplied a promotable
  offer in the sense used elsewhere in this sprint (dated, resident-only deals like Simran's
  Detailing or Capital Hub).

### Change — `data/categories.json`

```json
{
  "id": "migration-visa-services",
  "slug": "migration-visa-services",
  "name": "Migration & Visa Services",
  "icon": "PlaneTakeoff",
  "description": "Registered migration agents helping with visas, permanent residency, and immigration advice.",
  "displayOrder": 19,
  "featured": false
}
```

### Change — `data/businesses.json`

```json
{
  "id": "343afecc-fc86-4d73-be6e-b65420b80799",
  "slug": "elite-australia-immigration",
  "name": "Elite Australia Immigration",
  "description": "Trusted, personalised migration advice from a MARN-registered agent (MARN: 2519015), Giriraj Joshi, based on Valiant Street, Akuna Vista. Specialising in Parent Visas, Tourist Visas, Student Visas, Employer Sponsored Visas, and Permanent Visas — guiding you through every step with accuracy and care. Free initial consultation for Akuna Vista residents, plus special discounts on professional fees.",
  "shortDescription": "MARN-registered migration agent: parent, tourist, student, employer & permanent visas.",
  "categoryId": "migration-visa-services",
  "phone": "0469 351 259",
  "email": "office@eliteaustraliaimmigration.com.au",
  "serviceAreas": ["Akuna Vista"],
  "images": ["/images/businesses/elite-australia-immigration.jpg"],
  "featured": false,
  "verified": false,
  "tags": ["Migration Agent", "Visa Services", "MARN Registered", "Local"],
  "createdAt": "2026-07-23T00:00:00Z",
  "updatedAt": "2026-07-23T00:00:00Z"
}
```

### Acceptance Criteria

- [x] `migration-visa-services` category added to `data/categories.json`.
- [x] Elite Australia Immigration added to `data/businesses.json` with the supplied logo as
      `images[0]`, no `website` field.
- [x] `npm run validate:data` passes.
- [x] `/category/migration-visa-services` and `/business/elite-australia-immigration` render
      correctly, including the logo image.
- [x] No promotion entry created for either F-016 or F-017.
- [x] Existing Playwright suite still passes.

---

## Story 17 (F-018)

As the project owner

I want Simran's Detailing's phone number updated

So that the listing shows the correct, current contact number.

### Change — `data/businesses.json`

- `simrans-detailing`'s `phone` changed from `+61 410 094 574` to `+61 411 913 251`. No other field
  touched.

### Acceptance Criteria

- [x] `phone` updated as above.
- [x] `npm run validate:data` passes.
- [x] `/business/simrans-detailing` renders the new phone number.
- [x] Existing Playwright suite still passes.

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

F-014 implemented and verified (2026-07-22):

- `data/promotions.json` — Simran's Detailing promotion title/description updated to "Mention AV10
  to receive 10% off Paint Protection Packages — AV Residents Only".
- `data/businesses.json` — `simrans-detailing` phone (`+61 410 094 574`) added; description now
  names Manisha as the contact.
- `npm run validate:data` — passes.
- Manually verified via a temporary local dev server: homepage promotions section shows the new
  offer title/description; `/business/simrans-detailing` shows the new phone and "Manisha" contact.
- `npx playwright test` — 271 passed, 16 skipped, 10 failed, all `[firefox]`, all the same
  pre-existing "no console errors" CSP `unsafe-eval` failure documented in F-012/F-013 (confirmed by
  isolated rerun of `homepage.spec.ts` — the only failing assertion is the console-errors check,
  Dharug footer text still passes) — unrelated to this change, not a new regression.

---

## Story 18 (F-019)

As a visitor looking for a digital marketing / SEO / web / ads agency

I want Solution Savvy listed in the directory

So that I can find and contact a locally-based digital marketing provider.

### Source data (as supplied via chat, 2026-07-28)

- "Solution Savvy is a Nirimba Fields-based digital marketing agency helping businesses across
  Sydney and all major Australian cities. We specialise in SEO, local SEO, AEO/GEO, Website
  development, Google Ads/Meta Ads, Social Media Marketing and Business Automation. Our focus is on
  delivering practical, results-driven strategies that increase visibility, attract qualified
  traffic, and generate consistent customer enquiries. We help small and mid-sized businesses grow
  online with sustainable rankings and real business outcomes."
- Phone: 0469 355 221
- Email: sales@solutionsavvy.com.au
- Street (confirmed by project owner): Seagull Street

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- **Suburb/postcode (confirmed by project owner):** Schofields, NSW 2762.
- **New category (confirmed by project owner):** no existing category fits (closest is
  `real-estate` or a services catch-all, neither appropriate) — adding `digital-marketing` /
  "Digital Marketing" rather than reusing an unrelated category. Icon `"Megaphone"` chosen (a real
  `lucide-react` export). `displayOrder: 20` (after `migration-visa-services` at 19). `featured:
  false` — a brand-new single-business category, same reasoning as prior new-category additions
  (F-002, F-017).
- **`serviceAreas`:** the business describes itself as serving "Sydney and all major Australian
  cities," which is broader than every existing entry's suburb-level `serviceAreas`. Kept
  `serviceAreas` to `["Schofields", "Nirimba Fields"]` (the local area, matching the directory's
  actual purpose) and preserved the wider reach as prose in `description` instead — flagging this
  in case the project owner wants the broader area reflected structurally instead.
- **`featured: false`** — not requested as featured, unlike some prior entries (F-001, F-011).
- **No website supplied** — `website`/`websiteLabel` fields omitted (both optional).
- **`verified: false`** (default) — no independent verification performed.
- Description/short description/tags authored (not verbatim) to fit the schema's required
  `description` field and match existing listings' tone.

### Proposed entry — `data/categories.json`

```json
{
  "id": "digital-marketing",
  "slug": "digital-marketing",
  "name": "Digital Marketing",
  "icon": "Megaphone",
  "description": "SEO, website development, digital advertising, and social media marketing services.",
  "displayOrder": 20,
  "featured": false
}
```

### Proposed entry — `data/businesses.json`

```json
{
  "id": "17d1ba24-1805-4112-ac1e-27bd391fb2d7",
  "slug": "solution-savvy",
  "name": "Solution Savvy",
  "description": "Local digital marketing agency based in Nirimba Fields, helping businesses across Sydney and all major Australian cities with SEO, local SEO, AEO/GEO, website development, Google Ads/Meta Ads, social media marketing, and business automation. Focused on practical, results-driven strategies that increase visibility, attract qualified traffic, and generate consistent customer enquiries.",
  "shortDescription": "Local digital marketing agency — SEO, Ads, social media, and business automation.",
  "categoryId": "digital-marketing",
  "phone": "0469 355 221",
  "email": "sales@solutionsavvy.com.au",
  "address": {
    "street": "Seagull Street",
    "suburb": "Schofields",
    "state": "NSW",
    "postcode": "2762"
  },
  "serviceAreas": ["Schofields", "Nirimba Fields"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["SEO", "Digital Marketing", "Website Development", "Social Media Marketing"],
  "createdAt": "2026-07-28T00:00:00Z",
  "updatedAt": "2026-07-28T00:00:00Z"
}
```

Acceptance Criteria

- [x] New category added to `data/categories.json` with `id`/`slug: "digital-marketing"`.
- [x] New business added to `data/businesses.json` with `categoryId: "digital-marketing"`, the
      contact details and Seagull Street/Schofields address above.
- [x] `npm run validate:data` passes — no schema violations, no duplicate `id`/`slug`, `categoryId`
      resolves to an existing category.
- [x] `/category/digital-marketing` and `/business/solution-savvy` render via existing dynamic
      routes with no code change required.
- [x] Existing Playwright suite still passes (no regressions).

F-019 implemented and verified (2026-07-28):

- `data/categories.json` / `data/businesses.json` — entries appended exactly as specified above
  (diffed against the confirmed spec, no deviation).
- Implement step delegated to a Haiku-model subagent per the new "Model delegation for the
  Implement step" convention in `.ai/CLAUDE.md`; Capture/Confirm/Verify stayed on the primary
  model. A reusable `.claude/agents/data-entry.md` subagent was also created for this going
  forward — this run itself used an ad-hoc `general-purpose` agent with a Haiku model override,
  since a subagent definition created mid-session isn't picked up until the next session.
- `npm run validate:data` — passes ("All data files ... are valid").
- Manually verified via a temporary local dev server: `/`, `/category/digital-marketing`, and
  `/business/solution-savvy` all return 200.
- `npx playwright test` — 280 passed, 16 skipped, 1 failed (`[webkit] Escape closes the
  suggestions list`, a pre-existing WebKit search-suite timing flake — passed 2/2 when rerun in
  isolation, unrelated to this change, not a new regression).

---

## Story 19 (F-020)

As a visitor browsing the promotions section

I want to see Solution Savvy's sign-up offer

So that I know AV residents get a free month on their SEO/AEO/GEO package.

### Source data (as supplied via chat, 2026-07-30)

- Title: "FREE 1 Month SEO + AEO + GEO - Exclusive for AV Residents only"
- Description: "Sign up for our 6-month SEO, AEO & GEO package and get your first month FREE.
  Exclusive to AV residents only. Limited-time offer."

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- **Dates (confirmed by project owner via clarifying question):** no exact dates were supplied
  with "limited-time offer" — project owner chose `startDate: "2026-07-30"`,
  `endDate: "2026-10-30"` (3 months), matching the window most other active promotions use.
- **`featured: true`** (confirmed by project owner via clarifying question) — highlighted like the
  tutoring Free Demo Lesson promotion, unlike the 3 standard promotions.
- **`businessId`** resolves to the existing `solution-savvy` business
  (`17d1ba24-1805-4112-ac1e-27bd391fb2d7`, added in F-019) — no new business record needed.
- Title/description used verbatim from the project owner's message, matching the promotion
  schema's required `title`/`description` fields.

### Proposed entry — `data/promotions.json`

```json
{
  "id": "02d89015-4bd4-4f75-adbe-794eed31bf9f",
  "businessId": "17d1ba24-1805-4112-ac1e-27bd391fb2d7",
  "title": "FREE 1 Month SEO + AEO + GEO - Exclusive for AV Residents only",
  "description": "Sign up for our 6-month SEO, AEO & GEO package and get your first month FREE. Exclusive to AV residents only. Limited-time offer.",
  "startDate": "2026-07-30",
  "endDate": "2026-10-30",
  "featured": true
}
```

Acceptance Criteria

- [x] New promotion added to `data/promotions.json` with `businessId` resolving to `solution-savvy`.
- [x] `npm run validate:data` passes — no schema violations, no duplicate `id`, `businessId`
      resolves to an existing business.
- [x] Promotion appears in the homepage Promotions section (`/`) and links to
      `/business/solution-savvy`.
- [x] Existing Playwright suite still passes (no regressions).

F-020 implemented and verified (2026-07-30):

- `data/promotions.json` — entry appended exactly as specified above (diffed against the confirmed
  spec, no deviation). Implement step delegated to the Haiku data-entry convention as before.
- `npm run validate:data` — passes ("All data files ... are valid").
- Manually verified via a temporary local dev server: homepage HTML contains the promotion title
  and a link to `/business/solution-savvy`.
- `npx playwright test` — 280 passed, 16 skipped, 1 failed (`[webkit] a query with no matches
  shows the empty state`, a pre-existing WebKit search-suite timing flake — passed 2/2 when rerun
  in isolation, unrelated to this change, not a new regression).

---

## Story 20 (F-021)

As a visitor viewing the Solution Savvy business page

I want to see their real logo instead of the generic placeholder image

So that the listing feels like a real, verified business.

### Source data

- Logo supplied by the project owner: `/Users/ceroshjacob/Downloads/Logo-white-1.png` (600×287,
  white logo text + red icon mark, transparent background).

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- **Background treatment (confirmed by project owner via clarifying question):** the source file is
  white-on-transparent, which would be near-invisible on the two places `images[0]` actually
  renders — the business page Gallery thumbnail (`bg-muted`, near-white in light mode,
  `features/business-details/Gallery.tsx`) and the social-share preview image
  (`app/business/[slug]/page.tsx`'s `openGraph.images`). Project owner chose to composite the logo
  onto a solid dark background tile (`#171717`) rather than use it as-is or supply an alternate
  asset.
- **Canvas/aspect ratio:** built as 1200×675 (16:9) to exactly match the Gallery's `aspect-video`
  container, so `object-cover` doesn't crop it; logo scaled to ~70% width / ~45% height, centered.
- **File:** saved as `public/images/businesses/solution-savvy.jpg` (88% quality, ~25KB), replacing
  the existing convention of one representative image per business (matches
  `elite-australia-immigration.jpg`, `pankhuris-artistry-avenue.jpg` — both also real logos, no
  strict existing size convention across the two).

### Change — `data/businesses.json`

`solution-savvy`'s `images` field changes from:

```json
"images": ["/images/placeholder-business.svg"]
```

to:

```json
"images": ["/images/businesses/solution-savvy.jpg"]
```

Acceptance Criteria

- [x] `public/images/businesses/solution-savvy.jpg` exists, legible logo on a dark background,
      16:9 aspect ratio.
- [x] `solution-savvy`'s `images` field in `data/businesses.json` points to the new file.
- [x] `npm run validate:data` passes.
- [x] `/business/solution-savvy` Gallery section renders the new image (not the placeholder).
- [x] Existing Playwright suite still passes (no regressions).

F-021 implemented and verified (2026-07-30):

- `public/images/businesses/solution-savvy.jpg` created (1200×675, white logo + red icon
  composited onto a `#171717` dark tile, 88% JPEG quality, ~25KB) from the project owner's supplied
  `Logo-white-1.png`. Image processing done directly (not delegated) given the visual-quality
  judgment involved.
- `data/businesses.json` — `solution-savvy.images` updated to point to the new file.
- `npm run validate:data` — passes.
- Manually verified via a temporary local dev server: image asset returns 200 and the business
  page's Gallery section serves it.
- `npx playwright test` — 280 passed, 16 skipped, 1 failed (`[webkit] typing filters results
  instantly and shows suggestions`, a pre-existing WebKit search-suite timing flake — passed 2/2
  in isolation, unrelated to this change). Note: this is the third distinct WebKit search test to
  flake across three full-suite runs today (F-019, F-020, F-021) — worth a dedicated look
  separately from this sprint's data-entry work.

---

## Story 21 (F-022)

As a visitor needing CCTV, alarms, intercom, home theatre, or home automation installed

I want a local security tech provider listed in the directory

So that I can find and contact one.

### Source data (as supplied via chat, 2026-07-30/31)

- "Danish here. I own a security tech business. I do CCTV alarms intercom Hoem theatre and home
  automation. Will you please add me to the directory?"
- Sender number: +61 430 778 821
- "This is my number" / "Website under maintenance" / "I live on 17 Mariner Avenue"

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- **No business/trading name given (confirmed by project owner via clarifying question):** listed
  as `"Danish"` — matches the existing first-name-only precedent (`anjul-jp`, `praful-saparia-jp`).
- **Phone number (confirmed by project owner via clarifying question):** the sender's own number,
  `+61 430 778 821`, used as the contact number — "This is my number" had no digits attached in the
  chat log itself.
- **Suburb/postcode (confirmed by project owner):** Schofields, NSW 2762.
- **New category (confirmed by project owner):** no existing category covers
  CCTV/alarms/intercom/home theatre/home automation — adding `security-home-automation` /
  "Security & Home Automation". Icon `"ShieldCheck"` chosen (a real `lucide-react` export).
  `displayOrder: 21` (after `digital-marketing` at 20). `featured: false` — same reasoning as prior
  new-category additions.
- **No website** — under maintenance per Danish, so `website`/`websiteLabel` omitted.
- **`serviceAreas`:** `["Schofields", "Akuna Vista"]` — Mariner Avenue falls within Akuna Vista per
  the existing `anjul-jp` entry's service area, plus the wider Schofields suburb from the address.
- **`tags`:** includes `"Local"`, matching the convention for Akuna Vista residents offering
  services locally (same as the JP entries).
- **`featured: false`, `verified: false`** — not requested as featured; no independent verification
  performed.
- Description/short description authored (not verbatim) to fit the schema's required `description`
  field.

### Proposed entry — `data/categories.json`

```json
{
  "id": "security-home-automation",
  "slug": "security-home-automation",
  "name": "Security & Home Automation",
  "icon": "ShieldCheck",
  "description": "CCTV, alarm systems, intercoms, home theatre, and home automation installation services.",
  "displayOrder": 21,
  "featured": false
}
```

### Proposed entry — `data/businesses.json`

```json
{
  "id": "e0d9c718-f0a5-4f55-9cba-1b05f360c841",
  "slug": "danish-security-home-automation",
  "name": "Danish",
  "description": "Local security technology installer based on Mariner Avenue, Akuna Vista, offering CCTV, alarm systems, intercoms, home theatre, and home automation installation.",
  "shortDescription": "Local CCTV, alarms, intercom, home theatre, and home automation installer.",
  "categoryId": "security-home-automation",
  "phone": "+61 430 778 821",
  "address": {
    "street": "17 Mariner Avenue",
    "suburb": "Schofields",
    "state": "NSW",
    "postcode": "2762"
  },
  "serviceAreas": ["Schofields", "Akuna Vista"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["CCTV", "Home Automation", "Local"],
  "createdAt": "2026-07-31T00:00:00Z",
  "updatedAt": "2026-07-31T00:00:00Z"
}
```

Acceptance Criteria

- [x] New category added to `data/categories.json` with `id`/`slug: "security-home-automation"`.
- [x] New business added to `data/businesses.json` with `categoryId: "security-home-automation"`,
      the contact details and Mariner Avenue/Schofields address above.
- [x] `npm run validate:data` passes — no schema violations, no duplicate `id`/`slug`, `categoryId`
      resolves to an existing category.
- [x] `/category/security-home-automation` and `/business/danish-security-home-automation` render
      via existing dynamic routes with no code change required.
- [x] Existing Playwright suite still passes (no regressions).

F-022 implemented and verified (2026-07-31):

- `data/categories.json` / `data/businesses.json` — entries appended exactly as specified above
  (diffed against the confirmed spec, no deviation).
- `npm run validate:data` — passes ("All data files ... are valid").
- Manually verified via a temporary local dev server: `/category/security-home-automation` and
  `/business/danish-security-home-automation` both return 200.
- `npx playwright test` — 281 passed, 16 skipped, 0 failed (clean run, no WebKit flake this time).

---

## Story 22 (F-023)

As a visitor planning a custom build, duplex, or knockdown rebuild

I want a builder listed in the directory

So that I can find and contact one with a local connection to the area.

### Source data (as supplied via chat, 2026-07-30, plus the business's own website)

- "Hello do you add builders in the list?" / "Yeah I live on Nabthorpe parade" /
  "Accurahomes.com.au" / Instagram: https://www.instagram.com/accura_homes
- Extracted from `accurahomes.com.au`: tagline "Building the Australian Dream, One Brick at a
  Time"; phone `+61 435 359 431`; email `Kushal.modi@accurahomes.com.au`; address "5.12/5
  Celebration Drive, Bella Vista NSW 2155"; services: luxurious homes, duplex construction,
  knockdown rebuild projects, custom design services, commercial properties; "over 10 years
  delivering high-quality luxury homes across Australia".

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- **Address (confirmed by project owner via clarifying question):** uses the official registered
  address from the website (Bella Vista), not the sender's personal Nabthorpe Parade address (no
  postcode was given for that, and it's a personal not business address) — the Nabthorpe
  Parade/Akuna Vista local connection is noted in the description text instead, matching the
  `arihant-party-essentials` precedent for local-connection framing.
- **Contact details (confirmed by project owner via clarifying question):** uses the website's own
  phone (`+61 435 359 431`) and email (`Kushal.modi@accurahomes.com.au`), not the sender's chat
  number (`+61 469 845 790`).
- **New category (confirmed by project owner):** no existing category covers builders/construction
  — adding `builders-construction` / "Builders & Construction". Icon `"HardHat"` chosen (a real
  `lucide-react` export). `displayOrder: 22` (after `security-home-automation` at 21).
  `featured: false` — same reasoning as prior new-category additions.
- **`serviceAreas`:** `["Akuna Vista", "Schofields", "Sydney"]` — local area plus the website's
  broader "across Australia"/Sydney framing, kept in prose in `description` for the full claim.
- **`socialLinks.instagram`:** the supplied Instagram URL, with the tracking query string
  (`?igsh=...`) stripped, matching how other entries store clean profile URLs.
- **`tags`:** includes `"Local"`, for the Nabthorpe Parade/Akuna Vista connection.
- **`featured: false`, `verified: false`** — not requested as featured; no independent verification
  performed beyond reading the business's own website.
- Description/short description authored (not verbatim, though the tagline is quoted) to fit the
  schema's required `description` field.

### Proposed entry — `data/categories.json`

```json
{
  "id": "builders-construction",
  "slug": "builders-construction",
  "name": "Builders & Construction",
  "icon": "HardHat",
  "description": "Custom home builders, duplex construction, knockdown rebuilds, and commercial construction.",
  "displayOrder": 22,
  "featured": false
}
```

### Proposed entry — `data/businesses.json`

```json
{
  "id": "1bfa7d29-cea6-4904-abcb-c259745f5e51",
  "slug": "accura-homes",
  "name": "Accura Homes",
  "description": "Accura Homes builds luxurious, custom-designed homes across Sydney — duplex construction, knockdown rebuilds, custom design services, and commercial properties — with over 10 years delivering premium craftsmanship and on-time delivery (\"Building the Australian Dream, One Brick at a Time\"). Locally connected, with a team member based on Nabthorpe Parade, Akuna Vista.",
  "shortDescription": "Custom luxury homes, duplexes, knockdown rebuilds and commercial builds.",
  "categoryId": "builders-construction",
  "phone": "+61 435 359 431",
  "email": "Kushal.modi@accurahomes.com.au",
  "website": "https://accurahomes.com.au",
  "address": {
    "street": "5.12/5 Celebration Drive",
    "suburb": "Bella Vista",
    "state": "NSW",
    "postcode": "2155"
  },
  "serviceAreas": ["Akuna Vista", "Schofields", "Sydney"],
  "socialLinks": {
    "instagram": "https://www.instagram.com/accura_homes"
  },
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Custom Homes", "Duplex Construction", "Knockdown Rebuild", "Local"],
  "createdAt": "2026-07-31T00:00:00Z",
  "updatedAt": "2026-07-31T00:00:00Z"
}
```

Acceptance Criteria

- [x] New category added to `data/categories.json` with `id`/`slug: "builders-construction"`.
- [x] New business added to `data/businesses.json` with `categoryId: "builders-construction"`,
      the contact details and Bella Vista address above.
- [x] `npm run validate:data` passes — no schema violations, no duplicate `id`/`slug`, `categoryId`
      resolves to an existing category.
- [x] `/category/builders-construction` and `/business/accura-homes` render via existing dynamic
      routes with no code change required.
- [x] Existing Playwright suite still passes (no regressions).

F-023 implemented and verified (2026-07-31):

- `data/categories.json` / `data/businesses.json` — entries appended exactly as specified above
  (diffed against the confirmed spec, no deviation).
- `npm run validate:data` — passes ("All data files ... are valid").
- Manually verified via a temporary local dev server: `/category/builders-construction` and
  `/business/accura-homes` both return 200.
- **Correction Protocol invoked:** `tests/e2e/directory.spec.ts`'s "sorting changes the order of
  results" test hardcoded `"Allan's TV Wall Mounting"` as the A–Z sort leader. Adding "Accura
  Homes" made that assertion stale — `"Accura Homes"` now correctly sorts first (`Ac` < `Al`), the
  app's behaviour was never wrong. Flagged to and confirmed by the project owner before editing
  test code (outside the data-only Implement delegation); the assertion was updated to expect
  `"Accura Homes"`.
- `npx playwright test` — 281 passed, 16 skipped, 0 failed after the test fix.

---

## Story 23 (F-024)

As a visitor looking for a landscaper

I want the directory to only show businesses that are actually still operating

So that I don't contact a business that's closed.

### Source data (as supplied via chat, 2026-07-31)

- "The one mentioned in the directory is not in the business anymore. so please remove that ad and
  if its the only one then remove that section as well."
- Clarifying question revealed there were actually two landscaping listings, not one. Project owner
  confirmed via clarifying question: **remove both** ("Just Cut Grass" and "Arshdeep Landscaping")
  and remove the category, since both are defunct.

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- **Scope expanded from the original message (confirmed by project owner via clarifying
  question):** the original request named only one defunct listing; once told two existed, the
  project owner confirmed both should go, not just one.
- **Referential integrity checked before removal:** no `data/promotions.json` entry references
  either business's `id` (`4a2fafa2-e1cb-472c-b8bf-42cf603438ab` / `just-cut-grass`,
  `87c2a3a6-2f97-4347-a512-305a84f85a27` / `arshdeep-landscaping`), so no dangling promotion is
  left behind. No other business uses `categoryId: "landscaping"`, so removing the category leaves
  no dangling `categoryId` reference.
- Category `landscaping` ("Landscaping & Gardening", `data/categories.json`) removed in full, not
  just hidden — matches "remove that section as well."

### Change — `data/businesses.json`

Remove the two records with `slug: "just-cut-grass"` and `slug: "arshdeep-landscaping"`.

### Change — `data/categories.json`

Remove the record with `id: "landscaping"`.

Acceptance Criteria

- [x] `just-cut-grass` and `arshdeep-landscaping` no longer present in `data/businesses.json`.
- [x] `landscaping` category no longer present in `data/categories.json`.
- [x] `npm run validate:data` passes — no dangling `categoryId`/`businessId` references.
- [x] `/category/landscaping` no longer appears in the category listing (homepage Popular
      Categories / directory filters); direct navigation to `/category/landscaping` returns a
      not-found result rather than an empty-but-existing page.
- [x] Existing Playwright suite still passes (no regressions).

F-024 implemented and verified (2026-07-31):

- `data/businesses.json` — `just-cut-grass` and `arshdeep-landscaping` records removed (diffed to
  confirm nothing else changed).
- `data/categories.json` — `landscaping` record removed.
- `npm run validate:data` — passes, no dangling references (confirmed no promotion referenced
  either business, and no other business used `categoryId: "landscaping"`, before removal).
- Manually verified via a temporary local dev server: `/category/landscaping` returns 404;
  homepage has no "Landscaping" text; `/businesses` shows neither removed business.
- `npx playwright test` — 281 passed, 16 skipped, 0 failed.

---

## Story 24 (F-025)

As a visitor needing a mortgage broker

I want iConsult Mortgage Solutions listed under Finance & Mortgage Broking

So that I can find and contact a local broker.

### Source data (as supplied via chat, 2026-07-31, plus the business's own website)

- Business Name: iConsult Mortgage Solutions Pty Ltd; Contact: Bhavna Dada; Business: Mortgage
  Broker; Phone: 0421790930; Email: bhavna@iconsultmortgage.com.au; Website:
  www.iconsultmortgage.com.au
- Description: "Thinking about buying your first home, refinancing, or investing? Get expert
  mortgage advice and access to a wide range of lenders. I'm Bhavna, your local Akuna Vista
  mortgage broker from iConsult Mortgage Solutions. Whether you're purchasing your first home,
  upgrading, refinancing, or investing, I can help you find a loan that suits your needs. Contact
  me today for a no-obligation home loan review."
- Extracted from `iconsultmortgage.com.au`: address "Nirimba Fields, NSW 2763" (suburb-level only,
  no street); Credit Representative Number 560511 (ABN 16678658467), authorised under Australian
  Credit Licence Number 384704; services: residential, commercial, SMSF, asset finance, low
  doc/alt doc, and personal loans; generic (non-business-specific) social icon links present, not
  used.

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- **Existing category, no new category needed:** `finance-mortgage-broking` already exists
  (added in F-002).
- **No structured `address`:** the website gives only "Nirimba Fields, NSW 2763", no street —
  matches the existing precedent (`arihant-party-essentials`, the JP entries) of omitting the
  `address` object when there's no full street-level address, using `serviceAreas` instead. Note:
  2763 differs from this directory's usual Nirimba Fields/Schofields postcode (2762) elsewhere, but
  since no structured address is stored, this doesn't surface as data.
- **`name`:** "iConsult Mortgage Solutions" (dropped "Pty Ltd"), matching the
  `brar-roofing-solution` precedent of keeping the legal suffix out of `name` while citing
  ABN/licence numbers in `description`.
- **Social links omitted:** the website's social icons resolved as generic/template links, not
  confirmed to be this business's actual profiles — omitted rather than guessed.
- **Phone kept as supplied** (`0421790930`, no spacing/prefix added) — matches the established
  precedent of not reformatting phone numbers from how they were given.
- **`featured: false`, `verified: false`** — not requested as featured; no independent
  verification beyond reading the business's own website.
- Description/short description authored (not verbatim, though the supplied bio is quoted) to fit
  the schema's required `description` field and include the ACL/Credit Representative numbers,
  matching the licence-number convention used for other regulated trades in this directory.

### Proposed entry — `data/businesses.json`

```json
{
  "id": "932aac42-5f1a-437e-898f-db6d4967668f",
  "slug": "iconsult-mortgage-solutions",
  "name": "iConsult Mortgage Solutions",
  "description": "I'm Bhavna, your local Akuna Vista mortgage broker from iConsult Mortgage Solutions (Credit Representative Number 560511, ABN 16 678 658 467, authorised under Australian Credit Licence Number 384704). Whether you're purchasing your first home, upgrading, refinancing, or investing, I can help you find a loan from a wide range of lenders — residential, commercial, SMSF, asset finance, low doc/alt doc, and personal loans. Contact me today for a no-obligation home loan review.",
  "shortDescription": "Local Akuna Vista mortgage broker — home loans, refinancing, SMSF and more.",
  "categoryId": "finance-mortgage-broking",
  "phone": "0421790930",
  "email": "bhavna@iconsultmortgage.com.au",
  "website": "https://www.iconsultmortgage.com.au",
  "serviceAreas": ["Nirimba Fields", "Akuna Vista"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Mortgage Broker", "Home Loans", "Local"],
  "createdAt": "2026-07-31T00:00:00Z",
  "updatedAt": "2026-07-31T00:00:00Z"
}
```

Acceptance Criteria

- [x] New business added to `data/businesses.json` with `categoryId: "finance-mortgage-broking"`
      and the contact details above.
- [x] `npm run validate:data` passes — no schema violations, no duplicate `id`/`slug`, `categoryId`
      resolves to an existing category.
- [x] `/business/iconsult-mortgage-solutions` renders via the existing dynamic route with no code
      change required, and appears on `/category/finance-mortgage-broking`.
- [x] Existing Playwright suite still passes (no regressions).

F-025 implemented and verified (2026-07-31):

- `data/businesses.json` — entry appended exactly as specified above (diffed against the confirmed
  spec, no deviation).
- `npm run validate:data` — passes ("All data files ... are valid").
- Manually verified via a temporary local dev server: `/business/iconsult-mortgage-solutions`
  returns 200; `/category/finance-mortgage-broking` lists "iConsult Mortgage Solutions".
- `npx playwright test` — 280 passed, 16 skipped, 1 failed (`[webkit] selecting a suggestion via
  keyboard`, the same recurring WebKit search-suite timing flake — passed 2/2 in isolation,
  unrelated to this change).

---

## Story 25 (F-026)

As Bhavna, the owner of iConsult Mortgage Solutions

I want my listing's description to match the bio I actually supplied

So that it reads the way I intended, without added regulatory detail I didn't ask for.

### Source data (as supplied via email, 2026-07-31)

- "I noticed that '(Credit Representative Number 560511, ABN 16 678 658 467, authorised under
  Australian Credit Licence Number 384704).' this is added in the introduction, could you please
  remove it." — followed by the exact description text she wants instead.

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- **F-025's authored addition of the ACL/Credit Representative numbers (matching the
  licence-number convention used for other regulated trades in this directory) was not something
  Bhavna asked for** — she supplied only the plain bio. This F-025 assumption is now corrected by
  Bhavna directly; the licence numbers are removed, not relocated elsewhere in the record.
- Only `description` changes — no other field affected.

### Change — `data/businesses.json`

`iconsult-mortgage-solutions`'s `description` changes from the F-025 version to:

```
I'm Bhavna, your local Akuna Vista mortgage broker from iConsult Mortgage Solutions. Whether you're purchasing your first home, upgrading, refinancing, or investing, I can help you find a loan from a wide range of lenders — residential, commercial, SMSF, asset finance, low doc/alt doc, and personal loans. Contact me today for a no-obligation home loan review.
```

Acceptance Criteria

- [x] `iconsult-mortgage-solutions`'s `description` in `data/businesses.json` exactly matches the
      text above (no ACL/Credit Representative parenthetical).
- [x] `npm run validate:data` passes.
- [x] `/business/iconsult-mortgage-solutions` renders the updated description.
- [x] Existing Playwright suite still passes (no regressions).

F-026 implemented and verified (2026-07-31):

- `data/businesses.json` — `iconsult-mortgage-solutions.description` updated to the exact text
  Bhavna supplied (diffed to confirm only this one field changed, nothing else touched).
- `npm run validate:data` — passes.
- Manually verified via a temporary local dev server: `/business/iconsult-mortgage-solutions` no
  longer contains "Credit Representative Number", still renders the rest of the bio.
- `npx playwright test` — 281 passed, 16 skipped, 0 failed.

Still open for future data-entry Features in this ongoing sprint (F-012...) as more listings arrive.

---

## Story 26 (F-027)

As a visitor needing an electrician for solar, battery, or EV charger work

I want to find Sydpro Electrical in the directory

So that I have a specialist option alongside the existing Smart Brain Electrical Service listing.

### Source data (found via `scan-whatsapp-leads` skill scan of MAQ - Malayalee Association of
Quakers Hill, 2026-07-28, then cross-checked and confirmed with the project owner)

- Sponsor announcement posted by Sibin Jacob: "Bronze Sponsor Spotlight — a heartfelt thank you to
  Sydpro Electricals for joining us as a Bronze Sponsor for Bendigo Bank MAQ Ponnonam 2026! Why
  Sydpro Solar Solutions? 10+ Years of Industry Experience, 2,000+ Residential & Commercial
  Installations, Premium Solar & Battery Storage Solutions, SAA Accredited & Level 2 ASP Licensed,
  Trusted by customers across New South Wales. Contact: Jomon Joseph – 0499 656 366,
  www.sydproelectrical.com.au"
- Resident testimonial in the same thread (5 reactions): "Five-star service! I used his services
  for installing a solar battery as well as a few other electrical jobs. He was professional,
  friendly, and a pleasure to deal with throughout the entire process. I highly recommend him to
  anyone looking for reliable and high-quality electrical work."

### Clarification (confirmed via clarifying question this round)

- No street address was supplied — the business describes itself as serving "customers across New
  South Wales" rather than one suburb. Project owner confirmed to match that framing rather than
  infer a specific service suburb: `serviceAreas` is left unset (precedent: FitBeatz Dance Fitness
  is the one existing business with no `serviceAreas`), and the broader-NSW framing is carried in
  the description text instead.

### Change — `data/businesses.json`

```json
{
  "id": "bae676f7-be9a-48c0-a080-0e9eac1e021e",
  "slug": "sydpro-electrical",
  "name": "Sydpro Electrical",
  "description": "Sydpro Electrical, led by Jomon Joseph, specialises in solar and battery storage solutions and EV charger installation, with in-house electricians (no subcontractors), SAA accreditation and Level 2 ASP licensing. 10+ years of industry experience and 2,000+ residential and commercial installations, trusted by customers across New South Wales.",
  "shortDescription": "Solar, battery storage & EV charger installation across NSW.",
  "categoryId": "electrical",
  "phone": "0499 656 366",
  "website": "https://www.sydproelectrical.com.au",
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Electrical", "Solar", "Battery Storage", "EV Chargers", "Licensed Electrician"],
  "createdAt": "2026-08-01T00:00:00Z",
  "updatedAt": "2026-08-01T00:00:00Z"
}
```

- Existing `electrical` category reused — no new category needed.
- No email supplied — left unset, same gap pattern as prior Stories.

### Acceptance Criteria

- [x] Sydpro Electrical added to `data/businesses.json` under `electrical`, with the confirmed
      phone, website, and description above (no `serviceAreas` field).
- [x] `npm run validate:data` passes.
- [x] `/business/sydpro-electrical` renders correctly.
- [x] Existing Playwright suite still passes.

---

## Story 27 (F-028)

As a visitor needing blinds or curtains supplied and installed

I want to find Best and Less Arvil in the directory

So that I have a local option in Furniture & Homewares alongside The Trendz.

### Source data (found via `scan-whatsapp-leads` skill scan of MAQ - Malayalee Association of
Quakers Hill, 2026-07-31, then cross-checked and confirmed with the project owner)

- Laiju asked the group: "Any recommendations for a reasonably priced blinds company that supplies
  and installs blinds?"
- Manu replied with a WhatsApp contact card named "Best and Less Arvil" (mobile +61 401 337 700,
  confirmed by opening the contact card) plus: "Used them 4 years ago for sheer curtains and
  blinds. The service was good. Pricing was better when compared with others."

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- **This is a thin spec, captured as-is at the project owner's explicit direction.** Beyond the
  name, phone number, and one four-year-old testimonial, nothing else is known: no website, no
  service area, no confirmation of whether "Best and Less Arvil" is the registered business name
  or a shop/person name as saved by a group member. No email supplied — left unset.
- `description`/`shortDescription` below are written directly from the testimonial text and carry
  no claims beyond what Manu said.

### Change — `data/businesses.json`

```json
{
  "id": "197865c4-0861-4a62-bf99-9478019b3fcf",
  "slug": "best-and-less-arvil",
  "name": "Best and Less Arvil",
  "description": "Best and Less Arvil supplies and installs blinds and sheer curtains. Recommended by a local resident who used their service, noting good quality and pricing better than other quotes compared.",
  "shortDescription": "Blinds & sheer curtains — supply and install.",
  "categoryId": "furniture-homewares",
  "phone": "+61 401 337 700",
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Blinds", "Curtains", "Home Furnishings"],
  "createdAt": "2026-08-01T00:00:00Z",
  "updatedAt": "2026-08-01T00:00:00Z"
}
```

- Existing `furniture-homewares` category reused — no new category needed.

### Acceptance Criteria

- [x] Best and Less Arvil added to `data/businesses.json` under `furniture-homewares`, with the
      confirmed phone number above.
- [x] `npm run validate:data` passes.
- [x] `/business/best-and-less-arvil` renders correctly.
- [x] Existing Playwright suite still passes.

---

## Story 28 (F-029)

As a visitor looking for home-cooked food, catering, or a local eatery

I want a Food & Catering category in the directory

So that I can find the home businesses and restaurants residents have been recommending in the
group, which currently have nowhere to live in the directory's category list.

### Source data (found via `scan-whatsapp-leads` skill scan of Akuna Vista Owners & Residents,
2026-07-17 to 2026-08-01, restricted per the project owner's direction to businesses that
advertised themselves in the group — not third-party recommendations given in reply to a request)

- **Shobhit** (+61 403 332 713) — recurring ad: "Super Delicious Fresh Malai Paneer, Made From
  Fresh Milk — Super Soft, 100% Vegetarian, No preservatives. Order Now | WhatsApp or SMS." Weekend
  orders, seen posted 2026-07-18 and 2026-08-01.
- **Arpita** (+61 434 397 985 / 0434 397 985) — two ads from the same seller: "Homemade Chutney
  Powders Now Available!" (varieties and prices listed, pickup from Schofields) on 2026-07-26, and
  "Freshlymade Kesar Ilaichi Badam Pista Shrikhand 500gm for $18" (re-forwarded by Deepak Barot on
  2026-08-01, original post by Arpita).
- **Krishna Barot** (+61 439 713 183) — recurring ad: "Freshly made Methi Thepla medium spicy" (7
  for $10.50, later 10 for $15), pickup by arrangement.
- **Priyanka** (+61 433 938 193) — ad: "Freshly fermented Idly and Dosa batter is available for
  pick up... Batter will stay fresh for 4-5 days... text me for pickup," posted from 35 Mariner
  Avenue.
- **Pooja Mehta** (0449055225) — ad forwarded by Jimmy: "Taking Pre Orders for Fresh home made
  Mumbai Vada Pav. Taking party orders as well," pickup 8 Corsair Street, Schofields.
- **Surti House** (+61 435 101 696) — ad: "This Weekend Special: Dal Pakwan," address 1082 Windsor
  Rd, Vineyard NSW 2765.

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- **Mariner Avenue and Corsair Street are assumed to be in Schofields** — not stated explicitly in
  Priyanka's or Pooja Mehta's ads, but consistent with other confirmed Schofields streets already
  in this directory (Danish's business is "17 Mariner Avenue, Schofields," F-022). Flagging in case
  this assumption is wrong.
- No `address` object is used for Shobhit, Arpita, Krishna Barot, or Priyanka/Pooja Mehta — street
  detail is carried in the description text and `serviceAreas` instead, since a full
  street/suburb/postcode wasn't confirmed for all of them (Priyanka and Pooja Mehta's postcodes are
  unknown). Surti House's ad included a full address with postcode, so it gets a structured
  `address` object.
- No websites, emails, or opening hours were supplied for any of these — all left unset.
- At the project owner's explicit direction, none of these get a promotion or `featured: true` —
  plain category listings only.

### Change — `data/categories.json`

```json
{
  "id": "food-catering",
  "slug": "food-catering",
  "name": "Food & Catering",
  "icon": "UtensilsCrossed",
  "description": "Home cooks, caterers, and local eateries serving the Akuna Vista community.",
  "displayOrder": 23
}
```

### Change — `data/businesses.json` (6 new entries, all `categoryId: "food-catering"`)

```json
[
  {
    "id": "21b4905e-660a-4868-a2dc-01c94c1e1e8c",
    "slug": "shobhits-fresh-malai-paneer",
    "name": "Shobhit's Fresh Malai Paneer",
    "description": "Fresh malai paneer made from fresh milk — super soft, 100% vegetarian, no preservatives. Weekend orders taken via WhatsApp or SMS.",
    "shortDescription": "Fresh homemade malai paneer, weekend orders.",
    "categoryId": "food-catering",
    "phone": "+61 403 332 713",
    "images": ["/images/placeholder-business.svg"],
    "featured": false,
    "verified": false,
    "tags": ["Home Food", "Paneer", "Weekend Orders"],
    "createdAt": "2026-08-01T00:00:00Z",
    "updatedAt": "2026-08-01T00:00:00Z"
  },
  {
    "id": "05330a67-9dd4-4142-802c-789661a28ce1",
    "slug": "arpitas-homemade-snacks",
    "name": "Arpita's Homemade Snacks",
    "description": "Home-based Indian snacks and sweets, including homemade chutney powders and Kesar Ilaichi Badam Pista Shrikhand. Pickup from Schofields.",
    "shortDescription": "Homemade chutney powders & Indian sweets, Schofields pickup.",
    "categoryId": "food-catering",
    "phone": "+61 434 397 985",
    "serviceAreas": ["Schofields"],
    "images": ["/images/placeholder-business.svg"],
    "featured": false,
    "verified": false,
    "tags": ["Home Food", "Snacks", "Sweets"],
    "createdAt": "2026-08-01T00:00:00Z",
    "updatedAt": "2026-08-01T00:00:00Z"
  },
  {
    "id": "a81aa04a-bc86-4299-b96a-bf7dbd96ce2d",
    "slug": "krishna-barots-methi-thepla",
    "name": "Krishna Barot's Methi Thepla",
    "description": "Freshly made methi thepla, medium spicy, made to order. Message to arrange pickup.",
    "shortDescription": "Fresh homemade methi thepla, made to order.",
    "categoryId": "food-catering",
    "phone": "+61 439 713 183",
    "images": ["/images/placeholder-business.svg"],
    "featured": false,
    "verified": false,
    "tags": ["Home Food", "Gujarati", "Thepla"],
    "createdAt": "2026-08-01T00:00:00Z",
    "updatedAt": "2026-08-01T00:00:00Z"
  },
  {
    "id": "4d9c7ebd-b3fe-474b-ba1a-f4a64fbe8158",
    "slug": "priyankas-idly-dosa-batter",
    "name": "Priyanka's Idly & Dosa Batter",
    "description": "Freshly fermented idly and dosa batter, made from 35 Mariner Avenue, Schofields. Stays fresh for 4-5 days — text to arrange pickup.",
    "shortDescription": "Fresh idly & dosa batter, Schofields pickup.",
    "categoryId": "food-catering",
    "phone": "+61 433 938 193",
    "serviceAreas": ["Schofields"],
    "images": ["/images/placeholder-business.svg"],
    "featured": false,
    "verified": false,
    "tags": ["Home Food", "South Indian", "Batter"],
    "createdAt": "2026-08-01T00:00:00Z",
    "updatedAt": "2026-08-01T00:00:00Z"
  },
  {
    "id": "17e4334d-2489-4e1d-b7fd-88bf3f5f9610",
    "slug": "pooja-mehtas-mumbai-vada-pav",
    "name": "Pooja Mehta's Mumbai Vada Pav",
    "description": "Fresh homemade Mumbai vada pav, pre-orders and party orders taken. Pickup from 8 Corsair Street, Schofields.",
    "shortDescription": "Homemade Mumbai vada pav, pre-orders & party orders.",
    "categoryId": "food-catering",
    "phone": "0449055225",
    "serviceAreas": ["Schofields"],
    "images": ["/images/placeholder-business.svg"],
    "featured": false,
    "verified": false,
    "tags": ["Home Food", "Street Food", "Party Orders"],
    "createdAt": "2026-08-01T00:00:00Z",
    "updatedAt": "2026-08-01T00:00:00Z"
  },
  {
    "id": "9ed0ac8c-e92a-4b75-9722-562a807da4fc",
    "slug": "surti-house",
    "name": "Surti House",
    "description": "Local eatery known for weekend specials such as dal pakwan. Based in Vineyard, near Akuna Vista.",
    "shortDescription": "Local eatery, weekend food specials.",
    "categoryId": "food-catering",
    "phone": "+61 435 101 696",
    "address": {
      "street": "1082 Windsor Rd",
      "suburb": "Vineyard",
      "state": "NSW",
      "postcode": "2765"
    },
    "images": ["/images/placeholder-business.svg"],
    "featured": false,
    "verified": false,
    "tags": ["Restaurant", "Gujarati", "Weekend Specials"],
    "createdAt": "2026-08-01T00:00:00Z",
    "updatedAt": "2026-08-01T00:00:00Z"
  }
]
```

### Acceptance Criteria

- [x] New `food-catering` category added to `data/categories.json` with `displayOrder: 23`.
- [x] All 6 businesses above added to `data/businesses.json` under `food-catering`, none featured,
      none with a promotion.
- [x] `npm run validate:data` passes.
- [x] `/category/food-catering` lists all 6 businesses; each `/business/<slug>` renders correctly.
- [x] Existing Playwright suite still passes.

---

## Story 29 (F-030)

As a visitor looking for tutoring in Schofields

I want to find Tutehub Schofields in the directory

So that I have a second tutoring option alongside Nirimba Tuition, Educally, and Private
Mathematics & English Tutoring.

### Source data (found via `scan-whatsapp-leads` skill scan of Akuna Vista Owners & Residents,
2026-07-23, then cross-checked against the existing directory)

- Ad posted by Tutehub Schofields: "TUTEHUB Tutoring classes for Year 2 to 11 based in Schofields
  ... PM for a free trial today. Limited spots available." Phone +61 470 334 431.

### Change — `data/businesses.json`

```json
{
  "id": "0e68427e-e03c-49b0-8917-1b20c1f5cd37",
  "slug": "tutehub-schofields",
  "name": "Tutehub Schofields",
  "description": "Tutoring classes for Year 2 to Year 11, based in Schofields. Free trial available for new students — limited spots.",
  "shortDescription": "Tutoring for Year 2-11, Schofields. Free trial available.",
  "categoryId": "tutoring-education",
  "phone": "+61 470 334 431",
  "serviceAreas": ["Schofields"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Tutoring", "Year 2-11", "Free Trial"],
  "createdAt": "2026-08-01T00:00:00Z",
  "updatedAt": "2026-08-01T00:00:00Z"
}
```

- Existing `tutoring-education` category reused — no new category needed.

### Acceptance Criteria

- [x] Tutehub Schofields added to `data/businesses.json` under `tutoring-education`.
- [x] `npm run validate:data` passes.
- [x] `/business/tutehub-schofields` renders correctly.
- [x] Existing Playwright suite still passes.

---

## Story 30 (F-031)

As a visitor needing an airport or cruise-terminal transfer

I want to find HA Sydney Airport & Cruise Terminal Transfers in the directory

So that I have a transport option alongside the existing Windsor Marsden Park Richmond Taxi
listing.

### Source data (found via `scan-whatsapp-leads` skill scan of Akuna Vista Owners & Residents,
2026-07-18 and 2026-07-31, then cross-checked against the existing directory)

- Recurring ad: "Exclusive Community Offer for Akuna Vista, Altrove, Oaklands Estate & Colebee
  Residents. Private Sydney Airport & Cruise Terminal Transfers. 8-Seater Kia Carnival —
  Comfortable & Spacious." Pricing sheet posted separately (sedan and SUV fares to/from Schofields,
  inclusive of tolls). WhatsApp business number: 0494 188 099.

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- This ad was repeatedly removed by the admin team for being posted outside the group's advertising
  window (8-9am / 6-7pm) — that's a chat-moderation detail, not a reflection on the business
  itself, so it's still captured here as a legitimate ad.
- No named individual owner was given — the business communicates under the "HA Sydney Airport &
  Cruise Terminal Transfers" name only.
- No street address supplied (a transfer service, not a shopfront) — `serviceAreas` used instead.

### Change — `data/businesses.json`

```json
{
  "id": "11772a28-4ec5-445a-bd7d-46e9ffc2f04f",
  "slug": "ha-sydney-airport-cruise-terminal-transfers",
  "name": "HA Sydney Airport & Cruise Terminal Transfers",
  "description": "Private Sydney Airport & Cruise Terminal transfers in a comfortable 8-seater Kia Carnival, with an exclusive offer for Akuna Vista, Altrove, Oaklands Estate & Colebee residents.",
  "shortDescription": "Private airport & cruise terminal transfers, 8-seater Kia Carnival.",
  "categoryId": "taxi-transport",
  "phone": "0494 188 099",
  "serviceAreas": ["Akuna Vista", "Altrove", "Oaklands Estate", "Colebee", "Schofields"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Airport Transfers", "Cruise Terminal Transfers", "8-Seater"],
  "createdAt": "2026-08-01T00:00:00Z",
  "updatedAt": "2026-08-01T00:00:00Z"
}
```

- Existing `taxi-transport` category reused — no new category needed.

### Acceptance Criteria

- [x] HA Sydney Airport & Cruise Terminal Transfers added to `data/businesses.json` under
      `taxi-transport`.
- [x] `npm run validate:data` passes.
- [x] `/business/ha-sydney-airport-cruise-terminal-transfers` renders correctly.
- [x] Existing Playwright suite still passes.

---

## Story 31 (F-032)

As a visitor looking for a landscaper

I want the Landscaping & Gardening category back, with options that are still in business

So that I have somewhere to find a landscaper again after F-024 removed the category (both prior
listings, Just Cut Grass and Arshdeep Landscaping, had gone out of business).

### Source data (found via `scan-whatsapp-leads` skill scan of Akuna Vista Owners & Residents,
2026-07-30, then cross-checked and confirmed with the project owner)

This is the same thread that prompted F-024: Abin (19 Scout St) posted "Good morning, I am seeking
recommendations for a reputable and cost effective landscaping professional. The one mentioned in
the directory is not in the business anymore," and five residents replied with names over the next
two hours. Phone numbers for four of the five were pulled by opening their WhatsApp contact cards
directly (the fifth, JCR, was given as plain text).

- **Tushar** (+61 498 341 289) shared contact "Gorak (Arav Dad)" — +61 422 247 883 — "He is a very
  good landscaper."
- **Admin ꗪσꝓΐ⍳** (+61 434 413 027) shared a verified WhatsApp Business contact, "Aman - Guru
  Landscaping" — +61 452 300 143.
- **Bhav** (+61 470 209 086) shared contact "Navdeep DHILLON Landscaper" — +61 458 426 181.
  **Sachin** (+61 415 578 793) corroborated in the same thread: "+1 for Navdeep, he is very
  efficient, cost effective and perfect with his work."
- **Ram** (+61 469 717 074) shared contact "Manpreet Decking And landscaping" — +61 493 647 839.
- **Harpreet Kaur** (+61 425 551 811) replied in text: "jcr landscaping and construction -
  +61 452 443 844 @Abin 19 Scout St take quote from multiple and than compare quality and price
  both i prefer JCR."

Abin closed the thread with "Thanks all for the prompt responses...will reachout to the contacts
provided," without naming a single winner in the scanned window.

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- **All 5 are added as separate listings, at the project owner's explicit direction** ("add all 5
  candidates") — not just the best-corroborated one. Residents can compare, matching the existing
  multi-listing pattern already used for JP Services, Driving Instructors, and Finance & Mortgage
  Broking.
- Category is re-created with the same `id`/`slug` (`landscaping`) and `name` ("Landscaping &
  Gardening") it had before F-024 removed it, so the old `/category/landscaping` URL Cerosh has
  already shared publicly (in the 20-categories milestone post) works again. `displayOrder` set to
  24 (appended after the current highest, `food-catering` at 23) rather than restored to its old
  position.
- No websites, emails, or addresses were supplied for any of the five — all left unset. No
  promotion or `featured: true` for any of them, per the project owner's direction for this batch.
- Corroboration varies by candidate — Navdeep Dhillon has two independent mentions, the other four
  have one each — and that's reflected honestly in each `description` below rather than presented
  as equal.

### Change — `data/categories.json`

```json
{
  "id": "landscaping",
  "slug": "landscaping",
  "name": "Landscaping & Gardening",
  "icon": "Trees",
  "description": "Landscapers and gardeners for the Akuna Vista community.",
  "displayOrder": 24
}
```

### Change — `data/businesses.json` (5 new entries, all `categoryId: "landscaping"`)

```json
[
  {
    "id": "650352f0-ff6b-43b9-a5d7-ab872947b908",
    "slug": "navdeep-dhillon-landscaper",
    "name": "Navdeep Dhillon Landscaper",
    "description": "Recommended twice independently by residents in the community group — described as very efficient, cost effective and perfect with his work.",
    "shortDescription": "Landscaper, recommended twice by residents.",
    "categoryId": "landscaping",
    "phone": "+61 458 426 181",
    "images": ["/images/placeholder-business.svg"],
    "featured": false,
    "verified": false,
    "tags": ["Landscaping", "Gardening"],
    "createdAt": "2026-08-01T00:00:00Z",
    "updatedAt": "2026-08-01T00:00:00Z"
  },
  {
    "id": "d25b1c36-6caf-45c0-b15c-e5c2a70804eb",
    "slug": "jcr-landscaping-and-construction",
    "name": "JCR Landscaping and Construction",
    "description": "Landscaping and construction, recommended by a resident in the community group with the suggestion to compare quotes from multiple providers.",
    "shortDescription": "Landscaping & construction.",
    "categoryId": "landscaping",
    "phone": "+61 452 443 844",
    "images": ["/images/placeholder-business.svg"],
    "featured": false,
    "verified": false,
    "tags": ["Landscaping", "Construction"],
    "createdAt": "2026-08-01T00:00:00Z",
    "updatedAt": "2026-08-01T00:00:00Z"
  },
  {
    "id": "cb2bb132-9e5a-472b-a762-8d977b21e59f",
    "slug": "manpreet-decking-and-landscaping",
    "name": "Manpreet Decking And Landscaping",
    "description": "Decking and landscaping, recommended by a resident in the community group.",
    "shortDescription": "Decking & landscaping.",
    "categoryId": "landscaping",
    "phone": "+61 493 647 839",
    "images": ["/images/placeholder-business.svg"],
    "featured": false,
    "verified": false,
    "tags": ["Landscaping", "Decking"],
    "createdAt": "2026-08-01T00:00:00Z",
    "updatedAt": "2026-08-01T00:00:00Z"
  },
  {
    "id": "7c4fbfa5-d5e2-477c-a944-843e1a3b260f",
    "slug": "aman-guru-landscaping",
    "name": "Aman - Guru Landscaping",
    "description": "Landscaping business (verified WhatsApp Business account), recommended by an admin in the community group.",
    "shortDescription": "Landscaping.",
    "categoryId": "landscaping",
    "phone": "+61 452 300 143",
    "images": ["/images/placeholder-business.svg"],
    "featured": false,
    "verified": false,
    "tags": ["Landscaping"],
    "createdAt": "2026-08-01T00:00:00Z",
    "updatedAt": "2026-08-01T00:00:00Z"
  },
  {
    "id": "47d49011-c89b-4b99-9af8-e55a48368802",
    "slug": "gorak-landscaper",
    "name": "Gorak (Arav Dad)",
    "description": "Landscaper, recommended by a resident in the community group as \"a very good landscaper.\"",
    "shortDescription": "Landscaper, recommended by a resident.",
    "categoryId": "landscaping",
    "phone": "+61 422 247 883",
    "images": ["/images/placeholder-business.svg"],
    "featured": false,
    "verified": false,
    "tags": ["Landscaping"],
    "createdAt": "2026-08-01T00:00:00Z",
    "updatedAt": "2026-08-01T00:00:00Z"
  }
]
```

### Acceptance Criteria

- [x] `landscaping` category re-added to `data/categories.json` with `displayOrder: 24`.
- [x] All 5 businesses above added to `data/businesses.json` under `landscaping`, none featured,
      none with a promotion.
- [x] `npm run validate:data` passes.
- [x] `/category/landscaping` lists all 5 businesses; each `/business/<slug>` renders correctly.
- [x] Existing Playwright suite still passes (283 passed, 16 skipped, 1 failed — [webkit] search.spec.ts:44 "typing filters results instantly and shows suggestions", the same recurring WebKit search-suite timing flake seen in prior Stories; re-run in isolation 3x, passed 3/3, unrelated to this change).

---

## Story 32 (F-033)

As a visitor needing blouse resizing, saree fall stitching, or custom printed apparel

I want to find KS Webwear in the directory

So that I have a local tailoring option — this directory didn't have a category for this kind of
business until now.

### Source data (found via `scan-whatsapp-leads` skill scan of Akuna Vista Owners & Residents,
2026-07-31; contact details supplied directly by the project owner on request, 2026-08-01, since
the original WhatsApp lead was a contact card with no phone number visible without opening it)

- Original lead: Veena asked "Looking for contact for alterations," Geeta replied with a contact
  card named "Sindhu Telugubadi."
- Project owner supplied the business's own message directly: "I am selling Blouse pieces. I will
  do Blouse/Dress resize and Saree Fall stitching. Custom printed T-shirts
  (www.kswebwear.com.au). Feel free to msg me. Tallawong. +61 469 866 300. Sindhu Telugubadi."

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- **Business name inferred as "KS Webwear" from the website domain** (kswebwear.com.au) — the
  message itself only signs off with the owner's name, Sindhu Telugubadi, not a business name.
  Flagged for confirmation; easy to rename if wrong.
- New category created (`tailoring-alterations`) since nothing existing fits blouse
  sales/resizing/saree fall stitching/custom printed apparel together.
- `serviceAreas` set to `["Tallawong"]` per the message; no street address given.

### Change — `data/categories.json`

```json
{
  "id": "tailoring-alterations",
  "slug": "tailoring-alterations",
  "name": "Tailoring & Alterations",
  "icon": "Shirt",
  "description": "Tailoring, alterations, and custom apparel for the Akuna Vista community.",
  "displayOrder": 25
}
```

### Change — `data/businesses.json`

```json
{
  "id": "b6a20a86-01f5-4239-a968-97d8362ee90a",
  "slug": "ks-webwear",
  "name": "KS Webwear",
  "description": "KS Webwear, run by Sindhu Telugubadi, sells blouse pieces and offers blouse/dress resizing, saree fall stitching, and custom printed t-shirts. Based in Tallawong.",
  "shortDescription": "Blouse pieces, resizing, saree fall stitching, custom printed tees.",
  "categoryId": "tailoring-alterations",
  "phone": "+61 469 866 300",
  "website": "https://www.kswebwear.com.au",
  "serviceAreas": ["Tallawong"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Alterations", "Tailoring", "Custom Printing"],
  "createdAt": "2026-08-01T00:00:00Z",
  "updatedAt": "2026-08-01T00:00:00Z"
}
```

### Acceptance Criteria

- [x] `tailoring-alterations` category added to `data/categories.json` with `displayOrder: 25`.
- [x] KS Webwear added to `data/businesses.json` under `tailoring-alterations`, not featured, no
      promotion.
- [x] `npm run validate:data` passes.
- [ ] `/category/tailoring-alterations` lists KS Webwear; `/business/ks-webwear` renders correctly.
- [ ] Existing Playwright suite still passes.

---

## Story 33 (F-034)

As a visitor needing fresh flower garlands or floral jewellery for a wedding, pooja, or
celebration

I want to find Uma Garlands in the directory

So that I have a local florist option — this directory didn't have a category for florists until
now.

### Source data (found via `scan-whatsapp-leads` skill scan of Akuna Vista Owners & Residents,
2026-07-30; contact details supplied directly by the project owner on request, 2026-08-01, since
the original WhatsApp lead was a Google Maps card with no phone number visible without opening it)

- Original lead: Hiral asked "Where can I find fresh Gajro or veni for hair?" Manjushri Kulkarni
  replied with a Google Maps card — "Umagarlands/Fresh Flower Garlands Sydney · Nirimba Fields,
  4.9★, Flower designer in Nirimba Fields NSW."
- Project owner supplied the business's own contact card directly: "Get in Touch with Uma Garlands.
  Fresh flower garlands and floral jewellery for Indian weddings, poojas, baby showers, and
  traditional celebrations by Uma Garlands Australia. Phone 0470628414. Email
  Contact@umagarlands.com. Address 20 Avenger Street, Nirimba Fields. https://umagarlands.com/"

### Assumptions (flagged per the Correction Protocol — confirm or correct before implementation)

- **Business name used as "Uma Garlands"** (matching the contact card's own heading and the
  domain umagarlands.com) rather than "Uma Garlands Australia" (used once, in the tagline) or
  "Fresh Flower Garlands Sydney" (the Google Maps listing's display name). Flagged in case a
  different form is preferred.
- New category created (`florists-flower-delivery`) since nothing existing fits florists.
- Postcode wasn't supplied for the Nirimba Fields address — left out of the `address` object
  rather than guessed (matches the Surti House precedent of only using a structured address when
  every field is confirmed... except here street/suburb are confirmed but postcode isn't, so
  `serviceAreas: ["Nirimba Fields"]` is used instead of a partial `address` object, with the street
  named in the description text).

### Change — `data/categories.json`

```json
{
  "id": "florists-flower-delivery",
  "slug": "florists-flower-delivery",
  "name": "Florists & Flower Delivery",
  "icon": "Flower2",
  "description": "Florists and flower delivery for weddings, poojas, and celebrations in the Akuna Vista community.",
  "displayOrder": 26
}
```

### Change — `data/businesses.json`

```json
{
  "id": "14714cc6-26ca-4796-b167-a0186045c7d7",
  "slug": "uma-garlands",
  "name": "Uma Garlands",
  "description": "Uma Garlands Australia creates fresh flower garlands and floral jewellery for Indian weddings, poojas, baby showers, and traditional celebrations. Based at 20 Avenger Street, Nirimba Fields.",
  "shortDescription": "Fresh flower garlands & floral jewellery for celebrations.",
  "categoryId": "florists-flower-delivery",
  "phone": "0470628414",
  "email": "Contact@umagarlands.com",
  "website": "https://umagarlands.com/",
  "serviceAreas": ["Nirimba Fields"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Florist", "Flower Garlands", "Weddings", "Poojas"],
  "createdAt": "2026-08-01T00:00:00Z",
  "updatedAt": "2026-08-01T00:00:00Z"
}
```

### Acceptance Criteria

- [x] `florists-flower-delivery` category added to `data/categories.json` with `displayOrder: 26`.
- [x] Uma Garlands added to `data/businesses.json` under `florists-flower-delivery`, not featured,
      no promotion.
- [x] `npm run validate:data` passes.
- [ ] `/category/florists-flower-delivery` lists Uma Garlands; `/business/uma-garlands` renders
      correctly.
- [ ] Existing Playwright suite still passes.

---

## Story 34 (F-036)

As a resident who needs a handyman

I want to find handyman contacts in the directory

So that I don't have to rely on word-of-mouth screenshots — several residents asked and the
directory had no handyman category or listing at all.

### Source data (three phone-contact screenshots supplied directly by the project owner,
2026-08-06 — no matching public business listing found for two of the three; see Research below)

- Contact 1: "Criag Handyman" (apparent typo), mobile `0401 476 114`, no photo/logo.
- Contact 2: "Rajiv Dhiman Handyman", mobile `+61 421 248 961`, has a personal photo but no
  business logo/branding visible.
- Contact 3: display name "Bhavikbhai Handyman", mobile `+61 430 025 092`, contact photo is a
  business logo reading "Kumar Handyman Services".

### Research

Searched the three mobile numbers directly and in combination with the visible names.

- Contact 3 matched a real business: "Kumar Handyman services | Sydney NSW" on Facebook
  (facebook.com/people/Kumar-Handyman-services/100063965923752/), consistent with the logo on the
  contact photo. No address, website, or email found — Facebook page has minimal public detail.
- Contacts 1 and 2 returned no matching business listing, website, or directory presence under
  either the name or the number — these appear to be personal/word-of-mouth contacts with no
  existing online footprint.

No address, suburb, email, or website could be confirmed for any of the three, so none of those
fields are populated — matches the project's "don't guess" rule over inventing a plausible-looking
address.

### Confirmed with project owner (2026-08-06)

- Contact 1 listed as **"Craig Handyman"** (typo in the saved contact corrected).
- Contact 3 listed as **"Kumar Handyman Services"** (matches the logo/Facebook page, not the saved
  contact display name "Bhavikbhai Handyman").
- All three added with just name + phone — no serviceAreas/address/email, since none is confirmed.

### Change — `data/categories.json`

```json
{
  "id": "handyman",
  "slug": "handyman",
  "name": "Handyman",
  "icon": "Hammer",
  "description": "Handyman services for general repairs and small jobs around the home.",
  "displayOrder": 28
}
```

### Change — `data/businesses.json`

```json
{
  "id": "117ad919-dc48-49f6-a819-806ff394e6e2",
  "slug": "craig-handyman",
  "name": "Craig Handyman",
  "description": "Craig offers general handyman services for repairs and small jobs around the home. Contact directly to discuss your job and availability.",
  "shortDescription": "General handyman services.",
  "categoryId": "handyman",
  "phone": "+61 401 476 114",
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Handyman"],
  "createdAt": "2026-08-06T00:00:00Z",
  "updatedAt": "2026-08-06T00:00:00Z"
}
```

```json
{
  "id": "e8ea020d-5d3d-4a27-90ae-7ac495bb57da",
  "slug": "rajiv-dhiman-handyman",
  "name": "Rajiv Dhiman Handyman",
  "description": "Rajiv Dhiman offers general handyman services for repairs and small jobs around the home. Contact directly to discuss your job and availability.",
  "shortDescription": "General handyman services.",
  "categoryId": "handyman",
  "phone": "+61 421 248 961",
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Handyman"],
  "createdAt": "2026-08-06T00:00:00Z",
  "updatedAt": "2026-08-06T00:00:00Z"
}
```

```json
{
  "id": "362ebc70-6993-4305-ad4a-bee0a5828d99",
  "slug": "kumar-handyman-services",
  "name": "Kumar Handyman Services",
  "description": "Kumar Handyman Services offers general handyman and home improvement work. Contact Bhavikbhai to discuss your job and availability.",
  "shortDescription": "General handyman & home improvement services.",
  "categoryId": "handyman",
  "phone": "+61 430 025 092",
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Handyman"],
  "createdAt": "2026-08-06T00:00:00Z",
  "updatedAt": "2026-08-06T00:00:00Z"
}
```

### Acceptance Criteria

- [x] `handyman` category added to `data/categories.json` with `displayOrder: 28`.
- [x] Craig Handyman, Rajiv Dhiman Handyman, and Kumar Handyman Services added to
      `data/businesses.json` under `handyman`, not featured, no promotion.
- [x] `npm run validate:data` passes.
- [x] `/category/handyman` lists all three businesses; each `/business/<slug>` renders correctly.
      Verified 2026-08-06 via dev server + browser: category page lists Craig Handyman, Kumar
      Handyman Services, Rajiv Dhiman Handyman; each business page shows the correct name and
      phone number. Only console issue was a hydration-mismatch warning from a browser extension
      injecting `bis_register`/`__processed_*` attributes onto `<body>` — unrelated to this change.
- [ ] Existing Playwright suite still passes.

---

## Story 35 (F-037) — retroactively captured

**Process note (2026-08-06):** this Feature was implemented and committed on 2026-08-04
(`d805b38`, `89278a2`) without a Capture step — no Feature entry existed in any sprint README
before the code was written, which is exactly the gap the Spec-Driven Development rule in
`.ai/CLAUDE.md` exists to prevent. Caught while working on F-036 (same shape of change — new
category + businesses) and confirmed by grepping every sprint README for "Travel"/"King of Tours"
and finding nothing. This entry documents what actually shipped, after the fact, so the spec and
the shipped behaviour stop disagreeing — per the Correction Protocol. No code changes as part of
this backfill, only this documentation.

As a visitor wanting a private tour, airport transfer, or help planning a cruise/holiday

I want to find travel and transport businesses in the directory

So that I have local options — the directory had no dedicated travel/tourism category and King of
Tours had no `taxi-transport` listing either.

### What shipped (`d805b38`, 2026-08-04 11:42; `89278a2`, 2026-08-04 12:18)

Change — `data/categories.json`

```json
{
  "id": "travel-tourism",
  "slug": "travel-tourism",
  "name": "Travel & Tourism",
  "icon": "Globe",
  "description": "Travel agencies, tour operators and travel planning services.",
  "displayOrder": 27
}
```

Change — `data/businesses.json`

```json
{
  "id": "db99e186-375d-48d9-942b-f1a75b379310",
  "slug": "king-of-tours",
  "name": "King of Tours",
  "description": "Whether you're arriving, departing or exploring, King of Tours provides personalised transport solutions with spacious vehicles, professional drivers and service that goes beyond getting you from A to B.",
  "shortDescription": "Sydney's Trusted Choice for Private Tours & Premium Transfers.",
  "categoryId": "taxi-transport",
  "phone": "02 8320 0477",
  "email": "contact@kingoftours.com.au",
  "serviceAreas": ["Akuna Vista"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Private Tours", "Premium Transfers", "Airport Transfers"],
  "createdAt": "2026-08-04T00:00:00Z",
  "updatedAt": "2026-08-04T00:00:00Z"
}
```

```json
{
  "id": "9a063d12-e998-437e-9d4e-1590c6e9197d",
  "slug": "travel-crafters",
  "name": "Travel Crafters",
  "description": "Established in 2016 and built on more than two decades of travel industry experience, Travel Crafters specialises in creating unforgettable holidays, cruises and flight experiences with personalised service, exclusive offers and support every step of the way.",
  "shortDescription": "Need help planning your next adventure? Reach out to us!",
  "categoryId": "travel-tourism",
  "phone": "02 8964 4221",
  "email": "sales@travelcrafters.com.au",
  "website": "https://www.travelcrafters.com.au",
  "serviceAreas": ["Akuna Vista"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Cruises", "Holiday Planning", "Flight Bookings"],
  "createdAt": "2026-08-04T00:00:00Z",
  "updatedAt": "2026-08-04T00:00:00Z"
}
```

The same commit (`89278a2`) also fixed `tests/e2e/directory.spec.ts` pagination selectors to scope
"Previous"/"Next" assertions to the pagination container, avoiding a conflict with Travel
Crafters' description text ("Need help planning your next adventure").

### Acceptance Criteria

- [x] `travel-tourism` category added to `data/categories.json` with `displayOrder: 27`.
- [x] King of Tours added under `taxi-transport`; Travel Crafters added under `travel-tourism`.
      Neither featured, no promotion.
- [x] `npm run validate:data` passes (per commit message; not independently re-verified as part of
      this backfill since no data changed).
- [x] Directory e2e tests pass across chromium, firefox, webkit (per commit message).

---

## Story 36 (F-038)

As a resident (especially one newly moved to the area) facing a medical situation

I want to find GPs, urgent care clinics, and emergency departments in the directory

So that I have vetted local options — raised 2026-08-06 after a WhatsApp thread where a parent
asked where to take a child with a high fever and several residents replied with real
recommendations. The directory had no medical/health category at all.

### Source data (WhatsApp thread pasted directly by the project owner, 2026-08-06; every
listing below researched and verified via web search — real addresses, phone numbers, and hours,
not guessed)

Recommendations extracted from the thread: Our Medical Marsden Park (most frequently
recommended, "Our Medical Dr Sasivathani" — confirmed by the project owner to be a doctor at this
branch, folded into its description rather than a separate listing), Doonside Medical Centre, Our
Medical Kellyville, Rouse Hill Urgent Care Clinic (a link was shared), Swift Emergency Care
(Rouse Hill), WiSE Specialist Emergency (private, ~$350 mentioned in-thread), Mount Druitt
Emergency, Westmead Emergency, and an After-Hours Doctor/Home Doctor service link for Schofields
(resolved to 13cure). Castle Medical Marsden Park was added afterward at the project owner's
request ("they offer urgent care include this as well"), with review data added per a follow-up
request ("get the reviews or rating... phone number and email address").

### Confirmed with project owner (2026-08-06)

- Category named **"Medical & Health"** (matches this directory's existing "X & Y" naming style).
- Public hospital Emergency Departments (Westmead, Mount Druitt) **included**, same precedent as
  the non-commercial JP Services category.
- WiSE Specialist Emergency (Macquarie Park, ~35-40 min away) **included** despite the distance —
  it was specifically recommended by name in the thread.
- "Our Medical Dr Sasivathani" confirmed as a doctor at **Our Medical Marsden Park** — folded into
  that listing's description, not a separate business.

### Change — `data/categories.json`

```json
{
  "id": "medical-health",
  "slug": "medical-health",
  "name": "Medical & Health",
  "icon": "Stethoscope",
  "description": "GPs, urgent care, and emergency medical services for the Akuna Vista community.",
  "displayOrder": 29
}
```

### Change — `data/businesses.json`

```json
{
  "id": "a40b9fc7-a8e6-4d8a-94fe-3376e1d19ea1",
  "slug": "our-medical-marsden-park",
  "name": "Our Medical Marsden Park",
  "description": "Bulk billing GP clinic offering walk-in and telehealth consultations with no appointment required, including Dr Sasivathani. The most-recommended option in the Akuna Vista community WhatsApp group when a resident's child had a high fever.",
  "shortDescription": "Bulk billing GP, walk-in, open till 10pm daily.",
  "categoryId": "medical-health",
  "phone": "02 8042 0485",
  "email": "reception@omhmarsdenpark.com.au",
  "address": { "street": "Shop 1, 9 Hollinsworth Road", "suburb": "Marsden Park", "state": "NSW", "postcode": "2765" },
  "openingHours": {
    "monday": "07:00-22:00",
    "tuesday": "07:00-22:00",
    "wednesday": "07:00-22:00",
    "thursday": "07:00-22:00",
    "friday": "07:00-22:00",
    "saturday": "08:00-22:00",
    "sunday": "08:00-22:00"
  },
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["GP", "Bulk Billing", "Walk-in"],
  "createdAt": "2026-08-06T00:00:00Z",
  "updatedAt": "2026-08-06T00:00:00Z"
}
```

```json
{
  "id": "6a836af0-aecd-4237-8fa7-753749d84f67",
  "slug": "our-medical-kellyville",
  "name": "Our Medical Kellyville",
  "description": "Bulk billing GP clinic open every day until 10pm with no appointment required; co-located pathology, physio, dental and allied health.",
  "shortDescription": "Bulk billing GP, walk-in, open till 10pm daily.",
  "categoryId": "medical-health",
  "phone": "02 9189 7000",
  "website": "https://www.ourmedical.com.au/medical-centres/kellyville",
  "address": { "street": "1 President Road", "suburb": "Kellyville", "state": "NSW", "postcode": "2155" },
  "openingHours": {
    "monday": "08:00-22:00",
    "tuesday": "08:00-22:00",
    "wednesday": "08:00-22:00",
    "thursday": "08:00-22:00",
    "friday": "08:00-22:00",
    "saturday": "08:00-22:00",
    "sunday": "08:00-22:00"
  },
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["GP", "Bulk Billing", "Walk-in"],
  "createdAt": "2026-08-06T00:00:00Z",
  "updatedAt": "2026-08-06T00:00:00Z"
}
```

```json
{
  "id": "28cc666d-80fc-4e01-ac05-220fa6f7785f",
  "slug": "doonside-medical-centre",
  "name": "Doonside Medical Centre",
  "description": "Bulk billing GP clinic — no out-of-pocket fee with a Medicare card presented.",
  "shortDescription": "Bulk billing GP clinic.",
  "categoryId": "medical-health",
  "phone": "02 8881 7939",
  "website": "https://doonsidemc.com.au/",
  "address": { "street": "Shop 1, 185 Knox Road", "suburb": "Doonside", "state": "NSW", "postcode": "2767" },
  "openingHours": {
    "monday": "08:00-19:00",
    "tuesday": "08:00-19:00",
    "wednesday": "08:00-19:00",
    "thursday": "08:00-19:00",
    "friday": "08:00-19:00",
    "saturday": "08:00-16:00",
    "sunday": "08:00-15:00"
  },
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["GP", "Bulk Billing"],
  "createdAt": "2026-08-06T00:00:00Z",
  "updatedAt": "2026-08-06T00:00:00Z"
}
```

```json
{
  "id": "dcfcb175-c906-41cf-b087-69c926ac15ec",
  "slug": "rouse-hill-urgent-care-clinic",
  "name": "Rouse Hill Urgent Care Clinic",
  "description": "Government-funded Medicare Urgent Care Clinic — free walk-in treatment for urgent, non-life-threatening conditions, fully bulk billed with just a Medicare card, no appointment needed.",
  "shortDescription": "Free walk-in urgent care, fully bulk billed.",
  "categoryId": "medical-health",
  "phone": "02 8889 8900",
  "address": { "street": "Level 1, 10-14 Market Lane", "suburb": "Rouse Hill", "state": "NSW", "postcode": "2155" },
  "openingHours": {
    "monday": "08:00-20:00",
    "tuesday": "08:00-20:00",
    "wednesday": "08:00-20:00",
    "thursday": "08:00-20:00",
    "friday": "08:00-20:00",
    "saturday": "08:00-20:00",
    "sunday": "08:00-20:00"
  },
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Urgent Care", "Bulk Billing", "Walk-in", "Medicare Urgent Care Clinic"],
  "createdAt": "2026-08-06T00:00:00Z",
  "updatedAt": "2026-08-06T00:00:00Z"
}
```

```json
{
  "id": "68db2536-9b4d-459a-99fa-414c2792a30c",
  "slug": "swift-emergency-care",
  "name": "Swift Emergency Care",
  "description": "Private walk-in emergency and urgent care clinic, no appointment required.",
  "shortDescription": "Private walk-in emergency & urgent care.",
  "categoryId": "medical-health",
  "phone": "02 8859 9099",
  "website": "https://www.swiftemergencycare.com.au/",
  "address": { "street": "T2, 32 Civic Way", "suburb": "Rouse Hill", "state": "NSW", "postcode": "2155" },
  "openingHours": {
    "monday": "10:00-22:00",
    "tuesday": "10:00-22:00",
    "wednesday": "10:00-22:00",
    "thursday": "10:00-22:00",
    "friday": "10:00-22:00",
    "saturday": "10:00-22:00",
    "sunday": "10:00-22:00"
  },
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Emergency Care", "Urgent Care", "Walk-in"],
  "createdAt": "2026-08-06T00:00:00Z",
  "updatedAt": "2026-08-06T00:00:00Z"
}
```

```json
{
  "id": "0bd87f18-8e0c-4c4b-9761-c0bf4fd43b97",
  "slug": "wise-specialist-emergency",
  "name": "WiSE Specialist Emergency",
  "description": "Walk-in specialist emergency clinic for accidents and emergencies that need more than a GP visit but aren't life-threatening. Private, around $260 out-of-pocket for specialist assessment and diagnostics. Located in Macquarie Park — further than most listings here, but specifically recommended in the community WhatsApp thread.",
  "shortDescription": "Private walk-in specialist emergency clinic.",
  "categoryId": "medical-health",
  "phone": "02 9216 7676",
  "website": "https://www.wisemedical.com.au/contact/macquarie-park/",
  "address": { "street": "11 Khartoum Road", "suburb": "Macquarie Park", "state": "NSW", "postcode": "2113" },
  "openingHours": {
    "monday": "10:00-22:00",
    "tuesday": "10:00-22:00",
    "wednesday": "10:00-22:00",
    "thursday": "10:00-22:00",
    "friday": "10:00-22:00",
    "saturday": "10:00-22:00",
    "sunday": "10:00-22:00"
  },
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Emergency Care", "Specialist", "Private"],
  "createdAt": "2026-08-06T00:00:00Z",
  "updatedAt": "2026-08-06T00:00:00Z"
}
```

```json
{
  "id": "80714f03-be28-4be6-b2be-f2751dc92c85",
  "slug": "mount-druitt-hospital-emergency",
  "name": "Mount Druitt Hospital Emergency Department",
  "description": "Public hospital emergency department, open 24 hours.",
  "shortDescription": "Public hospital ED, open 24 hours.",
  "categoryId": "medical-health",
  "phone": "02 9881 8000",
  "address": { "street": "75 Railway Street", "suburb": "Mount Druitt", "state": "NSW", "postcode": "2770" },
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Public Hospital", "Emergency Department", "24 Hours"],
  "createdAt": "2026-08-06T00:00:00Z",
  "updatedAt": "2026-08-06T00:00:00Z"
}
```

```json
{
  "id": "a49aa863-e967-43be-ab9b-7340783d2f4c",
  "slug": "westmead-hospital-emergency",
  "name": "Westmead Hospital Emergency Department",
  "description": "Public hospital emergency department, open 24 hours — one of the busiest in Australia.",
  "shortDescription": "Public hospital ED, open 24 hours.",
  "categoryId": "medical-health",
  "phone": "02 8890 5555",
  "address": { "street": "Level 1, 176 Hawkesbury Road", "suburb": "Westmead", "state": "NSW", "postcode": "2145" },
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Public Hospital", "Emergency Department", "24 Hours"],
  "createdAt": "2026-08-06T00:00:00Z",
  "updatedAt": "2026-08-06T00:00:00Z"
}
```

```json
{
  "id": "b1c61b38-1719-4c58-a5e1-75812bb6203b",
  "slug": "13cure-after-hours-home-doctor",
  "name": "13cure After-Hours Home Doctor",
  "description": "After-hours home-visit doctor service covering Schofields — bulk billed for eligible Medicare patients, doctors come to you rather than a clinic visit.",
  "shortDescription": "After-hours bulk billed home-visit doctor.",
  "categoryId": "medical-health",
  "phone": "13 28 73",
  "website": "https://www.13cure.com.au/locations/new_south_wales/schofields-16581",
  "serviceAreas": ["Schofields"],
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Home Doctor", "After Hours", "Bulk Billing"],
  "createdAt": "2026-08-06T00:00:00Z",
  "updatedAt": "2026-08-06T00:00:00Z"
}
```

```json
{
  "id": "7f762237-8d20-442a-9527-f6068de7555e",
  "slug": "castle-medical-marsden-park",
  "name": "Castle Medical Marsden Park",
  "description": "General practice and urgent care clinic offering walk-ins and online bookings. Rated 4.6★ from 162 reviews (Birdeye).",
  "shortDescription": "GP & urgent care, walk-in or online booking.",
  "categoryId": "medical-health",
  "phone": "02 7808 0810",
  "email": "marsdenpark@castlemedical.com.au",
  "website": "https://www.castlemedical.com.au/mp-contact-us/",
  "address": { "street": "101 Elara Boulevard", "suburb": "Marsden Park", "state": "NSW", "postcode": "2765" },
  "openingHours": {
    "monday": "09:00-20:00",
    "tuesday": "09:00-20:00",
    "wednesday": "09:00-20:00",
    "thursday": "09:00-20:00",
    "friday": "09:00-20:00",
    "saturday": "09:00-16:00",
    "sunday": "09:00-15:00"
  },
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["GP", "Urgent Care", "Walk-in"],
  "createdAt": "2026-08-06T00:00:00Z",
  "updatedAt": "2026-08-06T00:00:00Z"
}
```

### Acceptance Criteria

- [x] `medical-health` category added to `data/categories.json` with `displayOrder: 29`.
- [x] All 10 businesses above added to `data/businesses.json` under `medical-health`, not featured,
      no promotion.
- [x] `npm run validate:data` passes.
- [x] `/category/medical-health` lists all 10 businesses (paginated, 6 + 4); each `/business/<slug>`
      renders correctly. Verified 2026-08-06 via dev server + browser, including Castle Medical's
      rating/email and 13cure's service-area-only (no address) rendering.
- [ ] Existing Playwright suite still passes.

---

## Story 37 (F-039)

As a resident needing a plumber

I want to find plumbers in the directory

So that I have vetted local options — the directory had no plumbing category at all, despite it
being one of the most commonly needed trades.

### Source data (three phone-contact screenshots + one business URL, supplied directly by the
project owner, 2026-08-07, all recommended by the Akuna Vista community)

- Contact 1: "Allan plumber" (lowercase "p" in the saved contact), mobile `+61 437 976 871`, no
  photo.
- Contact 2: "Campbell Plumber", mobile `+61 416 018 882`, contact's Company field reads "Water
  Filter" (Android contact card convention — a company/org field shown under the name).
- Contact 3: "Glenn Plumber", mobile `+61 423 498 999`.
- `https://bigredplumbingservices.com.au/` — a real, distinct, verifiable business (own phone
  `0409 838 651`, different from all three contacts above), fetched directly: Big Red Plumbing
  Services, PO Box 15, Toongabbie NSW 2146, Licence Number 296254C, fully licensed and insured,
  24/7 emergency service, Greater Sydney Metro. Confirmed via Oneflare (8 reviews, hired 8 times)
  and a Facebook page; testimonials name the plumber "Steve". Not one of the three contacts above
  (no name/phone match) — added as a fourth, separate listing.

### Research

Web-searched each of the three phone numbers directly and combined with the visible names —
no matching business listing, website, or directory presence found for any of the three (Allan,
Campbell, or Glenn) under either the name or the number. Same pattern as F-036 (Craig Handyman,
Rajiv Dhiman Handyman): personal/word-of-mouth contacts with no existing online footprint, added
with just name + phone. No address, suburb, or email confirmed for any of the three, so none of
those fields are populated.

### Assumptions (flagged per the Correction Protocol — confirmed with the project owner before
implementation)

- "Allan plumber" listed as **"Allan Plumber"** — capitalization normalized to match the other two
  contacts' own casing ("Campbell Plumber", "Glenn Plumber"), not a name change.
- Campbell's "Water Filter" company-field note included as a tag (`Water Filter`) and mentioned in
  the description, on the assumption it reflects a real secondary specialty, not just a personal
  label the resident added.
- Big Red Plumbing Services' PO Box address used as `address.street` — it's a real, confirmed
  address, just not a shopfront (consistent with a licensed trade business that works on-site).

### Change — `data/categories.json`

```json
{
  "id": "plumbing",
  "slug": "plumbing",
  "name": "Plumbing",
  "icon": "Wrench",
  "description": "Plumbers and plumbing services for the Akuna Vista community.",
  "displayOrder": 30
}
```

### Change — `data/businesses.json`

```json
{
  "id": "d282c026-4be1-4fc6-9282-b7e779d3350d",
  "slug": "allan-plumber",
  "name": "Allan Plumber",
  "description": "Recommended by the Akuna Vista community. Contact directly to discuss your job and availability.",
  "shortDescription": "Local plumber, community recommended.",
  "categoryId": "plumbing",
  "phone": "+61 437 976 871",
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Plumbing"],
  "createdAt": "2026-08-07T00:00:00Z",
  "updatedAt": "2026-08-07T00:00:00Z"
}
```

```json
{
  "id": "fe1d5cd9-5fb6-4f15-96ce-c8af99c0f787",
  "slug": "campbell-plumber",
  "name": "Campbell Plumber",
  "description": "Recommended by the Akuna Vista community, including water filter installation. Contact directly to discuss your job and availability.",
  "shortDescription": "Local plumber & water filters, community recommended.",
  "categoryId": "plumbing",
  "phone": "+61 416 018 882",
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Plumbing", "Water Filter"],
  "createdAt": "2026-08-07T00:00:00Z",
  "updatedAt": "2026-08-07T00:00:00Z"
}
```

```json
{
  "id": "53e32e4f-990a-4595-8af0-9bfc802996a2",
  "slug": "glenn-plumber",
  "name": "Glenn Plumber",
  "description": "Recommended by the Akuna Vista community. Contact directly to discuss your job and availability.",
  "shortDescription": "Local plumber, community recommended.",
  "categoryId": "plumbing",
  "phone": "+61 423 498 999",
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Plumbing"],
  "createdAt": "2026-08-07T00:00:00Z",
  "updatedAt": "2026-08-07T00:00:00Z"
}
```

```json
{
  "id": "1d58f5c6-d612-4484-b1c3-ec3442328c74",
  "slug": "big-red-plumbing-services",
  "name": "Big Red Plumbing Services",
  "description": "Fully licensed and insured plumber (Licence No. 296254C) covering Greater Sydney Metro with 24/7 emergency service — blocked drains, hot water systems, burst pipes, gas fitting, and bathroom/kitchen renovations.",
  "shortDescription": "Licensed plumber, 24/7 emergency service.",
  "categoryId": "plumbing",
  "phone": "0409 838 651",
  "website": "https://bigredplumbingservices.com.au/",
  "address": { "street": "PO Box 15", "suburb": "Toongabbie", "state": "NSW", "postcode": "2146" },
  "images": ["/images/placeholder-business.svg"],
  "featured": false,
  "verified": false,
  "tags": ["Plumbing", "Emergency", "Licensed", "Gas Fitting"],
  "createdAt": "2026-08-07T00:00:00Z",
  "updatedAt": "2026-08-07T00:00:00Z"
}
```

### Acceptance Criteria

- [x] `plumbing` category added to `data/categories.json` with `displayOrder: 30`.
- [x] All 4 businesses above added to `data/businesses.json` under `plumbing`, not featured, no
      promotion.
- [x] `npm run validate:data` passes.
- [x] `/category/plumbing` lists all 4 businesses; each `/business/<slug>` renders correctly.
      Verified 2026-08-07 via dev server + browser.
- [ ] Existing Playwright suite still passes (will run as part of the pre-push hook on commit).
