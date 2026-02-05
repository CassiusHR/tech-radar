---
id: "reddit:1qwbb6v"
source: "reddit"
externalId: "1qwbb6v"
url: "https://www.reddit.com/r/MachineLearning/comments/1qwbb6v/r_external_validation_keeps_killing_my_ml_models/"
title: "[R] External validation keeps killing my ML models (lab-generated vs external lab data) — looking for academic collaborators"
authorHandle: "Big-Shopping2444"
authorName: "Big-Shopping2444"
publishedAt: "2026-02-05T04:19:02.000Z"
fetchedAt: "2026-02-05T15:01:15.857Z"
tags: []
metrics: {"score":11,"comments":27,"subreddit":"MachineLearning"}
score: 5.864713846292982
scoreBreakdown: {"total":5.864713846292982,"recency":0.6508320792663181,"engagement":5.865516638836995,"author":0,"source":0.9}
---

Hey folks,

I’m working on an ML/DL project involving **1D biological signal data** (spectral-like signals). I’m running into a problem that I *know* exists in theory but is brutal in practice — **external validation collapse**.

Here’s the situation:

* When I train/test within the same dataset (80/20 split, k-fold CV), performance is consistently strong
   * PCA + LDA → good separation
   * Classical ML → solid metrics
   * DL → also performs well
* The moment I test on **truly external data**
