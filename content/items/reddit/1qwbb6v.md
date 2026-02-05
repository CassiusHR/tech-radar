---
id: "reddit:1qwbb6v"
source: "reddit"
externalId: "1qwbb6v"
url: "https://www.reddit.com/r/MachineLearning/comments/1qwbb6v/r_external_validation_keeps_killing_my_ml_models/"
title: "[R] External validation keeps killing my ML models (lab-generated vs external lab data) — looking for academic collaborators"
text: "Hey folks,\n\nI’m working on an ML/DL project involving **1D biological signal data** (spectral-like signals). I’m running into a problem that I *know* exists in theory but is brutal in practice — **external validation collapse**.\n\nHere’s the situation:\n\n* When I train/test within the same dataset (80/20 split, k-fold CV), performance is consistently strong\n   * PCA + LDA → good separation\n   * Classical ML → solid metrics\n   * DL → also performs well\n* The moment I test on **truly external data**"
summary: undefined
image: undefined
imageAlt: undefined
authorHandle: "Big-Shopping2444"
authorName: "Big-Shopping2444"
publishedAt: "2026-02-05T04:19:02.000Z"
fetchedAt: "2026-02-05T17:01:27.763Z"
tags: []
metrics: {"score":10,"comments":29,"subreddit":"MachineLearning"}
score: 5.8985655785392455
scoreBreakdown: {"total":5.8985655785392455,"recency":0.6262126474963319,"engagement":5.927749106436163,"author":0,"source":0.9}
---

Hey folks,

I’m working on an ML/DL project involving **1D biological signal data** (spectral-like signals). I’m running into a problem that I *know* exists in theory but is brutal in practice — **external validation collapse**.

Here’s the situation:

* When I train/test within the same dataset (80/20 split, k-fold CV), performance is consistently strong
   * PCA + LDA → good separation
   * Classical ML → solid metrics
   * DL → also performs well
* The moment I test on **truly external data**
