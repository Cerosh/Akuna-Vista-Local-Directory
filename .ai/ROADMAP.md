# ROADMAP.md

# Neighbourhood Directory Platform

Version: 1.0

Current Release: MVP

Owner: Cerosh Jacob

---

# Product Vision

Build the most trusted community-powered local directory platform.

The first implementation serves Akuna Vista.

The platform should later support any suburb, estate or local community by configuration rather than code changes.

The MVP should prioritise simplicity, trust and usability over feature richness.

---

# Engineering Philosophy

Deliver software in small, complete increments.

Every phase should produce a working application.

Never build future functionality before validating the current milestone.

Each phase should end with:

✔ Working software

✔ Git commit

✔ Code review

✔ Documentation update

---

# Development Workflow

For every phase:

1. Read:

- CLAUDE.md
- PROJECT.md
- ARCHITECTURE.md
- TODO.md

2. Summarise the objective.

3. Explain implementation approach.

4. Implement only the current sprint.

5. Self-review the code.

6. Recommend a commit message.

7. Stop.

Never continue into the next phase unless requested.

---

# Claude Model Guide

| Activity | Recommended Model |
|-----------|-------------------|
| Architecture | Sonnet |
| New Features | Sonnet |
| Large Refactors | Sonnet |
| JSON Generation | Haiku |
| Sample Content | Haiku |
| CSS Tweaks | Haiku |
| Accessibility Improvements | Haiku |
| Documentation | Haiku |
| Code Reviews | Sonnet |
| Production Review | Sonnet |

---

# PHASE 0

## Foundation Planning

Status

🟢 Ready

Model

Claude Sonnet

Objective

Define the engineering foundation.

Deliverables

Repository structure

Folder hierarchy

Data model

Routing strategy

Architecture documents

Definition of Done

Architecture is documented.

No application code exists yet.

Estimated Effort

2–4 hours

Commit

docs: establish project architecture and engineering standards

---

# PHASE 1

## Project Scaffold

Status

🟢 Ready

Model

Claude Sonnet

Objective

Create the technical foundation.

Deliverables

Next.js

TypeScript

Tailwind

shadcn/ui

Theme

Typography

Layout

Navigation

Footer

Responsive shell

Placeholder logo

Definition of Done

Application starts successfully.

Responsive navigation works.

Footer complete.

Theme configured.

No business content.

Estimated Effort

4–6 hours

Commit

feat: scaffold application foundation

---

# PHASE 2

## Homepage

Status

🟢 Ready

Model

Claude Sonnet

Objective

Build a beautiful landing page.

Sections

Hero

Search

Popular Categories

Featured Businesses

Community Statistics

How It Works

Testimonials

Ask Akuna

Newsletter

Footer

Definition of Done

Homepage looks production ready.

All content comes from JSON.

Responsive.

Estimated Effort

8–10 hours

Commit

feat: implement homepage experience

---

# PHASE 3

## Business Directory

Status

🟢 Ready

Model

Claude Sonnet

Objective

Build the searchable directory.

Features

Business cards

Grid

List view

Category filters

Search

Sorting

Pagination

Featured businesses

Definition of Done

Users can browse businesses.

Everything driven by JSON.

Estimated Effort

8 hours

Commit

feat: build searchable business directory

---

# PHASE 4

## Business Details

Status

🟢 Ready

Model

Claude Sonnet

Objective

Build individual business pages.

Sections

Hero

Gallery

Contact

Location

Opening hours

Services

Recommendations

Related businesses

Definition of Done

Every business has a dedicated page.

Estimated Effort

6–8 hours

Commit

feat: implement business profile pages

---

# PHASE 5

## Community Pages

Status

🟢 Ready

Model

Claude Sonnet

Pages

About

Community

Contact

Privacy

Terms

404

Definition of Done

Marketing pages complete.

Estimated Effort

4 hours

Commit

feat: add supporting community pages

---

# PHASE 6

## Populate Content

Status

🟢 Ready

Model

Claude Haiku

Objective

Create placeholder data.

Generate

100 businesses

25 categories

250 reviews

150 recommendations

Community statistics

Events

Placeholder images

Definition of Done

Rich demo content exists.

Estimated Effort

2–3 hours

Commit

chore: populate placeholder content

---

# PHASE 7

## UI Polish

Status

🟢 Ready

Model

Claude Haiku

Objective

Improve visual quality.

Improve

Spacing

Typography

Icons

Animations

Hover effects

Transitions

Loading states

Definition of Done

Premium visual experience.

Estimated Effort

3–5 hours

Commit

style: polish user interface

---

# PHASE 8

## SEO

Status

🟢 Ready

Model

Claude Haiku

Deliverables

Metadata

Open Graph

Twitter Cards

Structured Data

robots.txt

sitemap.xml

Canonical URLs

Definition of Done

SEO complete.

Estimated Effort

2 hours

Commit

feat: improve search engine optimisation

---

# PHASE 9

## Performance

Status

🟢 Ready

Model

Claude Haiku

Improve

Image optimisation

Lazy loading

Caching

Bundle size

Code splitting

Performance monitoring

Definition of Done

Lighthouse score above 95.

Estimated Effort

3 hours

Commit

perf: optimise application performance

---

# PHASE 10

## AI Ready

Status

🟢 Ready

Model

Claude Sonnet

Objective

Prepare for future AI.

Deliverables

Ask Akuna interface

Repository abstraction

Search abstraction

Prompt templates

Vector interface

Embedding interface

No AI implementation.

Definition of Done

Architecture supports AI.

Estimated Effort

6 hours

Commit

feat: prepare AI integration architecture

---

# PHASE 11

## Multi Community Platform

Status

🟡 Future

Model

Claude Sonnet

Objective

Support multiple communities.

Features

Community routing

Branding

Theme

Configuration

Community repository

Definition of Done

New suburb added using configuration only.

Estimated Effort

10 hours

Commit

feat: add multi-community support

---

# PHASE 12

## Monetisation

Status

🟡 Future

Model

Claude Sonnet

Features

Claim Business

Featured Listings

Advertising

Premium Profiles

Community Deals

Analytics

Definition of Done

Platform supports revenue generation.

Estimated Effort

10 hours

Commit

feat: introduce monetisation features

---

# PHASE 13

## Authentication

Status

🟡 Future

Model

Claude Sonnet

Features

Supabase Auth

Google

Apple

Email

Business Login

Admin Login

Definition of Done

Authentication operational.

Estimated Effort

10 hours

Commit

feat: implement authentication

---

# PHASE 14

## Admin Portal

Status

🟡 Future

Model

Claude Sonnet

Features

Business management

Content moderation

Analytics

Approvals

Recommendations

Dashboard

Definition of Done

Platform administration available.

Estimated Effort

15 hours

Commit

feat: build administration portal

---

# PHASE 15

## Production Launch

Status

🟢 Ready when MVP complete

Model

Claude Sonnet

Checklist

Accessibility

SEO

Performance

Testing

Responsive

Error handling

Analytics

Monitoring

Deployment

Backup

Security Review

Definition of Done

Production deployment completed.

Commit

release: version 1.0

---

# Future Releases

Version 2

Supabase

Authentication

Business Claiming

Reviews

Recommendations

Version 3

Ask Akuna

Semantic Search

Embeddings

Vector Search

AI Summaries

Version 4

Marketplace

Bookings

Lost & Found

Community Deals

Business Analytics

Note: Events shipped early, in Sprint 6 (Community Content), alongside
business Promotions — a deliberate scope pull-forward, not an
oversight. See PROJECT.md's "Out of Scope" note and DECISIONS.md
ADR-011. Community Deals — a larger, structured deals marketplace —
remains here; Sprint 6's Promotions are a lighter-weight precursor.

Version 5

Native Mobile App

Push Notifications

Subscriptions

Advertising Platform

White Label Communities

---

# Success Criteria

The MVP is successful when:

Residents can discover businesses without searching WhatsApp.

Businesses are easy to find.

The application feels modern and trustworthy.

The platform is easy to extend.

The codebase remains clean, modular and maintainable.

The architecture supports future growth without significant rewrites.

Success is measured by community adoption, not by feature count.