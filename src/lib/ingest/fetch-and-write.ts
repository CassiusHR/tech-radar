import fs from 'node:fs/promises'
import path from 'node:path'
import { DateTime } from 'luxon'
import { z } from 'zod'
import { dedupeByCanonicalUrl } from '@/lib/sources/dedupe'
import { classifyPillars } from '@/lib/content/tagging'
import { applyScoring } from './apply-scoring'
import { fetchXByQuery } from '@/lib/sources/x'
import { fetchHN } from '@/lib/sources/hn'
import { fetchGitHubTrending } from '@/lib/sources/github-trending'
import { fetchRedditSubreddit } from '@/lib/sources/reddit'
import type { RawItem } from '@/lib/sources/types'
import { writeItemMarkdown } from '@/lib/sources/write'
import { appendToDayShard } from './shard-index'

const SourcesConfigSchema = z.object({
  x: z.object({ queries: z.array(z.string()), limitPerQuery: z.number().int().positive() }),
  github: z.object({ trendingUrls: z.array(z.string()) }),
  hn: z.object({ endpoints: z.array(z.enum(['topstories', 'beststories'])) }),
  reddit: z.object({ subreddits: z.array(z.string()), limitPerSubreddit: z.number().int().positive() }),
  youtube: z.any().optional(),
})

type SourcesConfig = z.infer<typeof SourcesConfigSchema>

export async function loadSourcesConfig(): Promise<SourcesConfig> {
  const p = path.join(process.cwd(), 'sources.config.json')
  const raw = await fs.readFile(p, 'utf8')
  return SourcesConfigSchema.parse(JSON.parse(raw))
}

export async function fetchAllSources(fetchedAt: string): Promise<RawItem[]> {
  const cfg = await loadSourcesConfig()
  const out: RawItem[] = []

  // X
  for (const q of cfg.x.queries) {
    out.push(...(await fetchXByQuery({ query: q, limit: cfg.x.limitPerQuery, fetchedAt })))
  }

  // HN
  for (const e of cfg.hn.endpoints) {
    out.push(...(await fetchHN({ endpoint: e, limit: 30, fetchedAt })))
  }

  // GitHub trending
  for (const url of cfg.github.trendingUrls) {
    out.push(...(await fetchGitHubTrending({ url, fetchedAt, limit: 25 })))
  }

  // Reddit
  for (const sr of cfg.reddit.subreddits) {
    out.push(...(await fetchRedditSubreddit({ subreddit: sr, limit: cfg.reddit.limitPerSubreddit, fetchedAt })))
  }

  const deduped = dedupeByCanonicalUrl(out)

  const tagged = deduped.map((it) => ({
    ...it,
    tags: classifyPillars({
      source: it.source,
      title: it.title,
      text: it.text,
      url: it.url,
      authorHandle: it.authorHandle,
    }),
  }))

  // Score (v1). Weekly mode is used as the general-purpose ranking for now.
  return applyScoring(tagged, { tz: 'America/Santiago', mode: 'weekly' })
}

export async function writeItems(items: RawItem[]) {
  const wrote: string[] = []
  const ids: string[] = []

  for (const it of items) {
    const fp = await writeItemMarkdown({
      source: it.source,
      externalId: it.externalId,
      frontmatter: {
        id: it.id,
        source: it.source,
        externalId: it.externalId,
        url: it.url,
        title: it.title,
        authorHandle: it.authorHandle,
        authorName: it.authorName,
        publishedAt: it.publishedAt,
        fetchedAt: it.fetchedAt,
        tags: it.tags,
        metrics: it.metrics,
        score: it.score,
        scoreBreakdown: it.scoreBreakdown,
      },
      body: it.text ?? '',
    })

    wrote.push(fp)
    ids.push(it.id)
  }

  // Shard index: group by day (YYYY-MM-DD) based on publishedAt ISO string prefix
  const byDay = new Map<string, string[]>()
  for (const id of ids) {
    // best-effort: infer day from id by reading file path is expensive; use content frontmatter in PR7+ refinement
    // In v1, approximate by using today's day shard (good enough to avoid full scans).
    const day = new Date().toISOString().slice(0, 10)
    const arr = byDay.get(day) ?? []
    arr.push(id)
    byDay.set(day, arr)
  }

  for (const [day, dayIds] of byDay.entries()) {
    await appendToDayShard({ tzDay: day, itemIds: dayIds })
  }

  return wrote
}

export function nowFetchedAtISO() {
  return DateTime.now().toUTC().toISO() ?? new Date().toISOString()
}
