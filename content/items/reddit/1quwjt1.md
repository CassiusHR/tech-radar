---
id: "reddit:1quwjt1"
source: "reddit"
externalId: "1quwjt1"
url: "https://www.reddit.com/r/MachineLearning/comments/1quwjt1/p_michiai_a_530m_fullduplex_speech_llm_with_75ms/"
title: "[P] MichiAI: A 530M Full-Duplex Speech LLM with ~75ms Latency using Flow Matching"
authorHandle: "kwazar90"
authorName: "kwazar90"
publishedAt: "2026-02-03T16:28:14.000Z"
fetchedAt: "2026-02-05T14:45:09.329Z"
tags: []
metrics: {"score":65,"comments":27,"subreddit":"MachineLearning"}
score: 6.327510613187263
scoreBreakdown: {"total":6.327510613187263,"recency":0.3280789080909846,"engagement":6.702488439894863,"author":0,"source":0.9}
---

I wanted to see if I could build a full-duplex speech model that avoids the coherence degradation that plagues models of this type while also requiring low compute for training and inference.

I don't have access to much compute so I spent a lot of the time designing the architecture so it's efficient and there is no need to brute force with model size and training compute.

Also I made sure that all the components can be pretrained quickly separately and only trained together as the last step.
