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

  return (
    <nav className="flex items-center gap-3 text-sm" aria-label="Pagination">
      <Link
        className={`underline ${page === 1 ? 'pointer-events-none opacity-50' : ''}`}
        href={hrefFor(prev)}
      >
        Prev
      </Link>
      <span className="text-muted-foreground">
        Page {page} / {pages}
      </span>
      <Link
        className={`underline ${page === pages ? 'pointer-events-none opacity-50' : ''}`}
        href={hrefFor(next)}
      >
        Next
      </Link>
    </nav>
  )
}
