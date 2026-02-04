import Link from 'next/link'

function isPillarTag(t: string) {
  return t.startsWith('pillar/')
}

function pillarSlug(t: string) {
  return t.replace(/^pillar\//, '')
}

export function TagChips({ tags, baseHref }: { tags: string[]; baseHref: string }) {
  if (!tags?.length) return null

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((t) => {
        const href = isPillarTag(t) ? `/topic/${pillarSlug(t)}` : `${baseHref}?tags=${encodeURIComponent(t)}`
        const testId = `tag-${t.replaceAll('/', '-')}`

        return (
          <li key={t}>
            <Link
              className="rounded-full border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:border-border-hover hover:bg-muted hover:text-foreground"
              href={href}
              data-testid={testId}
            >
              {t}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
