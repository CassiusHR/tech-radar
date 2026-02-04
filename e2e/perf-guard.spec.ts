import { test, expect } from '@playwright/test'

test('home stays within basic LCP/CLS budgets', async ({ page }) => {
  await page.addInitScript(() => {
    ;(window as any).__webVitals = { cls: 0, lcp: 0 }

    // CLS
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any) {
        if (!entry.hadRecentInput) {
          ;(window as any).__webVitals.cls += entry.value
        }
      }
    }).observe({ type: 'layout-shift', buffered: true } as any)

    // LCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries() as any
      const last = entries[entries.length - 1]
      if (last) {
        ;(window as any).__webVitals.lcp = last.startTime
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true } as any)
  })

  await page.goto('/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1_000)

  const vitals = await page.evaluate(() => (window as any).__webVitals)

  // Budgets (CI-friendly; tighten when baselines are stable):
  expect(vitals.cls).toBeLessThan(0.1)
  expect(vitals.lcp).toBeLessThan(4_000)
})
