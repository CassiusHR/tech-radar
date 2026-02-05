import fs from 'node:fs/promises'
import path from 'node:path'
import { DateTime } from 'luxon'
import { loadTechRadarConfig } from './config'
import { shouldRunNow } from './schedule'
import { buildDayIndexFromShard, buildRollingWeekIndexFromShards } from './index-builder'

export type IngestResult = {
  ok: boolean
  ran: boolean
  reason: string
  generatedAt: string
  wrote: string[]
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
  if (!dryRun) {
    await writeItems(raw)
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
