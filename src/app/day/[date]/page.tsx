import { Metadata } from 'next'
import { Pagination } from '@/components/Pagination'
import { ItemCard } from '@/components/ItemCard'
import { parseTagsParam } from '@/lib/content/filter'
import { listDayItems } from '@/lib/content/list'
import { paginate } from '@/lib/ui/pagination'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { date: string }
  searchParams: Promise<Record<string, string | string[] | undefined>>
}): Promise<Metadata> {
  const date = params.date
  const sp = await searchParams
  const tags = parseTagsParam(sp.tags)

  const base = `/day/${date}`
  const title = `Tech Radar — ${date}`

  return {
    title: tags.length ? `${title} (filtered)` : title,
    description: `Most relevant items for ${date}.`,
    alternates: { canonical: base },
    robots: tags.length ? { index: false, follow: true } : undefined,
  }
}

export default async function DayPage({
  params,
  searchParams,
}: {
  params: Promise<{ date: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { date } = await params
  const sp = await searchParams
  const page = Number(sp.page ?? '1') || 1
  const tags = parseTagsParam(sp.tags)

  const items = await listDayItems(date, tags)
  const paged = paginate(items, page, 20)
  const baseHref = `/day/${date}`

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">{date}</h1>
        {tags.length ? (
          <p className="text-sm text-muted-foreground">Filtered by: {tags.join(', ')}</p>
        ) : (
          <p className="text-sm text-muted-foreground">Unfiltered</p>
        )}
      </header>

      <div className="flex flex-col gap-4">
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

      <Pagination
        page={paged.page}
        pages={paged.pages}
        hrefFor={(p) =>
          `${baseHref}?page=${p}${tags.length ? `&tags=${encodeURIComponent(tags.join(','))}` : ''}`
        }
      />
    </main>
  )
}

