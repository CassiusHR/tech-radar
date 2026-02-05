---
id: "reddit:1qwbykz"
source: "reddit"
externalId: "1qwbykz"
url: "https://www.reddit.com/r/MachineLearning/comments/1qwbykz/d_how_to_structure_an_rl_solution_for_a/"
title: "[D] How to structure an RL solution for a forecasting problem combined with supervised learning"
authorHandle: "melcoriss"
authorName: "melcoriss"
publishedAt: "2026-02-05T04:50:39.000Z"
fetchedAt: "2026-02-05T15:01:15.857Z"
tags: []
metrics: {"score":9,"comments":7,"subreddit":"MachineLearning"}
score: 4.5960698590289635
scoreBreakdown: {"total":4.5960698590289635,"recency":0.6574689253228352,"engagement":4.449275362487124,"author":0,"source":0.9}
---

I’m working on a sales forecasting task with historical seasonal data. Right now, I can train a supervised model, specifically XGBoost, that works reasonably well. I was told by my supervisor to use RL on top of the supervised model predictions, but I'm having trouble understanding how reinforcement learning would actually be structured for my problem.

 What part of the system would it actually adjust or control? Is this supposed to be an offline bandit, or a full RL setup with state transition
