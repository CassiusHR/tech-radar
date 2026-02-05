import { Metadata } from 'next'
import { Pagination } from '@/components/Pagination'
import { ItemCard } from '@/components/ItemCard'
import { SourceChips } from '@/components/SourceChips'
import type { ItemFrontmatter } from '@/lib/content/schema'
import { parseTagsParam } from '@/lib/content/filter'
import { listWeekItems } from '@/lib/content/list'
import { paginate } from '@/lib/ui/pagination'

export const metadata: Metadata = {
  title: 'Tech Radar — Weekly (Rolling 7 days)',
  description: 'Most relevant items from the past 7 days.',
  alternates: { canonical: '/week' },
}

export default async function WeekPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const page = Number(sp.page ?? '1') || 1
  const tags = parseTagsParam(sp.tags)
  const source = typeof sp.source === 'string' ? sp.source : undefined

  const itemsAll = await listWeekItems(tags)
  const items = source ? itemsAll.filter((fm) => fm.source === source) : itemsAll
  const paged = paginate(items, page, 20)

  const baseHref = '/week'

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold" data-testid="page-title">
        Weekly digest (rolling 7 days)
      </h1>
      <div className="mt-2 flex flex-col gap-2">
        {tags.length ? (
          <p className="text-sm text-muted-foreground">Filtered by tags: {tags.join(', ')}</p>
        ) : (
          <p className="text-sm text-muted-foreground">Unfiltered</p>
        )}
        <SourceChips baseHref={baseHref} active={source} />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {paged.items.map((fm) => (
          <ItemCard
            key={fm.id}
            baseHref={baseHref}
            item={{
              id: fm.id,
              title: fm.title,
              url: fm.url,
              source: fm.source,
              authorHandle: fm.authorHandle,
              publishedAt: fm.publishedAt,
              tags: fm.tags ?? [],
              summary: (fm as ItemFrontmatter).summary,
              image: (fm as ItemFrontmatter).image,
              imageAlt: (fm as ItemFrontmatter).imageAlt,
            }}
          />
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          page={paged.page}
          pages={paged.pages}
          hrefFor={(p) =>
            `${baseHref}?page=${p}` +
            `${tags.length ? `&tags=${encodeURIComponent(tags.join(','))}` : ''}` +
            `${source ? `&source=${encodeURIComponent(source)}` : ''}`
          }
        />
      </div>
    </main>
  )
}
