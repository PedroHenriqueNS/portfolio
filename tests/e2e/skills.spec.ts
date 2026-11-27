import { expect, test, type Page } from '@playwright/test'

const section = (page: Page) => page.locator('[data-section="skills"]')
const isMobile = (page: Page) => page.viewportSize()!.width < 768
/** A lista de verdade: fora das cópias do laço (que têm aria-hidden). */
const realItems = (page: Page) => section(page).locator('ul:not([aria-hidden="true"]) > li')

async function bring(page: Page, selector: string) {
  await page.evaluate(async (sel) => {
    await document.fonts.ready
    document.querySelector(sel)!.scrollIntoView({ block: 'center' })
  }, selector)
  await page.waitForTimeout(400)
}

test('31 itens em três grupos, cada um com nome e nível acessível', async ({ page }) => {
  await page.goto('/')
  await expect(section(page).locator('h3')).toHaveCount(3)
  await expect(section(page).locator('ul:not([aria-hidden="true"])')).toHaveCount(3)
  await expect(realItems(page)).toHaveCount(31)
  for (const li of await realItems(page).all()) {
    await expect(li.locator('.sk-name')).not.toBeEmpty()
    await expect(li.locator('[role="img"][aria-label^="nível"]').first()).toHaveAttribute('aria-label', /^nível [1-5] de 5$/)
  }
})

test('as cópias do laço têm aria-hidden e não recebem foco', async ({ page }) => {
  await page.goto('/')
  await bring(page, '[data-section="skills"]')
  const copies = section(page).locator('[data-copy]')
  await expect.poll(() => copies.count()).toBeGreaterThan(0)
  for (const copy of await copies.all()) {
    await expect(copy).toHaveAttribute('aria-hidden', 'true')
    expect(await copy.evaluate((el) => (el as HTMLElement).inert)).toBe(true)
    await expect(copy.locator('[id], [popover]')).toHaveCount(0)
  }
})

test('o chip "como trabalho" existe', async ({ page }) => {
  await page.goto('/')
  await expect(section(page).locator('.tip-chip', { hasText: 'Como trabalho' })).toBeVisible()
})

test('no desktop, foco num nome abre o tooltip com categoria e nível, e o nome fica inteiro na tela', async ({ page }) => {
  test.skip(isMobile(page), 'só no desktop')
  await page.goto('/')
  await bring(page, '[data-group="backend"]')
  const name = section(page).getByRole('button', { name: 'PostgreSQL', exact: true })
  await name.focus()
  const tip = page.locator('#tip-skill-postgresql')
  await expect(tip).toBeVisible()
  await expect(tip).toContainText('Banco de dados')
  await expect(tip.locator('[role="img"]')).toHaveAttribute('aria-label', 'nível 4 de 5')
  await page.waitForTimeout(800)
  const r = await name.evaluate((el) => el.getBoundingClientRect().toJSON() as DOMRect)
  expect(r.left).toBeGreaterThanOrEqual(0)
  expect(r.right).toBeLessThanOrEqual(1440)
})

test('no desktop, três faixas em sentidos opostos que andam sozinhas', async ({ page }) => {
  test.skip(isMobile(page), 'só no desktop')
  await page.goto('/')
  await bring(page, '[data-group="frontend"]')
  const xs = () => page.$$eval('[data-section="skills"] .sk-track', (ts) => ts.map((t) => new DOMMatrix(getComputedStyle(t).transform).m41))
  const a = await xs()
  await page.waitForTimeout(500)
  const b = await xs()
  expect(a).toHaveLength(3)
  const d = b.map((v, i) => v - a[i])
  expect(d[0]).toBeLessThan(0)
  expect(d[1]).toBeGreaterThan(0)
  expect(d[2]).toBeLessThan(0)
})

test('no celular, uma faixa e uma grade de 4 colunas com ícone, nome e nível visíveis', async ({ page }) => {
  test.skip(!isMobile(page), 'só no celular')
  await page.goto('/')
  await bring(page, '[data-group="featured"]')
  await expect(section(page).locator('.sk-track:has([data-copy])')).toHaveCount(1)
  await expect(section(page).locator('[data-group="featured"] .sk-track [data-copy]').first()).toBeVisible()
  for (const g of ['frontend', 'backend']) {
    await bring(page, `[data-group="${g}"]`)
    const list = section(page).locator(`[data-group="${g}"] ul`)
    expect(await list.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length)).toBe(4)
    for (const li of await list.locator('li').all()) {
      await expect(li.locator('.sk-icon')).toBeVisible()
      await expect(li.locator('> .sk-dots')).toBeVisible()
      const size = await li.locator('.sk-text').evaluate((el) => parseFloat(getComputedStyle(el).fontSize))
      expect(size).toBeGreaterThanOrEqual(11)
    }
  }
  await page.waitForTimeout(1200)
  const opacities = await section(page).locator('[data-group="backend"] li').evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity))
  expect(new Set(opacities)).toEqual(new Set(['1']))
})

test('com a seção fora da tela, nenhuma faixa se move', async ({ page }) => {
  await page.goto('/')
  await bring(page, '[data-section="skills"]')
  await page.evaluate(() => scrollTo(0, 0))
  await page.waitForTimeout(300)
  const read = () => page.$$eval('[data-section="skills"] .sk-track', (ts) => ts.map((t) => getComputedStyle(t).transform))
  const a = await read()
  expect(a).toHaveLength(3)
  await page.waitForTimeout(300)
  expect(await read()).toEqual(a)
})
