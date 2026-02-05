import { request } from 'undici'
import { z } from 'zod'
import type { RawItem } from './types'

const ListingSchema = z.object({
  data: z.object({
    children: z.array(
      z.object({
        data: z.object({
          id: z.string(),
          title: z.string().optional(),
          selftext: z.string().optional(),
          author: z.string().optional(),
          created_utc: z.number().optional(),
          permalink: z.string().optional(),
          url: z.string().optional(),
          score: z.number().optional(),
          num_comments: z.number().optional(),
          subreddit: z.string().optional(),
        }),
      })
    ),
  }),
})

export async function fetchRedditSubreddit(params: {
  subreddit: string
  limit: number
  fetchedAt: string
  minScore?: number
  minComments?: number
}): Promise<RawItem[]> {
  const { subreddit, limit, fetchedAt, minScore = 0, minComments = 0 } = params
  const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=${limit}`

  const res = await request(url, {
    headers: { 'user-agent': 'tech-radar/0.1 (best-effort)' },
  })

  if (res.statusCode >= 400) {
    // Best-effort: if Reddit blocks/ratelimits, don't crash the entire ingest.
    return []
  }

  const text = await res.body.text()
  if (!text.trim()) return []

  let json: unknown
  try {
    json = JSON.parse(text)
  } catch {
    // Occasionally Reddit returns truncated/invalid payloads.
    return []
  }

  const parsed = ListingSchema.parse(json)

  return parsed.data.children
    .map((c) => c.data)
    .filter((d) => !!d.title)
    // Best-effort spam/low-signal filtering. (Still keep config defaults at 0.)
    .filter((d) => (d.score ?? 0) >= minScore)
    .filter((d) => (d.num_comments ?? 0) >= minComments)
    .map((d) => {
      const permalink = d.permalink ? `https://www.reddit.com${d.permalink}` : d.url!
      const publishedAt = d.created_utc ? new Date(d.created_utc * 1000).toISOString() : new Date().toISOString()
      return {
        id: `reddit:${d.id}`,
        source: 'reddit',
        externalId: d.id,
        url: permalink,
        title: d.title!,
        text: d.selftext?.slice(0, 500) || undefined,
        authorHandle: d.author,
        authorName: d.author,
        publishedAt,
        fetchedAt,
        tags: [],
        metrics: { score: d.score ?? 0, comments: d.num_comments ?? 0, subreddit: d.subreddit },
        score: 0,
        scoreBreakdown: { subreddit },
      } satisfies RawItem
    })
}
