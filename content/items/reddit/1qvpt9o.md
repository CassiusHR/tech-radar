---
id: "reddit:1qvpt9o"
source: "reddit"
externalId: "1qvpt9o"
url: "https://www.reddit.com/r/reactjs/comments/1qvpt9o/is_react_query_the_default_state_manager_now_or/"
title: "Is React Query the “default” state manager now, or are we overusing it?"
text: "I’m trying to standardise how we split state in a mid-sized React app.  \nWhat’s your rule of thumb in 2026 for choosing between:\n\n* React Query (server state / cache)\n* URL state (filters, pagination, shareable state)\n* local component state\n* global client state (Zustand/Redux/RTK)\n\nSpecifically: where do you draw the line to avoid double sources of truth (RQ cache + store), and what app constraints still justify Redux/RTK today (offline, multi-tab sync, audit log, complex workflows, etc.)?"
summary: undefined
image: undefined
imageAlt: undefined
authorHandle: "More_Letter2749"
authorName: "More_Letter2749"
publishedAt: "2026-02-04T14:21:05.000Z"
fetchedAt: "2026-02-05T17:01:27.763Z"
tags: ["pillar/react"]
metrics: {"score":10,"comments":60,"subreddit":"reactjs"}
score: 6.573456513129807
scoreBreakdown: {"total":6.573456513129807,"recency":0.478564317662619,"engagement":6.825276252481611,"author":0,"source":0.9}
---

I’m trying to standardise how we split state in a mid-sized React app.  
What’s your rule of thumb in 2026 for choosing between:

* React Query (server state / cache)
* URL state (filters, pagination, shareable state)
* local component state
* global client state (Zustand/Redux/RTK)

Specifically: where do you draw the line to avoid double sources of truth (RQ cache + store), and what app constraints still justify Redux/RTK today (offline, multi-tab sync, audit log, complex workflows, etc.)?
