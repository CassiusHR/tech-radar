---
id: "reddit:1qw9hr4"
source: "reddit"
externalId: "1qw9hr4"
url: "https://www.reddit.com/r/ClaudeAI/comments/1qw9hr4/claude_code_has_an_undocumented_persistent_memory/"
title: "Claude Code has an undocumented persistent memory feature"
authorHandle: "bitr8"
authorName: "bitr8"
publishedAt: "2026-02-05T02:55:11.000Z"
fetchedAt: "2026-02-05T14:45:09.329Z"
tags: ["pillar/ai-dev-tools","pillar/anthropic-openai-releases"]
metrics: {"score":181,"comments":42,"subreddit":"ClaudeAI"}
score: 7.608374534565416
scoreBreakdown: {"total":7.608374534565416,"recency":0.6368546505560837,"engagement":7.816894832294378,"author":0,"source":0.9}
---

Claude Code has an undocumented persistent memory feature

Stumbled across this while working on a project. Claude Code quietly maintains a per-project memory directory at \~/.claude/projects/&lt;project-path&gt;/memory/. If you put a [MEMORY.md](http://MEMORY.md) in there, it gets loaded into the system prompt every session automatically.

The system prompt includes this verbatim:

"You have a persistent auto memory directory at \[path\]. Its contents persist across conversations."

And:

"MEMO
