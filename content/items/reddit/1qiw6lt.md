---
id: "reddit:1qiw6lt"
source: "reddit"
externalId: "1qiw6lt"
url: "https://www.reddit.com/r/typescript/comments/1qiw6lt/how_to_make_objectkeys_return_keyof_sometype/"
title: "How to make Object.keys() return (keyof SomeType)[ ] instead of string[ ] ? Without using `as` keyword"
text: "Right now im just using the as keyword to make it ignore errors. But what would be the proper way of doing this? I have a type: SomeType and it has a lot of keys. I need to iterate through each key and do some logic, so I am using Object.keys, but since it outputs string\\[ \\], auto complete doesnt work and I have to use `as (keyof SomeType)[]`\n\nIs `as` keyword actually acceptable here? Because it is essentially implied that you are definitely getting the keys of SomeType by passing it to Object."
summary: undefined
image: undefined
imageAlt: undefined
authorHandle: "5Ping"
authorName: "5Ping"
publishedAt: "2026-01-21T12:07:54.000Z"
fetchedAt: "2026-02-05T17:01:27.763Z"
tags: []
metrics: {"score":37,"comments":26,"subreddit":"typescript"}
score: 5.6703999317323515
scoreBreakdown: {"total":5.6703999317323515,"recency":0.0007108301291310612,"engagement":6.2997335384623705,"author":0,"source":0.9}
---

Right now im just using the as keyword to make it ignore errors. But what would be the proper way of doing this? I have a type: SomeType and it has a lot of keys. I need to iterate through each key and do some logic, so I am using Object.keys, but since it outputs string\[ \], auto complete doesnt work and I have to use `as (keyof SomeType)[]`

Is `as` keyword actually acceptable here? Because it is essentially implied that you are definitely getting the keys of SomeType by passing it to Object.
