import fs from 'node:fs/promises'
import path from 'node:path'
import { DateTime } from 'luxon'
import { loadTechRadarConfig } from './config'
import { shouldRunNow } from './schedule'
import { buildDayIndex, buildRollingWeekIndex, loadAllItems } from './index-builder'

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

export async function runIngest({ dryRun = false }: { dryRun?: boolean } = {}): Promise<IngestResult> {
  const cfg = await loadTechRadarConfig()
  const now = DateTime.now().setZone(cfg.tz)
  const gate = shouldRunNow(cfg, DateTime.now())

  const generatedAt = now.toUTC().toISO() ?? new Date().toISOString()

  if (!gate.run) {
    return { ok: true, ran: false, reason: gate.reason, generatedAt, wrote: [] }
  }

  const items = await loadAllItems()
  const date = now.toFormat('yyyy-LL-dd')

  const dayIndex = buildDayIndex({ date, tz: cfg.tz, generatedAt, items })
  const weekIndex = buildRollingWeekIndex({
    tz: cfg.tz,
    windowDays: cfg.weekWindowDays,
    generatedAt,
    items,
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
