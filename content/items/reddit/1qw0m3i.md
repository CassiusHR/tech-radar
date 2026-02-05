---
id: "reddit:1qw0m3i"
source: "reddit"
externalId: "1qw0m3i"
url: "https://www.reddit.com/r/LocalLLaMA/comments/1qw0m3i/i_replaced_claudecodes_entire_backend_to_use/"
title: "I replaced Claude-Code’s entire backend to use NVIDIA NIM models for free"
authorHandle: "PreparationAny8816"
authorName: "PreparationAny8816"
publishedAt: "2026-02-04T20:53:30.000Z"
fetchedAt: "2026-02-05T14:45:34.462Z"
tags: ["pillar/ai-dev-tools","pillar/anthropic-openai-releases"]
metrics: {"score":69,"comments":23,"subreddit":"LocalLLaMA"}
score: 6.499799126894348
scoreBreakdown: {"total":6.499799126894348,"recency":0.5669727623336986,"engagement":6.65502626754891,"author":0,"source":0.9}
---

I have been working on a side-project which replaces the following things in the Claude ecosystem with free alternatives. I started the initial implementation with Opus 4.5 in claude code and as soon as it got working  I used it to work on itself which i found very cool.

\- Replaces Anthropic models with NVIDIA-NIM models: It acts as middleware between Claude-Code and NVIDIA-NIM allowing unlimited usage upto 40 RPM with a free NVIDIA-NIM api-key.

\- Replaces the Claude mobile app with telegram
