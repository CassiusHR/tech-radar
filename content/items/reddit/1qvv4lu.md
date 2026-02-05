---
id: "reddit:1qvv4lu"
source: "reddit"
externalId: "1qvv4lu"
url: "https://www.reddit.com/r/nextjs/comments/1qvv4lu/best_stacks_ecommerce_next/"
title: "Best stacks ecommerce next"
authorHandle: "lukNoah"
authorName: "lukNoah"
publishedAt: "2026-02-04T17:38:25.000Z"
fetchedAt: "2026-02-05T14:45:34.462Z"
tags: ["pillar/nextjs"]
metrics: {"score":78,"comments":35,"subreddit":"nextjs"}
score: 6.784282657077886
scoreBreakdown: {"total":6.784282657077886,"recency":0.5325670128740085,"engagement":7.005524828323642,"author":0,"source":0.9}
---

Good morning community!
I'm building an e-commerce for a client(he needs backend and cms also) (Magento-style but modern stack) and need your brutal honest feedback on the architecture.
Monorepo: Next.js 16 (storefront + admin) + NestJS (API)
Key questions:
KeyDB vs DragonflyDB — KeyDB is BSD-3 (truly free), Dragonfly moved to BSL. For "customer self-hosts everything", KeyDB seems safer legally. Thoughts?
Temporal vs BullMQ — Is Temporal overkill for standard e-commerce flows (checkout, webhooks
