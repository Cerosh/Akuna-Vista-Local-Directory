---
name: scan-whatsapp-leads
description: Scans a WhatsApp Web group chat for a given number of days back, finds service requests and recommendations shared by residents, cross-checks them against this project's data/businesses.json and data/categories.json, and presents a deduped review list. Use when the user asks to scan/check WhatsApp (or a named group) for new business leads, given a group name and a number of days. Never writes to data/*.json itself — output is a review list for the Spec-Driven Development Capture step.
---

# Scan WhatsApp for directory leads

## Args

Expect `<group name>, <days>` (e.g. `Akuna Vista Owners & Residents, 30`). If either is missing, ask the user for it before starting — don't guess a group name or a default day count.

## What this does and doesn't do

Read-only browser automation over WhatsApp Web (scrolling and reading text) plus local file reads. It never sends a message, clicks into anything destructive, or writes to `data/*.json`. Turning a finding into an actual listing follows this project's normal Spec-Driven Development process (`.ai/CLAUDE.md`) — Capture a Feature entry, Confirm it with the user, then implement (via the `data-entry` subagent for data-only changes). This skill's job ends at a confirmed review list; it does not perform the Capture/Confirm/Implement steps itself.

## Step 1 — Open the group

Load the Chrome tools if not already loaded: `ToolSearch` with `"select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__browser_batch,mcp__claude-in-chrome__get_page_text"`.

Call `tabs_context_mcp` first. If a WhatsApp Web tab already exists in the group, reuse it. Otherwise `navigate` a tab to `web.whatsapp.com` and wait a couple of seconds for it to load into the logged-in session (it uses the same Chrome profile, so it should already be authenticated).

Find the target group: if it's visible in the chat list, click it. Otherwise click the search box at the top of the sidebar, type the group name, and click the matching result. If no match is found, say so and stop — don't guess a similar-sounding group.

## Step 2 — Scroll back the requested number of days

WhatsApp Web renders messages virtualized — only what's scrolled into view is in the DOM. Work in small batches via `browser_batch`: a few `scroll` (direction `up`, amount ~10) at roughly (1000, 400) in the message pane, each followed by a `screenshot` (or `get_page_text` when you need exact phone numbers/URLs a screenshot can't show), reading the date separators to track how far back you've gone.

After each batch, write anything usable straight to a scratch file (`<scratchpad>/whatsapp_raw.md`) — don't hold it all in your head and transcribe at the end, since long scans run for many rounds. Note each finding as `who — timestamp — what they said/shared (classification)`.

**Stop condition:** stop as soon as EITHER (a) you've reached messages older than the requested day count, or (b) WhatsApp shows "Click here to get older messages from your phone" and a further scroll no longer advances the date (same date repeats) — whichever comes first. Don't click through that boundary to force more history unless the user explicitly asks. If you hit the boundary before reaching the requested day count, say so plainly (exact date you reached vs. the date you were aiming for) rather than silently under-scanning.

**Privacy:** if the page text ever dumps the group's member/participant phone-number list (this happens — it can leak into `get_page_text` output from a hidden panel), exclude it entirely from the scratch file and from anything shown to the user. That's a roster, not chat content.

## Step 3 — Classify

Read back through the scratch file and sort every item into:

- **Service request** — someone asked for a recommendation ("does anyone know a good X").
- **Recommendation** — someone named a business/person in reply to a request, or posted an ad. Note the reply count/reactions if visible — multiple independent endorsements for the same name is a strong signal.
- **Recurring business ad** — a resident repeatedly advertising the same home business (food, tutoring, etc.) outside of a request/reply thread.
- **Skip** — personal favors, item borrowing/giveaways, community/religious events, charity appeals, council/safety notices, general chit-chat. These are noise for directory purposes; don't carry them into the review list, just note the count skipped.

## Step 4 — Cross-check against the live directory

Read `data/businesses.json` and `data/categories.json` (don't assume state from a prior run — re-read fresh every time this skill runs). For each request/recommendation pair from Step 3:

- If the recommended business/person is already listed (by name, phone, or close match) → drop it, note "already listed" only if it clarifies why a repeat ad isn't a new lead.
- If it fits an existing category → group it as an additional-listing candidate for that category.
- If no existing category fits → flag it as a possible new-category opportunity, especially if multiple independent leads point the same way (e.g. several unrelated home-food sellers with no "Food/Catering" category to hold them).
- If a request never got an answered reply in the thread → list it separately as an unanswered request (useful signal even with no name attached).
- If a recommendation is for a business that may not be an Akuna Vista resident (a national chain, a general retail store, a specialist clinic) rather than a community member's own business → flag it as a scope question rather than deciding either way; the directory's resident-business scope is the user's call, not something to infer silently.

## Step 5 — Present the review list

Group the output exactly like Step 4's buckets (already covered / new-category opportunities / additional listings for existing categories / needs a category decision / scope questions / unanswered requests). For each item give: who asked, who answered (name + how many endorsements if more than one), and the category it would land in.

Keep this in the chat response — don't publish it as an Artifact (it contains residents' names and phone numbers, which shouldn't be pushed to a shareable link).

End by asking the user which items (if any) they want turned into Feature specs, using `AskUserQuestion` with multiSelect over the groups that have real candidates. "None yet" is a fine answer — this skill's job is done once the list is presented; nothing gets written without the user picking items and going through Capture → Confirm.
