import fs from 'node:fs/promises'
import path from 'node:path'

export async function writeItemMarkdown(params: {
  source: string
  externalId: string
  frontmatter: Record<string, unknown>
  body: string
}) {
  const { source, externalId, frontmatter, body } = params
  const dir = path.join(process.cwd(), 'content', 'items', source)
  await fs.mkdir(dir, { recursive: true })

  // externalId comes from external sources (GitHub repo full names, etc.).
  // Sanitize to a safe filename (no slashes, no control chars).
  const safe = String(externalId)
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .replace(/[\\/]+/g, ' - ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180)

  const filePath = path.join(dir, `${safe}.md`)

  const fmLines = ['---']
  for (const [k, v] of Object.entries(frontmatter)) {
    fmLines.push(`${k}: ${JSON.stringify(v)}`)
  }
  fmLines.push('---')

  const out = fmLines.join('\n') + `\n\n${body.trim()}\n`
  await fs.writeFile(filePath, out, 'utf8')
  return filePath
}
