import fs from 'node:fs/promises'
import path from 'node:path'
import { DateTime } from 'luxon'
import matter from 'gray-matter'
import { ItemFrontmatterSchema } from '@/lib/content/schema'

export type BuiltIndex = {
  generatedAt: string
  tz: string
  items: string[]
}

async function walk(dir: string): Promise<string[]> {
  const ents = await fs.readdir(dir, { withFileTypes: true })
  const out: string[] = []
  for (const e of ents) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else out.push(p)
  }
  return out
}

export async function loadAllItems(): Promise<ReturnType<typeof ItemFrontmatterSchema.parse>[]> {
  const root = path.join(process.cwd(), 'content', 'items')
  const files = (await walk(root)).filter((f) => f.endsWith('.md'))
  const items = []
  for (const f of files) {
    const raw = await fs.readFile(f, 'utf8')
    const parsed = matter(raw)
    items.push(ItemFrontmatterSchema.parse(parsed.data))
  }
  return items
}

export function buildDayIndex(params: {
  date: string // YYYY-MM-DD in cfg.tz
  tz: string
  generatedAt: string
  items: ReturnType<typeof ItemFrontmatterSchema.parse>[]
}): { date: string } & BuiltIndex {
  const { date, tz, generatedAt, items } = params
  const dayItems = items
    .filter((i) => i.publishedAt.startsWith(date))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0) || b.publishedAt.localeCompare(a.publishedAt))
    .map((i) => i.id)
  return { date, tz, generatedAt, items: dayItems }
}

export function buildRollingWeekIndex(params: {
  tz: string
  windowDays: number
  generatedAt: string
  items: ReturnType<typeof ItemFrontmatterSchema.parse>[]
  nowLocal: DateTime
}): { windowDays: number } & BuiltIndex {
  const { tz, windowDays, generatedAt, items, nowLocal } = params

  const start = nowLocal.startOf('day').minus({ days: windowDays - 1 })
  const end = nowLocal.endOf('day')

  const weekItems = items
    .filter((i) => {
      const dt = DateTime.fromISO(i.publishedAt, { zone: tz })
      return dt.isValid && dt >= start && dt <= end
    })
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0) || b.publishedAt.localeCompare(a.publishedAt))
    .map((i) => i.id)

  return { windowDays, tz, generatedAt, items: weekItems }
}
