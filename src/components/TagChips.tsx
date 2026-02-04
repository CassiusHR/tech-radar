import Link from 'next/link'

export function TagChips({ tags, baseHref }: { tags: string[]; baseHref: string }) {
  if (!tags?.length) return null
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <li key={t}>
          <Link
            className="rounded-full border px-2 py-0.5 text-xs hover:bg-muted"
            href={`${baseHref}?tags=${encodeURIComponent(t)}`}
          >
            {t}
          </Link>
        </li>
      ))}
    </ul>
  )
}
