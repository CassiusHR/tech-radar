---
id: "reddit:1quuwqp"
source: "reddit"
externalId: "1quuwqp"
url: "https://www.reddit.com/r/reactjs/comments/1quuwqp/building_a_rich_text_editor_in_react_without/"
title: "Building a Rich Text Editor in React without fighting contentEditable"
authorHandle: "codes_astro"
authorName: "codes_astro"
publishedAt: "2026-02-03T15:27:43.000Z"
fetchedAt: "2026-02-05T14:45:34.462Z"
tags: ["pillar/react"]
metrics: {"score":25,"comments":7,"subreddit":"reactjs"}
score: 4.937532403264202
scoreBreakdown: {"total":4.937532403264202,"recency":0.32171587897849174,"engagement":5.16443123575951,"author":0,"source":0.9}
---

I’ve built rich text editors in React more times than I want to admit, and the pattern is always the same.

You start with `contentEditable` or HTML strings. It works. Then requirements show up. Headings need rules. Formatting needs limits. Someone pastes broken markup. Another feature needs programmatic edits. React state and the DOM drift apart, and now every change feels risky.

At some point it clicks that the problem isn’t React. It’s the idea that rich text should be treated as free-form H
