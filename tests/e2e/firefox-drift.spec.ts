import { expect, test } from '@playwright/test'

// Firefox desloca o scroll se ancorar num elemento que se move numa entrada (scroll anchoring).
test('o scroll para onde foi mandado, sem deriva', async ({ page, browserName }) => {
  test.skip(browserName !== 'firefox', 'só no Firefox')
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1500) // a entrada do hero termina em ~1,15 s
  for (const y of [500, 1400, 300]) {
    await page.evaluate((v) => scrollTo(0, v), y)
    await page.waitForTimeout(300)
    expect(Math.abs((await page.evaluate(() => scrollY)) - y), `em ${y}`).toBeLessThanOrEqual(1)
  }
})
