---
id: "reddit:1quujn0"
source: "reddit"
externalId: "1quujn0"
url: "https://www.reddit.com/r/kubernetes/comments/1quujn0/is_there_any_bestpractice_to_migrate_a_existing/"
title: "Is there any best-practice to migrate a existing cluster (small / homelab) from microk8s to Talos?"
authorHandle: "Beneficial_Fox3014"
authorName: "Beneficial_Fox3014"
publishedAt: "2026-02-03T15:14:04.000Z"
fetchedAt: "2026-02-05T14:45:09.329Z"
tags: ["pillar/devops"]
metrics: {"score":10,"comments":23,"subreddit":"kubernetes"}
score: 5.382571076175147
scoreBreakdown: {"total":5.382571076175147,"recency":0.32036275411512594,"engagement":5.66027177496837,"author":0,"source":0.9}
---

Currently I have a 3 node microk8s cluster on top of my Proxmox cluster, and I want to move that to Talos OS based kubernetes, for several reasons, but main one is just to try it and experiment it in a more real state.

  
Currently I don't have any GitOps approach that I know it would simplify a lot the situation, and I have mainly helm based deployments and some microk8s addons, and a external CEPH cluster configuration and some NFS storage class as well.

  
Anyone has done something similar
