import Link from 'next/link'
import { latestAvailableDay } from '@/lib/content/days'
import { listWeekItems } from '@/lib/content/list'

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
  const latestDay = await latestAvailableDay()

  const weekItems = await listWeekItems([])
  const pillarSlugs = unique(weekItems.flatMap((fm) => pillarSlugsFromTags(fm.tags ?? []))).slice(0, 12)

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold" data-testid="home-title">
        Tech Radar
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Fast navigation for regressions: home → day → topic.</p>

      <nav className="mt-6 flex flex-wrap gap-3" aria-label="Primary">
        <Link className="rounded border px-3 py-1.5 text-sm hover:bg-muted" href="/week" data-testid="nav-week">
          Weekly digest
        </Link>

        {latestDay ? (
          <Link
            className="rounded border px-3 py-1.5 text-sm hover:bg-muted"
            href={`/day/${latestDay}`}
            data-testid="nav-latest-day"
          >
            Latest day: {latestDay}
          </Link>
        ) : null}
      </nav>

      <section className="mt-10">
        <h2 className="text-lg font-semibold" data-testid="topics-title">
          Topics
        </h2>
        {pillarSlugs.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {pillarSlugs.map((slug) => (
              <li key={slug}>
                <Link
                  className="rounded-full border px-3 py-1 text-xs hover:bg-muted"
                  href={`/topic/${slug}`}
                  data-testid={`topic-${slug}`}
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
