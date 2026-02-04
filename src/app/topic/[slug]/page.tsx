import { Metadata } from 'next'
import { Pagination } from '@/components/Pagination'
import { ItemCard } from '@/components/ItemCard'
import { parseTagsParam } from '@/lib/content/filter'
import { listWeekItems } from '@/lib/content/list'
import { paginate } from '@/lib/ui/pagination'

function pillarTagFromSlug(slug: string) {
  return `pillar/${slug}`
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const slug = params.slug
  const base = `/topic/${slug}`
  return {
    title: `Tech Radar — ${slug}`,
    description: `Most relevant items for ${slug}.`,
    alternates: { canonical: base },
  }
}

export default async function TopicPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { slug } = await params
  const sp = await searchParams
  const page = Number(sp.page ?? '1') || 1

  const tags = Array.from(new Set([pillarTagFromSlug(slug), ...parseTagsParam(sp.tags)]))

  const items = await listWeekItems(tags)
  const paged = paginate(items, page, 20)
  const baseHref = `/topic/${slug}`

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Topic: {slug}</h1>
        <p className="text-sm text-muted-foreground">Filtered by: {tags.join(', ')}</p>
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

      <Pagination page={paged.page} pages={paged.pages} hrefFor={(p) => `${baseHref}?page=${p}`} />
    </main>
  )
}

