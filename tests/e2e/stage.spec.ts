import { expect, test, type Page } from '@playwright/test'

const SLUGS = ['linkeza', 'je-modesto', 'clau-camargo', 'wsa-marmores', 'pautas-gobuzz']
const COLORS = ['rgb(43, 43, 217)', 'rgb(11, 107, 58)', 'rgb(168, 80, 10)', 'rgb(59, 58, 56)', 'rgb(163, 23, 80)']

const stage = (page: Page) => page.locator('[data-section="stage"]')
const items = (page: Page) => stage(page).locator('.stage-item')
const counter = (page: Page) => stage(page).locator('.stage-count')
const isMobile = (page: Page) => page.viewportSize()!.width < 768

/** Começo e fim do pin do palco, em scrollY. */
const pinRange = (page: Page) =>
  stage(page).evaluate((el) => {
    const spacer = el.querySelector('.stage-frame')!.closest('.pin-spacer')!
    const top = spacer.getBoundingClientRect().top + scrollY
    return { start: top, end: top + spacer.getBoundingClientRect().height - innerHeight }
  })

/** O elemento no centro do foco é ele mesmo ou um filho: nada o cobre. */
const focusOnTop = (page: Page) =>
  page.evaluate(() => {
    const el = document.activeElement as HTMLElement
    const r = el.getBoundingClientRect()
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
    return !!hit && el.contains(hit)
  })

test('cinco destaques na ordem; o cartão e "Ver projeto" levam ao projeto', async ({ page }) => {
  await page.goto('/')
  await expect(items(page)).toHaveCount(5)
  for (const [i, slug] of SLUGS.entries()) {
    const item = items(page).nth(i)
    const card = item.locator('a.stage-card')
    await expect(card).toHaveAttribute('data-project', slug)
    await expect(card).toHaveAttribute('href', `/projetos/${slug}`)
    const open = item.getByRole('link', { name: 'Ver projeto' })
    await expect(open).toHaveAttribute('href', `/projetos/${slug}`)
    await expect(open).toHaveAttribute('data-project', slug)
  }
})

test('"Todos (17)" leva o scroll e o foco à lista', async ({ page }) => {
  await page.goto('/')
  await stage(page).getByRole('link', { name: 'Todos (17)' }).click()
  await expect.poll(() => page.evaluate(() => document.activeElement?.closest('[data-section]')?.getAttribute('data-section'))).toBe('projects')
  const top = await page.locator('[data-section="projects"]').evaluate((el) => el.getBoundingClientRect().top)
  expect(top).toBeGreaterThanOrEqual(-1)
  expect(top).toBeLessThan(page.viewportSize()!.height / 2)
})

test('no desktop, o pin passa pelos cinco: contador e cor de fundo', async ({ page }) => {
  test.skip(isMobile(page), 'só no desktop')
  await page.goto('/')
  await expect(page.locator('.pin-spacer:has(.stage-frame)')).toHaveCount(1)
  const { start, end } = await pinRange(page)
  const bg = stage(page).locator('.stage-bg')
  for (let i = 0; i < 5; i++) {
    await page.evaluate((y) => scrollTo(0, y), start + ((end - start) * i) / 4)
    await expect(counter(page)).toHaveText(`${i + 1} / 5`)
    await expect.poll(() => bg.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(COLORS[i])
  }
})

test('no desktop, clicar no cartão visível leva ao projeto certo em qualquer ponto do pin', async ({ page }) => {
  test.skip(isMobile(page), 'só no desktop')
  for (const f of [0, 0.12, 0.3, 0.47, 0.53, 0.75, 0.9, 1]) {
    await page.goto('/')
    const { start, end } = await pinRange(page)
    await page.evaluate((y) => scrollTo(0, y), start + (end - start) * f)
    await page.waitForTimeout(900) // o scrub alcança o scroll
    const i = Number((await counter(page).textContent())!.split('/')[0]) - 1
    const card = items(page).nth(i).locator('.stage-card')
    const box = (await card.boundingBox())!
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    expect(y, `centro do cartão ${i + 1} na janela em ${f}`).toBeLessThan(page.viewportSize()!.height)
    expect(await card.evaluate((el, [px, py]) => el.contains(document.elementFromPoint(px, py)), [x, y])).toBe(true)
    await page.mouse.click(x, y)
    await expect(page).toHaveURL(new RegExp(`/projetos/${SLUGS[i]}$`))
  }
})

test('no desktop, Tab percorre os cartões e traz cada projeto para a frente', async ({ page }) => {
  test.skip(isMobile(page), 'só no desktop')
  await page.goto('/')
  const cards = stage(page).locator('.stage-card')
  await cards.first().focus()
  for (let i = 0; i < 5; i++) {
    if (i) {
      await page.keyboard.press('Tab') // "Ver projeto" do anterior
      await page.keyboard.press('Tab')
    }
    await expect(cards.nth(i)).toBeFocused()
    await expect(counter(page)).toHaveText(`${i + 1} / 5`)
    await expect.poll(() => focusOnTop(page)).toBe(true)
  }
  await page.keyboard.press('Shift+Tab')
  await page.keyboard.press('Shift+Tab')
  await expect(cards.nth(3)).toBeFocused()
  await expect(counter(page)).toHaveText('4 / 5')
  await expect.poll(() => focusOnTop(page)).toBe(true)
})

test('no celular, cinco painéis grudados de uma tela, sem pin por script', async ({ page }) => {
  test.skip(!isMobile(page), 'só no celular')
  await page.goto('/')
  await expect(page.locator('html')).toHaveClass(/\bmotion\b/)
  const panels = await items(page).evaluateAll((els) => els.map((el) => [getComputedStyle(el).position, el.getBoundingClientRect().height]))
  expect(panels).toEqual(Array(5).fill(['sticky', page.viewportSize()!.height]))
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
})

test('no celular, Shift+Tab volta pelos cartões sem cair atrás de outro painel', async ({ page }) => {
  test.skip(!isMobile(page), 'só no celular')
  await page.goto('/')
  const cards = stage(page).locator('.stage-card')
  await cards.last().focus()
  for (let i = 4; i >= 0; i--) {
    if (i < 4) {
      await page.keyboard.press('Shift+Tab') // "Ver projeto" do anterior
      await page.keyboard.press('Shift+Tab')
    }
    await expect(cards.nth(i)).toBeFocused()
    await expect.poll(() => focusOnTop(page)).toBe(true)
  }
})

test.describe('com movimento reduzido', () => {
  test.use({ reducedMotion: 'reduce' })
  test('cinco blocos coloridos em fluxo normal', async ({ page }) => {
    await page.goto('/')
    const blocks = await items(page).evaluateAll((els) => els.map((el) => [getComputedStyle(el).position, getComputedStyle(el).backgroundColor]))
    expect(blocks).toEqual(COLORS.map((c) => ['relative', c]))
    await expect(page.locator('.pin-spacer')).toHaveCount(0)
  })
})
