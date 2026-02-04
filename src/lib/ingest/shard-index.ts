import fs from 'node:fs/promises'
import path from 'node:path'

export async function appendToDayShard(params: {
  tzDay: string // YYYY-MM-DD
  itemIds: string[]
}) {
  const dir = path.join(process.cwd(), 'content', 'indexes', 'shards')
  await fs.mkdir(dir, { recursive: true })
  const fp = path.join(dir, `${params.tzDay}.txt`)

  let existing = ''
  try {
    existing = await fs.readFile(fp, 'utf8')
  } catch {}

  const set = new Set(existing.split('\n').map((s) => s.trim()).filter(Boolean))
  let changed = false
  for (const id of params.itemIds) {
    if (!set.has(id)) {
      set.add(id)
      changed = true
    }
  }

  if (!changed) return { filePath: fp, appended: 0 }

  const out = Array.from(set).join('\n') + '\n'
  await fs.writeFile(fp, out, 'utf8')
  return { filePath: fp, appended: params.itemIds.length }
}

export async function readDayShard(day: string) {
  const fp = path.join(process.cwd(), 'content', 'indexes', 'shards', `${day}.txt`)
  const raw = await fs.readFile(fp, 'utf8')
  return raw.split('\n').map((s) => s.trim()).filter(Boolean)
}
