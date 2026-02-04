import fs from 'node:fs/promises'
import path from 'node:path'
import { CONTENT_ROOT } from './paths'

const DAY_INDEX_DIR = path.join(CONTENT_ROOT, 'indexes', 'day')

export async function listAvailableDays(): Promise<string[]> {
  try {
    const entries = await fs.readdir(DAY_INDEX_DIR)
    return entries
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''))
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort()
  } catch {
    return []
  }
}

/**
 * Best-effort helper used for navigation.
 * Returns the most recent available day index (YYYY-MM-DD) or null.
 */
export async function latestAvailableDay(): Promise<string | null> {
  const days = await listAvailableDays()
  return days.length ? days[days.length - 1] : null
}
