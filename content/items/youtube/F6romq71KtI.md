---
id: "youtube:F6romq71KtI"
source: "youtube"
externalId: "F6romq71KtI"
url: "https://www.youtube.com/watch?v=F6romq71KtI"
title: "Next.js Patterns: Public pages with personalization"
authorHandle: undefined
authorName: "Delba"
publishedAt: "2026-01-26T17:38:11.000Z"
fetchedAt: "2026-02-05T14:45:34.462Z"
tags: ["pillar/nextjs","pillar/react","pillar/vercel"]
metrics: {}
score: 0.005824515564669684
scoreBreakdown: {"total":0.005824515564669684,"recency":0.008320736520956691,"engagement":0,"author":0,"source":0.7}
---

How to build public pages in Next.js that combine prerendered content (static) with dynamic, user-specific data. We'll build a product list page that uses the "use cache" directive to prerender components that fetch external async data, and the React Suspense to stream dynamic content without blocking the prerendered components.

- Demo: https://cache-components-public-pages.labs.vercel.dev/
- Code: https://github.com/vercel-labs/cache-components-public-pages
- Step-by-step guide: https://nextjs.org/docs/app/guides/public-static-pages
- "use cache" docs: https://nextjs.org/docs/app/api-reference/directives/use-cache
- Suspense docs: https://react.dev/reference/react/Suspense

Chapters: 
00:00 Introduction
00:42 What we're building
01:27 Step 1: Add a simple header
01:54 Static components
02:19 Step 2: Add the product list
02:37 Dynamic components
03:36 Cache components
04:11 Step 3: Add a dynamic promotion banner
04:40 Partial Prerendering
05:57 Summary
