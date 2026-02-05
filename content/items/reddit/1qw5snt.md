---
id: "reddit:1qw5snt"
source: "reddit"
externalId: "1qw5snt"
url: "https://www.reddit.com/r/aws/comments/1qw5snt/when_using_sqs_and_lambda_what_is_the_best_way_to/"
title: "When using SQS and Lambda, what is the best way to rate limit how many messages the lambda can process per minute?"
authorHandle: "PuppyLand95"
authorName: "PuppyLand95"
publishedAt: "2026-02-05T00:13:49.000Z"
fetchedAt: "2026-02-05T15:01:15.857Z"
tags: []
metrics: {"score":16,"comments":45,"subreddit":"aws"}
score: 6.429187278569072
scoreBreakdown: {"total":6.429187278569072,"recency":0.6015810523856336,"engagement":6.541960368246667,"author":0,"source":0.9}
---

My app allows users to do a bulk import of many products. When the user triggers a bulk import, each product will get enqueued to the sqs queue as a message. There is a lambda worker that will process from the queue. The problem is that in order to import the product I need to call a third party API which is rate limited (using a fixed window, e.g. 5000 api calls per day). Since there could be multiple users that trigger a bulk import at the same time, I was planning to use SQS "fair" queues to
