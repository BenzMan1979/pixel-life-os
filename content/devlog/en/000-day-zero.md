---
id: 0
slug: day-zero
date: 2026-04-18
title: Day 0 — kickoff done
summary: why i'm building this, what it is, where we are now.
milestone: kickoff
hpDelta: 0
tags: [kickoff, why, roadmap]
---

this is log #000 for pixel-life.os. every future entry is written by me, not generated.

## why i'm building this

i'm 40. statistically, 37 years left.

the first time i saw that number, i didn't feel afraid. i thought: "okay, let's use it well."

every health app on the market is built on the same idea: remind you not to die. steps not hit → nudge. bad sleep → alert. missed workout → penalty. all of it fear-driven.

i want the opposite.

not "how close are you to dying" but "how much further did you go than average." a HP bar that, when you pass the statistical baseline, turns green, overflows, and tells you `+234`. that's achievement, not dread.

i grew up on a Game Boy. pixel art is my native visual language. turning life into an RPG i'd actually want to open every day is one of the few things i believe i can make.

this isn't a meditation app. it isn't a fitness app. it's the app i want to open.

## what it is

one sentence: **turn health data into HP, settle every day, fight friends, unlock gear, talk to an AI twin — the goal is to live better than average.**

three core systems:

- **HP**: your life balance. sleep 40%, movement 30%, stress 15%, events 15%. you press SETTLE yourself. ritual, not automation.
- **battle**: main-attribute duels (STR / AGI / INT), 2-round, rock-paper-scissors counters, ±15% variance. if no human is in your bracket you get an AI bot, clearly marked 🤖.
- **AI twin**: fully on-device (Phi-4 Mini / Gemma 2B) with a template-library fallback. no cloud API. your health data never leaves the phone.

the cloud-less AI twin deserves a note: it isn't laziness. health data is one of the things i don't want on someone else's server. a $3k/mo OpenAI bill in exchange for shipping user data as a side-effect is a deal i'm not taking. i'd rather ship a 2GB model to your iPhone.

## where we are

```
[x] 13-chapter spec locked      2026-04-16
[x] website skeleton live       2026-04-18  ← you are here
[>] SLM PoC on iPhone 15 Pro    M1 in progress
[ ] pixel art lockdown          M1
[ ] core HP engine              M2
[ ] battle system               M3
[ ] gear system                 M4
[ ] AI twin integration         M5
[ ] widget + sub + ads          M6
[ ] beta                        M7-8
[ ] App Store                   M9  2026-12
```

> i don't promise the timeline. solo + part-time 10-20 hrs/wk. 9-month MVP is a plan, not a commitment.
> but every step of it will be written down here.

## the bet for q1

if post-ship q1 revenue covers one month of my living expenses, i go all-in. find partners. raise. ship android. start on the legacy-twin feature.

if it doesn't, there'll be a "Day N — why i'm shutting it down" entry.

that's okay too. at least you'll have seen what the bet looked like.

## if you want to follow

- weekly-ish log, at this url
- code: anything open-source will be on github once it exists
- my own data: a self-demo HP panel is planned — my actual HP, streak, gear will be public
- DMs: Twitter/X handle coming

no newsletter popup. no "join our exclusive discord." just a URL. show up when you want.

```
EOF
```
