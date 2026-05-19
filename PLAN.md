# JourneyPal — Plan of Record

_Last updated: May 2026_

## North Star

JourneyPal is the personalized relocation plan engine for global movers. We start with Korea because that's where we have the deepest authority. Every corridor we add uses the same template, deepened with local expertise.

The pitch deck vision (multi-corridor, supply + demand, personalized plans) is the destination. Korea is corridor 1 of N.

## What I'm NOT building

- A travel-tech app (no discovery, no itinerary, no in-trip)
- A Korea-only product (Korea is the first cell, not the whole grid)
- A marketplace before I have demand-side users

## Phases

### Phase 0 — Reframe (THIS WEEKEND, ~2h)
- [ ] Update landing hero from "relocation tracker for moving to Korea" → platform-positioned copy
- [ ] Add a "Coming Soon" corridor picker to marketing page (Korea live, NZ/AU/JP coming)
- [ ] Pin the North Star paragraph above somewhere visible (this file counts)
- [ ] Resolve /tracker vs /tracker-v2 — pick one, delete the other

### Phase 1 — Ship trustworthy Korea (~4-6 weeks)
- [ ] Real Supabase persistence for checkboxes (currently doesn't save)
- [ ] Real deadline countdowns (remove hardcoded DAYS_TO_GO, COMPLETED_ITEMS)
- [ ] Expand checklist beyond just students: add E-7 (work), F-6 (spouse), D-8 (investor), digital nomad
- [ ] 30+ verifiable items per visa type
- [ ] "Last updated" dates on every immigration item so users trust the data

### Phase 2 — Generalize the engine (~2-3 weeks)
- [ ] Refactor checklist into corridor-aware data model
- [ ] Korea data lives in the new structure but structure isn't Korea-specific
- [ ] Done when adding a new corridor is a content task, not an engineering task

### Phase 3 — Add corridor 2 (~4-8 weeks)
- [ ] Pick between: Anywhere → NZ, Anywhere → AU, or Korea → anywhere
- [ ] Decision criteria: which one am I most excited to build + which has clearest user reach?

### Phase 4 — Supply side
- Don't start until corridors 1-3 have real demand-side users
- The marketplace needs users on day 1 or it dies

## What I'm explicitly deferring

- All async digest agents (designer, competitor, market signals)
- The travel-tech pivot conversation (now permanently closed)
- INSEAD application — the 30-day test from earlier still applies, separate from this
- Anything that isn't moving the corridor-1 product forward

## What the AI agent infrastructure is for, going forward

I keep it, but I use it sparingly:
- `/stress-test` in Claude Code → only for real forks (e.g. "Should corridor 2 be NZ or AU?")
- `roles.py` → personal/career decisions outside JourneyPal
- `critic` subagent → code review before commits, especially during Phase 2 refactor

Not for: daily digests, designer reviews, market scans. Not until I have something worth monitoring.

## Honest reminders to self

1. The narrowing wasn't the problem — the unnamed loss of vision was. Korea is fine. Korea-as-only-thing was the trap.
2. "Build everything in parallel" is how solo founders fail. Phase 0 first. Phase 1 next. In order.
3. If I find myself building more agent infrastructure instead of shipping product, I am procrastinating.
4. If I find myself wanting to pivot again — pause, re-read this file, ask why.
