---
id: "reddit:1qwgpfl"
source: "reddit"
externalId: "1qwgpfl"
url: "https://www.reddit.com/r/ClaudeAI/comments/1qwgpfl/i_forced_claude_to_reject_my_code_until_i_wrote_a/"
title: "I forced Claude to reject my code until I wrote a PRD — what happened after a month"
authorHandle: "Savings-Abalone1464"
authorName: "Savings-Abalone1464"
publishedAt: "2026-02-05T09:23:11.000Z"
fetchedAt: "2026-02-05T15:01:15.857Z"
tags: ["pillar/ai-dev-tools","pillar/anthropic-openai-releases"]
metrics: {"score":28,"comments":21,"subreddit":"ClaudeAI"}
score: 6.016778889265558
scoreBreakdown: {"total":6.016778889265558,"recency":0.7175580491038883,"engagement":5.967751827857842,"author":0,"source":0.9}
---

I've been using Claude Code almost every day for the past 3 months.  

Around month 2, I kept hitting the same frustrating pattern:



Me: "build login"  

→ Claude builds login, but skips password reset, rate limiting, session expiry.



Me: "add payments"  

→ Stripe checkout appears, but no webhook verification, no idempotency, no retry logic.



It always built exactly what I asked for — and skipped everything I forgot to mention.  

Then I'd spend 2-3 hours debugging code that looked correc
