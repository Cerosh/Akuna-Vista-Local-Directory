# JSON_SCHEMA.md

# Data Schema Specification

Neighbourhood Directory Platform

Version: 1.0

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

This document defines the JSON schemas used by the Neighbourhood Directory Platform.

It acts as the source of truth for all static data.

All JSON files must conform to these schemas.

The UI should only access data through repository classes.

---

# Design Principles

The data model should be:

- Simple
- Human-readable
- Extensible
- Backwards compatible where practical
- Easy to migrate to a relational database

Do not optimise for future complexity prematurely.

---

# Folder Structure

```
data/
├── businesses.json
├── categories.json
├── suburbs.json
├── events.json
├── promotions.json
├── settings.json
└── metadata.json
```

---

# Common Rules

- UTF-8 encoding
- Two-space indentation
- Camel case property names
- ISO 8601 dates
- UUIDs for identifiers
- Arrays sorted alphabetically unless business rules dictate otherwise

---

# Business Schema

File

```
businesses.json
```

Structure

```json
[
  {
    "id": "uuid",
    "slug": "business-slug",
    "name": "ABC Plumbing",
    "description": "Local family-owned plumbing business.",
    "shortDescription": "Trusted local plumber.",
    "categoryId": "plumbing",
    "phone": "+61 400 000 000",
    "email": "hello@example.com",
    "website": "https://example.com",
    "address": {
      "street": "1 Example Street",
      "suburb": "Schofields",
      "state": "NSW",
      "postcode": "2762"
    },
    "serviceAreas": [
      "Schofields",
      "Tallawong",
      "The Ponds"
    ],
    "coordinates": {
      "latitude": -33.702,
      "longitude": 150.875
    },
    "openingHours": {
      "monday": "08:00-17:00",
      "tuesday": "08:00-17:00",
      "wednesday": "08:00-17:00",
      "thursday": "08:00-17:00",
      "friday": "08:00-17:00",
      "saturday": "09:00-13:00",
      "sunday": "Closed"
    },
    "socialLinks": {
      "facebook": "",
      "instagram": "",
      "linkedin": ""
    },
    "images": [
      "/images/businesses/example-1.jpg"
    ],
    "featured": false,
    "verified": false,
    "tags": [
      "Emergency",
      "Residential"
    ],
    "createdAt": "2026-07-06T00:00:00Z",
    "updatedAt": "2026-07-06T00:00:00Z"
  }
]
```

---

# Category Schema

File

```
categories.json
```

```json
[
  {
    "id": "plumbing",
    "slug": "plumbing",
    "name": "Plumbing",
    "icon": "Wrench",
    "description": "Plumbers and plumbing services.",
    "displayOrder": 1,
    "featured": true
  }
]
```

---

# Suburb Schema

File

```
suburbs.json
```

```json
[
  {
    "id": "schofields",
    "name": "Schofields",
    "postcode": "2762",
    "state": "NSW",
    "featured": true
  }
]
```

---

# Event Schema (Future)

File

```
events.json
```

```json
[
  {
    "id": "uuid",
    "title": "Community BBQ",
    "slug": "community-bbq",
    "description": "Monthly community gathering.",
    "startDate": "2026-09-10T10:00:00Z",
    "endDate": "2026-09-10T14:00:00Z",
    "location": "Akuna Vista Park",
    "image": "/images/events/bbq.jpg",
    "featured": true
  }
]
```

---

# Promotion Schema (Future)

File

```
promotions.json
```

```json
[
  {
    "id": "uuid",
    "businessId": "uuid",
    "title": "10% Off",
    "description": "Available this month.",
    "startDate": "2026-07-01",
    "endDate": "2026-07-31",
    "featured": true
  }
]
```

---

# Settings Schema

File

```
settings.json
```

```json
{
  "communityName": "Akuna Vista",
  "siteName": "Akuna Vista Local Directory",
  "tagline": "Discover trusted local businesses.",
  "primaryColor": "#2563EB",
  "secondaryColor": "#0F172A",
  "logo": "/images/logo.svg",
  "heroImage": "/images/hero.jpg",
  "contactEmail": "community@example.com",
  "enableSearch": true,
  "enableFeaturedBusinesses": true,
  "enableEvents": false
}
```

---

# Metadata Schema

File

```
metadata.json
```

```json
{
  "schemaVersion": "1.0.0",
  "generatedAt": "2026-07-06T00:00:00Z",
  "lastUpdated": "2026-07-06T00:00:00Z",
  "totalBusinesses": 0,
  "totalCategories": 0
}
```

---

# Validation Rules

## Required Fields

Business

- id
- slug
- name
- description
- categoryId
- featured
- createdAt
- updatedAt

Category

- id
- slug
- name

Settings

- communityName
- siteName

---

# Slug Rules

Slugs must:

- Be lowercase
- Use hyphens
- Contain only letters, numbers and hyphens
- Be unique

Example

```
good-plumbing-services
```

---

# Identifier Rules

Use UUIDs.

Identifiers must never change after creation.

---

# Dates

Use ISO 8601.

Example

```
2026-07-06T14:30:00Z
```

Never use locale-specific formats.

---

# Images

Store relative paths.

Example

```
/images/businesses/abc-plumbing.jpg
```

Do not store Base64 data.

Optimise images before adding them.

---

# Coordinates

Latitude

-90 to 90

Longitude

-180 to 180

Coordinates are optional until map functionality is introduced.

---

# Repository Rules

The UI must never read JSON files directly.

Always access data through repository classes.

Example

```
BusinessRepository

↓

JSON Repository

↓

businesses.json
```

This abstraction simplifies future migration to Supabase.

---

# Migration Strategy

Current

JSON

↓

Repository

↓

UI

Future

Supabase

↓

Repository

↓

UI

The UI should remain unchanged during migration.

---

# Versioning

Every schema change should:

- Increment `schemaVersion`
- Be documented in CHANGELOG.md
- Preserve compatibility where practical
- Be reflected in this document

Breaking schema changes should be avoided unless justified.

---

# Sample Directory Structure

```
data/
├── businesses.json
├── categories.json
├── suburbs.json
├── settings.json
├── metadata.json
├── events.json
└── promotions.json
```

---

# Definition of a Valid JSON File

A valid JSON file:

- Matches the documented schema
- Uses UTF-8 encoding
- Contains no duplicate IDs
- Uses unique slugs
- Has valid dates
- Contains no unused fields
- Is formatted consistently
- Passes schema validation

---

# Guiding Principle

The JSON files are the application's temporary database.

Treat them with the same discipline you would apply to a production database schema.

Well-structured data today makes tomorrow's migration straightforward.