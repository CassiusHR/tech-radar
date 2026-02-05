---
id: "reddit:1qons9y"
source: "reddit"
externalId: "1qons9y"
url: "https://www.reddit.com/r/typescript/comments/1qons9y/trying_to_come_up_with_a_good_clear_one_sentence/"
title: "Trying to come up with a good, clear, one sentence rule for when to use interfaces vs type-aliases."
authorHandle: "TheWebDever"
authorName: "TheWebDever"
publishedAt: "2026-01-27T19:25:58.000Z"
fetchedAt: "2026-02-05T14:45:09.329Z"
tags: []
metrics: {"score":24,"comments":73,"subreddit":"typescript"}
score: 6.49080398550572
scoreBreakdown: {"total":6.49080398550572,"recency":0.013675449235965543,"engagement":7.1983289791037235,"author":0,"source":0.9}
---

Every project I've ever worked has been a hodge podge of structure*d*\-type-aliases and interfaces for describing objects. Historically, I've always used interfaces for objects whenever I don't need some fancy derived-type and there was even an eslint rule \`prefer-interface\` which did this too. Interfaces have been causing issues for me though when trying to pass data around (i.e. I can't pass an interface to \`Record&lt;string, unknown&gt;\` and I don't wanna use \`object\` because it's too p
