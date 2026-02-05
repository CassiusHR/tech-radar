import Link from 'next/link'

const SOURCES = ['hn', 'reddit', 'github', 'x', 'youtube'] as const
export type SourceId = (typeof SOURCES)[number]

function hrefWith(baseHref: string, params: Record<string, string | undefined>) {
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v) sp.set(k, v)
  }
  const qs = sp.toString()
  return qs ? `${baseHref}?${qs}` : baseHref
}

export function SourceChips({
  baseHref,
  active,
  tags,
  sort,
}: {
  baseHref: string
  active?: string
  tags?: string[]
  sort?: string
}) {
  const tagParam = tags?.length ? tags.join(',') : undefined

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Filter by source">
      <li>
        <Link
          className={`rounded-full border px-2 py-0.5 font-mono text-xs transition-colors hover:border-border-hover hover:bg-muted ${
            !active ? 'border-border bg-card text-foreground' : 'border-border text-muted-foreground'
          }`}
          href={hrefWith(baseHref, { tags: tagParam, sort })}
        >
          All
        </Link>
      </li>
      {SOURCES.slice()
        .sort((a, b) => a.localeCompare(b))
        .map((s) => {
          const isActive = active === s
          const href = hrefWith(baseHref, { tags: tagParam, sort, source: s })
          return (
            <li key={s}>
              <Link
                className={`rounded-full border px-2 py-0.5 font-mono text-xs transition-colors hover:border-border-hover hover:bg-muted ${
                  isActive ? 'border-border bg-card text-foreground' : 'border-border text-muted-foreground'
                }`}
                href={href}
              >
                {s}
              </Link>
            </li>
          )
        })}
    </ul>
  )
}
