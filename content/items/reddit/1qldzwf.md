---
id: "reddit:1qldzwf"
source: "reddit"
externalId: "1qldzwf"
url: "https://www.reddit.com/r/typescript/comments/1qldzwf/how_do_you_know_the_return_type_of_this_method/"
title: "How do you know the return type of this method?"
authorHandle: "HumanCertificate"
authorName: "HumanCertificate"
publishedAt: "2026-01-24T05:05:16.000Z"
fetchedAt: "2026-02-05T14:45:34.462Z"
tags: []
metrics: {"score":12,"comments":12,"subreddit":"typescript"}
score: 4.552090566238895
scoreBreakdown: {"total":4.552090566238895,"recency":0.0025933292301920327,"engagement":5.055285077701914,"author":0,"source":0.9}
---

I need to deconstruct an object that is received from `await supabase.from("profiles").select("user_id").eq("username", searchedUsername);`. However, I'm having trouble figuring out how to know the return type of these .select, .eq methods are.

My first intuition was to hover over the `.eq("username", serachedUsername);` to learn the return type, but I got this. 

    (method) PostgrestFilterBuilder&lt;any, any, any, { user_id: any; }[], "profiles", unknown, "GET"&gt;.eq&lt;"username"&gt;(colum
