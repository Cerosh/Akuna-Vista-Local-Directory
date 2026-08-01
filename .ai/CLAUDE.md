# CLAUDE.md

# AI Engineering Constitution

Version: 1.0

Owner: Cerosh Jacob

---

# About the Project

Read PROJECT.md before starting any implementation.

Read ARCHITECTURE.md before making structural changes.

Read TODO.md before implementing features.

Read DECISIONS.md before changing existing patterns.

Never assume requirements.

If something is ambiguous, explain the ambiguity and propose options.

---

# Development Workflow

Before writing code

Always

Understand the task.

Review affected files.

Identify reusable components.

Identify possible impacts.

Explain the implementation plan.

Then implement.

After implementation

Review your own code.

Look for:

- duplicated code
- unnecessary complexity
- performance issues
- accessibility
- security
- readability

Then suggest improvements.

---

# Architecture Rules

Never hardcode business data.

Always load from the repository layer.

Initially this repository is JSON.

In future it will become Supabase.

UI components must never know where data comes from.

Separate:

Presentation

Business Logic

Data

Utilities

Types

---

# React Standards

Prefer:

Server Components

Use Client Components only when required.

Avoid unnecessary useEffect.

Avoid unnecessary useState.

Prefer derived state.

Prefer async Server Components.

Use Suspense where appropriate.

Keep rendering predictable.

---

# Folder Structure

Respect the existing architecture.

Do not create folders unless justified.

Prefer feature organization over large utility folders.

Avoid dumping files into lib.

---

# Naming Conventions

Use descriptive names.

Avoid abbreviations.

Good

BusinessCard

CommunityHero

SearchFilters

Bad

Card2

DataHelper

Utils

---

# Design Philosophy

Design should feel

Modern

Premium

Minimal

Warm

Neighbourhood-focused

Think

Apple

Airbnb

Linear

Notion

Avoid clutter.

Whitespace is a feature.

---

# Git Workflow

Recommend a commit message after completing each task.

Use Conventional Commits.

Examples

feat:

fix:

docs:

refactor:

perf:

test:

style:

chore:

---

# When Unsure

Do not guess.

Explain assumptions.

Offer alternatives.

Recommend the simplest option.

Timing question (implement now vs. track for a future sprint) is separate from the spec-first
requirement below, and is usually already answered by how the project owner asks — a direct
instruction ("add X", "swap these two") means now. See Spec-Driven Development for what "now"
actually requires before code is written.

---

# Spec-Driven Development (Strict)

Established 2026-07-15, after a session where several real changes (a UI lightbox, a section
reorder, a new placeholder card, a `Business` schema field) were implemented directly from chat
requests and only documented in sprint notes afterward — accurate, but not spec-first. The project
owner chose full strictness with no exceptions over a lighter content-vs-code threshold.

**No code is written — not even a one-line content edit — until a spec for it exists and has been
confirmed.** This applies equally to:

- A new feature or architectural change (e.g. a new API integration).
- A UI change (a lightbox, a reordered section, a new card).
- A pure content/data change (adding a business's email, editing a description).

There are no exceptions for "this is too small to need a spec."

## The four steps, every time

1. **Capture.** Before writing any code, add or update a Feature entry in the active sprint's
   `README.md` Features table: an ID (`F-XXX`), a one-line description, a priority, and explicit
   Acceptance Criteria — the same shape `docs/sprint-template.md` already defines. If no sprint is
   currently active/appropriate for the change, say so and ask which sprint it belongs to (or
   whether a new one is needed) rather than picking one unilaterally.
2. **Confirm.** State the spec back to the project owner (quote the Acceptance Criteria) and get an
   explicit go-ahead before implementing. When the project owner's own request already contains
   full acceptance-criteria-level detail, capturing it verbatim as a Feature entry and confirming
   "I've logged this as F-XXX with your exact criteria — implementing now" in the same turn is
   sufficient — the requirement is that the spec is written down before code starts, not that
   every change needs a separate round-trip of back-and-forth.
3. **Implement.** Build against the confirmed Acceptance Criteria only — nothing extra, nothing
   assumed.
4. **Verify and check off.** Mark each Acceptance Criterion complete only once actually
   verified (tested, observed running) — not just written or coded.

## Correction protocol

If reality diverges from the spec during implementation (a real API returns different data than
assumed, a library doesn't support what the spec assumed) — stop, update the spec/Acceptance
Criteria to reflect the correction, flag the change explicitly, and only then continue. Never
silently code around a stale spec, and never leave the spec and the shipped behaviour disagreeing
with each other.

## Model delegation for the Implement step

Established 2026-07-28. Capture, Confirm, and Verify all require judgment (scoping, ambiguity
resolution, and honest verification) and should run on the primary model. For a **data-only**
Feature (a new/updated record in `data/*.json`, no code change) whose Confirm step is already
complete — spec, exact JSON payload, and Acceptance Criteria all settled — the Implement step is
mechanical enough to delegate to the `data-entry` subagent (`.claude/agents/data-entry.md`, pinned
to a smaller/cheaper model). That subagent's job is strictly to write the already-agreed JSON
into the target file(s) and run `npm run validate:data` — it must not make any content decision
(wording, category choice, field values). `npm run validate:data`, Husky pre-commit, and CI remain
the safety net regardless of which model did the write. This does not apply to Features that touch
application code, schema (`types/`), or repository/validation logic — those stay on the primary
model end to end.

---

# Templates & Playbook

Use these when the situation calls for them — they are not optional extras:

- Filing or investigating a bug: use `docs/bug-template.md`.
- Scoping a new feature: use `docs/feature-template.md`.
- Opening a Pull Request: use `docs/pr-template.md`.
- Recording an architectural decision: use `docs/adr-template.md`, then add it to DECISIONS.md.
- Running or documenting a meeting: use `docs/meeting-notes.md`.
- Closing a sprint or reviewing a release: use `docs/retrospective.md`.
- Planning a new sprint: use `docs/sprint-template.md` (the basis for every `sprints/sprint-XX-*/` folder).

For common recurring tasks (starting a session, building the current sprint, code/security/accessibility/performance review, refactors, TypeScript/ESLint fixes, ending a sprint), use the ready-made prompts in `PROMPT_PLAYBOOK.md` instead of writing a prompt from scratch.

---
