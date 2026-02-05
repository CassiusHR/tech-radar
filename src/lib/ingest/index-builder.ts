import { DateTime } from 'luxon'
import { loadItem } from '../content/loaders'
import type { ItemFrontmatter } from '../content/schema'
import { readDayShard } from './shard-index'

export type BuiltIndex = {
  generatedAt: string
  tz: string
  items: string[]
}

export async function loadItemsByIds(ids: string[]): Promise<ItemFrontmatter[]> {
  const out: ItemFrontmatter[] = []
  for (const id of ids) {
    try {
      const { frontmatter } = await loadItem(id)
      out.push(frontmatter)
    } catch {
      // ignore missing
    }
  }
  return out
}

export async function buildDayIndexFromShard(params: {
  date: string
  tz: string
  generatedAt: string
}): Promise<{ date: string } & BuiltIndex> {
  const ids = await readDayShard(params.date)
  const items = await loadItemsByIds(ids)
  const sorted = items
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0) || b.publishedAt.localeCompare(a.publishedAt))
    .map((i) => i.id)

  return { date: params.date, tz: params.tz, generatedAt: params.generatedAt, items: sorted }
}

export async function buildRollingWeekIndexFromShards(params: {
  tz: string
  windowDays: number
  generatedAt: string
  nowLocal: DateTime
}): Promise<{ windowDays: number } & BuiltIndex> {
  const start = params.nowLocal.startOf('day').minus({ days: params.windowDays - 1 })

  const days: string[] = []
  for (let i = 0; i < params.windowDays; i++) {
    days.push(start.plus({ days: i }).toFormat('yyyy-LL-dd'))
  }

  const ids: string[] = []
  for (const d of days) {
    try {
      ids.push(...(await readDayShard(d)))
    } catch {
      // missing shard file is ok
    }
  }

  const unique = Array.from(new Set(ids))
  const items = await loadItemsByIds(unique)
  const sorted = items
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0) || b.publishedAt.localeCompare(a.publishedAt))
    .map((i) => i.id)

  return { windowDays: params.windowDays, tz: params.tz, generatedAt: params.generatedAt, items: sorted }
}
