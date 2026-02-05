import Link from 'next/link'
import { DateTime } from 'luxon'
import { ItemCard } from '@/components/ItemCard'
import { latestAvailableDay, listAvailableDays } from '@/lib/content/days'
import { listWeekItems, listDayItems } from '@/lib/content/list'
import type { ItemFrontmatter } from '@/lib/content/schema'
import { loadTechRadarConfig } from '@/lib/ingest/config'

const SOURCES = ['hn', 'reddit', 'github', 'x', 'youtube'] as const

type SourceId = (typeof SOURCES)[number]

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr))
}

function pillarSlugsFromTags(tags: string[]) {
  return tags
    .filter((t) => t.startsWith('pillar/'))
    .map((t) => t.replace(/^pillar\//, ''))
    .filter(Boolean)
}

function groupTopPerSource(items: ItemFrontmatter[], perSource: number) {
  const by = new Map<SourceId, ItemFrontmatter[]>()
  for (const s of SOURCES) by.set(s, [])

  const sorted = items
    .slice()
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0) || b.publishedAt.localeCompare(a.publishedAt))

  for (const it of sorted) {
    const s = it.source as SourceId
    if (!by.has(s)) continue
    const arr = by.get(s)!
    if (arr.length >= perSource) continue
    arr.push(it)
  }

  return by
}

function SourceSection({
  title,
  items,
  baseHref,
}: {
  title: string
  items: ItemFrontmatter[]
  baseHref: string
}) {
  if (items.length === 0) return null

  return (
    <section className="mt-8">
      <header className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link className="text-sm underline text-muted-foreground" href={baseHref}>
          View all →
        </Link>
      </header>

      <div className="mt-4 flex flex-col gap-4">
        {items.map((fm) => (
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
    </section>
  )
}

export default async function HomePage() {
  const cfg = await loadTechRadarConfig()
  const today = DateTime.now().setZone(cfg.tz).toFormat('yyyy-LL-dd')

  const latestDay = (await latestAvailableDay()) ?? today
  const itemsToday = await listDayItems(latestDay, [])
  const groupedToday = groupTopPerSource(itemsToday, 10)

  const weekItems = await listWeekItems([])
  const groupedWeek = groupTopPerSource(weekItems, 10)

  const pillarSlugs = unique(weekItems.flatMap((fm) => pillarSlugsFromTags(fm.tags ?? []))).slice(0, 12)

  const days = await listAvailableDays()
  const recentDays = days.slice(-14).reverse()

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-bold" data-testid="home-title">
          Tech Radar
        </h1>

        <Link className="text-sm underline text-muted-foreground" href={`/day/${latestDay}`} data-testid="nav-latest-day">
          View {latestDay} →
        </Link>
      </header>

      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        Today: <span className="font-mono">top 10 per source</span> • Week: <span className="font-mono">top 10 per source</span>
      </p>

      <nav className="mt-6 flex flex-wrap gap-3" aria-label="Primary">
        <Link
          className="inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-border-hover hover:bg-muted"
          href="/week"
          data-testid="nav-week"
        >
          Weekly digest
        </Link>
      </nav>

      {itemsToday.length === 0 ? (
        <div className="mt-8 rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">No items yet for {latestDay}. (Ingest hasn’t run or wrote zero items.)</p>
          <p className="mt-2 text-sm">
            Try the day page:{' '}
            <Link className="underline" href={`/day/${latestDay}`}>{`/day/${latestDay}`}</Link>
          </p>
        </div>
      ) : (
        <>
          <section className="mt-8">
            <h2 className="text-lg font-semibold">{latestDay} (Top 10 / source)</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {SOURCES.map((s) => (
                <Link
                  key={s}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs transition-colors hover:border-border-hover hover:bg-muted"
                  href={`/day/${latestDay}?source=${encodeURIComponent(s)}`}
                >
                  {s}
                </Link>
              ))}
            </div>
          </section>

          {SOURCES.map((s) => (
            <SourceSection
              key={s}
              title={s}
              items={groupedToday.get(s) ?? []}
              baseHref={`/day/${latestDay}?source=${encodeURIComponent(s)}`}
            />
          ))}

          <section className="mt-10">
            <h2 className="text-lg font-semibold">Past week (Top 10 / source)</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {SOURCES.map((s) => (
                <Link
                  key={s}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs transition-colors hover:border-border-hover hover:bg-muted"
                  href={`/week?source=${encodeURIComponent(s)}`}
                >
                  {s}
                </Link>
              ))}
            </div>

            {SOURCES.map((s) => (
              <SourceSection key={`wk-${s}`} title={s} items={groupedWeek.get(s) ?? []} baseHref={`/week?source=${encodeURIComponent(s)}`} />
            ))}
          </section>
        </>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Days</h2>
        {recentDays.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {recentDays.map((d) => (
              <li key={d}>
                <Link
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs transition-colors hover:border-border-hover hover:bg-muted"
                  href={`/day/${d}`}
                >
                  {d}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">No day indexes available yet.</p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold" data-testid="topics-title">
          Topics
        </h2>
        {pillarSlugs.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {pillarSlugs.map((slug) => (
              <li key={slug}>
                <Link
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs transition-colors hover:border-border-hover hover:bg-muted"
                  href={`/topic/${slug}`}
                >
                  {slug}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">No topics found in current week index.</p>
        )}
      </section>
    </main>
  )
}
