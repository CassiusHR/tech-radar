import { request } from 'undici'
import { fetchOpenGraph } from './opengraph'

export type ThumbnailResult = {
  image?: string
  imageAlt?: string
}

async function fetchFavicon(pageUrl: string): Promise<string | undefined> {
  // Lowest-cost fallback: try the conventional /favicon.ico.
  // Avoid parsing HTML twice; Open Graph fetch already did that.
  try {
    const faviconUrl = new URL('/favicon.ico', pageUrl).toString()

    const res = await request(faviconUrl, {
      method: 'HEAD',
      headers: {
        'user-agent': 'tech-radar-ingest/1.0 (+https://github.com/CassiusHR/tech-radar)',
        accept: 'image/*;q=0.9,*/*;q=0.1',
      },
    })

    if (res.statusCode >= 400) return undefined

    const ct = String(res.headers['content-type'] ?? '').toLowerCase()
    if (!ct.startsWith('image/')) return undefined

    return faviconUrl
  } catch {
    return undefined
  }
}

export async function fetchThumbnail(url: string): Promise<ThumbnailResult> {
  const og = await fetchOpenGraph(url)
  if (og.image) return og

  const favicon = await fetchFavicon(url)
  if (favicon) return { image: favicon }

  return {}
}
