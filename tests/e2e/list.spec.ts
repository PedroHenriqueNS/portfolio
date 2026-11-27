import { expect, test, type Locator, type Page } from '@playwright/test'

const SLUGS = [
  'gobuzz-ads-manager', 'seeding-controle', 'sandro-mastellari', 'eduardo-boigues', 'flavia-morando-sbc', 'yt-dlp-gui',
  'auto-crop-pdf', 'cloud-barueri', 'snowhunter', 'youtube-music-clone', 'sodieasy', 'twonote',
]
/** Os seis sem data: o rótulo é só o tipo, sem ano inventado. */
const UNDATED = new Set(SLUGS.slice(6))

const list = (page: Page) => page.locator('[data-section="projects"]')
const rows = (page: Page) => list(page).locator('a[data-project]')
const isMobile = (page: Page) => page.viewportSize()!.width < 768
const rect = (l: Locator) => l.evaluate((el) => el.getBoundingClientRect().toJSON() as DOMRect)

/** Leva a linha ao meio da tela e espera as fontes (as posições mudam quando elas chegam). */
async function bring(page: Page, row: Locator, at = 0.5) {
  await row.evaluate(async (el, at) => {
    await document.fonts.ready
    const r = el.getBoundingClientRect()
    scrollBy(0, r.top + r.height / 2 - innerHeight * at)
  }, at)
  await page.waitForTimeout(150)
}

test('doze linhas, cada uma um link com nome, rótulo e miniatura', async ({ page }) => {
  await page.goto('/')
  await expect(rows(page)).toHaveCount(12)
  for (const [i, slug] of SLUGS.entries()) {
    const row = rows(page).nth(i)
    await expect(row).toHaveAttribute('data-project', slug)
    await expect(row).toHaveAttribute('href', `/projetos/${slug}`)
    await expect(row.locator('.plist-name')).not.toBeEmpty()
    await expect(row.locator('.plist-thumb img')).toHaveCount(1)
    const label = (await row.locator('.plist-label').innerText()).trim()
    if (UNDATED.has(slug)) expect(label).toMatch(/^[^\d·]+$/)
    else expect(label).toMatch(/^.+ · \d{4}$/)
    expect((await rect(row)).height).toBeGreaterThanOrEqual(44)
  }
})

test('duas colunas no desktop, uma no celular', async ({ page }) => {
  await page.goto('/')
  const lefts = new Set<number>()
  for (const row of await rows(page).all()) lefts.add(Math.round((await rect(row)).left))
  expect(lefts.size).toBe(isMobile(page) ? 1 : 2)
})

test('no desktop, a miniatura vai até o cursor, cresce e volta ao sair', async ({ page }) => {
  test.skip(isMobile(page), 'só no desktop')
  await page.goto('/')
  const row = rows(page).nth(1)
  const thumb = row.locator('.plist-thumb')
  await bring(page, row)
  const r = await rect(row)
  const cx = r.left + r.width * 0.3
  const cy = r.top + r.height / 2
  await page.mouse.move(cx, cy)
  await page.mouse.move(cx + 10, cy)
  await expect.poll(async () => (await rect(thumb)).width).toBeGreaterThan(300)
  await expect
    .poll(async () => {
      const t = await rect(thumb)
      const dx = Math.max(t.left - (cx + 10), 0, cx + 10 - t.right)
      const dy = Math.max(t.top - cy, 0, cy - t.bottom)
      return Math.hypot(dx, dy)
    })
    .toBeLessThan(200)
  await page.mouse.move(r.left + r.width / 2, 5)
  await expect.poll(async () => (await rect(thumb)).width).toBeLessThan(90)
})

test('no desktop, com o cursor na borda direita e embaixo, a miniatura não sai da janela', async ({ page }) => {
  test.skip(isMobile(page), 'só no desktop')
  await page.goto('/')
  const row = rows(page).nth(6) // primeira da coluna da direita
  const thumb = row.locator('.plist-thumb')
  await bring(page, row, 0.95)
  const r = await rect(row)
  const { width, height } = page.viewportSize()!
  await page.mouse.move(r.right - 2, r.bottom - 2)
  await page.mouse.move(r.right - 1, r.bottom - 1)
  await expect.poll(async () => (await rect(thumb)).width).toBeGreaterThan(300)
  await page.waitForTimeout(700)
  const t = await rect(thumb)
  expect(t.right).toBeLessThanOrEqual(width)
  expect(t.bottom).toBeLessThanOrEqual(height)
})

test('no desktop, com foco por teclado a miniatura cresce no lugar', async ({ page }) => {
  test.skip(isMobile(page), 'só no desktop')
  await page.goto('/')
  await bring(page, rows(page).nth(3), 0.7)
  const row = rows(page).nth(3)
  const thumb = row.locator('.plist-thumb')
  const rest = await rect(thumb)
  await rows(page).nth(2).focus()
  await page.keyboard.press('Tab')
  await expect(row).toBeFocused()
  await expect.poll(async () => (await rect(thumb)).width).toBeGreaterThan(300)
  await page.waitForTimeout(500)
  const big = await rect(thumb)
  // Cresce no lugar: o canto à direita fica alinhado e o cartão assenta na borda de cima da linha, sem cobrir o nome.
  const r = await rect(row)
  expect(Math.abs(big.right - rest.right)).toBeLessThan(3)
  expect(Math.abs(big.bottom - r.top)).toBeLessThan(3)
})

test('no celular, rolando, no máximo uma linha fica em foco por vez', async ({ page }) => {
  test.skip(!isMobile(page), 'só no celular')
  await page.goto('/')
  const first = rows(page).first()
  await bring(page, first)
  let seen = 0
  for (let i = 0; i < 14; i++) {
    await page.mouse.wheel(0, 90)
    await page.waitForTimeout(120)
    const focused = list(page).locator('a[data-focus="true"]')
    const n = await focused.count()
    expect(n).toBeLessThanOrEqual(1)
    if (n === 1) {
      seen++
      const r = await rect(focused)
      const mid = page.viewportSize()!.height / 2
      expect(r.top - 2).toBeLessThanOrEqual(mid)
      expect(r.bottom + 2).toBeGreaterThanOrEqual(mid)
    }
  }
  expect(seen).toBeGreaterThan(5)
})
