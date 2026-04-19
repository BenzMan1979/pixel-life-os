---
id: 1
slug: module-split
date: 2026-04-19
title: turning one conversation into twelve
summary: 13 chapters of spec in the same context. Claude has 200k tokens. I don't. what I did after closing that session.
milestone: moduleSplit
hpDelta: 40
tags: [workflow, ai, solo]
---

one night I opened Claude, planning to talk through HP formula tweaks.

a few turns in, we were on subscription tiers. a few more, Widget. a few more, deep into which on-device SLM to ship on iPhone.

13 chapters of spec sitting in one context. Claude has 200k tokens to work with. I don't. I'm middle-aged. my head does not have 200k.

I closed the session and decided to break it apart.

## twelve folders

I split the project into 12 pieces.

character, HP, battle, gear, AI twin, social, widget / live activities, subscription, onboarding, data / HealthKit, website, infrastructure.

one folder each. inside each folder, four fixed files:

- `_prologue.md` — the prompt I paste when starting a new session, pins Claude to this module
- `spec.md` — the detail for this slice, an extension of the master spec
- `decisions.md` — the entry I write at the end of each session
- `progress.md` — where we are, what's blocked

want to talk HP? I open the session for "02.HP-system." Claude only sees the three HP files. no tangent into legacy-twin UI.

end of session, I write the day's decisions into the log. tag whether they affect other modules — `[ ] pending master sync` if yes, `[x] synced` if no.

then I go back to the master session, type `sync master`. it crawls every module's decision log, pulls the pending ones, reports them to me. cross-module impact, I rule on it, update the master spec accordingly.

## why bother

because I work alone.

there's a trap when you're solo: **everything lives in the same head**. you remember what the HP formula is, why the AI twin isn't cloud, why subscription has three tiers not four — you think you remember, until three months later you read your own notes and can't figure out why you decided any of it.

split into 12, each decision has a file, a date, a reason, a scope. six months later I can read just that slice without booting the whole brain back up.

not clever. just a middle-aged man's workaround for running out of RAM.

## shape of a team, with no team

I don't have a team.

but these 12 folders — the day I find an art collaborator, or a friend who'll write a few lines of Swift on weekends, they have a ready-made "work package" to pick up.

give them write access to "01.character." nothing else. they run it in their own Claude session, at home, only looking at that one slice. they write decisions into their log. I run sync in master, I see what they did and whether it bumps into anything else.

no slack. no weekly standups. no notion. folders and text files.

no team yet. but the shape of one is already laid out.

waiting.

## first sync already caught two things

a few days after the split, first `sync master` run. two things to rule on:

1. whether the AI twin should add a third tier to the existing two
2. if it does, whether to charge, and how — haven't figured this out yet

next entry covers it. mostly it's me arguing with the 14-year-old inside my head.

## tail

these folders live on my laptop. not pushed to GitHub. not public. not because they're secret — they're just not ready. too many half-formed ideas in there. publishing them too early would pin me to shapes before they've earned the right to be pinned.

when a module actually ships, when I've used it myself for a while, when the design has survived contact with reality — I'll write that chapter as a wiki entry and put it up here.

after writing this, my hand got itchy and I hid one more thing somewhere on this site. not saying what. not saying when.

```
EOF
```
