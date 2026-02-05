---
id: "reddit:1qur4um"
source: "reddit"
externalId: "1qur4um"
url: "https://www.reddit.com/r/javascript/comments/1qur4um/can_someone_explain_the_destructured_parameter/"
title: "Can someone explain the Destructured parameter with default value assignment?"
text: "I'm trying to understand this pattern\n\n[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default\\_parameters#destructured\\_parameter\\_with\\_default\\_value\\_assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters#destructured_parameter_with_default_value_assignment)\n\n    function preFilledArray([x = 1, y = 2] = []) {\n      return x + y;\n    }  \n    preFilledArray(); // 3\n    preFilledArray([]); // 3\n    preFilledArray(["
summary: undefined
image: undefined
imageAlt: undefined
authorHandle: "SirLouen"
authorName: "SirLouen"
publishedAt: "2026-02-03T12:53:12.000Z"
fetchedAt: "2026-02-05T17:01:27.763Z"
tags: []
metrics: {"score":14,"comments":14,"subreddit":"javascript"}
score: 5.002896014804877
scoreBreakdown: {"total":5.002896014804877,"recency":0.2930931878122094,"engagement":5.265680161970987,"author":0,"source":0.9}
---

I'm trying to understand this pattern

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default\_parameters#destructured\_parameter\_with\_default\_value\_assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters#destructured_parameter_with_default_value_assignment)

    function preFilledArray([x = 1, y = 2] = []) {
      return x + y;
    }  
    preFilledArray(); // 3
    preFilledArray([]); // 3
    preFilledArray([
