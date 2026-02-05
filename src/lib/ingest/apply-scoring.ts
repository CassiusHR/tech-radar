import { DateTime } from 'luxon'
import type { RawItem } from '../sources/types'
import { scoreItem } from '../content/scoring'

export function applyScoring(items: RawItem[], params: { tz: string; mode: 'daily' | 'weekly' }) {
  const now = DateTime.now().setZone(params.tz)
  return items.map((it) => {
    const published = DateTime.fromISO(it.publishedAt).setZone(params.tz)
    const ageHours = Math.max(0, now.diff(published, 'hours').hours)

    const scored = scoreItem({ item: it, mode: params.mode, ageHours })
    return {
      ...it,
      score: scored.score,
      scoreBreakdown: scored.breakdown,
    }
  })
}
