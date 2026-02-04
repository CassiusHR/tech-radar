import { test, expect } from '@playwright/test'

test('home loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: /get started/i })).toBeVisible()
})
