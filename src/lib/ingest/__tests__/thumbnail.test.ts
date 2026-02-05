import { afterEach, beforeEach, expect, test } from 'vitest'
import { MockAgent, setGlobalDispatcher } from 'undici'
import { fetchThumbnail } from '../thumbnail'

let mockAgent: MockAgent

beforeEach(() => {
  mockAgent = new MockAgent()
  mockAgent.disableNetConnect()
  setGlobalDispatcher(mockAgent)
})

afterEach(() => {
  mockAgent.close()
})

test('prefers Open Graph (og:image) over fallbacks', async () => {
  const pool = mockAgent.get('https://example.com')

  pool
    .intercept({ method: 'GET', path: '/' })
    .reply(
      200,
      `<!doctype html><html><head>
        <meta property="og:image" content="/og.png" />
        <meta property="og:image:alt" content="OG ALT" />
      </head><body>Hello</body></html>`,
      { headers: { 'content-type': 'text/html' } }
    )

  const out = await fetchThumbnail('https://example.com/')
  expect(out).toEqual({ image: 'https://example.com/og.png', imageAlt: 'OG ALT' })
})

test('falls back to /favicon.ico when no og/twitter image exists', async () => {
  const pool = mockAgent.get('https://no-og.example')

  pool
    .intercept({ method: 'GET', path: '/' })
    .reply(200, `<!doctype html><html><head><title>x</title></head><body>x</body></html>`, {
      headers: { 'content-type': 'text/html' },
    })

  pool
    .intercept({ method: 'HEAD', path: '/favicon.ico' })
    .reply(200, '', { headers: { 'content-type': 'image/x-icon' } })

  const out = await fetchThumbnail('https://no-og.example/')
  expect(out).toEqual({ image: 'https://no-og.example/favicon.ico' })
})
