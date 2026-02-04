import Link from 'next/link'

export default function Home() {
  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Tech Radar</h1>
      <p className="max-w-prose text-sm text-muted-foreground">
        Rolling digest of relevant tech items. The UI uses the <span className="font-mono">VOID</span> theme
        from the Carlos Design System.
      </p>
      <div>
        <Link
          href="/week"
          className="inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-border-hover hover:bg-muted"
        >
          View this week
        </Link>
      </div>
    </main>
  )
}
