import { Metadata } from 'next'
import { Pagination } from '@/components/Pagination'
import { ItemCard } from '@/components/ItemCard'
import { SourceChips } from '@/components/SourceChips'
import type { ItemFrontmatter } from '@/lib/content/schema'
import { parseTagsParam } from '@/lib/content/filter'
import { listWeekItems } from '@/lib/content/list'
import { paginate } from '@/lib/ui/pagination'

function pillarTagFromSlug(slug: string) {
  return `pillar/${slug}`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
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
  const source = typeof sp.source === 'string' ? sp.source : undefined

  const tags = Array.from(new Set([pillarTagFromSlug(slug), ...parseTagsParam(sp.tags)]))

  const itemsAll = await listWeekItems(tags)
  const items = source ? itemsAll.filter((fm) => fm.source === source) : itemsAll
  const paged = paginate(items, page, 20)
  const baseHref = `/topic/${slug}`

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold" data-testid="page-title">
        Topic: {slug}
      </h1>
      <div className="mt-2 flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Filtered by tags: {tags.join(', ')}</p>
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
          hrefFor={(p) => `${baseHref}?page=${p}${source ? `&source=${encodeURIComponent(source)}` : ''}`}
        />
      </div>
    </main>
  )
}
