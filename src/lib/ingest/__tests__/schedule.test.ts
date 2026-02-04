import { describe, expect, it } from 'vitest'
import { DateTime } from 'luxon'
import { shouldRunNow } from '../schedule'
import type { TechRadarConfig } from '../config'

function mustValid(dt: DateTime) {
  if (!dt.isValid) throw new Error('invalid DateTime')
  return dt as DateTime<true>
}

describe('shouldRunNow', () => {
  it('runs on configured hour near top of hour', () => {
    const cfg: TechRadarConfig = { tz: 'America/Santiago', runHours: [10], weekWindowDays: 7, pageSize: 20 }
    const now = mustValid(DateTime.fromISO('2026-02-04T10:05:00', { zone: cfg.tz }))
    const res = shouldRunNow(cfg, now)
    expect(res.run).toBe(true)
  })

  it('does not run on other hours', () => {
    const cfg: TechRadarConfig = { tz: 'America/Santiago', runHours: [10], weekWindowDays: 7, pageSize: 20 }
    const now = mustValid(DateTime.fromISO('2026-02-04T11:05:00', { zone: cfg.tz }))
    const res = shouldRunNow(cfg, now)
    expect(res.run).toBe(false)
  })
})
