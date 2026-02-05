---
id: "reddit:1qs9fqk"
source: "reddit"
externalId: "1qs9fqk"
url: "https://www.reddit.com/r/typescript/comments/1qs9fqk/how_do_you_handle_wider_types_sneaking_properties/"
title: "How do you handle wider types sneaking properties into objects?"
authorHandle: "Tuckertcs"
authorName: "Tuckertcs"
publishedAt: "2026-01-31T18:04:52.000Z"
fetchedAt: "2026-02-05T14:45:09.329Z"
tags: []
metrics: {"score":10,"comments":21,"subreddit":"typescript"}
score: 5.078710499179164
scoreBreakdown: {"total":5.078710499179164,"recency":0.08460298678165573,"engagement":5.55840867897297,"author":0,"source":0.9}
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
