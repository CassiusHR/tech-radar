export function SourcePill({ source }: { source: string }) {
  const s = source.toLowerCase()

  const styles: Record<string, string> = {
    hn: 'border-orange-500/30 bg-orange-500/10 text-orange-300',
    reddit: 'border-red-500/30 bg-red-500/10 text-red-300',
    github: 'border-violet-500/30 bg-violet-500/10 text-violet-300',
    x: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
    youtube: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
  }

  const label: Record<string, string> = {
    hn: 'HN',
    reddit: 'Reddit',
    github: 'GitHub',
    x: 'X',
    youtube: 'YouTube',
  }

  const cls = styles[s] ?? 'border-border bg-muted text-muted-foreground'
  const text = label[s] ?? source

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[11px] ${cls}`}>{text}</span>
  )
}
