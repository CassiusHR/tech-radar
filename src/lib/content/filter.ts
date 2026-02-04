export function parseTagsParam(tagsParam: string | string[] | undefined): string[] {
  if (!tagsParam) return []
  const raw = Array.isArray(tagsParam) ? tagsParam.join(',') : tagsParam
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

export function matchesAllTags(itemTags: string[], required: string[]) {
  if (!required.length) return true
  const set = new Set(itemTags)
  return required.every((t) => set.has(t))
}
