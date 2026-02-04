import fs from 'node:fs/promises'
import path from 'node:path'
import { z } from 'zod'

export const TechRadarConfigSchema = z.object({
  tz: z.string().min(1),
  runHours: z.array(z.number().int().min(0).max(23)).min(1),
  weekWindowDays: z.number().int().positive().default(7),
  pageSize: z.number().int().positive().default(20),
})

export type TechRadarConfig = z.infer<typeof TechRadarConfigSchema>

export async function loadTechRadarConfig(): Promise<TechRadarConfig> {
  const cfgPath = path.join(process.cwd(), 'tech-radar.config.json')
  const raw = await fs.readFile(cfgPath, 'utf8')
  const parsed = TechRadarConfigSchema.parse(JSON.parse(raw))

  // Optional env overrides
  const tz = process.env.TECH_RADAR_TZ?.trim() || parsed.tz
  const runHours = process.env.TECH_RADAR_RUN_HOURS
    ? process.env.TECH_RADAR_RUN_HOURS.split(',').map((n) => Number(n.trim())).filter((n) => Number.isFinite(n))
    : parsed.runHours

  return { ...parsed, tz, runHours }
}
