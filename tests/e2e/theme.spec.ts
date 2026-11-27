import { expect, test } from '@playwright/test'

test('o tema alterna, nunca deixa o fundo transparente e sobrevive ao reload', async ({ page }) => {
  await page.goto('/')
  const html = page.locator('html')
  const toggle = page.locator('#theme-toggle')
  const wasDark = await html.evaluate((el) => el.classList.contains('dark'))
  await expect(toggle).toHaveAttribute('aria-pressed', String(wasDark))

  await toggle.click()
  // Amostra o fundo durante o crossfade de 300 ms.
  const backgrounds = await page.evaluate(async () => {
    const seen: string[] = []
    for (let i = 0; i < 8; i++) {
      seen.push(getComputedStyle(document.body).backgroundColor)
      await new Promise((r) => setTimeout(r, 50))
    }
    return seen
  })
  for (const bg of backgrounds) expect(bg).not.toMatch(/^(transparent|rgba\(0, 0, 0, 0\))$/)
  await expect(html).toHaveClass(wasDark ? /^(?!.*\bdark\b)/ : /\bdark\b/)
  await expect(toggle).toHaveAttribute('aria-pressed', String(!wasDark))
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', wasDark ? '#EEF0F3' : '#060918')

  await page.reload()
  expect(await html.evaluate((el) => el.classList.contains('dark'))).toBe(!wasDark)
  await expect(toggle).toHaveAttribute('aria-pressed', String(!wasDark))
})

test.describe('sugestão de idioma com o navegador em inglês', () => {
  test.use({ locale: 'en-US' })
  test('aparece em /, leva a /en e, dispensada, não volta', async ({ page }) => {
    await page.goto('/')
    const suggestion = page.locator('[data-lang-suggest]')
    await expect(suggestion).toBeVisible()
    expect((await suggestion.boundingBox())!.width).toBeLessThanOrEqual(320)
    await expect(suggestion.getByRole('link', { name: 'View in English' })).toHaveAttribute('href', '/en')
    await suggestion.getByRole('button', { name: 'Not now' }).click()
    await expect(suggestion).toBeHidden()
    await page.reload()
    await expect(page.locator('[data-lang-suggest]')).toBeHidden()
  })

  for (const path of ['/', '/projetos/linkeza']) {
    test(`a pílula não cobre o primeiro link nem o h1 de ${path}`, async ({ page }) => {
      await page.goto(path)
      const pill = page.locator('[data-lang-suggest]')
      await expect(pill).toBeVisible()
      await page.waitForTimeout(500) // fim da entrada da pílula
      const a = (await pill.boundingBox())!
      for (const target of [page.locator('main a').first(), page.locator('main h1')]) {
        const b = (await target.boundingBox())!
        const overlap = a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height
        expect(overlap, `${await target.evaluate((el) => el.outerHTML.slice(0, 80))}`).toBe(false)
      }
    })
  }
})

test.describe('sugestão de idioma com o navegador em português', () => {
  test.use({ locale: 'pt-BR' })
  test('nunca aparece em /', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')
    await expect(page.locator('[data-lang-suggest]')).toBeHidden()
  })
})

test('o seletor de idioma leva à mesma seção no outro idioma', async ({ page }) => {
  await page.goto('/#contact')
  await page.locator('.lang-switch summary').click()
  await expect(page.locator('a[data-lang="es"]')).toHaveAttribute('href', '/es#contact')
  await page.locator('a[data-lang="es"]').click()
  await expect(page).toHaveURL(/\/es#contact$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
})

test('o tema escuro continua depois de uma navegação do ClientRouter', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  await page.locator('#theme-toggle').click()
  await expect(page.locator('html')).toHaveClass(/\bdark\b/)
  await page.locator('a.stage-card[data-project="linkeza"]').click()
  await expect(page).toHaveURL(/\/projetos\/linkeza$/)
  await expect(page.locator('html')).toHaveClass(/\bdark\b/)
  await expect(page.locator('#theme-toggle')).toHaveAttribute('aria-pressed', 'true')
})
