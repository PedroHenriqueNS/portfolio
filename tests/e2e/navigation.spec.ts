import { expect, test, type Page } from '@playwright/test'

// A troca de página pelo ClientRouter não recarrega o documento: a marca posta em window sobrevive.
const mark = (page: Page) => page.evaluate(() => ((window as unknown as { __nav: number }).__nav = 1))
const marked = (page: Page) => page.evaluate(() => (window as unknown as { __nav?: number }).__nav)
// Espera a transição acabar e o scroll assentar, como uma pessoa faria antes de voltar. Voltar no meio da
// transição deixa o `scrollend` atrasado do roteador gravar 0 na entrada da home (corrida do Astro, não da página).
const settle = async (page: Page) => {
  await expect(page.locator('html')).not.toHaveAttribute('data-astro-transition')
  await page.waitForTimeout(300)
}

test.describe('no desktop', () => {
  test.skip(({ viewport }) => viewport!.width < 768, 'só no desktop')

  test('ida ao projeto e volta, três vezes: mesmo documento, 3 pins e o scroll de antes', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))
    page.on('pageerror', (err) => errors.push(err.message))
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await mark(page)
    await expect(page.locator('.pin-spacer')).toHaveCount(3)

    // O cartão do palco, depois duas linhas da lista (abaixo dos pins: a página só tem essa altura com os pins).
    const targets = [
      { link: 'a.stage-card[data-project="linkeza"]', url: /\/projetos\/linkeza$/ },
      { link: 'a.plist-row[data-project="snowhunter"]', url: /\/projetos\/snowhunter$/ },
      { link: 'a.plist-row[data-project="gobuzz-ads-manager"]', url: /\/projetos\/gobuzz-ads-manager$/ },
    ]
    for (const t of targets) {
      const link = page.locator(t.link)
      await link.scrollIntoViewIfNeeded()
      await settle(page)
      const before = await page.evaluate(() => scrollY)
      await link.click()
      await expect(page).toHaveURL(t.url)
      await expect(page.locator('.pp-cover')).toBeVisible()
      await settle(page)
      await page.goBack()
      await expect(page).toHaveURL(/\/$/)
      expect(await marked(page)).toBe(1)
      await expect(page.locator('html')).toHaveClass(/\bmotion\b/)
      await expect(page.locator('.pin-spacer')).toHaveCount(3)
      await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before - 4)
      expect(Math.abs((await page.evaluate(() => scrollY)) - before)).toBeLessThanOrEqual(4)
    }
    expect(errors).toEqual([])
  })
})

test('o cartão, a miniatura e a capa dividem o mesmo nome de transição', async ({ page }) => {
  await page.goto('/')
  const name = (sel: string) => page.locator(sel).evaluate((el) => getComputedStyle(el).viewTransitionName)
  expect(await name('a.stage-card[data-project="linkeza"]')).toBe('project-linkeza')
  expect(await name('a.plist-row[data-project="snowhunter"] .plist-thumb')).toBe('project-snowhunter')
  await page.goto('/projetos/linkeza')
  expect(await name('.pp-cover')).toBe('project-linkeza')
})

test('o seletor de idioma leva ao mesmo projeto no outro idioma', async ({ page }) => {
  await page.goto('/projetos/clau-camargo')
  await mark(page)
  await page.locator('.lang-switch summary').click()
  await page.locator('a[data-lang="en"]').click()
  await expect(page).toHaveURL(/\/en\/projects\/clau-camargo$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US')
  await expect(page.locator('h1')).toHaveText('Clau Camargo 55655')
  await page.locator('.lang-switch summary').click()
  await page.locator('a[data-lang="es"]').click()
  await expect(page).toHaveURL(/\/es\/proyectos\/clau-camargo$/)
  expect(await marked(page)).toBe(1)
})

test.describe('com movimento reduzido', () => {
  test.use({ reducedMotion: 'reduce' })
  test('a navegação ainda funciona', async ({ page }) => {
    await page.goto('/')
    await mark(page)
    await page.locator('a[data-project="linkeza"]').first().click()
    await expect(page).toHaveURL(/\/projetos\/linkeza$/)
    await expect(page.locator('h1')).toHaveText('Linkeza')
    await page.locator('a.pp-next').click()
    await expect(page).toHaveURL(/\/projetos\/je-modesto$/)
    await page.goBack()
    await page.goBack()
    await expect(page).toHaveURL(/\/$/)
    expect(await marked(page)).toBe(1)
    await expect(page.locator('.pin-spacer')).toHaveCount(0)
  })
})

for (const home of ['/', '/en', '/es']) {
  test(`os links de currículo de ${home} saem do roteador (PDF, não página)`, async ({ page }) => {
    await page.goto(home)
    const pdfs = page.locator('a[type="application/pdf"]')
    await expect(pdfs).toHaveCount(4)
    for (const a of await pdfs.all()) await expect(a).toHaveAttribute('data-astro-reload', '')
  })
}
