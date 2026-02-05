---
id: "reddit:1qvrc59"
source: "reddit"
externalId: "1qvrc59"
url: "https://www.reddit.com/r/LocalLLaMA/comments/1qvrc59/some_hard_lessons_learned_building_a_private_h100/"
title: "Some hard lessons learned building a private H100 cluster (Why PCIe servers failed us for training)"
authorHandle: "NTCTech"
authorName: "NTCTech"
publishedAt: "2026-02-04T15:20:42.000Z"
fetchedAt: "2026-02-05T14:45:34.462Z"
tags: []
metrics: {"score":379,"comments":102,"subreddit":"LocalLLaMA"}
score: 8.484664400965682
scoreBreakdown: {"total":8.484664400965682,"recency":0.5095435140023502,"engagement":8.917861375959518,"author":0,"source":0.9}
---

^(Just wanted to dump some notes here after spending the last few months architecting a private training stack (70B+ param models. We initially tried to save budget by looking at standard PCIe servers instead of the HGX/SXM form factors, and honestly, the "paper math" vs. reality was a brutal wake-up call.))

^(Thought this might save someone else the headache if you're trying to move from inference to actual training runs on-prem.)

^(1. The "NVLink Tax" isn't optional for training. We tried to
