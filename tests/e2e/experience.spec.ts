import { expect, test, type Page } from '@playwright/test'

const section = (page: Page) => page.locator('[data-section="experience"]')
const isMobile = (page: Page) => page.viewportSize()!.width < 768

/** O elemento no centro do foco é ele mesmo ou um filho: nada o cobre. */
const focusOnTop = (page: Page) =>
  page.evaluate(() => {
    const el = document.activeElement as HTMLElement
    const r = el.getBoundingClientRect()
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
    return !!hit && el.contains(hit)
  })

test('cinco entradas, uma atual', async ({ page }) => {
  await page.goto('/')
  await expect(section(page).locator('.xp-year')).toHaveText(['2026', '2026', '2025', '2023', '2021'])
  await expect(section(page).locator('.xp-now')).toHaveCount(1)
  await expect(section(page).locator('.xp-now')).toHaveText('atual')
})

test('no desktop, Enter numa entrada revela o resumo e a stack sem mudar a altura da página', async ({ page }) => {
  test.skip(isMobile(page), 'só no desktop')
  await page.goto('/')
  await expect(page.locator('.pin-spacer:has([data-section="experience"])')).toHaveCount(1)
  const item = section(page).locator('.xp-item').nth(1)
  const toggle = item.locator('.xp-toggle')
  const more = item.locator('.xp-more')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(more).toBeHidden()

  // Dentro do pin: rola até o meio do trilho.
  const top = await section(page).evaluate((el) => el.closest('.pin-spacer')!.getBoundingClientRect().top + scrollY)
  await page.evaluate((y) => scrollTo(0, y + 300), top)
  const height = await page.evaluate(() => document.documentElement.scrollHeight)

  await toggle.focus()
  await page.keyboard.press('Enter')
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(more).toBeVisible()
  await expect(more.locator('.xp-summary')).not.toBeEmpty()
  expect(await more.locator('.xp-stack img').count()).toBeGreaterThan(0)
  const after = await page.evaluate(() => document.documentElement.scrollHeight)
  expect(Math.abs(after - height)).toBeLessThanOrEqual(1)
})

test('no desktop, as entradas já pintam fechadas, sem animar o fechamento na carga', async ({ page }) => {
  test.skip(isMobile(page), 'só no desktop')
  await page.addInitScript(() => {
    const w = window as unknown as { __xpRuns: number }
    w.__xpRuns = 0
    document.addEventListener('transitionrun', (e) => (e.target as Element).matches('.xp-more, .xp-toggle svg') && w.__xpRuns++)
  })
  await page.goto('/')
  await expect(section(page).locator('.xp-toggle').first()).toHaveAttribute('aria-expanded', 'false')
  await page.waitForTimeout(400)
  expect(await page.evaluate(() => (window as unknown as { __xpRuns: number }).__xpRuns)).toBe(0)
})

test.describe('sem JavaScript', () => {
  test.use({ javaScriptEnabled: false })
  test('no celular, o resumo e a stack aparecem na folha', async ({ page }) => {
    test.skip(!isMobile(page), 'só no celular')
    await page.goto('/')
    const summaries = section(page).locator('.xp-more .xp-summary')
    await expect(summaries).toHaveCount(5)
    for (const s of await summaries.all()) await expect(s).toBeVisible()
    await expect(section(page).locator('.xp-more .xp-stack').first()).toBeVisible()
    await expect(section(page).locator('.xp-open').first()).toBeHidden()
  })
})

test('no celular, o botão da folha abre a gaveta e Esc devolve o foco', async ({ page }) => {
  test.skip(!isMobile(page), 'só no celular')
  await page.goto('/')
  const open = section(page).locator('.xp-open').first()
  await open.click()
  const drawer = page.locator('dialog[data-drawer][open]')
  await expect(drawer).toHaveCount(1)
  await expect(drawer.locator('.xp-summary')).not.toBeEmpty()
  expect(await page.evaluate(() => !!document.activeElement?.closest('dialog[data-drawer]'))).toBe(true)
  await page.keyboard.press('Escape')
  await expect(page.locator('dialog[data-drawer][open]')).toHaveCount(0)
  await expect(open).toBeFocused()
})

test('no celular, Tab e Shift+Tab nunca param atrás de outra folha', async ({ page }) => {
  test.skip(!isMobile(page), 'só no celular')
  await page.goto('/')
  await page.waitForLoadState('load')
  const buttons = section(page).locator('.xp-open')
  const n = await buttons.count()
  await buttons.first().focus()
  for (const key of ['Tab', 'Shift+Tab']) {
    for (let i = 1; i < n; i++) {
      await page.keyboard.press(key)
      await expect(buttons.nth(key === 'Tab' ? i : n - 1 - i)).toBeFocused()
      await expect.poll(() => focusOnTop(page), `${key} ${i}`).toBe(true)
    }
  }
})
