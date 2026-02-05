import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { writeItemMarkdown } from '../write'

describe('writeItemMarkdown', () => {
  it('omits undefined frontmatter values (avoid writing "undefined")', async () => {
    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'tech-radar-write-'))
    const cwd = process.cwd()

    try {
      process.chdir(tmp)
      const fp = await writeItemMarkdown({
        source: 'x',
        externalId: 'abc',
        frontmatter: {
          id: 'x:abc',
          url: 'https://example.com',
          summary: undefined,
        },
        body: 'hello',
      })

      const raw = await fs.readFile(fp, 'utf8')
      expect(raw).toContain('id:')
      expect(raw).toContain('url:')
      expect(raw).not.toContain('summary: undefined')
    } finally {
      process.chdir(cwd)
    }
  })
})
