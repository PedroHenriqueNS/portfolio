import { expect, test } from '@playwright/test'

const RESUME_HREF = { '/': /curriculo_PedroHenrique\.pdf$/, '/en': /resume_PedroHenrique_EN\.pdf$/, '/es': /resume_PedroHenrique_EN\.pdf$/ }

for (const [path, href] of Object.entries(RESUME_HREF)) {
  test(`${path}: hero com o nome e três ações, a primeira o currículo do idioma`, async ({ page }) => {
    await page.goto(path)
    const h1 = page.locator('[data-section="hero"] h1')
    await expect(h1).toContainText('Pedro')
    await expect(h1).toContainText('Henrique')
    const actions = page.locator('[data-section="hero"] [data-action]')
    await expect(actions).toHaveCount(3)
    await expect(actions.first()).toHaveAttribute('href', href)
  })
}

test('o nome é visível no primeiro quadro, sem esperar o script', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit' })
  const h1 = page.locator('[data-section="hero"] h1')
  await expect(h1).toBeVisible()
  expect(await h1.evaluate((el) => el.textContent!.replace(/\s+/g, ' ').trim())).toBe('Pedro Henrique')
})

test('a frase do Sobre traz os números e o Linkeza, sem commits', async ({ page }) => {
  await page.goto('/')
  const text = await page.locator('[data-section="about"] [data-fit]').textContent()
  for (const part of ['5+ anos', '10+ apps', 'milhares de usuários', 'Linkeza']) expect(text).toContain(part)
  expect(text).not.toContain('commits')
})

test('os três chips de formação abrem o detalhe com Enter', async ({ page }) => {
  await page.goto('/')
  const chips = page.locator('[data-section="about"] button[popovertarget]')
  await expect(chips).toHaveCount(3)
  for (let i = 0; i < 3; i++) {
    const chip = chips.nth(i)
    const tip = page.locator(`#${await chip.getAttribute('popovertarget')}`)
    await expect(tip).toHaveAttribute('popover')
    await expect(tip).toBeHidden()
    await chip.focus()
    await page.keyboard.press('Enter')
    await expect(tip).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(tip).toBeHidden()
  }
})

test('a seção Sobre fica presa só no desktop', async ({ page }) => {
  await page.goto('/')
  const width = page.viewportSize()!.width
  await expect(page.locator('.pin-spacer > [data-section="about"]')).toHaveCount(width >= 768 ? 1 : 0)
})

test('no celular as três ações do hero têm 44 px ou mais', async ({ page }) => {
  test.skip(page.viewportSize()!.width >= 768, 'só no celular')
  await page.goto('/')
  const actions = page.locator('[data-section="hero"] [data-action]')
  await expect(actions).toHaveCount(3)
  for (const action of await actions.all()) {
    expect((await action.boundingBox())!.height).toBeGreaterThanOrEqual(44)
  }
})

test('o fundo não captura o ponteiro', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.fx-bg')).toHaveCSS('pointer-events', 'none')
})

test('o cabeçalho some ao rolar para baixo e volta ao rolar para cima', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('load')
  const header = page.locator('body > header')
  const bottom = () => header.evaluate((el) => el.getBoundingClientRect().bottom)
  await page.mouse.move(200, 400)
  await page.mouse.wheel(0, 600)
  await expect.poll(bottom).toBeLessThanOrEqual(0)
  await page.mouse.wheel(0, -100)
  await expect.poll(bottom).toBeGreaterThan(0)
})

test('o cabeçalho escondido volta quando recebe o foco', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('load')
  const header = page.locator('body > header')
  await page.mouse.move(200, 400)
  await page.mouse.wheel(0, 600)
  await expect.poll(() => header.evaluate((el) => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(0)
  await header.locator('a').first().focus()
  await expect.poll(() => header.evaluate((el) => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0)
})
