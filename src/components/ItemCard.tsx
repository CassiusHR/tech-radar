import Link from 'next/link'
import { TagChips } from './TagChips'

export function ItemCard({
  item,
  baseHref,
}: {
  item: {
    id: string
    title?: string
    url: string
    source: string
    authorHandle?: string
    publishedAt: string
    tags: string[]
  }
  baseHref: string
}) {
  return (
    <article className="rounded-lg border border-border bg-card p-4 text-card-foreground transition-colors hover:border-border-hover">
      <div className="flex items-center justify-between gap-3">
        <div className="font-mono text-xs text-muted-foreground">
          {item.source} · {new Date(item.publishedAt).toLocaleString()}
          {item.authorHandle ? ` · @${item.authorHandle}` : ''}
        </div>
        <div className="font-mono text-xs text-muted-foreground">{item.id}</div>
      </div>

      <h2 className="mt-2 text-base font-semibold leading-snug">
        <Link
          className="underline decoration-border underline-offset-4 transition-colors hover:text-accent"
          href={item.url}
          target="_blank"
          rel="noreferrer"
        >
          {item.title ?? item.url}
        </Link>
      </h2>

      <div className="mt-3">
        <TagChips tags={item.tags} baseHref={baseHref} />
      </div>
    </article>
  )
}

