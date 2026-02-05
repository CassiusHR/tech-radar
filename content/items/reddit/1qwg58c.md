---
id: "reddit:1qwg58c"
source: "reddit"
externalId: "1qwg58c"
url: "https://www.reddit.com/r/LocalLLaMA/comments/1qwg58c/qwen3_coder_next_poor_performance_on_r9700s/"
title: "Qwen3 Coder Next poor performance on r9700s"
authorHandle: "jdchmiel"
authorName: "jdchmiel"
publishedAt: "2026-02-05T08:47:37.000Z"
fetchedAt: "2026-02-05T14:45:34.462Z"
tags: []
metrics: {"score":11,"comments":17,"subreddit":"LocalLLaMA"}
score: 5.465782341824848
scoreBreakdown: {"total":5.465782341824848,"recency":0.7129935358317652,"engagement":5.360097955084733,"author":0,"source":0.9}
---

With ROCm 7.2 backend PP512 is only 53.  Luckily Vulkan at least works, though I usually found ROCm to be faster for other models.

/AI/llama.cpp/build_v/bin/llama-bench  -m /AI/models/qwen3/Qwen3-Coder-Next-MXFP4_MOE.gguf -ngl 999  -fa 1 -ncmoe 0 -d 0,4096,8192,16384,32768,65536,131072,262144 -ts 50/50/0
WARNING: radv is not a conformant Vulkan implementation, testing use only.
WARNING: radv is not a conformant Vulkan implementation, testing use only.
ggml_vulkan: Found 3 Vulkan devices:
ggml_v
