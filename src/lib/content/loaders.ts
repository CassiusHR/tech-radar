import fs from 'node:fs/promises'
import matter from 'gray-matter'
import { DayIndexSchema, ItemFrontmatterSchema, RollingWeekIndexSchema } from './schema'
import { dayIndexPath, itemPathFromId, rollingWeekIndexPath } from './paths'

export async function loadItem(id: string) {
  const filePath = itemPathFromId(id)
  const raw = await fs.readFile(filePath, 'utf8')
  const parsed = matter(raw)
  const fm = ItemFrontmatterSchema.parse(parsed.data)
  return { frontmatter: fm, content: parsed.content.trim() }
}

export async function loadDayIndex(date: string) {
  const raw = await fs.readFile(dayIndexPath(date), 'utf8')
  return DayIndexSchema.parse(JSON.parse(raw))
}

export async function loadRollingWeekIndex() {
  const raw = await fs.readFile(rollingWeekIndexPath(), 'utf8')
  return RollingWeekIndexSchema.parse(JSON.parse(raw))
}
