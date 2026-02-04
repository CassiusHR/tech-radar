import { request } from 'undici'
import * as cheerio from 'cheerio'
import type { RawItem } from './types'

export async function fetchGitHubTrending(params: {
  url: string
  fetchedAt: string
  limit: number
}): Promise<RawItem[]> {
  const { url, fetchedAt, limit } = params
  const res = await request(url)
  const html = await res.body.text()
  const $ = cheerio.load(html)

  const items: RawItem[] = []
  $('article.Box-row').each((_, el) => {
    if (items.length >= limit) return
    const repo = $(el).find('h2 a').text().replace(/\s+/g, ' ').trim()
    if (!repo) return
    const href = $(el).find('h2 a').attr('href')
    const fullUrl = href ? `https://github.com${href.trim()}` : url
    const desc = $(el).find('p').text().trim() || undefined
    const starsToday = $(el).find('span.d-inline-block.float-sm-right').text().trim()

    const externalId = repo
    items.push({
      id: `github:${externalId}`,
      source: 'github',
      externalId,
      url: fullUrl,
      title: repo,
      text: desc,
      authorHandle: undefined,
      authorName: undefined,
      publishedAt: new Date().toISOString(),
      fetchedAt,
      tags: [],
      metrics: { starsToday },
      score: 0,
      scoreBreakdown: { trendingUrl: url },
    })
  })

  return items
}
