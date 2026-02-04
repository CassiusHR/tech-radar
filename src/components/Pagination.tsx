import Link from 'next/link'

export function Pagination({
  page,
  pages,
  hrefFor,
}: {
  page: number
  pages: number
  hrefFor: (p: number) => string
}) {
  if (pages <= 1) return null

  const prev = Math.max(1, page - 1)
  const next = Math.min(pages, page + 1)

  const linkBase =
    'rounded-md px-3 py-2 font-mono text-xs transition-colors hover:bg-muted hover:text-foreground'

  return (
    <nav className="flex items-center justify-between gap-3" aria-label="Pagination">
      <Link
        className={`${linkBase} ${page === 1 ? 'pointer-events-none opacity-50' : 'text-muted-foreground'}`}
        href={hrefFor(prev)}
      >
        Prev
      </Link>

      <span className="font-mono text-xs text-muted-foreground">
        Page {page} / {pages}
      </span>

      <Link
        className={`${linkBase} ${page === pages ? 'pointer-events-none opacity-50' : 'text-muted-foreground'}`}
        href={hrefFor(next)}
      >
        Next
      </Link>
    </nav>
  )
}

