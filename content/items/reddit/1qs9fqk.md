---
id: "reddit:1qs9fqk"
source: "reddit"
externalId: "1qs9fqk"
url: "https://www.reddit.com/r/typescript/comments/1qs9fqk/how_do_you_handle_wider_types_sneaking_properties/"
title: "How do you handle wider types sneaking properties into objects?"
authorHandle: "Tuckertcs"
authorName: "Tuckertcs"
publishedAt: "2026-01-31T18:04:52.000Z"
fetchedAt: "2026-02-05T15:01:15.857Z"
tags: []
metrics: {"score":9,"comments":21,"subreddit":"typescript"}
score: 5.054315058139256
scoreBreakdown: {"total":5.054315058139256,"recency":0.08416441414073111,"engagement":5.531741206013998,"author":0,"source":0.9}
---

Say, for example, we have this code:

    type UpdateUser = {
      id: string,
      email: string,
      username: string,
    };
    
    function updateUser(update: UpdateUser) {
      const { id, ...body } = update;
      return http.post(`/users/${id}`, body);
    }

In this example, we extract the ID to place into the route, and then send the email and username properties into the request body.

This is fine, but let's say, somewhere along the code path, we do something like this:

    up
