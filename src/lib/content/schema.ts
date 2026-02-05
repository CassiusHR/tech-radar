import { z } from 'zod'

export const ItemFrontmatterSchema = z.object({
  id: z.string().min(1),
  source: z.enum(['x', 'reddit', 'hn', 'github', 'youtube']),
  externalId: z.string().min(1),
  url: z.string().url(),
  title: z.string().optional(),
  text: z.string().optional(),
  summary: z.preprocess((v) => {
    if (typeof v === 'string') {
      const s = v.trim()
      if (!s || s === 'undefined' || s === 'null') return undefined
      return s
    }
    return v
  }, z.string().optional()),
  image: z.string().url().optional(),
  imageAlt: z.string().optional(),
  authorHandle: z.string().optional(),
  authorName: z.string().optional(),
  publishedAt: z.string().datetime(),
  fetchedAt: z.string().datetime(),
  tags: z.array(z.string()).default([]),
  metrics: z.record(z.string(), z.any()).default({}),
  score: z.number().default(0),
  scoreBreakdown: z.record(z.string(), z.any()).optional()
})

export type ItemFrontmatter = z.infer<typeof ItemFrontmatterSchema>

export const DayIndexSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tz: z.string().min(1),
  generatedAt: z.string().datetime(),
  items: z.array(z.string())
})
export type DayIndex = z.infer<typeof DayIndexSchema>

export const RollingWeekIndexSchema = z.object({
  windowDays: z.number().int().positive(),
  tz: z.string().min(1),
  generatedAt: z.string().datetime(),
  items: z.array(z.string())
})
export type RollingWeekIndex = z.infer<typeof RollingWeekIndexSchema>
