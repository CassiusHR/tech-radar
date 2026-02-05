import Link from 'next/link'
import type { SortMode } from '@/lib/content/sort'

function hrefWith(baseHref: string, params: Record<string, string | undefined>) {
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v) sp.set(k, v)
  }
  const qs = sp.toString()
  return qs ? `${baseHref}?${qs}` : baseHref
}

export function SortChips({
  baseHref,
  active,
  tags,
  source,
}: {
  baseHref: string
  active: SortMode
  tags?: string[]
  source?: string
}) {
  const tagParam = tags?.length ? tags.join(',') : undefined

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Sort">
      {(
        [
          { id: 'relevance' as const, label: 'Relevance' },
          { id: 'source' as const, label: 'Source' },
        ] satisfies Array<{ id: SortMode; label: string }>
      ).map((m) => {
        const isActive = active === m.id
        const href = hrefWith(baseHref, {
          tags: tagParam,
          source,
          sort: m.id === 'relevance' ? undefined : m.id,
        })

        return (
          <li key={m.id}>
            <Link
              className={`rounded-full border px-2 py-0.5 font-mono text-xs transition-colors hover:border-border-hover hover:bg-muted ${
                isActive ? 'border-border bg-card text-foreground' : 'border-border text-muted-foreground'
              }`}
              href={href}
            >
              {m.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
