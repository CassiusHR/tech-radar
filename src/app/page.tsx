import Link from 'next/link'
import { DateTime } from 'luxon'
import { ItemCard } from '@/components/ItemCard'
import { loadTechRadarConfig } from '@/lib/ingest/config'
import { listDayItems } from '@/lib/content/list'

export default async function HomePage() {
  const cfg = await loadTechRadarConfig()
  const today = DateTime.now().setZone(cfg.tz).toFormat('yyyy-LL-dd')

  const items = await listDayItems(today, [])

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-bold">Tech Radar</h1>
        <Link className="text-sm underline text-muted-foreground" href={`/day/${today}`}>
          View {today} →
        </Link>
      </header>

      <p className="mt-2 text-sm text-muted-foreground">Today ({cfg.tz})</p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            No items yet for {today}. This usually means ingest hasn’t run (or it wrote zero items).
          </p>
          <p className="mt-2 text-sm">
            Try the day page: <Link className="underline" href={`/day/${today}`}>{`/day/${today}`}</Link>
          </p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {items.slice(0, cfg.pageSize).map((fm) => (
            <ItemCard
              key={fm.id}
              baseHref={`/day/${today}`}
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
    </main>
  )
}
