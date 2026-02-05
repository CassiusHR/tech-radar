---
id: "reddit:1qvpt9o"
source: "reddit"
externalId: "1qvpt9o"
url: "https://www.reddit.com/r/reactjs/comments/1qvpt9o/is_react_query_the_default_state_manager_now_or/"
title: "Is React Query the “default” state manager now, or are we overusing it?"
authorHandle: "More_Letter2749"
authorName: "More_Letter2749"
publishedAt: "2026-02-04T14:21:05.000Z"
fetchedAt: "2026-02-05T15:01:15.857Z"
tags: ["pillar/react"]
metrics: {"score":7,"comments":60,"subreddit":"reactjs"}
score: 6.561199217488168
scoreBreakdown: {"total":6.561199217488168,"recency":0.49737898327716784,"engagement":6.792842369487463,"author":0,"source":0.9}
---

I’m trying to standardise how we split state in a mid-sized React app.  
What’s your rule of thumb in 2026 for choosing between:

* React Query (server state / cache)
* URL state (filters, pagination, shareable state)
* local component state
* global client state (Zustand/Redux/RTK)

Specifically: where do you draw the line to avoid double sources of truth (RQ cache + store), and what app constraints still justify Redux/RTK today (offline, multi-tab sync, audit log, complex workflows, etc.)?
