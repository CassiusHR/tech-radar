import Link from 'next/link'
import { DateTime } from 'luxon'
import { ItemCard } from '@/components/ItemCard'
import { latestAvailableDay } from '@/lib/content/days'
import { listWeekItems, listDayItems } from '@/lib/content/list'
import { loadTechRadarConfig } from '@/lib/ingest/config'

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr))
}

function pillarSlugsFromTags(tags: string[]) {
  return tags
    .filter((t) => t.startsWith('pillar/'))
    .map((t) => t.replace(/^pillar\//, ''))
    .filter(Boolean)
}

export default async function HomePage() {
  const cfg = await loadTechRadarConfig()
  const today = DateTime.now().setZone(cfg.tz).toFormat('yyyy-LL-dd')

  const latestDay = (await latestAvailableDay()) ?? today

  const items = await listDayItems(latestDay, [])
  const weekItems = await listWeekItems([])
  const pillarSlugs = unique(weekItems.flatMap((fm) => pillarSlugsFromTags(fm.tags ?? []))).slice(0, 12)

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-bold" data-testid="home-title">
          Tech Radar
        </h1>

        <Link
          className="text-sm underline text-muted-foreground"
          href={`/day/${latestDay}`}
          data-testid="nav-latest-day"
        >
          View {latestDay} →
        </Link>
      </header>

      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        Rolling digest of relevant tech items. UI uses the <span className="font-mono">VOID</span> theme.
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

      {items.length === 0 ? (
        <div className="mt-8 rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">No items yet for {latestDay}. (Ingest hasn’t run or wrote zero items.)</p>
          <p className="mt-2 text-sm">
            Try the day page:{' '}
            <Link className="underline" href={`/day/${latestDay}`}>{`/day/${latestDay}`}</Link>
          </p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {items.slice(0, cfg.pageSize).map((fm) => (
            <ItemCard
              key={fm.id}
              baseHref={`/day/${latestDay}`}
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
      )}

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
