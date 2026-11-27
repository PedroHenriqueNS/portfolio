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

test('cruzar 768 px com o palco no meio da tela', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const middle = () =>
    page.locator('[data-section="stage"]').evaluate((el) => {
      const r = el.getBoundingClientRect()
      return r.top + scrollY + r.height / 2 - innerHeight / 2
    })
  await page.evaluate((y) => scrollTo(0, y), await middle())
  await expect.poll(() => pinSpacers(page)).toBe(3)

  await page.setViewportSize({ width: 390, height: 844 })
  await expect.poll(() => pinSpacers(page)).toBe(0)
  await expect.poll(() => overflow(page)).toBe(0)
  expect(await page.locator('.stage-item').evaluateAll((els) => els.map((el) => getComputedStyle(el).position))).toEqual(Array(5).fill('sticky'))
  await page.evaluate((y) => scrollTo(0, y), await middle())

  await page.setViewportSize({ width: 1440, height: 900 })
  await expect.poll(() => pinSpacers(page)).toBe(3)
  await expect.poll(() => overflow(page)).toBe(0)
  await page.evaluate((y) => scrollTo(0, y), await middle())
  // O palco preso mostra um projeto inteiro: o cartão do número no contador, com o centro dentro da janela.
  const currentCardCenter = () =>
    page.evaluate(() => {
      const i = Number(document.querySelector('.stage-count')!.textContent!.split('/')[0]) - 1
      const r = document.querySelectorAll('.stage-card')[i].getBoundingClientRect()
      return r.top + r.height / 2
    })
  await expect.poll(currentCardCenter).toBeGreaterThan(0)
  expect(await currentCardCenter()).toBeLessThan(900)
})
