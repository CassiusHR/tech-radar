export type SourceId = 'x' | 'reddit' | 'hn' | 'github' | 'youtube'

export type RawItem = {
  id: string
  source: SourceId
  externalId: string
  url: string
  title?: string
  text?: string
  authorHandle?: string
  authorName?: string
  publishedAt: string
  fetchedAt: string
  tags: string[]
  metrics: Record<string, unknown>
  score: number
  scoreBreakdown?: Record<string, unknown>
}
