export function canonicalizeUrl(url: string) {
  try {
    const u = new URL(url)
    // drop tracking-ish params
    u.hash = ''
    ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((k) => u.searchParams.delete(k))
    return u.toString()
  } catch {
    return url
  }
}

export function dedupeByCanonicalUrl<T extends { url: string }>(items: T[]) {
  const seen = new Set<string>()
  const out: T[] = []
  for (const it of items) {
    const c = canonicalizeUrl(it.url)
    if (seen.has(c)) continue
    seen.add(c)
    out.push(it)
  }
  return out
}
