# Sprint 04 – Business Details

Neighbourhood Directory Platform

Sprint Number: 04

Sprint Name: Business Details

Sprint Goal: Show complete information for a business.

Sprint Status: 🟢 Ready

Start Date: TBD

End Date: TBD

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Objective

Build the individual business profile page (`/business/[slug]`) that every card in the homepage (Sprint 2) and directory (Sprint 3) links into: complete contact information, service areas, gallery, opening hours, social links, a share button, and per-business SEO metadata and structured data — so a business's page answers a visitor's questions without requiring another WhatsApp message.

---

# Business Value

Why does this sprint matter?

- Every card built in Sprints 2 and 3 currently links to a business detail page that doesn't exist yet — this sprint closes that loop and completes the primary user journey (homepage/directory → business page → contact).
- PROJECT.md's product principle is explicit: *"A business profile should answer the user's questions without requiring additional clicks."* Complete contact info, hours, service areas and gallery directly reduce repeat WhatsApp questions like "do they service The Ponds?" or "are they open Saturdays?"
- Per-business structured data (JSON-LD `LocalBusiness`) makes each business independently discoverable in search engines, which matters directly to business owners considering a paid/featured listing later (PROJECT.md "Monetisation Strategy").
- A share button turns every business page into a distribution channel back into the WhatsApp groups this platform is meant to replace — each share is a chance to introduce someone to the directory itself.

---

# Success Criteria

The sprint is successful when:

- [ ] All acceptance criteria are met.
- [ ] Every business in the dataset has a professional, complete profile page.
- [ ] All content on the page is sourced from JSON via the repository layer.
- [ ] Structured data validates against Google's Rich Results / schema.org `LocalBusiness` requirements.
- [ ] Tests pass, including Playwright coverage of the directory → business page journey.
- [ ] No known critical defects.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Business detail page (`/business/[slug]`) | High | Not Started |
| F-002 | Contact information | High | Not Started |
| F-003 | Service areas | Medium | Not Started |
| F-004 | Gallery | Medium | Not Started |
| F-005 | Opening hours | High | Not Started |
| F-006 | Social links | Low | Not Started |
| F-007 | Share button | Medium | Not Started |
| F-008 | SEO metadata | High | Not Started |
| F-009 | Structured data | Medium | Not Started |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1

As a resident who found a business in the directory

I want to see its full profile — contact details, hours, service area, photos

So that I can decide whether to reach out without needing to ask the community group first.

Acceptance Criteria

- [ ] `/business/[slug]` renders a hero, contact information, opening hours, service areas and a gallery, all sourced from `BusinessRepository`.
- [ ] Phone, email and website are rendered as working `tel:`/`mailto:`/external links.
- [ ] Opening hours display all seven days clearly, including "Closed" days.
- [ ] An unknown/invalid slug renders a proper 404.

---

## Story 2

As a resident deciding whether a business services my suburb

I want to see its listed service areas

So that I don't contact a business that doesn't actually cover where I live.

Acceptance Criteria

- [ ] Service areas (`serviceAreas` from JSON_SCHEMA.md) are displayed clearly on the profile.
- [ ] A business with no listed service areas handles this gracefully (e.g. omits the section rather than showing an empty list).

---

## Story 3

As a resident who wants to share a business with a neighbour

I want a share button on the business page

So that I can send it via WhatsApp, SMS or email in one action.

Acceptance Criteria

- [ ] A share button uses the Web Share API where supported, falling back to copy-link.
- [ ] Sharing produces a URL that, when opened, loads directly to that business's page.

---

## Story 4

As a business owner

I want my page to appear well in search engines and messaging previews

So that sharing my business page actually looks professional.

Acceptance Criteria

- [ ] Each business page has unique `<title>` and meta description generated from its data.
- [ ] Open Graph tags produce a correct preview when the link is shared (e.g. in WhatsApp/iMessage/Slack).
- [ ] `LocalBusiness` structured data (JSON-LD) is present and valid for every business page.

---

# Technical Tasks

See [tasks.md](./tasks.md) for the full breakdown.

---

# AI Development Plan

Each task should be completed independently.

For every task:

1. Read relevant documentation (see Documentation Required below).
2. Implement one section of the business page only (e.g. hero, then contact, then hours, then gallery).
3. Run tests.
4. Review generated code.
5. Commit.
6. Update TODO.md if required.

Never combine multiple unrelated sections in one AI session.

---

# Documentation Required

Before starting this sprint read:

- CLAUDE.md
- PROJECT.md
- ROADMAP.md
- TODO.md
- CONTEXT.md

If UI work

- DESIGN_SYSTEM.md
- UI_GUIDELINES.md

If architecture changes

- ARCHITECTURE.md
- DECISIONS.md

If deployment changes

- DEPLOYMENT.md

Always for this sprint

- JSON_SCHEMA.md — `openingHours`, `serviceAreas`, `socialLinks`, `images`, `coordinates` fields
- CODING_STANDARDS.md — naming, component structure
- TESTING.md — Playwright standards for the directory → detail page journey

---

# Deliverables

- [ ] Business detail page
- [ ] Contact information
- [ ] Service areas
- [ ] Gallery
- [ ] Opening hours
- [ ] Social links
- [ ] Share button
- [ ] SEO metadata
- [ ] Structured data

---

# Design Notes

See [notes.md](./notes.md).

---

# Technical Notes

See [notes.md](./notes.md).

---

# Dependencies

Requires from Sprint 1:

- Repository pattern (`BusinessRepository`) and JSON data structure, including full `Business` entity fields (ARCHITECTURE.md "Business Entity").
- Shared components (Button, Card, Badge, Container, Section, Page Header).

Requires from Sprint 2 & 3:

- Business Card links from the homepage and directory that currently point at `/business/[slug]` — this sprint makes those routes resolve to real pages instead of 404s.

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| SEO metadata/structured data overlaps with Sprint 08 (SEO) scope | Duplicate or conflicting work between sprints | This sprint delivers *per-business* metadata and `LocalBusiness` structured data only; Sprint 08 owns site-wide concerns (sitemap.xml, robots.txt, canonical URL strategy, default Open Graph image, Twitter Cards) |
| Gallery images are still placeholders (per PROJECT.md, real imagery is a future milestone) | Pages can look generic or repetitive across businesses | Use distinct, appropriately licensed placeholder images per business where possible; do not block the sprint on real photography |
| Business records with missing optional fields (no email, no social links, no images) break the layout | Broken-looking pages undermine the "professional profile" goal | Every optional section (gallery, social links, service areas) must degrade gracefully when data is absent — never render an empty box or broken link |
| Structured data becomes invalid as the schema evolves | Search engines silently ignore or penalise malformed structured data | Validate JSON-LD output against Google's Rich Results Test during review, add a unit test asserting required `LocalBusiness` fields are present |

---

# Testing Plan

Unit Tests

- [ ] Structured data generator produces valid `LocalBusiness` JSON-LD for a business with full data and for one with minimal/optional fields missing.
- [ ] Opening hours formatting helper (7 days, "Closed" handling).

Integration Tests

- [ ] Business detail page + repository integration: correct business renders for a given slug; invalid slug 404s.

Playwright

- [ ] Navigating from a directory/homepage card opens the correct business page.
- [ ] Contact links (`tel:`, `mailto:`, website) are present and correctly formed.
- [ ] Share button is present and triggers the expected share/copy behaviour.
- [ ] No console errors.

Manual Testing

- [ ] Validate at least one business page's structured data with Google's Rich Results Test.
- [ ] Spot-check Open Graph preview rendering (e.g. via a link-preview debugger).
- [ ] Review a business with minimal data (no gallery, no social links) to confirm graceful degradation.

Responsive Testing

- [ ] Mobile, tablet, desktop, large desktop for hero, gallery, contact and hours sections.

Accessibility

- [ ] Gallery images have descriptive alt text.
- [ ] Contact links and share button are keyboard accessible.
- [ ] Heading hierarchy is correct (H1 business name, H2 per section).

---

# Definition of Done

- [ ] Every business has a professional profile.
- [ ] All acceptance criteria completed.
- [ ] All content comes from JSON.
- [ ] Structured data validates.
- [ ] Code reviewed against REVIEW_CHECKLIST.md.
- [ ] TypeScript passes.
- [ ] ESLint passes.
- [ ] Tests pass.
- [ ] Responsive.
- [ ] Accessible.
- [ ] Documentation updated.
- [ ] No console errors.
- [ ] Ready for deployment.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Release Notes

Features

- New business detail page (`/business/[slug]`) with contact information, service areas, gallery, opening hours, social links, share button, SEO metadata and structured data.

Improvements

- Homepage and directory cards now link to working business pages instead of 404s.

Bug Fixes

- N/A

Known Issues

- Gallery imagery remains placeholder pending real community photography.
- Site-wide SEO (sitemap, robots.txt, Open Graph defaults) remains Sprint 08.

---

# Lessons Learned

To be completed at the end of the sprint. See [retrospective.md](./retrospective.md).

---

# Sprint Retrospective

See [retrospective.md](./retrospective.md).

---

# Carry Forward

See [retrospective.md](./retrospective.md).

---

# Metrics

See [retrospective.md](./retrospective.md).

---

# AI Memory Update

At the end of the sprint determine whether the following documents require updates:

- [ ] CONTEXT.md
- [ ] TODO.md
- [ ] ROADMAP.md
- [ ] DECISIONS.md
- [ ] CHANGELOG.md
- [ ] AI_MEMORY.md

Only update documents that genuinely changed.

---

# Sprint Summary

To be completed at the end of the sprint. See [retrospective.md](./retrospective.md).

---

# Next Sprint Goal

Sprint 05 — Search: implement client-side keyword search across businesses, plus the supporting community/about/contact pages, giving visitors a second way into the directory beyond browsing.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project:

- Better structured.
- Better documented.
- Better tested.
- Easier to maintain.
- Closer to the long-term vision.
