# TODO.md

# Current Sprint

Sprint Number

01

Sprint Name

Project Foundation

Status

🟢 Ready

Recommended Claude Model

Claude Sonnet

Estimated Duration

4–6 Hours

---

# Sprint Goal

Build the engineering foundation of the Neighbourhood Directory Platform.

This sprint focuses only on establishing a clean, scalable and production-ready project structure.

No business functionality should be implemented.

No placeholder business data should be generated.

No AI functionality should be added.

At the end of this sprint the application should feel like an empty but professionally engineered product.

---

# User Story

As an engineer

I want a production-ready project scaffold

so future features can be developed consistently.

---

# Tasks

## Project Setup

Create a new Next.js 15 application using the App Router.

Configure:

- TypeScript
- ESLint
- Prettier
- Husky
- lint-staged

Ensure the project builds successfully.

---

## Install Dependencies

Install and configure:

- Tailwind CSS
- shadcn/ui
- Framer Motion
- Lucide React
- clsx
- class-variance-authority
- tailwind-merge
- zod

Do not install unnecessary packages.

---

## Configure Theme

Create a reusable design foundation.

Configure:

- colour palette
- typography
- spacing scale
- border radius
- shadows
- animation durations

Support:

- Light Mode

Dark mode should be configurable later but does not need to be implemented now.

---

## Folder Structure

Create the following folders.

app/

components/

components/ui/

components/layout/

components/common/

features/

hooks/

lib/

lib/repositories/

lib/services/

lib/utils/

types/

styles/

data/

public/images/

Do not populate these folders yet.

---

## Application Layout

Create:

Root Layout

Responsive Container

Main Layout

Navigation placeholder

Footer placeholder

The homepage should simply render:

Navigation

Main Content Placeholder

Footer

---

## Navigation

Create a responsive navigation component.

Include placeholder links.

Home

Directory

Categories

About

Contact

Search icon

The navigation should collapse into a mobile menu.

No routing logic beyond placeholders.

---

## Footer

Create a reusable footer.

Include:

About

Categories

Contact

Copyright

Social placeholders

---

## Shared Components

Create reusable components.

Button

Card

Badge

Section

Container

Page Header

Search Input

Logo

Icon Wrapper

These should contain no business-specific logic.

---

## Type Definitions

Create interfaces for:

Business

Category

Recommendation

Review

Community

Advertisement

Event

User

Fields may remain minimal for now.

---

## Repository Layer

Create repository interfaces.

BusinessRepository

CategoryRepository

CommunityRepository

RecommendationRepository

Implement JSON repository stubs.

No real data loading yet.

---

## JSON Files

Create empty files.

businesses.json

categories.json

communities.json

recommendations.json

reviews.json

events.json

Populate with empty arrays only.

---

## Utility Functions

Create placeholder utilities.

Slug Generator

Date Formatter

Phone Formatter

URL Formatter

Image Helper

Search Helper

These can contain TODO implementations.

---

## Styling

Implement:

Responsive breakpoints

Container widths

Spacing utilities

Global typography

Global CSS

No page-specific styling.

---

## Accessibility

Ensure:

Semantic HTML

Keyboard navigation

Visible focus states

Proper heading hierarchy

Skip navigation placeholder

---

## Performance

Use:

Server Components by default.

No unnecessary client components.

No unnecessary state.

No unnecessary effects.

---

## Documentation

Update README with:

Project overview

Getting started

Development commands

Folder structure

Technology stack

---

# Deliverables

At the end of the sprint the repository should contain:

✓ Running Next.js application

✓ Responsive layout

✓ Navigation

✓ Footer

✓ Theme

✓ Folder structure

✓ Shared components

✓ Type definitions

✓ Repository interfaces

✓ Empty JSON files

✓ Build succeeds

✓ Lint succeeds

✓ TypeScript succeeds

---

# Out of Scope

Do NOT build:

Business cards

Business pages

Search functionality

Directory

Filtering

Sorting

Community pages

Testimonials

Statistics

AI Assistant

Authentication

Database integration

CMS

Supabase

Advertisements

Events

Reviews

Bookings

Anything from future phases.

---

# Acceptance Criteria

The application builds successfully.

The application is responsive.

The layout is reusable.

The project structure follows ARCHITECTURE.md.

No business-specific code exists.

All shared components are reusable.

Repository interfaces are created.

The project is ready for Sprint 2.

---

# Definition of Done

The sprint is complete only when:

✓ npm run lint passes

✓ npm run typecheck passes

✓ npm run build passes

✓ Responsive on desktop and mobile

✓ No TypeScript errors

✓ No ESLint errors

✓ Folder structure complete

✓ README updated

✓ Architecture respected

✓ Ready for homepage development

---

# Suggested Commit Message

feat: initialise project foundation and engineering scaffold

---

# After Completing This Sprint

Stop.

Do not continue to Sprint 2.

Wait for the TODO document to be updated before implementing additional features.

Never implement future roadmap items without explicit instruction.