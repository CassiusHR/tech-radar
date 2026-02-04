import { describe, expect, it } from 'vitest'
import { scoreItem } from '../scoring'

describe('scoreItem', () => {
  it('weekly weights engagement more than daily', () => {
    const base = {
      id: 'x:1',
      source: 'x',
      externalId: '1',
      url: 'https://x.com/a/status/1',
      title: 'Next.js release',
      text: 'nextjs vercel',
      authorHandle: 'vercel',
      authorName: 'Vercel',
      publishedAt: new Date().toISOString(),
      fetchedAt: new Date().toISOString(),
      tags: ['pillar/nextjs'],
      metrics: { likeCount: 100, repostCount: 10, replyCount: 5 },
      score: 0,
    } as unknown as import('@/lib/sources/types').RawItem

    const daily = scoreItem({ item: base, mode: 'daily', ageHours: 24 })
    const weekly = scoreItem({ item: base, mode: 'weekly', ageHours: 24 })
    expect(weekly.score).toBeGreaterThan(daily.score)
  })
})
