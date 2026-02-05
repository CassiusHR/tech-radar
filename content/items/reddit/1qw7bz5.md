---
id: "reddit:1qw7bz5"
source: "reddit"
externalId: "1qw7bz5"
url: "https://www.reddit.com/r/nextjs/comments/1qw7bz5/migrating_away_from_supabase/"
title: "Migrating away from Supabase"
authorHandle: "xncee"
authorName: "xncee"
publishedAt: "2026-02-05T01:20:20.000Z"
fetchedAt: "2026-02-05T14:45:34.462Z"
tags: ["pillar/nextjs"]
metrics: {"score":6,"comments":21,"subreddit":"nextjs"}
score: 5.459587758889143
scoreBreakdown: {"total":5.459587758889143,"recency":0.6176602036330592,"engagement":5.448548417354877,"author":0,"source":0.9}
---

I currently use Supabase as database host and authentication provider. I’m planning to completely migrate away from Supabase and I want to now if I’m doing it the right way.

The reason I want to migrate away from Supabase is for control and to avoid vendor lock-in. I don’t use most of the features Supabase has to offer (edge functions, storage, realtime, etc.)

# Here’s my plan:

*Estimated time: 4-6 weeks*

# Phase 1

\- Setup Prisma ORM and pull schema

\- manage migrations via Prisma

\- use
