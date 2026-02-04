import { load } from 'cheerio'
import { request } from 'undici'
import { z } from 'zod'
import type { RawItem } from './types'

const YouTubeConfigSchema = z.object({
  // Prefer channels (RSS) over search.
  channels: z
    .array(
      z.object({
        channelId: z.string().min(1),
        name: z.string().min(1).optional(),
      }),
    )
    .default([]),
  limitPerChannel: z.number().int().positive().default(10),

  // Optional fallback: YouTube also provides an Atom feed for search queries.
  // Note: quality can vary; this is best-effort.
  searchQueries: z.array(z.string()).default([]),
  limitPerQuery: z.number().int().positive().default(10),
})

export type YouTubeConfig = z.infer<typeof YouTubeConfigSchema>

function feedUrlForChannelId(channelId: string) {
  return `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`
}

function feedUrlForSearchQuery(q: string) {
  return `https://www.youtube.com/feeds/videos.xml?search_query=${encodeURIComponent(q)}`
}

async function fetchAtom(url: string): Promise<string> {
  const res = await request(url, {
    method: 'GET',
    headers: {
      'user-agent': 'tech-radar-ingest/1.0 (+https://github.com/CassiusHR/tech-radar)',
      accept: 'application/atom+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
    },
  })

  if (res.statusCode >= 400) {
    throw new Error(`YouTube RSS request failed: ${res.statusCode} (${url})`)
  }

  return res.body.text()
}

function parseYouTubeFeed(xml: string, fetchedAt: string): RawItem[] {
  const $ = load(xml, { xmlMode: true })
  const items: RawItem[] = []

  $('feed > entry').each((_, el) => {
    const entry = $(el)

    const videoId = entry.find('yt\\:videoId').first().text().trim()
    if (!videoId) return

    const title = entry.find('title').first().text().trim() || undefined
    const publishedAtRaw = entry.find('published').first().text().trim()
    const publishedAt = publishedAtRaw ? new Date(publishedAtRaw).toISOString() : new Date().toISOString()

    const authorName = entry.find('author > name').first().text().trim() || undefined

    const url =
      entry.find('link[rel="alternate"]').attr('href')?.trim() ||
      `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`

    const description = entry.find('media\\:group > media\\:description').first().text().trim() || undefined

    items.push({
      id: `youtube:${videoId}`,
      source: 'youtube',
      externalId: videoId,
      url,
      title,
      text: description,
      authorHandle: undefined,
      authorName,
      publishedAt,
      fetchedAt,
      tags: [],
      metrics: {},
      score: 0,
      scoreBreakdown: {},
    })
  })

  return items
}

export async function fetchYouTubeRSS(params: { cfg: unknown; fetchedAt: string }): Promise<RawItem[]> {
  const { cfg, fetchedAt } = params
  const parsed = YouTubeConfigSchema.parse(cfg ?? {})

  const out: RawItem[] = []

  // RSS-first: channels.
  for (const ch of parsed.channels) {
    try {
      const xml = await fetchAtom(feedUrlForChannelId(ch.channelId))
      const items = parseYouTubeFeed(xml, fetchedAt).slice(0, parsed.limitPerChannel)
      out.push(
        ...items.map((it) => ({
          ...it,
          scoreBreakdown: { ...it.scoreBreakdown, channelId: ch.channelId, channelName: ch.name },
        })),
      )
    } catch {
      // best-effort: ignore individual channel failures
    }
  }

  // Optional fallback: queries.
  if (out.length === 0 && parsed.searchQueries.length > 0) {
    for (const q of parsed.searchQueries) {
      try {
        const xml = await fetchAtom(feedUrlForSearchQuery(q))
        const items = parseYouTubeFeed(xml, fetchedAt).slice(0, parsed.limitPerQuery)
        out.push(...items.map((it) => ({ ...it, scoreBreakdown: { ...it.scoreBreakdown, query: q } })))
      } catch {
        // ignore
      }
    }
  }

  return out
}
