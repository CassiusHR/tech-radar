import { execa } from 'execa'
import { DateTime } from 'luxon'
import { z } from 'zod'
import type { RawItem } from './types'

const BirdTweetSchema = z.object({
  id: z.string(),
  text: z.string().optional().default(''),
  createdAt: z.string(),
  replyCount: z.number().optional(),
  retweetCount: z.number().optional(),
  likeCount: z.number().optional(),
  author: z.object({ username: z.string().optional(), name: z.string().optional() }).optional(),
})

export async function fetchXByQuery(params: {
  query: string
  limit: number
  fetchedAt: string
}): Promise<RawItem[]> {
  const { query, limit, fetchedAt } = params

  const { stdout } = await execa('bird', ['search', query, '-n', String(limit), '--json', '--no-color', '--no-emoji'], {
    timeout: 60_000,
  })

  const arr = z.array(BirdTweetSchema).parse(JSON.parse(stdout))

  return arr.map((t) => {
    const publishedAt = DateTime.fromRFC2822(t.createdAt).toUTC().toISO() ?? new Date().toISOString()
    const url = `https://x.com/${t.author?.username ?? 'i'}/status/${t.id}`
    return {
      id: `x:${t.id}`,
      source: 'x',
      externalId: t.id,
      url,
      title: t.text?.slice(0, 120) || undefined,
      text: t.text || undefined,
      authorHandle: t.author?.username,
      authorName: t.author?.name,
      publishedAt,
      fetchedAt,
      tags: [],
      metrics: { replyCount: t.replyCount ?? 0, repostCount: t.retweetCount ?? 0, likeCount: t.likeCount ?? 0 },
      score: 0,
      scoreBreakdown: { reason: 'placeholder' },
    } satisfies RawItem
  })
}
