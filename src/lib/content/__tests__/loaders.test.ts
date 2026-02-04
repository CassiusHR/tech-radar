import { describe, expect, it } from 'vitest'
import { loadDayIndex, loadItem, loadRollingWeekIndex } from '../loaders'

describe('content loaders', () => {
  it('loads an item', async () => {
    const item = await loadItem('x:2019075037760794941')
    expect(item.frontmatter.source).toBe('x')
    expect(item.frontmatter.url).toContain('x.com')
    expect(item.content.length).toBeGreaterThan(0)
  })

  it('loads day index', async () => {
    const idx = await loadDayIndex('2026-02-04')
    expect(idx.items).toContain('x:2019075037760794941')
  })

  it('loads rolling week index', async () => {
    const idx = await loadRollingWeekIndex()
    expect(idx.windowDays).toBe(7)
  })
})
