import fs from 'node:fs/promises'
import path from 'node:path'
import { DateTime } from 'luxon'
import { z } from 'zod'
import { dedupeByCanonicalUrl } from '../sources/dedupe'
import { classifyPillars } from '../content/tagging'
import { applyScoring } from './apply-scoring'
import { fetchXByQuery } from '../sources/x'
import { fetchHN } from '../sources/hn'
import { fetchGitHubTrending } from '../sources/github-trending'
import { fetchRedditSubreddit } from '../sources/reddit'
import { fetchYouTubeRSS } from '../sources/youtube'
import type { RawItem } from '../sources/types'
import { writeItemMarkdown } from '../sources/write'
import { appendToDayShard } from './shard-index'
import matter from 'gray-matter'
import { llmSummarizeItem } from './summarize'
import { fetchThumbnail } from './thumbnail'

const SourcesConfigSchema = z.object({
  x: z.object({ queries: z.array(z.string()), limitPerQuery: z.number().int().positive() }),
  github: z.object({ trendingUrls: z.array(z.string()) }),
  hn: z.object({ endpoints: z.array(z.enum(['topstories', 'beststories'])) }),
  reddit: z.object({
    subreddits: z.array(z.string()),
    limitPerSubreddit: z.number().int().positive(),
    minScore: z.number().int().nonnegative().optional(),
    minComments: z.number().int().nonnegative().optional(),
  }),
  youtube: z.unknown().optional(),
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
    try {
      out.push(...(await fetchXByQuery({ query: q, limit: cfg.x.limitPerQuery, fetchedAt })))
    } catch (err) {
      console.error('[ingest] X fetch failed', { query: q, err: (err as Error).message })
    }
  }

  // HN
  for (const e of cfg.hn.endpoints) {
    try {
      out.push(...(await fetchHN({ endpoint: e, limit: 30, fetchedAt })))
    } catch (err) {
      console.error('[ingest] HN fetch failed', { endpoint: e, err: (err as Error).message })
    }
  }

  // GitHub trending
  for (const url of cfg.github.trendingUrls) {
    try {
      out.push(...(await fetchGitHubTrending({ url, fetchedAt, limit: 25 })))
    } catch (err) {
      console.error('[ingest] GitHub trending fetch failed', { url, err: (err as Error).message })
    }
  }

  // Reddit
  for (const sr of cfg.reddit.subreddits) {
    try {
      out.push(
        ...(await fetchRedditSubreddit({
          subreddit: sr,
          limit: cfg.reddit.limitPerSubreddit,
          fetchedAt,
          minScore: cfg.reddit.minScore,
          minComments: cfg.reddit.minComments,
        }))
      )
    } catch (err) {
      console.error('[ingest] Reddit fetch failed', { subreddit: sr, err: (err as Error).message })
    }
  }

  // YouTube (RSS-first)
  if (cfg.youtube) {
    try {
      out.push(...(await fetchYouTubeRSS({ cfg: cfg.youtube, fetchedAt })))
    } catch (err) {
      console.error('[ingest] YouTube fetch failed', { err: (err as Error).message })
    }
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

export async function writeItems(
  items: RawItem[],
  params: {
    tz: string
  }
) {
  const wrote: string[] = []

  for (const it of items) {
    // Best-effort: reuse existing summary to avoid re-spending tokens every run.
    let existingSummary: string | undefined
    let existingImage: string | undefined
    let existingImageAlt: string | undefined
    try {
      const dir = path.join(process.cwd(), 'content', 'items', it.source)
      // Keep in sync with sanitization logic in writeItemMarkdown.
      const safe = String(it.externalId)
        .replace(/[\u0000-\u001f\u007f]/g, '')
        .replace(/[\\/]+/g, ' - ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 180)
      const fpGuess = path.join(dir, `${safe}.md`)
      const raw = await fs.readFile(fpGuess, 'utf8')
      const parsed = matter(raw)
      if (typeof parsed.data?.summary === 'string' && parsed.data.summary.trim()) {
        const s = parsed.data.summary.trim()
        // Defensive: older runs may have written the literal string "undefined".
        if (s && s !== 'undefined' && s !== 'null') existingSummary = s
      }
      if (typeof parsed.data?.image === 'string' && parsed.data.image.trim()) {
        existingImage = parsed.data.image.trim()
      }
      if (typeof parsed.data?.imageAlt === 'string' && parsed.data.imageAlt.trim()) {
        existingImageAlt = parsed.data.imageAlt.trim()
      }
    } catch {
      // ignore
    }

    let summary: string | undefined = existingSummary
    if (summary === 'undefined' || summary === 'null') summary = undefined
    let image: string | undefined = existingImage
    let imageAlt: string | undefined = existingImageAlt
    const enableSummaries = process.env.TECH_RADAR_ENABLE_SUMMARIES !== '0'
    const enableOg = process.env.TECH_RADAR_ENABLE_OG !== '0'

    if (enableSummaries && !summary) {
      try {
        summary = await llmSummarizeItem({ source: it.source, title: it.title, text: it.text, url: it.url })
      } catch (err) {
        console.error('[ingest] summary failed', { id: it.id, err: (err as Error).message })
      }
    }

    if (enableOg && (!image || !summary)) {
      try {
        const thumb = await fetchThumbnail(it.url)
        image = image ?? thumb.image
        imageAlt = imageAlt ?? thumb.imageAlt
        summary = summary ?? thumb.description
      } catch (err) {
        console.error('[ingest] thumbnail fetch failed', { id: it.id, err: (err as Error).message })
      }
    }

    const fp = await writeItemMarkdown({
      source: it.source,
      externalId: it.externalId,
      frontmatter: {
        id: it.id,
        source: it.source,
        externalId: it.externalId,
        url: it.url,
        title: it.title,
        text: it.text,
        summary,
        image,
        imageAlt,
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
  }

  // Shard index: group by *local day* (YYYY-MM-DD) derived from publishedAt in the configured tz.
  const byDay = new Map<string, string[]>()
  for (const it of items) {
    const day = DateTime.fromISO(it.publishedAt).isValid
      ? DateTime.fromISO(it.publishedAt).setZone(params.tz).toFormat('yyyy-LL-dd')
      : DateTime.now().setZone(params.tz).toFormat('yyyy-LL-dd')

    const arr = byDay.get(day) ?? []
    arr.push(it.id)
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
