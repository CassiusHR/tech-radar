---
id: "reddit:1qwkt11"
source: "reddit"
externalId: "1qwkt11"
url: "https://www.reddit.com/r/javascript/comments/1qwkt11/fetch_still_cant_resume_a_failed_download_so_i/"
title: "fetch() still can't resume a failed download so i built that"
authorHandle: "aginext"
authorName: "aginext"
publishedAt: "2026-02-05T13:07:46.000Z"
fetchedAt: "2026-02-05T15:01:15.857Z"
tags: ["pillar/huggingface"]
metrics: {"score":10,"comments":6,"subreddit":"javascript"}
score: 4.644785518603823
scoreBreakdown: {"total":4.644785518603823,"recency":0.7711808961478823,"engagement":4.389691902300809,"author":0,"source":0.9}
---

been loading AI models in the browser. webllm, transformers.js, that
kind of stuff. 3.5gb file, wifi drops at 90%, start from zero.
happened three times in one week before i snapped and built this.

fetch has `integrity` which is cool but it downloads the whole file
before checking the hash. 4gb of bandwidth burned to find out the
file was bad. and zero support for picking up where you left off.

verifyFetch does both. each chunk gets its own hash verified on
arrival. bad data at chunk 5 of 4000
