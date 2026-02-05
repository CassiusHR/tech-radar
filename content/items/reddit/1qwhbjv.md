---
id: "reddit:1qwhbjv"
source: "reddit"
externalId: "1qwhbjv"
url: "https://www.reddit.com/r/reactjs/comments/1qwhbjv/i_built_propflow_to_stop_wasting_hours_tracing/"
title: "I built PropFlow to stop wasting hours tracing React props through component trees"
authorHandle: "HelicopterGlad456"
authorName: "HelicopterGlad456"
publishedAt: "2026-02-05T10:01:21.000Z"
fetchedAt: "2026-02-05T14:45:09.329Z"
tags: ["pillar/react"]
metrics: {"score":16,"comments":15,"subreddit":"reactjs"}
score: 5.508353158721346
scoreBreakdown: {"total":5.508353158721346,"recency":0.7301857561851925,"engagement":5.390206642394081,"author":0,"source":0.9}
---

Hey r/reactjs! 👋

I've spent way too many hours debugging prop drilling issues. You know the drill:

1. Find a prop with wrong value
2. Search codebase for prop name → 47 results
3. Manually trace through components
4. 20 minutes later, find the issue

So I built **PropFlow** \- a VS Code extension that does this instantly.

# What it does

Hover over ANY prop → see complete lineage from source to usage.

Features:

* 🔍 Instant prop tracing (2 seconds vs 20 minutes)
* 🗺️ Visual flowcharts on
