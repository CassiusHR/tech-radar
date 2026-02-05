---
id: "reddit:1qvvenb"
source: "reddit"
externalId: "1qvvenb"
url: "https://www.reddit.com/r/node/comments/1qvvenb/free_tip_for_new_developers_using_jsts/"
title: "Free tip for new developers using JS/TS"
authorHandle: "ConsiderationOne3421"
authorName: "ConsiderationOne3421"
publishedAt: "2026-02-04T17:48:22.000Z"
fetchedAt: "2026-02-05T15:01:15.857Z"
tags: []
metrics: {"score":48,"comments":48,"subreddit":"node"}
score: 6.749114218270265
scoreBreakdown: {"total":6.749114218270265,"recency":0.5315885586892672,"engagement":6.967427239388804,"author":0,"source":0.9}
---

Stop putting await inside your for-loops.

Seriously.

You are effectively turning an asynchronous superpower into a synchronous traffic jam.

I learned this the hard way after wondering why my API took 5 seconds to load just 10 items.

**• Sync loop: One by one (Slow)**

**• Promise.all: All at once (Fast)**

It feels stupid that I didn't realize this sooner, but fixing it is an instant performance win.
