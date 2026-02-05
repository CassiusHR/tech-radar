---
id: "reddit:1qwde7m"
source: "reddit"
externalId: "1qwde7m"
url: "https://www.reddit.com/r/kubernetes/comments/1qwde7m/how_are_you_assigning_work_across_distributed/"
title: "How are you assigning work across distributed workers without Redis locks or leader election?"
authorHandle: "whitethornnawor"
authorName: "whitethornnawor"
publishedAt: "2026-02-05T06:03:40.000Z"
fetchedAt: "2026-02-05T14:45:34.462Z"
tags: ["pillar/devops"]
metrics: {"score":6,"comments":15,"subreddit":"kubernetes"}
score: 5.158562801396866
scoreBreakdown: {"total":5.158562801396866,"recency":0.6764513682946037,"engagement":5.055285077701914,"author":0,"source":0.9}
---

I’ve been running into this repeatedly in my go systems where we have a bunch of worker pods doing distributed tasks (consuming from kafka topics and then process it / batch jobs, pipelines, etc.)

The pattern is:

* We have N workers (usually less than 50 k8s pods)
* We have M work units (topic-partitions)
* We need each worker to “own” some subset of work (almost distributed evenly)
* Workers come and go (deploys, crashes, autoscaling)
* I need control to throttle

And every time the solution
