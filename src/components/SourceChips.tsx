import Link from 'next/link'

const SOURCES = ['hn', 'reddit', 'github', 'x', 'youtube'] as const
export type SourceId = (typeof SOURCES)[number]

export function SourceChips({ baseHref, active }: { baseHref: string; active?: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Filter by source">
      <li>
        <Link
          className={`rounded-full border px-2 py-0.5 font-mono text-xs transition-colors hover:border-border-hover hover:bg-muted ${
            !active ? 'border-border bg-card text-foreground' : 'border-border text-muted-foreground'
          }`}
          href={baseHref}
        >
          All
        </Link>
      </li>
      {SOURCES.map((s) => {
        const isActive = active === s
        const href = `${baseHref}?source=${encodeURIComponent(s)}`
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
