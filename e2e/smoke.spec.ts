import { test, expect } from '@playwright/test'

test('home → day → topic navigation (smoke)', async ({ page }) => {
  await test.step('Home loads with stable nav', async () => {
    await page.goto('/')
    await expect(page.getByTestId('home-title')).toHaveText('Tech Radar')
    await expect(page.getByTestId('nav-week')).toBeVisible()
    await expect(page.getByTestId('nav-latest-day')).toBeVisible()
  })

  let dayFromHref = ''
  await test.step('Navigate home → latest day', async () => {
    const href = await page.getByTestId('nav-latest-day').getAttribute('href')
    expect(href).toBeTruthy()

    const m = href!.match(/\/day\/(\d{4}-\d{2}-\d{2})/)
    expect(m, `expected day link href to match /day/YYYY-MM-DD, got: ${href}`).toBeTruthy()
    dayFromHref = m![1]

    await page.getByTestId('nav-latest-day').click()

    await expect(page).toHaveURL(new RegExp(`/day/${dayFromHref}$`))
    await expect(page.getByTestId('page-title')).toHaveText(dayFromHref)
    await expect(page.locator('article').first()).toBeVisible()
  })

  await test.step('Navigate day → topic via pillar tag chip', async () => {
    const pillarTag = page.locator('a[data-testid^="tag-pillar-"]').first()
    await expect(pillarTag).toBeVisible()

    const tagText = (await pillarTag.textContent())?.trim() || ''
    // UI now hides the 'pillar/' prefix and shows only the slug.
    expect(tagText.length).toBeTruthy()
    const slug = tagText

    await pillarTag.click()

    await expect(page).toHaveURL(new RegExp(`/topic/${slug}$`))
    await expect(page.getByTestId('page-title')).toHaveText(`Topic: ${slug}`)
    await expect(page.getByText(`Filtered by tags:`)).toBeVisible()
  })
})
