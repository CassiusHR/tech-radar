---
id: "reddit:1qiz7ap"
source: "reddit"
externalId: "1qiz7ap"
url: "https://www.reddit.com/r/typescript/comments/1qiz7ap/announcing_ts2rs_a_typescript_to_rust_type/"
title: "Announcing `ts2rs` - A TypeScript to Rust type converter for bidirectional JSON communication."
authorHandle: "InternalServerError7"
authorName: "InternalServerError7"
publishedAt: "2026-01-21T14:23:42.000Z"
fetchedAt: "2026-02-05T14:45:34.462Z"
tags: []
metrics: {"score":25,"comments":5,"subreddit":"typescript"}
score: 4.5159318804952475
scoreBreakdown: {"total":4.5159318804952475,"recency":0.0007755756006095995,"engagement":5.016926513838554,"author":0,"source":0.9}
---

[ts2rs](https://github.com/mcmah309/ts2rs) is cli and programmatic api for converting typescript types to rust types. Nested types are even traversed across packages and resolved. Meaning if your types includes other types in different packages it will traverse those to resolve the shape. With this tool you can write your definitions in typescript and generate the equivalent rust types which support bi-directional json serialization.

e.g.
`example.ts`
```ts
export type Shape =
  | { type: "circ
