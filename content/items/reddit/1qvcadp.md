---
id: "reddit:1qvcadp"
source: "reddit"
externalId: "1qvcadp"
url: "https://www.reddit.com/r/aws/comments/1qvcadp/aws_to_aws_ipsec_vpn_configuration/"
title: "AWS to AWS IPsec VPN configuration"
authorHandle: "nnray"
authorName: "nnray"
publishedAt: "2026-02-04T02:34:34.000Z"
fetchedAt: "2026-02-05T14:45:09.329Z"
tags: []
metrics: {"score":6,"comments":14,"subreddit":"aws"}
score: 4.8384315672652844
scoreBreakdown: {"total":4.8384315672652844,"recency":0.39854778865402646,"engagement":4.977487286085179,"author":0,"source":0.9}
---

I have experience setting up IPSec VPN connections from AWS to an on-prem firewall, but haven't had to create an AWS to AWS IPsec VPN connection between customers before. Am I correct that one side will need to do the initial setup with placeholder customer gateway etc. and then after the VPN is created provide one of the outside IP addresses from that config to the other customer so they can create their config, then after their config is created take one of their tunnel outside IP address, and
