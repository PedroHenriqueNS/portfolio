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

// No celular as seções grudam (sticky) e entram por translate ao longo da página inteira: três pontos no meio dela.
test('no celular, o scroll para onde foi mandado no meio da página', async ({ page, browserName }) => {
  test.skip(browserName !== 'firefox' || page.viewportSize()!.width !== 390, 'só no Firefox, em 390×844')
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight)
  for (const y of [0.3, 0.55, 0.8].map((f) => Math.round(max * f))) {
    await page.evaluate((v) => scrollTo(0, v), y)
    await page.waitForTimeout(300) // o que o brief manda medir: onde o scroll está 300 ms depois
    expect(Math.abs((await page.evaluate(() => scrollY)) - y), `em ${y}`).toBeLessThanOrEqual(1)
  }
})
