import type { ItemFrontmatter } from './schema'

export type SortMode = 'relevance' | 'source'

function byRelevance(a: ItemFrontmatter, b: ItemFrontmatter) {
  return (b.score ?? 0) - (a.score ?? 0) || b.publishedAt.localeCompare(a.publishedAt)
}

function bySource(a: ItemFrontmatter, b: ItemFrontmatter) {
  return a.source.localeCompare(b.source) || byRelevance(a, b)
}

export function sortItems(items: ItemFrontmatter[], mode: SortMode): ItemFrontmatter[] {
  const copy = [...items]
  if (mode === 'source') return copy.sort(bySource)
  return copy.sort(byRelevance)
}
