---
id: "reddit:1qldzwf"
source: "reddit"
externalId: "1qldzwf"
url: "https://www.reddit.com/r/typescript/comments/1qldzwf/how_do_you_know_the_return_type_of_this_method/"
title: "How do you know the return type of this method?"
text: "I need to deconstruct an object that is received from `await supabase.from(\"profiles\").select(\"user_id\").eq(\"username\", searchedUsername);`. However, I'm having trouble figuring out how to know the return type of these .select, .eq methods are.\n\nMy first intuition was to hover over the `.eq(\"username\", serachedUsername);` to learn the return type, but I got this. \n\n    (method) PostgrestFilterBuilder&lt;any, any, any, { user_id: any; }[], \"profiles\", unknown, \"GET\"&gt;.eq&lt;\"username\"&gt;(colum"
summary: undefined
image: undefined
imageAlt: undefined
authorHandle: "HumanCertificate"
authorName: "HumanCertificate"
publishedAt: "2026-01-24T05:05:16.000Z"
fetchedAt: "2026-02-05T17:01:27.763Z"
tags: []
metrics: {"score":11,"comments":12,"subreddit":"typescript"}
score: 4.5174682974341955
scoreBreakdown: {"total":4.5174682974341955,"recency":0.0024827055327749357,"engagement":5.016926513838554,"author":0,"source":0.9}
---

I need to deconstruct an object that is received from `await supabase.from("profiles").select("user_id").eq("username", searchedUsername);`. However, I'm having trouble figuring out how to know the return type of these .select, .eq methods are.

My first intuition was to hover over the `.eq("username", serachedUsername);` to learn the return type, but I got this. 

    (method) PostgrestFilterBuilder&lt;any, any, any, { user_id: any; }[], "profiles", unknown, "GET"&gt;.eq&lt;"username"&gt;(colum
