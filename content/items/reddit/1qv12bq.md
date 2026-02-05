---
id: "reddit:1qv12bq"
source: "reddit"
externalId: "1qv12bq"
url: "https://www.reddit.com/r/devops/comments/1qv12bq/im_starting_to_think_infrastructure_as_code_is/"
title: "I'm starting to think Infrastructure as Code is the wrong way to teach Terraform"
authorHandle: "NTCTech"
authorName: "NTCTech"
publishedAt: "2026-02-03T19:08:43.000Z"
fetchedAt: "2026-02-05T14:45:34.462Z"
tags: ["pillar/devops"]
metrics: {"score":157,"comments":107,"subreddit":"devops"}
score: 7.768630463636394
scoreBreakdown: {"total":7.768630463636394,"recency":0.3453602302802563,"engagement":8.286451395982404,"author":0,"source":0.9}
---

I’ve spent a lot of time with Terraform, and the more I use it at scale, the less “code” feels like the right way to think about it. “Code” makes you believe that what’s written is all that matters - that your code is the source of truth. But honestly, anyone who's worked with Terraform for a while knows that's just not true. The state file runs the show.  
  
Not long ago, I hit a snag with a team sure they’d locked down their security groups - because that’s what their HCL said. But they had a
