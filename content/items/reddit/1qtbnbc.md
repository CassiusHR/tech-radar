---
id: "reddit:1qtbnbc"
source: "reddit"
externalId: "1qtbnbc"
url: "https://www.reddit.com/r/typescript/comments/1qtbnbc/pdfdown_rust_based_pdf_tooling_for_ts/"
title: "Pdfdown: Rust based PDF Tooling for TS"
authorHandle: "d0paminedriven"
authorName: "d0paminedriven"
publishedAt: "2026-02-01T21:38:53.000Z"
fetchedAt: "2026-02-05T15:01:15.857Z"
tags: []
metrics: {"score":13,"comments":2,"subreddit":"typescript"}
score: 3.7706590452856226
scoreBreakdown: {"total":3.7706590452856226,"recency":0.14310070037383918,"engagement":4.04652046105463,"author":0,"source":0.9}
---

Shipped a rust powered pdf package with node bindings via napi-rs. Adding async methods today that will be non (node thread) blocking. Sync methods are great for fire and forget background processes. Extract all text (by page), extract all images (by page), and/or extract pdf metadata in milliseconds. Just pass a buffer from fetching a pdf remote or reading one locally in.
