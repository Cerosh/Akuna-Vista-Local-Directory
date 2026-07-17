# PROJECT.md

# Akuna Vista Local Directory

Version: 1.0

Project Status: MVP in Production — 15+ sprints delivered (see `sprints/` and `.ai/TODO.md`)

Owner: Cerosh Jacob

---

# Vision

Create the trusted digital memory of local communities.

Recommendations should not disappear inside chat conversations.

Instead, they should become searchable, trusted and easily discoverable for everyone in the community.

Akuna Vista Local Directory is the first implementation of a platform that can eventually power local directories for communities across Australia.

---

# Mission Statement

Help residents discover trusted local businesses through genuine community recommendations.

Our goal is to replace repetitive questions inside WhatsApp with a searchable, community-driven knowledge base.

---

# Problem Statement

Today, recommendations are shared inside WhatsApp groups.

Examples include:

• Can anyone recommend a plumber?

• Looking for an electrician.

• Best mortgage broker?

• Any good cleaner?

• Need someone to install CCTV.

Although many residents respond with helpful recommendations, these conversations disappear over time.

New residents ask the same questions repeatedly.

Businesses repeatedly advertise the same services.

Community knowledge is lost.

---

# Opportunity

Akuna Vista already has:

• 800+ community members

• Active WhatsApp discussions

• Frequent recommendations

• Small businesses regularly advertising

• High trust between residents

This presents an opportunity to create a searchable knowledge base before expanding to neighbouring communities.

---

# Goals

Primary Goals

• Preserve community knowledge

• Make recommendations searchable

• Help residents save time

• Help trusted businesses gain visibility

• Build a trusted community platform

Secondary Goals

• Reduce repeated WhatsApp questions

• Encourage community engagement

• Support local businesses

• Build long-term recurring traffic

Future Goals

• AI-powered recommendations

• Business claiming

• Reviews

• Marketplace

• Local deals

• Advertising platform

Note: "Community events" was pulled forward and shipped in Sprint 6
(Community Content), alongside business promotions — see the Out of
Scope note below and DECISIONS.md ADR-011.

---

# Target Users

## Residents

Need trusted recommendations.

Want fast answers.

Prefer businesses recommended by neighbours.

---

## New Residents

Recently moved into the community.

Looking for trusted local services.

Do not know local businesses.

---

## Local Businesses

Want affordable local exposure.

Want to build trust.

Want repeat customers.

Prefer recommendations over traditional advertising.

---

## Community Administrators

Want fewer repetitive questions.

Want a useful resource for residents.

Want to support local businesses.

---

# User Personas

## New Resident

"I've just moved into the area."

Goals

- Find electricians.
- Find plumbers.
- Find childcare.
- Discover local cafés.
- Learn about nearby services.

Pain Points

- Doesn't know anyone.
- Searches repeatedly.
- Receives inconsistent recommendations.

---

## Existing Resident

"I've lived here for years."

Goals

- Recommend trusted businesses.
- Quickly find previous recommendations.
- Discover new services.

Pain Points

- Searching WhatsApp history is difficult.
- Recommendations become outdated.

---

## Small Business Owner

"I serve customers within a few kilometres."

Goals

- Reach local residents.
- Showcase services.
- Build trust.
- Receive enquiries.

Pain Points

- Limited marketing budget.
- Short lifespan of social media posts.
- Hard to remain visible.

---

# Competitive Advantages

Unlike Facebook Groups

- Searchable
- Organised
- Permanent
- Faster discovery

Unlike WhatsApp

- Structured
- SEO-friendly
- Category browsing
- Public visibility where appropriate

Unlike generic business directories

- Community trust
- Local recommendations
- Hyper-local focus
- Neighbourhood identity

---

# User Stories

As a resident

I want to search for recommended businesses

so I don't need to ask WhatsApp.

---

As a new resident

I want to quickly find trusted services

so I can settle into the community.

---

As a business owner

I want my business listed

so local residents can discover my services.

---

As a community member

I want to recommend businesses

so others benefit from my experiences.

---

# MVP Scope

Version 1

Static website

JSON data

Responsive design

Homepage

Business Directory

Category Pages

Business Detail Pages

Search

Featured Businesses

Community Statistics

About Page

Contact Page

Placeholder Images

SEO

Accessibility

No authentication.

No database.

No reviews.

No CMS.

No backend.

**Update, 2026-07-15 (Sprint 11):** "no backend" still means no database, no user accounts, no
persistent server state — that hasn't changed. It no longer means "never calls an external API" —
read-only, server-side integrations with external APIs (via lightweight, stateless Next.js Route
Handlers) are now an accepted, permanent capability for features that genuinely need real-time
data, confirmed by the project owner as an ongoing need rather than a one-off. See
`ARCHITECTURE.md`'s API Strategy and `.ai/CONTEXT.md`'s Known Constraints for the full detail.

---

# Out of Scope

These features are intentionally excluded from Version 1.

Authentication

Business claiming

Payments

Advertising

Bookings

Messaging

Admin Dashboard

Business Dashboard

Notifications

Reviews

Marketplace

Community login

AI Search

Vector Search

Chatbot

Mobile App

These will be introduced in later releases.

Note: Events (and business Promotions) were originally listed here,
planned for Version 4 alongside Community Deals (see Future Roadmap
below). Sprint 6 (Community Content) deliberately pulled both forward
and shipped them ahead of that plan — a project-owner decision, not
scope creep. See DECISIONS.md ADR-011. Community Deals — a larger,
structured deals marketplace — remains a later-version feature;
Sprint 6's Promotions are a lighter-weight predecessor to it.

---

# Future Roadmap

Version 2

Supabase

Authentication

Business claiming

Admin dashboard

Community dashboard

Reviews

Recommendations

---

Version 3

AI Search

Ask Akuna

Embeddings

Semantic Search

Vector Database

Recommendation Engine

---

Version 4

Advertising

Premium Listings

Featured Businesses

Community Deals

Business Analytics

Subscriptions

---

Version 5

Multi-community platform

Custom branding

Multi-tenancy

Regional directories

---

# Success Metrics

Launch Metrics

100 businesses listed

25 categories

300 recommendations

Responsive website

SEO score > 90

Accessibility WCAG AA

---

Growth Metrics

500 monthly visitors

100 returning visitors

50 businesses requesting listing

20 businesses requesting premium placement

---

Business Metrics

Advertising revenue covers hosting costs.

Community engagement continues to grow.

Businesses receive measurable enquiries.

---

# Product Constraints

Current budget should remain minimal.

The MVP should use static hosting.

Operational costs should remain close to zero until demand is validated.

The architecture should support migration to a database without significant UI changes.

---

# Monetisation Strategy

Phase 1

Completely free.

Validate demand.

Build trust.

Grow traffic.

---

Phase 2

Featured businesses.

Premium listings.

Sponsored categories.

Community deals.

---

Phase 3

Business subscriptions.

Analytics dashboard.

Priority placement.

Advertising packages.

---

# Design Principles

Community first.

Trust before revenue.

Simple over complex.

Fast over feature-rich.

Search before scrolling.

Neighbourhood focused.

Mobile first.

Accessible by everyone.

---

# Product Principles

Recommendations should feel authentic.

Businesses should earn visibility through trust.

The interface should reduce cognitive load.

Users should find answers in seconds.

The experience should feel warm, welcoming and community-driven.

---

# Brand Personality

Helpful

Trustworthy

Neighbourly

Friendly

Professional

Modern

Australian

Community-focused

---

# Long-Term Vision

Become Australia's most trusted local community discovery platform.

Every suburb should have a searchable directory built from genuine community recommendations.

Residents should no longer rely on endless chat history to find trusted businesses.

The platform should become the first place people visit before asking their local community group.

---

# Product Philosophy

We are not building a business directory.

We are preserving community knowledge.

Every recommendation is part of the neighbourhood's collective memory.

Technology exists to strengthen communities—not replace them.

The success of this project will be measured not only by traffic or revenue, but by how effectively it helps neighbours help one another.