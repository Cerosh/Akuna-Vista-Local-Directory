# Sprint 04 — Goals

Business Details

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Goal

Show complete information for a business.

---

# Objective

Give every business in the directory a complete, professional profile page that answers a visitor's practical questions — how do I contact them, do they cover my area, are they open now, what do they look like — without requiring a follow-up message to anyone.

---

# Why This Sprint Exists

Sprints 2 and 3 built cards that summarise a business and link onward; this sprint builds the page those links actually point to. PROJECT.md's product principle is explicit that a business profile should answer the user's questions "without requiring additional clicks" — that's the literal bar for this sprint, not just "display the JSON fields."

This is also the point where individual businesses become independently valuable and shareable: a resident can send a single business's link into the WhatsApp group instead of describing it, and a business owner has something concrete to point to when asked "do you have a website?" That shareability and per-business SEO groundwork also supports PROJECT.md's monetisation path — premium/featured placement (Phase 2) only makes sense once a "regular" listing is already worth having.

---

# Goals

1. **Answers, not just data** — contact info, service areas, hours, gallery, and social links are presented so a visitor can act (call, message, decide to visit) without extra steps.
2. **Graceful with incomplete data** — not every business record will have every optional field populated; the page must look intentional and complete regardless.
3. **Shareable** — a share button and clean canonical URL make it trivial to pass a business's page along, directly serving PROJECT.md's goal of replacing WhatsApp recommendation threads.
4. **Independently discoverable** — per-business SEO metadata and `LocalBusiness` structured data mean each business page can be found and previewed correctly outside the app (search engines, messaging link previews) — scoped narrowly to this page, not site-wide SEO (that's Sprint 08).
5. **Consistent with existing architecture** — the page is built entirely from `BusinessRepository`, matching the Repository Pattern already proven in Sprints 1–3.

---

# Non-Goals (this sprint)

- No site-wide SEO infrastructure (sitemap.xml, robots.txt, canonical URL strategy across the whole site, default Open Graph image) — Sprint 08.
- No reviews or recommendation submission — reviews remain a Version 2 feature (PROJECT.md "Out of Scope"); this sprint can display recommendation counts already present in the business schema but does not add new recommendation data entry.
- No related-businesses recommendation algorithm — if included, keep it simple (e.g. same category) rather than building ranking logic that belongs conceptually to Sprint 5/10 (Search/AI-ready).
- No real business photography — gallery uses placeholder images per PROJECT.md's MVP scope.

---

# Success Criteria

Sprint 4 is successful when:

- [x] Every business record in the dataset renders a complete, professional-looking profile page.
- [x] Optional fields (gallery, social links, service areas) degrade gracefully when absent — no broken UI.
- [ ] Structured data for at least one business validates against Google's Rich Results Test.
      Structurally re-validated against schema.org's `LocalBusiness` properties in Sprint 7
      (`lib/services/structuredData.ts`, no gaps found) — but an actual Google Rich Results Test
      run was never performed; it needs a public URL, which this project didn't have until Sprint 9,
      and no record exists of it being run since. Disclosed in `sprints/sprint-07-quality/review.md`
      and `.ai/CONTEXT.md`'s Known Constraints, not silently marked done. Left unchecked —
      genuinely still owed, not a documentation staleness issue like the rest of this pass.
- [x] Playwright coverage exists for directory → business page navigation.
- [x] No component reads JSON directly — everything flows through `BusinessRepository`.

---

# Guiding Principle

If a visitor still needs to ask the WhatsApp group a question this page could have answered, the page isn't done yet.
