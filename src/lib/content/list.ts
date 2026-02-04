import { loadDayIndex, loadItem, loadRollingWeekIndex } from './loaders'
import { matchesAllTags } from './filter'

export async function listDayItems(date: string, requiredTags: string[]) {
  const idx = await loadDayIndex(date)
  const items = await Promise.all(idx.items.map((id) => loadItem(id)))
  return items
    .map(({ frontmatter }) => frontmatter)
    .filter((fm) => matchesAllTags(fm.tags ?? [], requiredTags))
}

export async function listWeekItems(requiredTags: string[]) {
  const idx = await loadRollingWeekIndex()
  const items = await Promise.all(idx.items.map((id) => loadItem(id)))
  return items
    .map(({ frontmatter }) => frontmatter)
    .filter((fm) => matchesAllTags(fm.tags ?? [], requiredTags))
}
