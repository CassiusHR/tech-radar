---
id: "reddit:1qwg58c"
source: "reddit"
externalId: "1qwg58c"
url: "https://www.reddit.com/r/LocalLLaMA/comments/1qwg58c/qwen3_coder_next_poor_performance_on_r9700s/"
title: "Qwen3 Coder Next poor performance on r9700s"
text: "With ROCm 7.2 backend PP512 is only 53.  Luckily Vulkan at least works, though I usually found ROCm to be faster for other models.\n\n/AI/llama.cpp/build_v/bin/llama-bench  -m /AI/models/qwen3/Qwen3-Coder-Next-MXFP4_MOE.gguf -ngl 999  -fa 1 -ncmoe 0 -d 0,4096,8192,16384,32768,65536,131072,262144 -ts 50/50/0\nWARNING: radv is not a conformant Vulkan implementation, testing use only.\nWARNING: radv is not a conformant Vulkan implementation, testing use only.\nggml_vulkan: Found 3 Vulkan devices:\nggml_v"
summary: undefined
image: undefined
imageAlt: undefined
authorHandle: "jdchmiel"
authorName: "jdchmiel"
publishedAt: "2026-02-05T08:47:37.000Z"
fetchedAt: "2026-02-05T17:01:27.763Z"
tags: []
metrics: {"score":10,"comments":26,"subreddit":"LocalLLaMA"}
score: 5.834671175792784
scoreBreakdown: {"total":5.834671175792784,"recency":0.6825793561549491,"engagement":5.800388616948145,"author":0,"source":0.9}
---

With ROCm 7.2 backend PP512 is only 53.  Luckily Vulkan at least works, though I usually found ROCm to be faster for other models.

/AI/llama.cpp/build_v/bin/llama-bench  -m /AI/models/qwen3/Qwen3-Coder-Next-MXFP4_MOE.gguf -ngl 999  -fa 1 -ncmoe 0 -d 0,4096,8192,16384,32768,65536,131072,262144 -ts 50/50/0
WARNING: radv is not a conformant Vulkan implementation, testing use only.
WARNING: radv is not a conformant Vulkan implementation, testing use only.
ggml_vulkan: Found 3 Vulkan devices:
ggml_v
