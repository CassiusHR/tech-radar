import path from 'node:path'

export const CONTENT_ROOT = path.join(process.cwd(), 'content')

export function itemPathFromId(id: string) {
  const [source, externalId] = id.split(':')
  if (!source || !externalId) throw new Error(`Invalid item id: ${id}`)
  return path.join(CONTENT_ROOT, 'items', source, `${externalId}.md`)
}

export function dayIndexPath(date: string) {
  return path.join(CONTENT_ROOT, 'indexes', 'day', `${date}.json`)
}

export function rollingWeekIndexPath() {
  return path.join(CONTENT_ROOT, 'indexes', 'week', 'rolling.json')
}
