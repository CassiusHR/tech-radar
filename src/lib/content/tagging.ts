import type { SourceId } from '@/lib/sources/types'

export type TagRule = {
  tag: string
  any: string[]
}

const RULES: TagRule[] = [
  { tag: 'pillar/nextjs', any: ['nextjs', 'next.js', 'next js', 'app router', 'server actions'] },
  { tag: 'pillar/react', any: ['react', 'react 19', 'react compiler', 'jsx', 'rsc'] },
  { tag: 'pillar/vercel', any: ['vercel', '@vercel', 'edge runtime', 'vercel ai sdk', 'ai sdk'] },
  { tag: 'pillar/netlify', any: ['netlify', '@netlify', 'netlify functions'] },
  // merged css/css-styling
  { tag: 'pillar/css', any: ['css', 'container queries', ':has', 'css variables', 'oklch'] },
  // keep tailwind separate from css
  { tag: 'pillar/tailwind', any: ['tailwind', 'tailwindcss', 'shadcn', 'shadcn/ui'] },
  { tag: 'pillar/design-systems', any: ['design system', 'tokens', 'component library'] },
  { tag: 'pillar/devops', any: ['devops', 'kubernetes', 'k8s', 'ci/cd', 'github actions', 'docker'] },
  { tag: 'pillar/ai-dev-tools', any: ['ai coding', 'coding agent', 'cursor', 'copilot', 'claude code', 'devin'] },
  { tag: 'pillar/anthropic-openai-releases', any: ['anthropic', 'openai', 'claude', 'gpt', 'o1', 'o3'] },
  { tag: 'pillar/huggingface', any: ['huggingface', 'hugging face', 'transformers', 'safetensors'] },
  { tag: 'pillar/model-releases', any: ['model release', 'released', 'now available', 'checkpoint', 'weights'] },
]

function norm(s: string) {
  return s.toLowerCase()
}

export function classifyPillars(params: {
  source: SourceId
  title?: string
  text?: string
  url?: string
  authorHandle?: string
}): string[] {
  const haystack = norm([params.title, params.text, params.url, params.authorHandle].filter(Boolean).join('\n'))

  const tags = new Set<string>()
  for (const r of RULES) {
    if (r.any.some((k) => haystack.includes(norm(k)))) tags.add(r.tag)
  }

  // Extra: source-based defaults
  if (params.source === 'hn' && haystack.includes('github.com/vercel/next.js')) tags.add('pillar/nextjs')

  return Array.from(tags).sort()
}
