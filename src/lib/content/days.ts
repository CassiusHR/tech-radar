import fs from 'node:fs/promises'
import path from 'node:path'
import { CONTENT_ROOT } from './paths'

/**
 * Best-effort helper used for navigation.
 * Returns the most recent available day index (YYYY-MM-DD) or null.
 */
export async function latestAvailableDay(): Promise<string | null> {
  const dir = path.join(CONTENT_ROOT, 'indexes', 'day')
  try {
    const entries = await fs.readdir(dir)
    const days = entries
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''))
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort()

    return days.length ? days[days.length - 1] : null
  } catch {
    return null
  }
}
