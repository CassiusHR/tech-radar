---
id: "reddit:1qiw6lt"
source: "reddit"
externalId: "1qiw6lt"
url: "https://www.reddit.com/r/typescript/comments/1qiw6lt/how_to_make_objectkeys_return_keyof_sometype/"
title: "How to make Object.keys() return (keyof SomeType)[ ] instead of string[ ] ? Without using `as` keyword"
authorHandle: "5Ping"
authorName: "5Ping"
publishedAt: "2026-01-21T12:07:54.000Z"
fetchedAt: "2026-02-05T14:45:34.462Z"
tags: []
metrics: {"score":34,"comments":26,"subreddit":"typescript"}
score: 5.627712482293726
scoreBreakdown: {"total":5.627712482293726,"recency":0.000742503098833618,"engagement":6.252271366116417,"author":0,"source":0.9}
---

Right now im just using the as keyword to make it ignore errors. But what would be the proper way of doing this? I have a type: SomeType and it has a lot of keys. I need to iterate through each key and do some logic, so I am using Object.keys, but since it outputs string\[ \], auto complete doesnt work and I have to use `as (keyof SomeType)[]`

Is `as` keyword actually acceptable here? Because it is essentially implied that you are definitely getting the keys of SomeType by passing it to Object.
