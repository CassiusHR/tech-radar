import { test, expect } from '@playwright/test'

test('home loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /tech radar/i })).toBeVisible()
})
