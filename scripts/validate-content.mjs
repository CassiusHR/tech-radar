#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'

const ItemFrontmatterSchema = z.object({
  id: z.string().min(1),
  source: z.enum(['x', 'reddit', 'hn', 'github', 'youtube']),
  externalId: z.string().min(1),
  url: z.string().url(),
  publishedAt: z.string().datetime(),
  fetchedAt: z.string().datetime(),
  tags: z.array(z.string()).optional(),
  metrics: z.record(z.any()).optional(),
  score: z.number().optional(),
})

async function walk(dir) {
  const out = []
  const ents = await fs.readdir(dir, { withFileTypes: true })
  for (const e of ents) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else out.push(p)
  }
  return out
}

async function main() {
  const root = path.join(process.cwd(), 'content', 'items')
  const files = await walk(root)
  const md = files.filter((f) => f.endsWith('.md'))
  if (md.length === 0) {
    console.error('No content/items markdown files found')
    process.exit(1)
  }

  let ok = 0
  for (const f of md) {
    const raw = await fs.readFile(f, 'utf8')
    const parsed = matter(raw)
    ItemFrontmatterSchema.parse(parsed.data)
    ok++
  }

  console.log(`validate-content: OK (${ok} items)`) 
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
