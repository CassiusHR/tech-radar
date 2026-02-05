---
id: "reddit:1quexqv"
source: "reddit"
externalId: "1quexqv"
url: "https://www.reddit.com/r/Frontend/comments/1quexqv/bot_detection_through_keystroke_rhythm_tiny_ts/"
title: "Bot detection through keystroke rhythm: Tiny TS lib for forms"
authorHandle: "AnUuglyMan"
authorName: "AnUuglyMan"
publishedAt: "2026-02-03T01:56:20.000Z"
fetchedAt: "2026-02-05T14:45:34.462Z"
tags: []
metrics: {"score":12,"comments":3,"subreddit":"Frontend"}
score: 3.933163193570734
scoreBreakdown: {"total":3.933163193570734,"recency":0.24796675535668788,"engagement":4.122214570833016,"author":0,"source":0.9}
---

Bot detection through keystroke rhythm. No CAPTCHAs, no interruptions.

Traditional CAPTCHAs aren't cutting it anymore against modern AI/browser tools, and honestly, I don't want to block agents completely anyway; they're part of the future. Just want to softly penalize them in our recommendation algorithm's score, so real users don't get hurt.

Made this quick TS lib: **is-human-cadence**

* Tracks only timing/rhythm: pauses, speed changes, backspaces, burst patterns (no text content analyzed)
