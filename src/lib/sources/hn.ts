import { request } from 'undici'
import { z } from 'zod'
import type { RawItem } from './types'

const HNItemSchema = z.object({
  id: z.number(),
  type: z.string().optional(),
  title: z.string().optional(),
  url: z.string().optional(),
  by: z.string().optional(),
  time: z.number().optional(),
  score: z.number().optional(),
  descendants: z.number().optional(),
})

async function getJson(url: string) {
  const res = await request(url, { method: 'GET' })
  if (res.statusCode >= 400) throw new Error(`HN request failed: ${res.statusCode}`)
  return res.body.json()
}

export async function fetchHN(params: {
  endpoint: 'topstories' | 'beststories'
  limit: number
  fetchedAt: string
}): Promise<RawItem[]> {
  const { endpoint, limit, fetchedAt } = params
  const ids = z.array(z.number()).parse(await getJson(`https://hacker-news.firebaseio.com/v0/${endpoint}.json`))
  const top = ids.slice(0, limit)

  const items: RawItem[] = []
  for (const id of top) {
    const raw = await getJson(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    const it = HNItemSchema.parse(raw)
    if (!it.title) continue
    const url = it.url ?? `https://news.ycombinator.com/item?id=${id}`
    const publishedAt = it.time ? new Date(it.time * 1000).toISOString() : new Date().toISOString()
    items.push({
      id: `hn:${id}`,
      source: 'hn',
      externalId: String(id),
      url,
      title: it.title,
      text: undefined,
      authorHandle: it.by,
      authorName: it.by,
      publishedAt,
      fetchedAt,
      tags: [],
      metrics: { points: it.score ?? 0, comments: it.descendants ?? 0 },
      score: 0,
      scoreBreakdown: { endpoint },
    })
  }

  return items
}
