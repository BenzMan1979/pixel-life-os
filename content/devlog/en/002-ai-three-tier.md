---
id: 2
slug: ai-three-tier
date: 2026-04-19
title: AI twin — two tiers became three
summary: originally Tier A on-device SLM or Tier B templates, pick one. I used it myself and I wavered. the 14-year-old and the 47-year-old are fighting in my head.
milestone: poc
hpDelta: 30
tags: [ai, privacy, doubt]
---

originally two choices.

**Tier A**: ship a 2GB small model to your iPhone. smart-ish. power-hungry.
**Tier B**: a library of hand-written templates. old-school dialog trees. dumb, stable, runs on old phones.

on install, the app picks based on your hardware. iPhone 13 and up get A, older ones get B.

clean. elegant. I wrote it into chapter 10 of the spec and moved on.

## then I used it myself

a few nights ago I ran the SLM proof-of-concept, to see if Tier A could carry a proper conversation.

it ran.

speed wasn't the problem.

the problem: it's a 2GB local model. it can't remember what you told it last week. it can't reason across steps. three turns in, you feel the ceiling — not dumb, just boxed in.

I stared at the screen. same office chair I've had for eight years. the gut that sits over the waistband is a little bigger every year.

then the 14-year-old me — the one who stayed up on Dragon Quest in front of a Famicom — crawled up from somewhere and said:

> **"hey. this is YOUR game. don't ship it shitty."**

I shook my head. pushed him back down.

he climbed back up:

> **"give them the best. cloud. infinite memory. make the twin feel alive — like, the-user-texts-a-friend-at-2am-saying-you-have-to-try-this alive. don't make another 'feature-complete but soulless' app. the world has too many of those already."**

okay. calm down.

## the 47-year-old does the math

because the 47-year-old knows a thing: cloud API costs money.

every turn is tokens. every token runs on someone else's server. every month-end there's a bill.

and the actual uncomfortable question: **do I charge users for this?**

if I don't, I eat the cost and close shop in three months.
if I do, I become a guy selling an "AI chat subscription." does that clash with "I'm not going to monetize anxiety," which is the whole reason I started this?

I haven't figured this one out yet.

## current tentative shape

draft version, likely to change:

- **Tier S** — Cloud API (GPT / Claude). smart, long memory. opt-in only, conversation discarded after use, not used to train. **does not touch health data.**
- **Tier A** — On-Device SLM. runs on your iPhone. nothing leaves. default.
- **Tier B** — template library. works on old hardware.

whether Tier S should exist at all, whether to charge, how — I have no answer on any of it.

I've thought through several shapes: bundle it into a subscription tier, standalone add-on, pay-per-use, free first N turns then pay, transparent cloud cost so users see where their money goes... I can find something I don't like in every one.

what I know so far is thin:

- default stays A or B. Tier S does not popup, does not flash on the home screen
- if I do charge, the reason has to be legible to the user — not "because the business model needs it"
- no stacked paywalls. no "upgrade to PRO+ to unlock AI." I hate how that feels
- if it stops being sustainable one day, I'd rather turn Tier S off than become a guy chasing users for money every month

how I actually do this — I'll only know after I've used the app myself on my own iPhone for a few months.

## one line that doesn't move

no matter how hard the 14-year-old yells from inside — there's one line he doesn't get to push:

**health data does not go to the cloud.**

your HP / sleep / movement / stress — lives on your iPhone only. chapter 1 of the spec. non-negotiable.

but **what you talk to your AI twin about** — discarded after use, not used to train, your call whether it goes to the cloud — that's the one I give you a choice on.

the 14-year-old is still grumbling: "you're just a weak adult."

shut up.

——

that said — launch night, I'll uncap memory to something absurd. one night only. you can talk to your twin from midnight till sunrise.

call it a gift to the 14-year-old. he's been waiting a long time.

```
EOF
```
