import Link from 'next/link'

export function TagChips({ tags, baseHref }: { tags: string[]; baseHref: string }) {
  if (!tags?.length) return null
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <li key={t}>
          <Link
            className="rounded-full border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:border-border-hover hover:bg-muted hover:text-foreground"
            href={`${baseHref}?tags=${encodeURIComponent(t)}`}
          >
            {t}
          </Link>
        </li>
      ))}
    </ul>
  )
}
