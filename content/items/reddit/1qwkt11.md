---
id: "reddit:1qwkt11"
source: "reddit"
externalId: "1qwkt11"
url: "https://www.reddit.com/r/javascript/comments/1qwkt11/fetch_still_cant_resume_a_failed_download_so_i/"
title: "fetch() still can't resume a failed download so i built that"
text: "been loading AI models in the browser. webllm, transformers.js, that\nkind of stuff. 3.5gb file, wifi drops at 90%, start from zero.\nhappened three times in one week before i snapped and built this.\n\nfetch has `integrity` which is cool but it downloads the whole file\nbefore checking the hash. 4gb of bandwidth burned to find out the\nfile was bad. and zero support for picking up where you left off.\n\nverifyFetch does both. each chunk gets its own hash verified on\narrival. bad data at chunk 5 of 4000"
summary: undefined
image: undefined
imageAlt: undefined
authorHandle: "aginext"
authorName: "aginext"
publishedAt: "2026-02-05T13:07:46.000Z"
fetchedAt: "2026-02-05T17:01:27.763Z"
tags: ["pillar/huggingface"]
metrics: {"score":29,"comments":9,"subreddit":"javascript"}
score: 5.545521332771674
scoreBreakdown: {"total":5.545521332771674,"recency":0.7420089544752583,"engagement":5.419681415271047,"author":0,"source":0.9}
---

been loading AI models in the browser. webllm, transformers.js, that
kind of stuff. 3.5gb file, wifi drops at 90%, start from zero.
happened three times in one week before i snapped and built this.

fetch has `integrity` which is cool but it downloads the whole file
before checking the hash. 4gb of bandwidth burned to find out the
file was bad. and zero support for picking up where you left off.

verifyFetch does both. each chunk gets its own hash verified on
arrival. bad data at chunk 5 of 4000
