import { DateTime } from 'luxon'
import type { TechRadarConfig } from './config'

/**
 * Decide whether an ingest should run at the current time.
 *
 * We schedule the Netlify function hourly; this gate decides if *this* hour is a configured run hour.
 */
export function shouldRunNow(cfg: TechRadarConfig, now = DateTime.now()): {
  run: boolean
  reason: string
  local: DateTime
} {
  const local = now.setZone(cfg.tz)
  if (!local.isValid) return { run: false, reason: `Invalid tz: ${cfg.tz}`, local }

  const hour = local.hour
  if (!cfg.runHours.includes(hour)) {
    return { run: false, reason: `Hour ${hour} not in runHours`, local }
  }

  // Extra safety: only run close to the top of hour to avoid double runs.
  if (local.minute > 10) {
    return { run: false, reason: `Minute ${local.minute} too late for hourly schedule`, local }
  }

  return { run: true, reason: 'scheduled hour', local }
}
