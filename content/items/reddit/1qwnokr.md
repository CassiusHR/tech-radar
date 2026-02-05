---
id: "reddit:1qwnokr"
source: "reddit"
externalId: "1qwnokr"
url: "https://www.reddit.com/r/MachineLearning/comments/1qwnokr/d_how_do_you_usually_figure_out_why_a_multigpu/"
title: "[D] How do you usually figure out why a multi-GPU training run is slower than expected?"
text: "I have been bitten by this a few times recently and realized everyone seems to have a slightly different workflow.\n\nThinking about the *last time* a multi-GPU (DDP / FSDP) training run was noticeably slower than you expected:\n\n* What did you suspect first?\n* How did you narrow it down?\n* Did it end up being data, comms, imbalance, something else?\n* Roughly how long did it take before you felt confident about the root cause?\n\nGenuinely curious how people debug this in practice, because my own pro"
summary: undefined
image: undefined
imageAlt: undefined
authorHandle: "traceml-ai"
authorName: "traceml-ai"
publishedAt: "2026-02-05T15:06:14.000Z"
fetchedAt: "2026-02-05T17:01:27.763Z"
tags: []
metrics: {"score":11,"comments":6,"subreddit":"MachineLearning"}
score: 4.698032102211017
scoreBreakdown: {"total":4.698032102211017,"recency":0.7707603066362279,"engagement":4.449275362487124,"author":0,"source":0.9}
---

I have been bitten by this a few times recently and realized everyone seems to have a slightly different workflow.

Thinking about the *last time* a multi-GPU (DDP / FSDP) training run was noticeably slower than you expected:

* What did you suspect first?
* How did you narrow it down?
* Did it end up being data, comms, imbalance, something else?
* Roughly how long did it take before you felt confident about the root cause?

Genuinely curious how people debug this in practice, because my own pro
