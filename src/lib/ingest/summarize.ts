import { request } from 'undici'

function requiredEnv(name: string) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env var: ${name}`)
  return v
}

export async function llmSummarizeItem(params: {
  source: string
  title?: string
  text?: string
  url: string
}): Promise<string | undefined> {
  const { source, title, text, url } = params

  const apiKey = requiredEnv('OPENAI_API_KEY')

  const input = [
    `Source: ${source}`,
    `URL: ${url}`,
    title ? `Title: ${title}` : '',
    text ? `Text: ${text.slice(0, 1200)}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  const system =
    'You are a concise analyst summarizing a single tech news item for a Tech Radar feed. Output ONLY the summary text.'
  const prompt =
    'Write a 1–2 sentence summary (max 240 characters). Be specific, avoid hype, no emojis, no hashtags. If the input is too thin, return an empty string.'

  const body = {
    model: process.env.OPENAI_SUMMARY_MODEL ?? 'gpt-4o-mini',
    input: [
      { role: 'system', content: system },
      { role: 'user', content: `${prompt}\n\n${input}` },
    ],
    max_output_tokens: 120,
    temperature: 0.2,
  }

  const res = await request('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const raw = await res.body.text()
  if (res.statusCode >= 400) {
    throw new Error(`OpenAI summary failed: ${res.statusCode}: ${raw.slice(0, 500)}`)
  }

  const json = JSON.parse(raw) as { output_text?: unknown }

  // Prefer output_text if present.
  const outText = typeof json.output_text === 'string' ? json.output_text : undefined
  const summary = (outText ?? '').trim()
  if (!summary) return undefined

  return summary.replace(/\s+/g, ' ').trim()
}
