# RELEASE.md

# Neighbourhood Directory Platform

Release Strategy

Version: 1.0

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

This document defines the release strategy for the Neighbourhood Directory Platform.

It establishes:

- Release lifecycle
- Versioning
- Release criteria
- Release workflow
- Approval process
- Rollback strategy
- Post-release validation

The objective is to deliver software safely, consistently and predictably.

---

# Release Philosophy

Release small.

Release frequently.

Release safely.

Every release should improve the product while minimising risk.

---

# Versioning

Use Semantic Versioning.

MAJOR.MINOR.PATCH

Examples

1.0.0

1.1.0

1.2.0

2.0.0

---

## Major Release

Breaking changes.

Examples

Authentication

Multi-community support

AI Search

Marketplace

---

## Minor Release

New functionality.

Examples

Business categories

Homepage improvements

Events

Community pages

SEO improvements

---

## Patch Release

Bug fixes.

Performance improvements.

Accessibility improvements.

Security fixes.

Documentation updates.

---

# Release Types

## Feature Release

Adds new functionality.

Normally increases the MINOR version.

---

## Bug Fix Release

Corrects defects.

Normally increases the PATCH version.

---

## Hotfix

Urgent production issue.

Highest priority.

Should be:

Small

Reviewed

Well tested

Released quickly

---

## Major Release

Large architectural or product milestone.

Requires:

Planning

Migration strategy

Release notes

Rollback plan

---

# Branch Strategy

main

Production

feature/*

New work

bugfix/*

Bug fixes

hotfix/*

Production fixes

release/*

Release preparation

---

# Release Workflow

Developer

↓

Feature Branch

↓

Pull Request

↓

Code Review

↓

CI Validation

↓

Preview Deployment

↓

Approval

↓

Merge to Main

↓

Production Deployment

↓

Smoke Tests

↓

Release Notes

↓

Monitoring

---

# Release Readiness

A release is ready only when:

- All acceptance criteria are satisfied.
- CI pipeline succeeds.
- Build succeeds.
- No critical defects remain.
- Documentation is current.
- Accessibility reviewed.
- Security reviewed.
- Performance reviewed.

---

# Required Reviews

Every release requires:

Engineering Review

Architecture Review (when applicable)

Accessibility Review

Performance Review

Security Review

Documentation Review

---

# Release Checklist

## Engineering

- [ ] Build successful
- [ ] TypeScript clean
- [ ] ESLint clean
- [ ] Automated tests passing
- [ ] Manual verification complete

---

## Product

- [ ] Requirements satisfied
- [ ] No known blockers
- [ ] Product quality acceptable

---

## Accessibility

- [ ] WCAG AA verified
- [ ] Keyboard navigation
- [ ] Screen reader review
- [ ] Focus management

---

## Performance

- [ ] Lighthouse acceptable
- [ ] Images optimised
- [ ] Bundle reviewed
- [ ] Core Web Vitals acceptable

---

## Security

- [ ] Secrets protected
- [ ] Dependencies reviewed
- [ ] Security headers configured
- [ ] SECURITY.md followed

---

## Documentation

- [ ] README updated
- [ ] CHANGELOG updated
- [ ] ROADMAP reviewed
- [ ] TODO completed
- [ ] CONTEXT updated
- [ ] DECISIONS updated if required

---

# Smoke Tests

Immediately after deployment verify:

Homepage

Navigation

Business Directory

Business Details

Search

Responsive navigation

Footer

Images

Links

Browser console

No critical regressions.

---

# Rollback Strategy

Rollback should be considered when:

Critical functionality is broken.

Performance degrades significantly.

Security issues are identified.

Deployment is unstable.

User experience is severely impacted.

Rollback procedure:

1. Roll back to the last stable deployment.
2. Confirm platform stability.
3. Investigate root cause.
4. Fix in a new branch.
5. Redeploy after validation.
6. Update documentation if architectural lessons were learned.

---

# Monitoring

Monitor after every release:

Application availability

Error rate

Performance

Core Web Vitals

User behaviour

Deployment health

Future:

Sentry

Google Analytics

Microsoft Clarity

---

# Release Notes

Every release should include:

Version

Release date

Summary

New features

Improvements

Bug fixes

Known issues

Breaking changes

Migration notes (if applicable)

---

Example

Version

1.2.0

Summary

Introduced business category filtering and improved homepage performance.

Features

- Category filters
- Featured business improvements

Improvements

- Faster page load
- Improved accessibility

Bug Fixes

- Fixed mobile navigation alignment
- Corrected business card spacing

Known Issues

- AI Search planned for future release

---

# Changelog

Maintain a CHANGELOG.md.

Each release should be recorded.

Do not rewrite release history.

---

# Release Metrics

Track:

Deployment frequency

Lead time

Build duration

Release success rate

Change failure rate

Mean time to recovery (MTTR)

Accessibility score

Performance score

These metrics support continuous improvement rather than individual evaluation.

---

# Production Readiness Criteria

Before releasing:

- Feature complete
- Stable
- Accessible
- Responsive
- Secure
- Performant
- Documented
- Reviewed

---

# Future Release Roadmap

## Version 1.0

Static website

JSON repository

Responsive design

SEO

Accessibility

---

## Version 2.0

Supabase

Authentication

Business claiming

Reviews

Administration

---

## Version 3.0

AI Search

Semantic search

Recommendation engine

Embeddings

---

## Version 4.0

Advertising

Premium listings

Community deals

Business analytics

---

## Version 5.0

Multi-community platform

Marketplace

Mobile application

Push notifications

---

# Release Roles

Developer

Implements and validates changes.

Reviewer

Confirms quality.

Release Owner

Coordinates production release.

Product Owner

Approves business readiness.

Future:

Operations

Monitors production health.

---

# Definition of Release Success

A release is successful when:

Users experience a stable platform.

No critical regressions occur.

Performance remains within targets.

Documentation accurately reflects the released product.

The team can confidently continue building on the released version.

---

# Guiding Principle

Releasing software is not a milestone to celebrate because code was written.

It is a milestone because users receive value safely.

Every release should increase trust, improve quality and leave the platform easier to evolve than before.