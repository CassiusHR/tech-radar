---
id: "reddit:1qwfk8a"
source: "reddit"
externalId: "1qwfk8a"
url: "https://www.reddit.com/r/kubernetes/comments/1qwfk8a/restricting_external_egress_to_a_single_api/"
title: "Restricting external egress to a single API (ChatGPT) in Istio Ambient Mesh?"
authorHandle: "Umman2005"
authorName: "Umman2005"
publishedAt: "2026-02-05T08:10:45.000Z"
fetchedAt: "2026-02-05T14:45:09.329Z"
tags: ["pillar/anthropic-openai-releases","pillar/devops"]
metrics: {"score":5,"comments":11,"subreddit":"kubernetes"}
score: 4.832829931435608
scoreBreakdown: {"total":4.832829931435608,"recency":0.7047247206831675,"engagement":4.665086314245285,"author":0,"source":0.9}
---

I'm working with Istio Ambient Mesh and trying to lock down a specific namespace (ai-namespace).

The goal: Apps in this namespace should only be allowed to send requests to the ChatGPT API (api.openai.com). All other external systems/URLs must be blocked.

I want to avoid setting the global outboundTrafficPolicy.mode to REGISTRY_ONLY because I don't want to break egress for every other namespace in the cluster.

What is the best way to "jail" just this one namespace using Waypoint proxies and A
