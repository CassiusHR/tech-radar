export function paginate<T>(items: T[], page: number, pageSize: number) {
  const total = items.length
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), pages)
  const start = (safePage - 1) * pageSize
  return {
    page: safePage,
    pageSize,
    total,
    pages,
    items: items.slice(start, start + pageSize),
  }
}
