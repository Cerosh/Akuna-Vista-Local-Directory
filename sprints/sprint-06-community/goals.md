# Sprint 06 — Goals

Community Content

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Goal

Expand beyond a directory.

---

# Objective

Give residents a reason to return to Akuna Vista Local Directory when they have no specific business in mind — community events, business promotions, community announcements, a unified featured content mechanism, a community spotlight, and an honest placeholder for local news.

---

# Why This Sprint Exists

Sprints 1–5 built and completed the transactional path: a resident arrives with a need (find a plumber, compare businesses, read a full profile, search by keyword) and leaves once that need is met. PROJECT.md's Secondary Goals are explicit that the platform should also "encourage community engagement" and "build long-term recurring traffic" — neither of which a pure business directory delivers on its own, since there's no reason to open the site again until the next specific need arises.

This sprint exists to give the platform a second reason to be visited: content that changes over time and isn't tied to a specific transactional intent. It is also where PROJECT.md's Product Philosophy — "We are not building a business directory. We are preserving community knowledge" — becomes visible in the product for the first time beyond the business listings themselves.

Note: this sprint deliberately pulls Community Events and Promotions forward from where PROJECT.md and JSON_SCHEMA.md originally placed them (Version 4 / "(Future)"). This is the project owner's explicit decision, not scope drift — see the README.md Risks section and notes.md for how that tension is handled.

---

# Goals

1. **Give residents a reason to return without a specific need** — events, promotions and announcements should make the site worth checking periodically, not just when searching for a business.
2. **Reuse, don't reinvent** — events, promotions and announcements should reuse the same repository, card-grid, empty-state and pagination patterns already proven in Sprints 1–3, not introduce new list UI.
3. **One featured content mechanism, not three** — "featured" should be a single cross-content-type concept (an event, promotion or announcement flagged `featured: true`), surfaced through one mechanism.
4. **Extend the schema deliberately, not silently** — activating the Event and Promotion schemas, and defining a new Announcement schema, should be done following JSON_SCHEMA.md's existing conventions and Versioning rules, with the scope-advancement explicitly documented rather than quietly absorbed.
5. **Be honest about what isn't built yet** — the local news section should read as a genuine "coming soon" placeholder, not a stub disguised as a finished feature.

---

# Non-Goals (this sprint)

- No reviews, testimonials or other user-generated content — reviews remain a Version 2 feature (PROJECT.md "Out of Scope"); the community spotlight surfaces existing business/event data only, it does not collect new opinions.
- No real local news feed, external content source, or news aggregation logic — the news section is a placeholder component only.
- No CMS or admin authoring UI for events, promotions or announcements — content is authored via manual JSON edits for this sprint; an authoring interface is Sprint 08 (Admin).
- No changes to the site-wide SEO, performance or accessibility infrastructure beyond what's needed for the new sections themselves — broader hardening is Sprint 07 (Quality).

---

# Success Criteria

Sprint 6 is successful when:

- [ ] Events, promotions and announcements are all sourced from JSON via dedicated repositories, following the Repository Pattern (ADR-003).
- [ ] A single featured content mechanism surfaces `featured` items across all three content types.
- [ ] A community spotlight highlights one featured business or event without introducing a new content type.
- [ ] The local news section is present, clearly labelled "coming soon," and contains no real news logic.
- [ ] Playwright coverage exists for the community page's new sections.
- [ ] No component reads JSON directly — everything flows through its respective repository.

---

# Guiding Principle

A directory answers "who can help me?" This sprint answers "what's happening in my community?" — both questions matter, and only the platform that answers both earns a place in someone's regular routine.
