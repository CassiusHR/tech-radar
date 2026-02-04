import { describe, expect, it } from 'vitest'
import { classifyPillars } from '../tagging'

describe('classifyPillars', () => {
  it('tags nextjs + vercel', () => {
    const tags = classifyPillars({
      source: 'x',
      title: 'Next.js + Vercel release',
      text: 'App Router and Vercel Edge are great',
      url: 'https://vercel.com',
      authorHandle: 'vercel',
    })
    expect(tags).toContain('pillar/nextjs')
    expect(tags).toContain('pillar/vercel')
  })

  it('keeps css and tailwind separate', () => {
    const tags = classifyPillars({
      source: 'reddit',
      title: 'Tailwind v4 migration',
      text: 'container queries and tailwind utilities',
      url: 'https://example.com',
    })
    expect(tags).toContain('pillar/tailwind')
    expect(tags).toContain('pillar/css')
  })
})
