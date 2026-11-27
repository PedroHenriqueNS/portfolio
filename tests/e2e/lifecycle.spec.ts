import { expect, test, type Page } from '@playwright/test'

const aboutPins = (page: Page) => page.locator('.pin-spacer:has([data-section="about"])')
const experiencePins = (page: Page) => page.locator('.pin-spacer:has([data-section="experience"])')
const stagePins = (page: Page) => page.locator('.pin-spacer:has(.stage-frame)')
const headerBottom = (page: Page) => page.locator('body > header').evaluate((el) => el.getBoundingClientRect().bottom)

test('as cenas sobrevivem a idas e voltas pelo ClientRouter', async ({ page }) => {
  test.skip(page.viewportSize()!.width < 768, 'só no desktop')
  const errors: string[] = []
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))
  page.on('pageerror', (err) => errors.push(err.message))

  await page.goto('/')
  await page.evaluate(() => ((window as unknown as { __marker: number }).__marker = 1))

  for (let round = 0; round < 2; round++) {
    await page.locator('a.stage-card[data-project="linkeza"]').click()
    await expect(page).toHaveURL(/\/projetos\/linkeza$/)
    await page.locator('body > header a').first().click()
    await expect(page).toHaveURL(/\/$/)
    // Sem marcador, o documento foi recarregado e o teste não mediria a troca do ClientRouter.
    expect(await page.evaluate(() => (window as unknown as { __marker?: number }).__marker)).toBe(1)

    await expect(page.locator('html')).toHaveClass(/\bmotion\b/)
    await expect(aboutPins(page)).toHaveCount(1)
    await expect(experiencePins(page)).toHaveCount(1)
    await expect(stagePins(page)).toHaveCount(1)
    await expect(page.locator('.pin-spacer')).toHaveCount(3)
    await page.evaluate(() => scrollTo(0, 0))
    await page.mouse.move(200, 400)
    await page.mouse.wheel(0, 600)
    await expect.poll(() => headerBottom(page)).toBeLessThanOrEqual(0)
    await page.mouse.wheel(0, -100)
    await expect.poll(() => headerBottom(page)).toBeGreaterThan(0)
    // O palco voltou inteiro: no fim do pin mostra o último projeto.
    const stageEnd = await stagePins(page).evaluate((el) => el.getBoundingClientRect().bottom + scrollY - innerHeight)
    await page.evaluate((y) => scrollTo(0, y), stageEnd)
    await expect(page.locator('.stage-count')).toHaveText('5 / 5')
    await page.evaluate(() => scrollTo(0, 0))
  }
  expect(errors).toEqual([])
})

test.describe('com movimento reduzido', () => {
  test.use({ reducedMotion: 'reduce' })
  test('nenhuma cena roda e a frase do Sobre fica inteira', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')
    await expect(page.locator('html')).not.toHaveClass(/\bmotion\b/)
    await expect(page.locator('.pin-spacer')).toHaveCount(0)
    const opacities = await page.locator('.about-sentence .w').evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity))
    expect(opacities.length).toBeGreaterThan(0)
    expect(new Set(opacities)).toEqual(new Set(['1']))
  })
})
