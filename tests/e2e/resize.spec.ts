import { expect, test, type Page } from '@playwright/test'

const overflow = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
const pinSpacers = (page: Page) => page.evaluate(() => document.querySelectorAll('.pin-spacer').length)

test('1440 → 390 → 1440 sem rolagem horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2))
  expect(await overflow(page)).toBe(0)

  await page.setViewportSize({ width: 390, height: 844 })
  await expect.poll(() => overflow(page)).toBe(0)
  expect(await pinSpacers(page)).toBe(0)

  await page.setViewportSize({ width: 1440, height: 900 })
  await expect.poll(() => overflow(page)).toBe(0)
})
