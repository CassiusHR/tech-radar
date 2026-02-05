import fs from 'node:fs/promises'
import path from 'node:path'
import { DateTime } from 'luxon'
import { loadTechRadarConfig } from './config'
import { shouldRunNow } from './schedule'
import { buildDayIndexFromShard, buildRollingWeekIndexFromShards } from './index-builder'
import type { RawItem } from '../sources/types'

export type IngestResult = {
  ok: boolean
  ran: boolean
  reason: string
  generatedAt: string
  wrote: string[]
}

function takeTopPerSource(items: RawItem[], perSource: number) {
  const sorted = items
    .slice()
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0) || b.publishedAt.localeCompare(a.publishedAt))

  const counts = new Map<string, number>()
  const out: RawItem[] = []
  for (const it of sorted) {
    const c = counts.get(it.source) ?? 0
    if (c >= perSource) continue
    counts.set(it.source, c + 1)
    out.push(it)
  }
  return out
}

async function writeJson(filePath: string, data: unknown) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

export async function runIngest({ dryRun = false, force = false }: { dryRun?: boolean; force?: boolean } = {}): Promise<IngestResult> {
  const cfg = await loadTechRadarConfig()
  const now = DateTime.now().setZone(cfg.tz)
  const gate = shouldRunNow(cfg, DateTime.now())

  const generatedAt = now.toUTC().toISO() ?? new Date().toISOString()

  if (!gate.run && !force) {
    return { ok: true, ran: false, reason: gate.reason, generatedAt, wrote: [] }
  }

  if (!gate.run && force) {
    // Manual override: allow running outside the hourly window / runHours.
    // Useful for on-demand runs from automation tools.
  }

  // Fetch new items + write sharded markdown (best-effort) before rebuilding indexes.
  // Note: this is safe to run hourly because:
  // - item filenames are stable per externalId
  // - duplicates are deduped upstream
  const fetchedAt = generatedAt
  const { fetchAllSources, writeItems } = await import('./fetch-and-write')
  const raw = await fetchAllSources(fetchedAt)

  // Only persist today's top items (top 10 per source) to keep the repo stable and daily shards meaningful.
  const todayLocal = now.toFormat('yyyy-LL-dd')
  const todays = raw.filter((it) => {
    const dt = DateTime.fromISO(it.publishedAt)
    if (!dt.isValid) return true // best-effort: keep rather than drop
    return dt.setZone(cfg.tz).toFormat('yyyy-LL-dd') === todayLocal
  })

  const topPerSource = takeTopPerSource(todays, 10)

  if (!dryRun) {
    await writeItems(topPerSource, { tz: cfg.tz })
  }

  const date = now.toFormat('yyyy-LL-dd')

  const dayIndex = await buildDayIndexFromShard({ date, tz: cfg.tz, generatedAt })
  const weekIndex = await buildRollingWeekIndexFromShards({
    tz: cfg.tz,
    windowDays: cfg.weekWindowDays,
    generatedAt,
    nowLocal: now,
  })

  const wrote: string[] = []
  const dayPath = path.join(process.cwd(), 'content', 'indexes', 'day', `${date}.json`)
  const weekPath = path.join(process.cwd(), 'content', 'indexes', 'week', 'rolling.json')

  if (!dryRun) {
    await writeJson(dayPath, dayIndex)
    wrote.push(dayPath)
    await writeJson(weekPath, weekIndex)
    wrote.push(weekPath)
  }

  return { ok: true, ran: true, reason: gate.reason, generatedAt, wrote }
}
