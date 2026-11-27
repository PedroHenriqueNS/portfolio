import { expect, test, type Page } from '@playwright/test'

const SLUGS = ['linkeza', 'je-modesto', 'clau-camargo', 'wsa-marmores', 'pautas-gobuzz']
const TITLES = ['Linkeza', 'Jé Modesto 22555', 'Clau Camargo 55655', 'WSA Mármores e Granitos', 'Pautas Gobuzz']
const COLORS = ['rgb(43, 43, 217)', 'rgb(11, 107, 58)', 'rgb(168, 80, 10)', 'rgb(59, 58, 56)', 'rgb(163, 23, 80)']

const stage = (page: Page) => page.locator('[data-section="stage"]')
const items = (page: Page) => stage(page).locator('.stage-item')
const counter = (page: Page) => stage(page).locator('.stage-count')
const isMobile = (page: Page) => page.viewportSize()!.width < 768
/** Rola 100 px para cima com a roda e espera o scroll chegar (o cabeçalho reage ao evento de scroll). */
async function scrollUp100(page: Page) {
  const y = await page.evaluate(() => scrollY)
  await page.mouse.wheel(0, -100)
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(y - 100)
  await page.waitForTimeout(400) // o cabeçalho anima 0,35 s
}
const headerBottom = (page: Page) => page.locator('body > header').evaluate((el) => el.getBoundingClientRect().bottom)

/** Começo e fim do pin do palco, em scrollY. Depois das fontes: quando elas chegam, as posições são recalculadas. */
const pinRange = (page: Page) =>
  stage(page).evaluate(async (el) => {
    await document.fonts.ready
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
    const open = item.getByRole('link', { name: `Ver projeto: ${TITLES[i]}`, exact: true })
    await expect(open).toContainText('Ver projeto')
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
  for (const f of [0, 0.1, 0.3, 0.47, 0.53, 0.75, 0.9, 1]) {
    await page.goto('/')
    const { start, end } = await pinRange(page)
    await page.evaluate((y) => scrollTo(0, y), start + (end - start) * f)
    // Passo de 1,5 numa linha do tempo de 6: o projeto da frente é o arredondamento de 4f.
    const i = Math.round(4 * f)
    await expect(counter(page)).toHaveText(`${i + 1} / 5`)
    const card = items(page).nth(i).locator('.stage-card')
    // O scrub ainda alcança o scroll: espera o centro do cartão ficar na janela e por cima de tudo.
    const center = () =>
      card.evaluate((el) => {
        const r = el.getBoundingClientRect()
        const x = r.left + r.width / 2
        const y = r.top + r.height / 2
        return y > 0 && y < innerHeight && el.contains(document.elementFromPoint(x, y)) ? [x, y] : null
      })
    await expect.poll(center, `cartão ${i + 1} clicável em ${f}`).not.toBeNull()
    const [x, y] = (await center())!
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

test('no desktop, o cabeçalho fica fora durante o pin, mesmo rolando para cima', async ({ page }) => {
  test.skip(isMobile(page), 'só no desktop')
  await page.goto('/')
  const { start, end } = await pinRange(page)
  await page.evaluate((y) => scrollTo(0, y), (start + end) / 2)
  await page.mouse.move(200, 400)
  await scrollUp100(page)
  await expect.poll(() => headerBottom(page)).toBeLessThanOrEqual(0)
})

test('no celular, o cabeçalho fica fora sobre os painéis e volta depois do palco', async ({ page }) => {
  test.skip(!isMobile(page), 'só no celular')
  await page.goto('/')
  const listTop = await stage(page).locator('.stage-list').evaluate((el) => el.getBoundingClientRect().top + scrollY)
  await page.evaluate((y) => scrollTo(0, y), listTop + 2 * 844 + 200)
  await page.mouse.move(200, 400)
  await scrollUp100(page)
  await expect.poll(() => headerBottom(page)).toBeLessThanOrEqual(0)
  const segment = items(page).nth(2).locator('.stage-progress i').first()
  expect(await segment.evaluate((el) => {
    const r = el.getBoundingClientRect()
    return document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) === el
  })).toBe(true)

  const after = await page.locator('[data-section="projects"]').evaluate((el) => el.getBoundingClientRect().top + scrollY + 300)
  await page.evaluate((y) => scrollTo(0, y), after)
  await page.mouse.wheel(0, 300) // descer depois do palco volta a esconder
  await expect.poll(() => headerBottom(page)).toBeLessThanOrEqual(0)
  await scrollUp100(page)
  await expect.poll(() => headerBottom(page)).toBeGreaterThan(0)
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
