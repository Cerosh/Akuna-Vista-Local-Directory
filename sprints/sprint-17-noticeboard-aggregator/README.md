# Sprint 17 – Community Noticeboard Aggregator

Neighbourhood Directory Platform

Sprint Number: 17

Sprint Name: Community Noticeboard Aggregator

Sprint Goal: Rebuild the Community Noticeboard from a manually-authored list into an automated,
weekly aggregator that pulls real Blacktown Council data, summarizes it in plain English (never
copying source text verbatim), and publishes only new/changed items — per the project owner's
"Community Noticeboard – Engineering & Content Principles" and "Feature Requirements" documents
(supplied 2026-07-23).

Sprint Status: ⏸ Paused (2026-07-23) — spec captured, design review finished, implementation not
started. Awaiting project owner review of the 11 open questions in "Open Design Questions — Awaiting
Project Owner Review" below before F-001 begins.

Start Date: 2026-07-23

End Date: (ongoing — phased)

Owner: Cerosh Jacob

Last Updated: 2026-07-23

---

# Numbering

Sequential addition after Sprint 16 (Backlog, ongoing). New sprint rather than folding into Sprint
16, since this is a themed, multi-feature body of work (not a scattered backlog item) — matching
the precedent set by Sprints 11–14 for themed feature work.

---

# Sprint Objective

Replace the current static, manually-curated `data/announcements.json` noticeboard with a source-
adapter architecture that automatically discovers, summarizes, categorizes, and publishes local
council updates — while leaving the official council website as the source of truth for full
detail, per the Guiding Principles (never reproduce content verbatim; always link to the official
source; only publish what a resident would actually find useful; concise enough to scan the whole
board in under 30 seconds).

---

# Business Value

- Removes the manual-authoring bottleneck that has driven every noticeboard update so far (Sprint
  09b F-009, and every entry in `data/announcements.json` to date) — updates currently only happen
  when the project owner personally pastes source content into chat.
- Answers a concrete resident question every week ("what's changed around Akuna Vista?") without
  residents needing to visit Blacktown Council's own site, which is dense and not suburb-scoped.
- Extensible architecture (adapter-per-source) means Transport NSW, BOM, Sydney Water, and Ausgrid
  can be added later with the pipeline already proven, per the Future Architecture section of the
  requirements doc.

---

# Architecture Decisions (confirmed by project owner, 2026-07-23)

Four load-bearing decisions were confirmed via clarifying questions before this spec was written,
since this project is currently documented as stateless/no-database
(`.ai/ARCHITECTURE.md:562-568`) with zero existing scheduled-job or LLM infrastructure:

1. **Execution & persistence: GitHub Actions, not Vercel Cron.** A weekly GitHub Actions workflow
   runs the full pipeline and commits new/updated notices plus a snapshot file (for change
   detection) directly into `data/`. No new database, no new paid storage — keeps this project's
   documented "stateless, static JSON via the Repository Pattern" architecture intact. Trade-off,
   surfaced and accepted: publishing happens on the next deploy (triggered by the commit), not
   instantly — acceptable for a weekly cadence.
2. **Publish gate: PR review, not auto-publish.** The weekly workflow opens a pull request with the
   new/changed notices rather than committing straight to `main`. Nothing goes live until the
   project owner reviews and merges — a deliberate v1 safety net while AI-summarization quality is
   unproven, directly implementing the requirements doc's "If confidence is low, do not publish."
3. **AI summarization: direct Anthropic API key.** A new `ANTHROPIC_API_KEY` secret (server-side
   only, used inside the GitHub Actions workflow — never exposed to the browser), following the
   existing `TRANSPORT_NSW_API_KEY` precedent (Sprint 11) for how this project adds a new external
   API credential.
4. **Source URLs: project-owner-supplied, not fabricated.** Per this project's standing rule to
   never guess/generate URLs (Sprint 15 F-009 precedent), the project owner supplied one real URL
   (Blacktown's "My Neighbourhood" address-scoped tool). That single page turned out to be the
   entire data source needed — see Source Investigation Findings below.

---

# Source Investigation Findings (2026-07-23, real browser session)

Before designing the adapters, the supplied URL and the Blacktown Council site itself were actually
navigated (not assumed) to find real, structured data — per the requirements doc's "prefer official
APIs or machine-readable feeds if they are available" and "never fabricate/guess URLs."

**The site runs on the Granicus "OpenCities" council CMS** (confirmed via footer: "Powered by
Granicus"). This matters because it exposes semi-structured JSON endpoints behind its interactive
widgets — not just raw HTML requiring a headless browser to scrape.

**The single "My Neighbourhood" page the project owner supplied is the whole data source** — it's
an address-centred map widget with 6 filterable layers, each with its own icon and checkbox
("Choose map options," revealed via the page's own "Show map options" control):

| Layer (site's own label) | Icon | In scope for this sprint? |
|---|---|---|
| **Events** | calendar | ✅ yes — per project owner, 2026-07-23 |
| **Consultations** | speech bubble | ✅ yes — per project owner, 2026-07-23 |
| **Works and Projects** | shovel | ✅ yes — per project owner, 2026-07-23 |
| Parks & Recreation | tree | ❌ out of scope |
| Halls, Venues & Facilities | building | ❌ out of scope |
| Local directory | phone | ❌ out of scope |

This directly replaces the earlier plan to scrape the separate `/Works-and-projects` search page
(460 results, city-wide, no natural local scoping). The map widget is **inherently address-scoped**
— confirmed by real data appearing for the supplied address (54 Nabthorpe Parade, Nirimba Fields):
a Parks pin ("Douglas Siding Reserve"), a Consultations pin ("DA-18-01783 — construction of 93
detached and 30 multi dwellings"), and two Works and Projects pins ("Aerodrome Drive to Quakers Hill
Parkway link road" and "Railway Terrace, Schofields" — both of which match this project's own
existing `data/announcements.json` entries, a good real-world cross-check that this source is
accurate). This resolves the earlier "460 city-wide results" scoping problem for free, and also
directly covers "Events" (the requirements doc's 🎉 Community Events category) without needing a
separate, unconfirmed "Community News" page.

1. **Waste Collection — CONFIRMED, real JSON endpoint, already fully characterised:**
   `GET https://www.blacktown.nsw.gov.au/ocapi/Public/myarea/wasteservices?geolocationid={id}&ocsvclang=en-AU&pageLink=...`
   Returns `{"success":true,"responseContent":"<small HTML fragment>"}` — General Waste / Recycling
   / Green Waste, each with a next-collection date. Plain `fetch()` + a light HTML-fragment parse
   (e.g. `cheerio`) is sufficient — no Playwright. `geolocationid` for the supplied address is
   `e2d2c31e-1d04-450f-904b-b4163b7b0f2e`, resolved once via `GET /api/v1/myarea/searchbyid?addressId=...`
   and confirmed stable outside the page's own session.
2. **Events / Consultations / Works and Projects — CONFIRMED to exist and be real, exact response
   shape NOT YET captured.** All 6 map layers are served by one endpoint,
   `POST https://www.blacktown.nsw.gov.au/ocmaps/layer` (confirmed as the only network call that
   fires when the map loads/re-filters). The page itself is real and the pin data it renders is
   real (see the cross-check above) — but the exact JSON request/response shape of that POST wasn't
   captured: the page carries a heavy chatbot/analytics widget that kept the browser tab's main
   thread busy long enough that script-injection-based network interception kept timing out mid-
   session. **This is flagged honestly, not silently assumed** — confirming the exact payload shape
   (likely via a plain Node `fetch()` script run outside a browser, which won't have this
   contention) is the first concrete task of F-004's implementation, not a blocker to writing the
   rest of the spec around it.

---

# Success Criteria

Per Feature, the sprint is successful when:

- [ ] The Feature's Acceptance Criteria are met.
- [ ] `npm run validate:data` passes (schema + referential integrity).
- [ ] Existing Playwright suite still passes.
- [ ] For F-003–F-006 (the live pipeline): at least one real, manually-triggered dry run produces
      sensible, non-hallucinated, correctly-sourced notices before the weekly schedule is enabled.
- [ ] No known critical defects.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Extend `Announcement` schema (category, source, status, officialUrl) and migrate the 5 existing entries in place | High | Not Started |
| F-002 | Source adapter interface (`fetch`/`detectChanges`/`summarise`/`categorise`/`publish`) + snapshot-diff engine | High | Not Started |
| F-003 | Blacktown "Waste Collection" adapter (real JSON endpoint) + new "next collection" noticeboard widget | High | Not Started |
| F-004 | Blacktown "My Neighbourhood" map-layer adapter: Events, Consultations, Works and Projects | High | Not Started |
| F-005 | AI summarization + categorization pipeline (Anthropic API, original-wording + confidence gate) | High | Not Started |
| F-006 | GitHub Actions weekly workflow: run pipeline → snapshot diff → open PR with new/changed notices | High | Not Started |
| F-007 | Noticeboard UI update: category badges/icons, source/last-updated attribution, official link, status field | Medium | Not Started |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# Assumptions Requiring Confirmation

Flagged here per the Correction Protocol, rather than silently decided — please confirm or correct
before implementation starts:

1. **Map radius/zoom for the Events/Consultations/Works and Projects layer (F-004)** — the map
   naturally scopes results to its current viewport around the resolved address, but the exact
   radius that viewport covers hasn't been measured yet (does it comfortably cover all of Akuna
   Vista, or just the immediate streets around 54 Nabthorpe Parade?). Proposed: confirm this during
   F-004 implementation once the real `/ocmaps/layer` payload is captured — if it's too tight, the
   fix is widening the map's zoom/bounds before querying, not a suburb-name text filter.
2. **Existing 5 `data/announcements.json` entries** — proposed to migrate in place (add the new
   `category`/`status` fields, tag `source: "manual"` since they predate this pipeline) rather than
   delete/replace, so no existing content is lost. Flag if you'd rather retire them once real
   automated notices exist.
3. **Bin Collection "don't over-notify" rule, and how the date stays current without a weekly
   commit** — resolved 2026-07-23 after working through an actual contradiction in the original
   framing (a live widget reading a *stored, static* date would go stale forever if `detectChanges`
   also ignores date-only changes). The real design: the adapter stores a **pattern**, not a single
   date — `{ stream, weekday, frequency: "weekly" | "fortnightly", anchorDate }`, derived from one
   real API fetch (Blacktown's response already states both the frequency and one real next-service
   date per stream). `BinCollectionWidget.tsx` computes "next collection" live on every render from
   that pattern via plain date arithmetic (weekly = next occurrence of that weekday; fortnightly =
   next occurrence of that weekday at the correct 14-day parity from `anchorDate`) — no re-fetch
   needed to keep the displayed date correct. The weekly F-006 run still re-fetches to *verify* the
   pattern still holds (a real council schedule change), not to refresh a date for display; a
   mismatch between the stored pattern's prediction and the live API is what triggers a PR, not the
   date having advanced. **Not yet confirmed**: whether Recycling/Green Waste report
   `frequency: fortnightly` in the same machine-parseable way General Waste reports `weekly` (only
   General Waste's response was fully inspected during spec investigation) — first concrete check
   in F-003's implementation.

---

# Open Design Questions — Awaiting Project Owner Review (added 2026-07-23)

A full design review was done against the spec above before starting F-001. It surfaced real gaps
— including one concrete collision confirmed directly against this repo's own data, not
hypothetical. **Nothing in this section has been decided yet.** Work paused here at the project
owner's request; resume by working through these, then continue at F-001.

### Critical — block F-001/implementation until resolved

1. **The pipeline will create duplicate notices on its very first run.** Directly checked
   `data/announcements.json`: it already has manually-authored entries for "Aerodrome Drive to
   Quakers Hill Parkway link road" and "Railway Terrace, Schofields road construction" — and both of
   those exact projects showed up as live pins during the My Neighbourhood investigation (Source
   Investigation Findings). F-004 currently has no dedup logic against the 5 existing manual
   entries. Needs a reconciliation strategy — e.g. match on title similarity against existing
   entries at `summarise()` time, or retire the 2 overlapping manual entries as part of F-001
   instead of migrating them.
2. **`categorise()` (adapter interface, F-002) and category-assignment inside `summarise()` (F-005,
   AI) both claim to set `Announcement.category` — unclear which one actually wins.** F-004's own
   story text says Works-and-Projects needs *per-item* judgment ("road-works or development,
   disambiguated per item"), which sounds like AI territory, making the separate `categorise()`
   method in the `NoticeboardSource` interface look redundant or actively conflicting with F-005.
   Needs one clear owner for category assignment.
3. **No stable natural key defined for matching "same item, updated" vs. "brand new item" across
   weekly runs**, for the Events/Consultations/Works-and-Projects source. Waste has an obvious key
   (the stream name); the map-layer items don't — unless the still-uncaptured `/ocmaps/layer`
   payload includes a stable pin ID, `detectChanges` has nothing reliable to match on besides title
   text, which breaks the moment a council edits a title's wording (looks like "new," not
   "updated"). Can't be fully resolved until the real payload is captured (F-004's first task), but
   named here as a known unknown rather than silently assumed solvable.

### Important — resolve before F-004/F-005/F-006, not necessarily before F-001

4. **Notice lifecycle/expiry is undefined.** Nothing sets `expiresAt` on auto-generated notices, and
   nothing handles an item that disappears from the source (a completed project, a closed
   consultation). Left alone, the board grows unbounded forever, contradicting the "scan in under 30
   seconds" goal, and can point residents to dead links.
5. **`source` (org name) is required in the new schema, but the existing 5 entries don't cleanly fit
   "Blacktown City Council."** Verified directly: 2 are actually Transport for NSW projects, 1 is a
   private developer's DA before a state planning panel (Council isn't really "the source" there).
   F-001's migration needs per-item judgment, not a blanket default.
6. **All 5 existing entries have `sourceUrl: null`** (verified directly — not 4/5 as earlier
   secondhand research suggested). The new schema's core promise (source + link always visible)
   can't be satisfied for legacy entries. F-007 needs an explicit rule for "no link available" on
   `origin: manual` items, not a silently broken/missing link.
7. **AI confidence self-reporting is a known-weak pattern.** Asking the model to output a
   "confidence" number and trusting it isn't validated — models are generally not well-calibrated at
   self-rating. Decide now whether that's good enough for v1, or whether a firmer heuristic (min
   source text length, required fields present) should gate publishing instead.
8. **Model choice and cost aren't specified anywhere.** Given the task (short structured
   summarization), Haiku is probably the right default rather than a larger model — worth pinning
   down explicitly rather than leaving it to whoever implements F-005.
9. **GitHub Actions permissions block isn't specified.** Opening a PR from a workflow needs
   `permissions: contents: write, pull-requests: write` (or a PAT) — currently the spec just says
   "opens a PR," which will silently fail without this.
10. **No handling for an unmerged PR from last week when this week's run fires.** With weekly cadence
    + manual review gate, it's plausible a PR sits unreviewed for a while — next run's diff is
    computed against the last *committed* snapshot, not the pending PR, so it could re-propose
    overlapping items. Needs an explicit rule (skip if one's already open, supersede it, etc.).

### Minor

11. `bin-collection` is in the `AnnouncementCategory` enum, but F-003's design never produces an
    `Announcement` record for waste (it's a separate live-computed widget) — so that category may
    end up permanently unused. Confirm intentional.

---

# User Stories

## Story 1 (F-001) — Schema migration

As the noticeboard system

I need a data model that can hold a category, a source organisation, a status, and a clear
official-source link for every notice

So that every future automated notice (and the 5 existing manual ones) can satisfy the Guiding
Principles' "Source Attribution" requirement (source, last updated, official link, always visible).

### Proposed schema change — `types/announcement.ts`

```ts
export type AnnouncementCategory =
  | "development"
  | "road-works"
  | "transport"
  | "utilities"
  | "water"
  | "bin-collection"
  | "parks"
  | "community-events"
  | "council-notices";

export interface Announcement {
  id: string;
  title: string;
  message: string; // original-wording summary, 2–3 sentences max — never copied verbatim from source
  category: AnnouncementCategory;
  status?: string; // e.g. "Under Assessment", "In Progress" — optional, source-dependent
  source: string; // e.g. "Blacktown City Council" — organisation, not URL
  sourceUrl?: string; // renamed conceptually to "officialUrl" in the requirements doc; kept as
                       // `sourceUrl` to avoid a breaking rename across existing consumers
  publishedAt: string;
  updatedAt?: string; // new — distinct from publishedAt, since council items get updated in place
  expiresAt?: string;
  priority: "normal" | "high";
  featured: boolean;
  origin: "manual" | "blacktown-waste" | "blacktown-my-neighbourhood";
}
```

`category` is required going forward (the 9 categories from the requirements doc); `origin` records
which adapter (or "manual") produced the notice, so a future re-run's snapshot diff and any
debugging can trace provenance without guessing.

### Migration of the 5 existing entries

Each gets a `category` assigned by re-reading its existing `message` text (no re-authoring), plus
`origin: "manual"`. Example (illustrative, all 5 done the same way):

- "Aerodrome Drive to Quakers Hill Parkway link road planned" → `category: "road-works"`
- "Townson Road and Burdekin Road upgrades in planning" → `category: "road-works"`
- (remaining 3 categorized the same way once implementation starts — full list in the Acceptance
  Criteria checklist, not duplicated here to avoid drifting out of sync with the actual data file)

### Acceptance Criteria

- [ ] `types/announcement.ts` updated with `category`, `status?`, `source`, `updatedAt?`, `origin`.
- [ ] All 5 existing entries in `data/announcements.json` migrated with a correct `category` and
      `origin: "manual"` — no content/meaning changed, purely additive fields.
- [ ] `scripts/lib/validation.ts` updated to validate the new required `category`/`source`/`origin`
      fields (enum-checked against the 9 categories).
- [ ] `npm run validate:data` passes.
- [ ] `AnnouncementCard.tsx` still renders correctly with the new fields present (no UI change
      required yet — that's F-007).
- [ ] Existing Playwright suite still passes.

---

## Story 2 (F-002) — Adapter interface & snapshot-diff engine

As the noticeboard pipeline

I need a common interface every source implements, and a way to detect what's actually new

So that adding Transport NSW/BOM/Sydney Water later (per the requirements doc's Future
Architecture) means writing one new adapter, not touching the pipeline itself.

### Proposed structure

```
lib/noticeboard/
  types.ts              # NoticeboardSource interface, RawItem, Notice types
  snapshotDiff.ts        # compares a new fetch's items against data/noticeboard-snapshots/{source}.json
  pipeline.ts            # orchestrates fetch → detectChanges → summarise → categorise → publish
sources/
  blacktown/
    waste.ts             # F-003
    myNeighbourhood.ts   # F-004 — Events, Consultations, Works and Projects layers
data/
  noticeboard-snapshots/
    blacktown-waste.json
    blacktown-my-neighbourhood.json
```

Each source module exports:

```ts
interface NoticeboardSource {
  id: string; // matches Announcement.origin
  fetch(): Promise<RawItem[]>;
  detectChanges(previous: RawItem[], current: RawItem[]): RawItem[]; // new/changed only
  summarise(item: RawItem): Promise<{ title: string; message: string }>; // AI, F-005
  categorise(item: RawItem): AnnouncementCategory;
}
```

`detectChanges` is content-hash based (hash of the raw source fields that matter, e.g. title +
description + status — explicitly excluding anything cosmetic like HTML whitespace) — matches the
requirements doc's "ignore cosmetic website changes."

### Acceptance Criteria

- [ ] `lib/noticeboard/types.ts` defines the interface above.
- [ ] `lib/noticeboard/snapshotDiff.ts` has unit tests covering: no previous snapshot (first run,
      everything is "new"), unchanged item (no diff), changed field (flagged), removed item
      (handled without crashing).
- [ ] `lib/noticeboard/pipeline.ts` orchestrates the 5-step flow against a source, with each source
      pluggable (no source-specific logic in the pipeline itself).
- [ ] **`pipeline.ts` never calls `summarise()` (the paid AI step) when `detectChanges()` returns an
      empty array** — verified with a unit test asserting zero calls to a mocked `summarise` on a
      no-change run, not just inferred from step order. This is what guarantees a no-op weekly run
      costs nothing and opens no PR.
- [ ] `npm run test` (unit tests) passes with new coverage for the diff engine.

---

## Story 3 (F-003) — Waste Collection adapter + widget

As a resident checking the noticeboard

I want to see my next bin collection date without visiting Council's site

So that I don't need to remember or look it up separately.

### Implementation

- `sources/blacktown/waste.ts` calls the confirmed real endpoint (Source Investigation Findings #1)
  with the pinned `geolocationid` for Akuna Vista, parses the HTML fragment for each stream present
  (General Waste / Recycling / Green Waste) — no Playwright.
- **Per Assumption #3 above (the corrected design): the adapter derives and stores a pattern, not a
  raw date** — `{ stream, weekday, frequency, anchorDate }` per stream, written to
  `data/noticeboard-snapshots/blacktown-waste.json`. `detectChanges` compares the *pattern*
  (weekday + frequency), not the literal next-service date string, so a normal week-to-week date
  advance is never treated as a change.
- New `features/community/BinCollectionWidget.tsx` — a distinct, small widget (not a generic
  `AnnouncementCard`), computing and displaying the next upcoming collection **live at render time**
  from the stored pattern (date arithmetic, not a stored date), per the requirements doc's layout:
  "Display General Waste / Recycling / Green Waste (if available). Highlight the next upcoming
  collection."

### Acceptance Criteria

- [ ] `sources/blacktown/waste.ts` fetches and correctly parses real General Waste / Recycling /
      Green Waste entries, confirming whether each reports `weekly` or `fortnightly` (verified
      against the live endpoint during implementation — not assumed from General Waste alone).
- [ ] Pattern-derivation logic has unit tests: a weekly pattern's "next collection" is correct for
      several different "today" dates across a month; a fortnightly pattern's "next collection"
      correctly alternates every 14 days from its anchor across several test dates.
- [ ] `BinCollectionWidget.tsx` renders on the homepage noticeboard, showing the live-computed next
      collection per waste stream (verified on more than one calendar day / mocked date, not just
      whatever today happens to be during implementation).
- [ ] A weekly re-fetch that confirms the pattern still holds produces **no** diff/PR; a re-fetch
      where the live API's weekday no longer matches the stored pattern **does** produce a diff —
      both cases covered by a unit test against `detectChanges`, not just the happy path.
- [ ] `npm run validate:data` and the Playwright suite pass.

---

## Story 4 (F-004) — "My Neighbourhood" map-layer adapter (Events, Consultations, Works and Projects)

As a resident

I want to see events, consultations, and works/projects that are actually near me

So that I get locally-relevant updates without wading through city-wide noise — and per the project
owner's explicit choice of these 3 specific layers (2026-07-23) out of the 6 available on the map.

### Implementation

- `sources/blacktown/myNeighbourhood.ts` calls the same `POST /ocmaps/layer` endpoint the "My
  Neighbourhood" page itself uses, scoped to the pinned Akuna Vista `geolocationid`
  (`e2d2c31e-1d04-450f-904b-b4163b7b0f2e`, shared with F-003) and filtered to only the **Events**,
  **Consultations**, and **Works and Projects** layers — the other 3 available layers (Parks &
  Recreation, Halls/Venues & Facilities, Local directory) are explicitly out of scope, per the
  project owner's instruction.
- **First implementation task**: capture the real `/ocmaps/layer` request/response shape via a
  plain Node script (not a browser — the live page's chatbot/analytics widget made in-browser
  network interception unreliable during spec investigation, see Source Investigation Findings).
  Confirm field names for title/description/status/date/category-layer before writing the parser.
- Each of the 3 layers maps to an `AnnouncementCategory`: Works and Projects → `road-works` or
  `development` (disambiguated per item, since both road and building works appear here — e.g. the
  confirmed "Aerodrome Drive" item is road-works, a DA-style item would be `development`);
  Consultations → `council-notices`; Events → `community-events`.

### Acceptance Criteria

- [ ] Real `/ocmaps/layer` request/response shape documented (added to this file) before the parser
      is written against it.
- [ ] Fetches and parses real Events, Consultations, and Works and Projects pins for the Akuna Vista
      area — verified against the live endpoint, cross-checked against the 4 real items already
      manually confirmed during spec investigation (Douglas Siding Reserve is a Parks pin and
      correctly excluded; DA-18-01783, Aerodrome Drive, and Railway Terrace are correctly included).
- [ ] Parks & Recreation, Halls/Venues & Facilities, and Local directory pins are never fetched or
      published, even if present in the raw API response.
- [ ] Snapshot stored at `data/noticeboard-snapshots/blacktown-my-neighbourhood.json`.
- [ ] `npm run validate:data` and the Playwright suite pass.

---

## Story 5 (F-005) — AI summarization & categorization

As a resident

I want a short, original, plain-English summary of each update, not copied source text

So that I can understand what changed in seconds, per the Guiding Principles' "never reproduce
website content verbatim."

### Implementation

- New `lib/noticeboard/summarise.ts`, calling Anthropic's API (`ANTHROPIC_API_KEY`, server-only —
  used inside the GitHub Actions workflow, never shipped to the browser) with a prompt constrained
  to: 2–3 sentences, plain English, original wording, one of the 9 categories, and an explicit
  confidence signal — if the model can't confidently summarise (e.g. source text is ambiguous or
  too sparse), the item is skipped, not published, per "If confidence is low, do not publish."
- No speculation/opinion in output — prompt explicitly instructs factual summarization only, per
  "Make AI useful, not visible... Do not expose AI-generated speculation or opinions."

### Acceptance Criteria

- [ ] `summarise()` produces a 2–3 sentence original summary + category for a real sample of items
      from both live sources (F-003, F-004) — manually reviewed for accuracy, not just "it ran."
- [ ] Low-confidence items are excluded from output (verified with at least one deliberately
      ambiguous/sparse test input).
- [ ] No verbatim source-text copying — spot-checked against source during review.
- [ ] Unit tests cover the prompt/response parsing logic with mocked API responses (no real API
      calls in the test suite, to keep `npm run test` fast/free/deterministic).

---

## Story 6 (F-006) — Weekly GitHub Actions workflow

As the project owner

I want the pipeline to run automatically every week and hand me a reviewable PR

So that the noticeboard stays current without manual work, but nothing publishes without my sign-off.

### Implementation

- `.github/workflows/noticeboard.yml` — scheduled weekly (cron), plus `workflow_dispatch` for
  manual runs.
- Runs the pipeline (F-002–F-005) against both live sources, diffs against stored snapshots,
  updates `data/announcements.json` + snapshot files only if there are new/changed items, and opens
  a PR (using `peter-evans/create-pull-request` or equivalent) — no PR opened if nothing changed,
  per "If no changes are detected, no new notice should be published."
- Secrets: `ANTHROPIC_API_KEY` added as a GitHub Actions repository secret (project owner action —
  I cannot create secrets on your GitHub account).

### Acceptance Criteria

- [ ] Workflow runs on `workflow_dispatch` successfully in a real (not simulated) run.
- [ ] Produces a PR only when there are actual new/changed items; produces none on a no-op rerun.
- [ ] PR diff is reviewable — clearly shows new `data/announcements.json` entries and updated
      snapshot files.
- [ ] Weekly `cron` schedule configured and documented in `.ai/DEPLOYMENT.md`.

---

## Story 7 (F-007) — Noticeboard UI update

As a resident scanning the noticeboard

I want to see a category, status, and clear source link on every item

So that I can tell at a glance what kind of update it is and where to read more, per the
requirements doc's example layout.

### Implementation

- `components/cards/AnnouncementCard.tsx` — add a category badge (icon + label, matching the 9
  categories' emoji/icon per the requirements doc — using `lucide-react` icons dynamically resolved,
  same pattern as `CategoryCard.tsx`), a `status` line when present, and restyle the existing
  `sourceUrl` link as "View Official Details →" per the example.
- `features/community/Announcements.tsx` — group/sort by category or keep chronological (flag
  preference during implementation; defaulting to chronological, matching current behaviour, unless
  told otherwise).

### Acceptance Criteria

- [ ] Every notice shows its category (icon + label), source organisation, updated date, and an
      official link.
- [ ] `status` renders when present, hidden when absent (not every source has one).
- [ ] Visually verified on a local dev server against the migrated F-001 data.
- [ ] Existing Playwright suite still passes (locator updates if any text changed).

---

# Dependencies

- F-002 must exist before F-003/F-004 (both implement its interface).
- F-005 depends on F-003/F-004 producing real fetched items to summarise against.
- F-006 depends on F-002–F-005 all working locally (dry-run) before the schedule is trusted to run
  unattended.
- F-007 depends on F-001's schema migration (needs `category`/`status` to render).

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| Blacktown's `/ocapi`/`/ocmaps/layer` endpoints are undocumented and could change shape without notice | Medium | Snapshot-diff + PR-review gate (F-006) means a broken parse produces an empty/failed PR, not silently wrong published content; add a basic shape-check in each adapter's `fetch()` that throws loudly rather than publishing garbage |
| `/ocmaps/layer`'s exact payload shape wasn't captured during spec investigation (browser tab contention) | Low | First concrete task of F-004 is confirming it via a plain Node script, before any parser is written against assumed field names |
| Weekly scrape frequency against a public council site — politeness/ToS | Low | Weekly cadence, single request per source per run, real `User-Agent`, no parallel hammering — matches the requirements doc's "reasonable request frequency" |

---

# Documentation Required

Before starting implementation, read:

- `.ai/CLAUDE.md` (Spec-Driven Development section)
- `.ai/ARCHITECTURE.md` (current stateless/JSON architecture, being extended not replaced)
- `.ai/JSON_SCHEMA.md` (needs updating alongside F-001)
- This sprint's Source Investigation Findings above before touching any adapter code — don't
  re-derive endpoints from memory, the real ones are documented here.

---

# Next Steps

Spec captured 2026-07-23, not yet implemented. **Work paused 2026-07-23 at the project owner's
request** ("store this let me come back") right after a full design review — see "Open Design
Questions — Awaiting Project Owner Review" above for the 11 items to resolve first (3 critical, 7
important, 1 minor). The original "Assumptions Requiring Confirmation" section above that is
already resolved; the Open Design Questions section is what's actually blocking. Recommended
implementation order once resolved: F-001 → F-002 → F-003 → F-004 → F-005 → F-006 → F-007.
