# DESIGN_SYSTEM.md

# Neighbourhood Directory Platform

Design System

Version: 1.0

Owner: Cerosh Jacob

---

# Design Vision

The design should communicate trust, warmth and professionalism.

Users should immediately feel:

- Welcome
- Comfortable
- Confident
- Familiar

The interface should disappear into the background, allowing community content to take centre stage.

Think:

• Apple simplicity

• Airbnb friendliness

• Linear polish

• Notion consistency

Avoid visual clutter.

---

# Design Principles

Every interface should be:

Simple

Readable

Consistent

Accessible

Responsive

Fast

Elegant

---

# Design Personality

Warm

Modern

Neighbourhood-focused

Trustworthy

Premium

Minimal

Australian

Human

---

# User Experience Goals

A first-time visitor should understand the website within 10 seconds.

A resident should find a business within 30 seconds.

A business profile should answer the user's questions without requiring additional clicks.

---

# Colour System

## Primary

Deep Blue

Purpose

Brand identity

Primary buttons

Links

Highlights

---

## Secondary

Warm Teal

Purpose

Supporting actions

Icons

Accent sections

---

## Success

Green

Purpose

Verified businesses

Success states

Completed actions

---

## Warning

Amber

Purpose

Attention

Pending states

---

## Error

Red

Purpose

Validation

Errors

Critical actions

---

## Neutral

White

Off White

Light Grey

Medium Grey

Dark Grey

Charcoal

These colours should dominate the interface.

Accent colours should be used sparingly.

---

# Colour Philosophy

The interface should use approximately:

80% Neutral

15% Primary

5% Accent

Never overwhelm users with colour.

Whitespace is more important than decoration.

---

# Typography

Primary Font

Geist

Fallback

Inter

System Fonts

---

# Heading Scale

Display

Hero only

H1

Page titles

H2

Section titles

On a page stacking many sections (e.g. the homepage), H2 has two weights so the
page reads as edited rather than templated (added sprint-14 UI polish pass):

- Primary section H2 (the page's main content — e.g. Featured Businesses,
  Popular Categories, Local promotions): `text-2xl font-semibold tracking-tight
  sm:text-3xl`.
- Secondary section H2 (supporting/community content — e.g. Community
  Statistics, Why Choose Local, Community events, Community noticeboard):
  `text-xl font-semibold tracking-tight sm:text-2xl`.

Both remain H2 semantically — this is a visual-size distinction only, not a
new heading level.

H3

Card titles

H4

Supporting headings

Body

Default content

Small

Metadata

Caption

Secondary information

---

# Typography Principles

Large headings

Short paragraphs

Comfortable line height

High contrast

Avoid walls of text

Readable on mobile

---

# Spacing System

Use an 8-point spacing system.

Examples

4

8

12

16

24

32

40

48

64

80

96

Maintain consistent spacing throughout the application.

---

# Layout

Maximum Content Width

1280px

Standard Content Width

1024px

Reading Width

720px

Use generous horizontal padding.

---

# Grid System

Desktop

12 columns

Tablet

8 columns

Mobile

4 columns

Cards should align consistently.

---

# Border Radius

Small

Inputs

Medium

Buttons

Large

Cards

Extra Large

Hero sections

Rounded corners should feel soft but not playful.

---

# Shadows

Subtle.

Avoid heavy shadows.

Use elevation to communicate hierarchy.

Not decoration.

---

# Icons

Library

Lucide React

Guidelines

Consistent size

Minimal usage

Decorative icons should never replace text.

Icons should improve comprehension.

---

# Buttons

Primary

Filled

Main actions

Secondary

Outlined

Supporting actions

Ghost

Minimal actions

Danger

Destructive actions

Buttons should have:

Hover

Focus

Disabled

Loading

Pressed

States.

---

# Cards

Every card should contain:

Title

Description

Optional image

Optional badge

Primary action

Cards should never feel crowded.

---

# Forms

Simple.

Minimal.

Accessible.

Always include:

Labels

Helper text

Validation

Error messages

Focus indicators

---

# Inputs

Large touch targets.

Rounded corners.

Clear labels.

Never rely solely on placeholders.

---

# Navigation

Desktop

Horizontal navigation.

Mobile

Drawer navigation.

Sticky header.

Search should always remain accessible.

---

# Footer

Simple.

Useful.

Not overloaded.

Include:

About

Categories

Contact

Copyright

Social links

---

# Images

Large.

Bright.

Authentic.

Future images should come from the actual Akuna Vista community.

Current implementation uses placeholders.

Avoid stock photography where possible.

---

# Illustration Style

Minimal.

Friendly.

Flat.

Do not use cartoon graphics.

---

# Animation Principles

Animations should communicate state.

Never distract.

Use animation for:

Hover

Loading

Transitions

Page changes

Dropdowns

Avoid excessive motion.

---

# Animation Timing

Fast

150ms

Normal

250ms

Slow

350ms

Maintain consistency.

---

# Loading States

Prefer skeleton loaders.

Avoid blank screens.

Communicate progress.

---

# Empty States

Every empty page should help users.

Provide:

Explanation

Suggested action

Positive messaging

---

# Error States

Friendly.

Clear.

Actionable.

Never expose technical details.

---

# Responsive Design

Mobile First.

Every page should work on:

Mobile

Tablet

Desktop

Large Desktop

No horizontal scrolling.

---

# Accessibility

Target

WCAG AA

Requirements

Semantic HTML

Keyboard navigation

Visible focus

Colour contrast

Screen readers

Reduced motion support

---

# Search Experience

Search should always be visible.

Autocomplete can be added later.

Future AI search should integrate naturally.

---

# Component Library

Core Components

Button

Card

Badge

Avatar

Input

Textarea

Select

Checkbox

Radio

Switch

Modal

Drawer

Tabs

Accordion

Tooltip

Popover

Pagination

Breadcrumb

Toast

Spinner

Skeleton

Container

Section

Page Header

Search Box

Navigation

Footer

Business Card

Category Card

Recommendation Card

Community Banner

Statistic Card

---

# Business Card Design

Must include:

Business Name

Category

Short Description

Location

Rating

Recommendation Count

Featured Badge (optional)

Verified Badge (future)

Primary CTA

---

# Homepage Layout

Hero

↓

Search

↓

Popular Categories

↓

Featured Businesses

↓

Community Statistics

↓

How It Works

↓

Testimonials

↓

Newsletter

↓

Footer

---

# Visual Hierarchy

The eye should naturally flow:

Hero

↓

Search

↓

Categories

↓

Businesses

↓

Community Story

↓

Footer

Never overwhelm users with competing focal points.

---

# Dark Mode

Not required for MVP.

All components should support future theming.

Avoid hardcoded colours.

Use semantic design tokens.

---

# Future Design Evolution

Version 2

Dark Mode

Version 3

AI Assistant UI

Version 4

Business Dashboard

Version 5

Admin Portal

---

# Design Review Checklist

Every page should be reviewed for:

✓ Visual consistency

✓ Responsive layout

✓ Accessibility

✓ Readability

✓ Spacing

✓ Typography

✓ Colour usage

✓ Empty states

✓ Error states

✓ Loading states

✓ Performance

✓ Mobile usability

---

# Definition of Good Design

A user should never need instructions to use the interface.

The design should feel calm, modern and trustworthy.

Every interaction should reduce friction.

The interface should make community knowledge easy to discover.

Good design is invisible.

If users notice the design more than the content, simplify it.