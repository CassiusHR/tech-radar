import { Metadata } from 'next'
import { Pagination } from '@/components/Pagination'
import { ItemCard } from '@/components/ItemCard'
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

  const items = await listWeekItems(tags)
  const paged = paginate(items, page, 20)

  const baseHref = '/week'

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold" data-testid="page-title">
        Weekly digest (rolling 7 days)
      </h1>
      {tags.length ? (
        <p className="mt-2 text-sm text-muted-foreground">Filtered by: {tags.join(', ')}</p>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">Unfiltered</p>
      )}

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
            }}
          />
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          page={paged.page}
          pages={paged.pages}
          hrefFor={(p) => `${baseHref}?page=${p}${tags.length ? `&tags=${encodeURIComponent(tags.join(','))}` : ''}`}
        />
      </div>
    </main>
  )
}
