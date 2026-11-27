import { expect, test } from '@playwright/test'

// Cada projeto do Playwright já roda em 1440 e em 390; aqui entram os três idiomas.
for (const path of ['/', '/en', '/es']) {
  test(`${path}: toda frase [data-fit] cabe na largura`, async ({ page }) => {
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    const report = await page.evaluate(() => ({
      count: document.querySelectorAll('[data-fit]').length,
      bad: [...document.querySelectorAll<HTMLElement>('[data-fit]')]
        .filter((el) => {
          const box = el.getBoundingClientRect()
          return el.scrollWidth > el.clientWidth + 1 || box.left < -1 || box.right > innerWidth + 1
        })
        .map((el) => el.outerHTML.slice(0, 80)),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }))
    expect(report.count).toBeGreaterThan(0)
    expect(report.bad).toEqual([])
    expect(report.overflow).toBe(0)
  })
}
