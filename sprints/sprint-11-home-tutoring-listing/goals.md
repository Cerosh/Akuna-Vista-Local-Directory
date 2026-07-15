# Sprint 11 — Goals

Home Tutoring Listing

Owner: Cerosh Jacob

Last Updated: 2026-07-15

---

# Sprint Goal

Add one real business (a home tutoring service) and one real, featured promotion to the platform,
supplied directly by the project owner via a real advertisement PDF, including a working
enrolment link. Also add a new homepage card showing real-time parking availability at Schofields
and Tallawong stations.

---

# Objective

Two distinct pieces of work, deliberately kept in one sprint per the project owner's instruction:

1. **Pure real-content addition** (F-001–F-003) — no new features, schema, or components. Reuses
   the existing Business/Promotion schemas and rendering exactly as-is (Sprint 06/08's existing
   patterns).
2. **A genuinely new capability** (F-004) — this project's first live external API integration and
   first auto-refreshing content, requiring a new server route and a new Client Component.

---

# Why This Sprint Exists

The project owner supplied a real advertisement (`Home tutoring (2).pdf`, 2026-07-15) for a home
tutoring service and asked for it to be added to Local Promotions (featured) and Featured
Businesses, including the flyer's enrolment link. Rather than implement immediately, the project
owner asked for this to be tracked as a sprint (2026-07-15) — this is that sprint. The project
owner then asked (same session) for a real-time parking availability card to be added to the same
sprint, supplying the NSW Transport Open Data API details directly.

---

# Goals

1. **The tutoring business is real, findable content** — listed in the directory, its own category
   page, and Featured Businesses.
2. **The promotion is genuinely active, not silently invisible** — a real `startDate`/`endDate`
   confirmed with the project owner, not guessed (same lesson Sprint 09b's F-003 already learned
   with `data/events.json`).
3. **The enrolment link is correct** — the source PDF had two different candidate links; the
   correct one was confirmed with the project owner before this plan was finalised, not guessed.
4. **Featured promotions stay meaningful** — the project owner explicitly asked for this to be the
   only featured promotion, so the previously-featured lawn mowing promotion is un-featured as
   part of the same change, not left inconsistently featured alongside it.

---

# Non-Goals (this sprint)

- **No new schema fields for the tutoring content.** The enrolment link uses the existing
  `Business.website` field — no new "CTA link" or similar field is being introduced.
- **No new UI/components beyond exactly what F-004 needs.** `BusinessCard`, `PromotionCard`,
  `ContactInfo` already render everything F-001–F-003 need unchanged.
- **No other content changes.** F-001–F-003 are scoped to exactly the one business + one
  promotion + the one featured-flag flip the project owner asked for.
- **No general-purpose "live data" framework.** F-004 is a single-purpose route/component for
  carpark data specifically — not a generalised external-API abstraction layer (that's explicitly
  Sprint 10's territory, design-only).

---

# Success Criteria

Sprint 11 is successful when:

- [x] The tutoring business and its promotion are live, real, and correctly featured.
- [x] The enrolment link on the business's page is the confirmed, correct one.
- [x] The promotion is genuinely active (not published with a past/expired date) — confirmed
      range: 2026-07-27 to 2026-09-04.
- [x] The lawn mowing promotion is no longer featured.
- [x] The featured Local Promotions entry shows first, not wherever it happens to sit in the data
      file.
- [x] The transit widget shows real, live Schofields/Tallawong free-spot numbers (refresh: 5 min)
      and Schofields Station's next train departures (refresh: 30s), and never exposes the NSW
      Transport API key to the browser — verified via a real browser network inspection, not
      assumed.
- [x] The transit widget is a compact sidebar next to Hero, not a full-width section — Popular
      Categories occupies the page's primary position right after Hero, matching this platform's
      identity as a local business directory first.

---

# Guiding Principle

Real content supplied by the project owner should go live accurately — the right name, the right
link, the right dates — not just quickly. A wrong enrolment link is worse than no listing at all.
