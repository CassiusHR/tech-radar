import { describe, expect, it } from 'vitest'
import { appendToDayShard, readDayShard } from '../shard-index'

describe('shard index', () => {
  it('appends and reads ids', async () => {
    const day = '2099-01-01'
    await appendToDayShard({ tzDay: day, itemIds: ['x:1', 'x:2'] })
    const ids = await readDayShard(day)
    expect(ids).toContain('x:1')
    expect(ids).toContain('x:2')
  })
})
