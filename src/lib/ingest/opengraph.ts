import { request } from 'undici'
import * as cheerio from 'cheerio'

export type OgResult = {
  image?: string
  imageAlt?: string
}

function absolutize(url: string, maybe: string) {
  try {
    return new URL(maybe, url).toString()
  } catch {
    return undefined
  }
}

export async function fetchOpenGraph(url: string): Promise<OgResult> {
  const res = await request(url, {
    method: 'GET',
    headers: {
      // Some sites block generic agents; keep it simple.
      'user-agent': 'tech-radar-ingest/1.0 (+https://github.com/CassiusHR/tech-radar)',
      accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
    },
  })

  if (res.statusCode >= 400) return {}

  const html = await res.body.text()
  if (!html.trim()) return {}

  const $ = cheerio.load(html)
  const ogImage = $('meta[property="og:image"]').attr('content')?.trim()
  const ogImageAlt = $('meta[property="og:image:alt"]').attr('content')?.trim()

  const twitterImage = $('meta[name="twitter:image"]').attr('content')?.trim()
  const twitterImageAlt = $('meta[name="twitter:image:alt"]').attr('content')?.trim()

  const chosen = ogImage || twitterImage
  if (!chosen) return {}

  const abs = absolutize(url, chosen)
  if (!abs) return {}

  return {
    image: abs,
    imageAlt: (ogImageAlt || twitterImageAlt || '').trim() || undefined,
  }
}
