# ARCHITECTURE.md

# Neighbourhood Directory Platform

Solution Architecture

Version: 1.0

Owner: Cerosh Jacob

---

# Purpose

This document defines the technical architecture for the Neighbourhood Directory Platform.

The first community is:

Akuna Vista

The platform must be designed so additional communities can be added without changing application code.

The MVP uses static JSON data.

Future versions will migrate to a database with minimal UI changes.

---

# Architectural Principles

The platform should always optimise for:

✔ Simplicity

✔ Scalability

✔ Maintainability

✔ Testability

✔ Accessibility

✔ Performance

✔ Reusability

Every architectural decision should support these principles.

---

# Technology Stack

## Frontend

Next.js 15

React 19

TypeScript

Tailwind CSS

shadcn/ui

Framer Motion

Lucide Icons

---

## State Management

Local React State

Server Components

React Context only when necessary

Avoid global state until justified.

---

## Data Layer

Current

JSON Repository

Future

Supabase

Eventually

PostgreSQL

Repository Pattern must isolate the data source.

UI components must never know where data originates.

---

## Authentication

Current

None

Future

Supabase Auth

Google Login

Apple Login

Email Login

Magic Links

---

## Hosting

Current

Vercel

Future

Cloudflare CDN

Cloudflare Images

Cloudflare R2

---

## Monitoring

Current

Vercel Analytics

Future

Sentry

Google Analytics

Microsoft Clarity

---

# Architecture Overview

```
Browser
    │
    ▼
Next.js App Router
    │
    ▼
Pages
    │
    ▼
Features
    │
    ▼
Components
    │
    ▼
Repository Layer
    │
    ▼
JSON
(Current)

Supabase
(Future)

PostgreSQL
(Eventually)
```

---

# Folder Structure

```
app/

    (marketing)

    (directory)

    (community)

components/

    ui/

    common/

    layout/

    cards/

    forms/

    navigation/

features/

    directory/

    search/

    community/

    homepage/

    business/

lib/

    repositories/

    services/

    utils/

    constants/

hooks/

types/

data/

public/

styles/
```

---

# Layer Responsibilities

## App

Routing only.

No business logic.

---

## Features

Business logic.

Feature composition.

---

## Components

Reusable UI.

Stateless where possible.

---

## Repository

Load data.

Abstract JSON.

Future database implementation.

---

## Services

Reusable business services.

Search

Formatting

Validation

Filtering

Ranking

---

## Utilities

Pure helper functions.

No business logic.

---

# Repository Pattern

Current

```
BusinessRepository

↓

JSONRepository

↓

businesses.json
```

Future

```
BusinessRepository

↓

SupabaseRepository

↓

Supabase
```

The UI must not change.

---

# Community Structure

The application supports multiple communities.

```
communities/

    akuna-vista/

        businesses.json

        categories.json

        events.json

        reviews.json

    box-hill/

    the-ponds/

    gables/
```

Every community contains independent data.

Branding should be configurable.

---

# Business Entity

```
Business

id

name

slug

categoryId

description

phone

email

website

images

rating

recommendationCount

location

suburb

community

openingHours

services

socialLinks

isFeatured

isVerified
```

---

# Category Entity

```
Category

id

name

slug

icon

description

displayOrder
```

---

# Recommendation Entity

```
Recommendation

id

businessId

author

source

comment

rating

date

verified
```

---

# Community Entity

```
Community

id

name

slug

logo

heroImage

description

population

whatsappMembers

colourPalette

theme
```

---

# Event Entity

```
Event

id

title

description

date

location

image

organiser
```

---

# Search Architecture

Current

Client-side search.

Future

Server Search.

Eventually

Hybrid Search.

Semantic Search.

Vector Search.

AI Search.

Search implementation should remain replaceable.

---

# AI Architecture

Future AI Assistant

Ask Akuna

Capabilities

Natural Language Search

Recommendation Summaries

Business Discovery

Question Answering

Review Summaries

AI should consume repository interfaces.

Never raw database queries.

---

# API Strategy

Current

This project does not expose its own API to external consumers.

As of 2026-07-15 (Sprint 11), it does consume external, read-only APIs for specific real-time
features — a permanent, accepted pattern going forward, not a one-off. Consumed via a lightweight
Next.js Route Handler (e.g. `app/api/carpark/route.ts`) that holds any required API key
server-side only; the browser only ever talks to this app's own route. Stateless — no database, no
persistent server state. All business/directory content is unaffected and stays static JSON via
the Repository Pattern above. See `.ai/SECURITY.md`'s Third-Party Services and API Security
sections for the review each new integration requires, and
`sprints/sprint-11-home-tutoring-listing/notes.md` for the first real example (NSW Transport
carpark data).

Future

REST (this project's own API, exposed to external consumers)

Eventually

GraphQL

AI Endpoints

Search APIs

Recommendation APIs

Business APIs

---

# Component Hierarchy

```
Page

↓

Feature

↓

Section

↓

Card

↓

UI Components
```

Never skip layers without justification.

---

# Design Tokens

Colours

Typography

Spacing

Radius

Shadows

Animation

Should be centrally defined.

Never hardcode.

---

# Images

Current

Placeholder Images

Future

Cloudflare Images

Image optimisation required.

---

# Routing

```
/

/

/about

/contact

/businesses

/business/[slug]

/category/[slug]

/community/[slug]

/search
```

Future

```
/community/akuna-vista

/community/the-ponds

/community/gables
```

---

# Error Handling

Graceful failures.

Typed errors.

Friendly UI.

Never expose implementation details.

---

# Logging

Current

Console only.

Future

Central logging.

Error reporting.

Performance monitoring.

---

# Security

Validate all input.

Escape rendered content.

No secrets in source code.

Future authentication assumed.

OWASP principles should be followed.

---

# Accessibility

WCAG AA

Semantic HTML

Keyboard support

Screen Reader support

Reduced motion support

High contrast compatible

---

# Performance Targets

First Load

< 2 seconds

Lighthouse

95+

CLS

< 0.1

LCP

< 2.5 seconds

Accessibility

100

SEO

95+

Best Practices

100

---

# Testing Strategy

Future

Unit Tests

Component Tests

Integration Tests

Playwright End-to-End Tests

Accessibility Tests

Visual Regression

Performance Tests

---

# Future Modules

Authentication

Business Dashboard

Admin Dashboard

Reviews

Events

Marketplace

Community Deals

Messaging

Bookings

Notifications

Advertising

Payments

Analytics

AI Search

Vector Search

Embeddings

Recommendation Engine

Mobile App

---

# Architectural Rules

Never hardcode business data.

Never fetch data directly inside UI components.

Always use repositories.

Keep components focused.

Prefer composition.

Avoid premature abstraction.

Build for change.

Optimise for readability.

Document important decisions.

---

# Definition of Good Architecture

A new engineer should understand the project within one hour.

A new community should be added without changing application code.

A new database should be introduced without changing UI components.

Features should be independently testable.

The codebase should remain approachable as the platform grows.

The architecture should encourage consistency rather than enforce complexity.