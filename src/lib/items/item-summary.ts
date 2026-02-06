export function normalizeSummary(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const s = value.trim()
  if (!s) return undefined
  const lowered = s.toLowerCase()
  if (lowered === 'undefined' || lowered === 'null') return undefined

  // Common boilerplate that reads badly in cards.
  if (/^(read more|continue reading)[.!]?$/i.test(s)) return undefined

  return s
}

export function excerptFromText(value: unknown, maxChars = 220): string | undefined {
  if (typeof value !== 'string') return undefined
  const raw = value
    .replace(/\s+/g, ' ')
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .trim()

  if (!raw) return undefined

  if (raw.length <= maxChars) return raw

  // Cut on a word boundary when possible.
  const cut = raw.slice(0, maxChars)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…'
}

export function getItemCardSummary(frontmatter: {
  summary?: unknown
  description?: unknown
  text?: unknown
}): string | undefined {
  return (
    normalizeSummary(frontmatter.summary) ??
    normalizeSummary(frontmatter.description) ??
    excerptFromText(frontmatter.text)
  )
}
