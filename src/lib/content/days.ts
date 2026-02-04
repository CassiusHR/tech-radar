import fs from 'node:fs/promises'
import path from 'node:path'
import { CONTENT_ROOT } from './paths'

const DAY_INDEX_DIR = path.join(CONTENT_ROOT, 'indexes', 'day')

export async function listAvailableDays(): Promise<string[]> {
  const entries = await fs.readdir(DAY_INDEX_DIR)
  return entries
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
    .sort()
}

export async function latestAvailableDay(): Promise<string | null> {
  const days = await listAvailableDays()
  return days.length ? days[days.length - 1] : null
}
