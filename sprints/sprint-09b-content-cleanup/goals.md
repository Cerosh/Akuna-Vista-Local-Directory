# Sprint 09b — Goals

Content Cleanup

Owner: Cerosh Jacob

Last Updated: 2026-07-09

---

# Sprint Goal

Make the site's filters and curated sections match real content, and close out the small,
concrete items accumulated in `.ai/TODO.md`'s Backlog during Sprint 8/8b's real-content work.

---

# Objective

Two related but distinct threads, both about the gap between "what the schema/UI supports" and
"what real content currently exists":

1. **UI that shows empty options** — `/search`'s category and suburb filter chips, and the
   homepage's Popular Categories section, currently display options with zero real businesses
   behind them (and, for Popular Categories, omit a category with real content). Fix both to
   reflect actual content.
2. **Backlog closure** — `Announcement.sourceUrl`, business data completeness, the fake
   `data/events.json` content, and Footer social link placeholders were all deliberately deferred
   during Sprint 8/8b rather than fixed in the moment. Close as many as possible now.

---

# Why This Sprint Exists

Confirmed by direct count against `data/businesses.json` (2026-07-09): 2 of the 4 categories
currently featured on the homepage (Plumbing, Cleaning) have zero real businesses, while
Tutoring & Education — the category with the *most* real businesses (2) — isn't featured at all.
4 of 5 suburb filter chips on `/search` (Tallawong, The Ponds, Box Hill, Kellyville) match zero
real businesses; only Schofields has any. Every one of these is a dead-end for a resident who
clicks it, indistinguishable from a bug even though it's a curation/filtering gap.

Separately, `.ai/TODO.md`'s Backlog section has been accumulating real, concrete, deliberately-
deferred items since Sprint 8b — raised and tracked rather than fixed in the moment, exactly as
that section's own instructions describe ("pick these up explicitly when scoping a future
sprint"). This is that sprint.

---

# Goals

1. **Every visible filter leads somewhere** — `/search`'s category/suburb chips and the
   homepage's Popular Categories only show options backed by at least one real business.
2. **No fake content sits indefinitely** — `data/events.json`'s sample events are either replaced
   with real content or removed outright; they don't stay fake forever by default.
3. **Close the Backlog, don't just read it** — `Announcement.sourceUrl`, and whatever
   business-data/social-link content the project owner has supplied by the time this sprint
   runs, actually get implemented, not re-deferred again without reason.
4. **Still don't fabricate** — anything genuinely still missing (business data or social links
   nobody has supplied yet) stays honestly absent and gets carried forward, consistent with this
   project's established pattern throughout Sprint 8/8b.

---

# Non-Goals (this sprint)

- **No new features beyond what's listed.** This is a cleanup/accuracy sprint, not a place to
  design new functionality.
- **No fabricated event content, business data, or social links.** Real content only; anything
  not supplied by the project owner stays open and gets carried forward.
- **No renumbering of Sprint 10.** See README.md's "Numbering" section.
- **Does not touch Sprint 09's actual scope** (monitoring, analytics, security headers,
  sitemap/robots.txt, browser compatibility, regression pass) — entirely independent, sequenced
  after it purely by the project owner's choice, not a technical dependency.

---

# Success Criteria

Sprint 09b is successful when:

- [x] No category or suburb filter chip anywhere on the site (search, homepage) can be clicked
      to reach zero results.
- [x] `data/events.json` contains only real content or is empty — never fake sample data.
- [x] `Announcement.sourceUrl` is implemented end to end.
- [x] `.ai/TODO.md`'s Backlog section reflects reality — closed items removed, anything still
      genuinely open (no real content supplied yet) stays and is clearly why.

---

# Guiding Principle

A filter a resident can click that always returns nothing isn't a small thing — it's the exact
kind of "looks broken" experience this platform exists to be better than. Fixing it, and closing
out what's been honestly tracked rather than silently dropped, is what "trusted" means in
practice, not just in the mission statement.
