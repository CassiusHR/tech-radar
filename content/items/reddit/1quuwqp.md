---
id: "reddit:1quuwqp"
source: "reddit"
externalId: "1quuwqp"
url: "https://www.reddit.com/r/reactjs/comments/1quuwqp/building_a_rich_text_editor_in_react_without/"
title: "Building a Rich Text Editor in React without fighting contentEditable"
authorHandle: "codes_astro"
authorName: "codes_astro"
publishedAt: "2026-02-03T15:27:43.000Z"
fetchedAt: "2026-02-05T15:01:15.857Z"
tags: ["pillar/react"]
metrics: {"score":27,"comments":7,"subreddit":"reactjs"}
score: 4.9975547114363215
scoreBreakdown: {"total":4.9975547114363215,"recency":0.3201011026658644,"engagement":5.232737465596715,"author":0,"source":0.9}
---

I’ve built rich text editors in React more times than I want to admit, and the pattern is always the same.

You start with `contentEditable` or HTML strings. It works. Then requirements show up. Headings need rules. Formatting needs limits. Someone pastes broken markup. Another feature needs programmatic edits. React state and the DOM drift apart, and now every change feels risky.

At some point it clicks that the problem isn’t React. It’s the idea that rich text should be treated as free-form H
