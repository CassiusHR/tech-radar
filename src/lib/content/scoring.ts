import type { RawItem } from '../sources/types'

export type ScoreBreakdown = {
  total: number
  recency: number
  engagement: number
  author: number
  source: number
  notes?: string[]
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function safeNum(v: unknown) {
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isFinite(n) ? n : 0
}

type XMetrics = { likeCount?: number; repostCount?: number; replyCount?: number }
type RedditMetrics = { score?: number; comments?: number }
type HNMetrics = { points?: number; comments?: number }

export function recencyWeight(ageHours: number, mode: 'daily' | 'weekly') {
  const halfLife = mode === 'daily' ? 12 : 36
  return Math.pow(0.5, ageHours / halfLife)
}

export function authorWeight(params: { authorHandle?: string; isFollowing?: boolean }) {
  let w = 0
  if (params.isFollowing) w += 0.25
  if (params.authorHandle && ['vercel', 'reactjs', 'anthropicai', 'openai'].includes(params.authorHandle.toLowerCase())) w += 0.5
  return w
}

export function engagementScore(item: RawItem) {
  switch (item.source) {
    case 'x': {
      const m = (item.metrics || {}) as XMetrics
      return safeNum(m.likeCount) * 1 + safeNum(m.repostCount) * 2 + safeNum(m.replyCount) * 1.5
    }
    case 'reddit': {
      const m = (item.metrics || {}) as RedditMetrics
      return safeNum(m.score) * 1 + safeNum(m.comments) * 2
    }
    case 'hn': {
      const m = (item.metrics || {}) as HNMetrics
      return safeNum(m.points) * 1 + safeNum(m.comments) * 2
    }
    case 'github': {
      const s = String((item.metrics || {}).starsToday ?? '')
      const n = Number(s.match(/\d+/)?.[0] ?? '0')
      return n
    }
    case 'youtube':
      return 0
  }
}

export function sourceWeight(source: RawItem['source']) {
  return (
    {
      x: 1.0,
      reddit: 0.9,
      hn: 0.9,
      github: 0.8,
      youtube: 0.7,
    } as const
  )[source]
}

export function scoreItem(params: {
  item: RawItem
  mode: 'daily' | 'weekly'
  ageHours: number
  isFollowing?: boolean
}) {
  const { item, mode, ageHours, isFollowing } = params
  const rec = recencyWeight(ageHours, mode)
  const eng = engagementScore(item)
  const auth = authorWeight({ authorHandle: item.authorHandle, isFollowing })
  const src = sourceWeight(item.source)

  const wRec = mode === 'daily' ? 1.2 : 0.8
  const wEng = mode === 'daily' ? 0.8 : 1.4

  const total = src * (wRec * rec + wEng * Math.log1p(eng) + auth)

  const breakdown: ScoreBreakdown = {
    total,
    recency: wRec * rec,
    engagement: wEng * Math.log1p(eng),
    author: auth,
    source: src,
  }

  return { score: clamp(total, 0, 1000), breakdown }
}
