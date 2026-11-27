import { expect, test, type Locator, type Page } from '@playwright/test'

const section = (page: Page) => page.locator('[data-section="skills"]')
const isMobile = (page: Page) => page.viewportSize()!.width < 768
/** A lista de verdade: fora das cópias do laço (que têm aria-hidden). */
const realItems = (page: Page) => section(page).locator('ul:not([aria-hidden="true"]) > li')
const rect = (l: Locator) => l.evaluate((el) => el.getBoundingClientRect().toJSON() as DOMRect)

async function bring(page: Page, selector: string) {
  await page.evaluate(async (sel) => {
    await document.fonts.ready
    document.querySelector(sel)!.scrollIntoView({ block: 'center' })
  }, selector)
  await expect(page.locator(selector).first()).toBeInViewport()
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

test('as cópias do laço têm aria-hidden e ficam fora da ordem de tabulação', async ({ page }) => {
  await page.goto('/')
  await bring(page, '[data-section="skills"]')
  const copies = section(page).locator('[data-copy]')
  await expect.poll(() => copies.count()).toBeGreaterThan(0)
  for (const copy of await copies.all()) {
    await expect(copy).toHaveAttribute('aria-hidden', 'true')
    await expect(copy.locator('[id], [popover]')).toHaveCount(0)
    for (const name of await copy.locator('.sk-name').all()) await expect(name).toHaveAttribute('tabindex', '-1')
  }
})

test('Tab passa por cada um dos 31 nomes uma vez', async ({ page }) => {
  await page.goto('/')
  await page.locator('[data-section="projects"] a[data-project]').last().focus()
  const seen: string[] = []
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press('Tab')
    const at = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement
      return { inSection: !!el.closest('[data-section="skills"]'), name: el.matches('.sk-name') ? el.innerText.trim() : null, copy: !!el.closest('[data-copy]') }
    })
    if (!at.inSection) break
    expect(at.copy).toBe(false)
    if (at.name) seen.push(at.name)
  }
  expect(seen).toHaveLength(31)
  expect(new Set(seen).size).toBe(31)
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
  await expect.poll(async () => {
    const r = await rect(name)
    return r.left >= 0 && r.right <= 1440
  }).toBe(true)
})

test('no desktop, todo nome visível (original ou cópia) mostra o tooltip junto dele ao passar o cursor', async ({ page }) => {
  test.skip(isMobile(page), 'só no desktop')
  await page.goto('/')
  const anchored = await page.evaluate(() => CSS.supports('position-area: top'))
  let copies = 0
  for (const g of ['featured', 'frontend', 'backend']) {
    await bring(page, `[data-group="${g}"]`)
    const band = section(page).locator(`[data-group="${g}"] .sk-band`)
    const b = await rect(band)
    // Cursor sobre a faixa: ela para, e as posições lidas a seguir valem.
    await page.mouse.move(b.left + 4, b.top + b.height / 2)
    await expect.poll(() => band.evaluate((el) => el.matches(':hover'))).toBe(true)
    const names = band.locator('.sk-name')
    const visible: Locator[] = []
    for (const n of await names.all()) {
      const r = await rect(n)
      if (r.left >= 0 && r.right <= 1440 && r.top >= 0 && r.bottom <= 900) visible.push(n)
    }
    expect(visible.length).toBeGreaterThan(1)
    copies += (await Promise.all(visible.map((n) => n.evaluate((el) => !!el.closest('[data-copy]'))))).filter(Boolean).length
    for (const n of visible) {
      const text = (await n.innerText()).trim()
      const r = await rect(n)
      await page.mouse.move(r.left + r.width / 2, r.top + r.height / 2)
      const tip = page.locator('.tip-card:popover-open')
      await expect(tip).toHaveCount(1)
      await expect(tip).toContainText(text)
      if (!anchored) continue
      await expect.poll(async () => {
        const t = await rect(tip)
        const gapX = Math.max(0, r.left - t.right, t.left - r.right)
        const gapY = Math.max(0, r.top - t.bottom, t.top - r.bottom)
        return Math.max(gapX, gapY)
      }, `tooltip de ${text}`).toBeLessThanOrEqual(24)
    }
  }
  expect(copies, 'cópias entre os nomes visíveis').toBeGreaterThan(0)
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
  const items = section(page).locator('[data-group="backend"] li')
  await expect.poll(async () => [...new Set(await items.evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity)))]).toEqual(['1'])
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
