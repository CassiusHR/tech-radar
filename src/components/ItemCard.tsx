import Link from 'next/link'
import { TagChips } from './TagChips'
import { SourcePill } from './SourcePill'

export function ItemCard({
  item,
  baseHref,
}: {
  item: {
    id: string
    title?: string
    summary?: string
    image?: string
    imageAlt?: string
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
          <SourcePill source={item.source} />
          <span>{new Date(item.publishedAt).toLocaleString()}</span>
          {item.authorHandle ? <span>{`@${item.authorHandle}`}</span> : null}
        </div>
        <div className="font-mono text-xs text-muted-foreground">{item.id}</div>
      </div>

      {/* Tags should be a primary navigation affordance */}
      <div className="mt-3">
        <TagChips tags={item.tags} baseHref={baseHref} />
      </div>

      <div className="mt-3 flex gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold leading-snug">
            <Link
              className="underline decoration-border underline-offset-4 transition-colors hover:text-accent"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              {item.title ?? item.url}
            </Link>
          </h2>

          {item.summary ? (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
          ) : null}
        </div>

        {item.image ? (
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-muted sm:block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.imageAlt ?? ''}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </a>
        ) : null}
      </div>
    </article>
  )
}

