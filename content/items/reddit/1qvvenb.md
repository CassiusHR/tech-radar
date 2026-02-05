---
id: "reddit:1qvvenb"
source: "reddit"
externalId: "1qvvenb"
url: "https://www.reddit.com/r/node/comments/1qvvenb/free_tip_for_new_developers_using_jsts/"
title: "Free tip for new developers using JS/TS"
text: "Stop putting await inside your for-loops.\n\nSeriously.\n\nYou are effectively turning an asynchronous superpower into a synchronous traffic jam.\n\nI learned this the hard way after wondering why my API took 5 seconds to load just 10 items.\n\n**• Sync loop: One by one (Slow)**\n\n**• Promise.all: All at once (Fast)**\n\nIt feels stupid that I didn't realize this sooner, but fixing it is an instant performance win."
summary: undefined
image: undefined
imageAlt: undefined
authorHandle: "ConsiderationOne3421"
authorName: "ConsiderationOne3421"
publishedAt: "2026-02-04T17:48:22.000Z"
fetchedAt: "2026-02-05T17:01:27.763Z"
tags: []
metrics: {"score":47,"comments":52,"subreddit":"node"}
score: 6.790421299745422
scoreBreakdown: {"total":6.790421299745422,"recency":0.5114798260879038,"engagement":7.033432729184787,"author":0,"source":0.9}
---

Stop putting await inside your for-loops.

Seriously.

You are effectively turning an asynchronous superpower into a synchronous traffic jam.

I learned this the hard way after wondering why my API took 5 seconds to load just 10 items.

**• Sync loop: One by one (Slow)**

**• Promise.all: All at once (Fast)**

It feels stupid that I didn't realize this sooner, but fixing it is an instant performance win.
