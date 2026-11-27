import { expect, test, type Page } from '@playwright/test'

const section = (page: Page) => page.locator('[data-section="contact"]')
const isMobile = (page: Page) => page.viewportSize()!.width < 768

// Destinos de old/src/components/Contacts.tsx.
const LINKS = [
  'https://api.whatsapp.com/send?phone=5511970168417',
  'mailto:pedrohe.contato@gmail.com',
  'https://www.linkedin.com/in/PedroHenriqueNS/',
  'https://www.github.com/PedroHenriqueNS',
]

const toEnd = (page: Page) =>
  page.evaluate(async () => {
    await document.fonts.ready
    // Desce em passos, como um visitante: os gatilhos scrub acompanham o caminho até o fim.
    for (let y = scrollY; y < document.documentElement.scrollHeight; y += innerHeight / 2) {
      scrollTo(0, y)
      await new Promise((r) => requestAnimationFrame(r))
    }
    scrollTo(0, document.documentElement.scrollHeight)
  })

test('quatro links de contato, na ordem, com 44 px ou mais (56 px e largura toda no celular)', async ({ page }) => {
  await page.goto('/')
  const links = section(page).locator('a[data-contact]')
  await expect(links).toHaveCount(4)
  for (const [i, href] of LINKS.entries()) await expect(links.nth(i)).toHaveAttribute('href', href)
  const list = await section(page).locator('.ct-links').evaluate((el) => el.getBoundingClientRect().width)
  for (const link of await links.all()) {
    const box = (await link.boundingBox())!
    expect(box.height).toBeGreaterThanOrEqual(44)
    if (isMobile(page)) {
      expect(Math.round(box.height)).toBe(56)
      expect(box.width).toBeGreaterThanOrEqual(list - 1)
    }
  }
})

test('o rodapé tem os dois currículos e a linha do ano', async ({ page }) => {
  await page.goto('/')
  const footer = section(page).locator('footer')
  await expect(footer.locator('a[type="application/pdf"]')).toHaveCount(2)
  await expect(footer.locator('a[href="/curriculo_PedroHenrique.pdf"]')).toHaveCount(1)
  await expect(footer.locator('a[href="/resume_PedroHenrique_EN.pdf"]')).toHaveCount(1)
  await expect(footer).toContainText(String(new Date().getFullYear()))
})

for (const [scheme, color] of [
  ['light', 'rgb(6, 10, 34)'],
  ['dark', 'rgb(3, 5, 26)'],
] as const) {
  test(`fundo do fecho no tema ${scheme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await page.goto('/')
    await expect(section(page)).toHaveCSS('background-color', color)
  })
}

test('no fim da página o título termina nítido, com contraste ≥ 4,5, e o cabeçalho fica fora', async ({ page }) => {
  await page.goto('/')
  await toEnd(page)
  const title = section(page).locator('h2')
  await expect.poll(() => title.evaluate((el) => getComputedStyle(el).opacity)).toBe('1')
  await expect.poll(() => title.evaluate((el) => getComputedStyle(el).filter)).toMatch(/^(none|blur\(0px\))$/)

  const ratio = await title.evaluate((el) => {
    const rgb = (c: string) => c.match(/\d+(\.\d+)?/g)!.slice(0, 3).map(Number)
    const lum = (c: string) => {
      const [r, g, b] = rgb(c).map((v) => {
        const s = v / 255
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    const a = lum(getComputedStyle(el).color)
    const b = lum(getComputedStyle(el.closest('section')!).backgroundColor)
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
  })
  expect(ratio).toBeGreaterThanOrEqual(4.5)

  // Subir um pouco traria o cabeçalho de volta; com o fecho ainda cobrindo a faixa de cima, ele continua fora.
  const header = page.locator('body > header')
  await page.mouse.wheel(0, -40)
  await page.waitForTimeout(600)
  expect(await header.evaluate((el) => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(1)
})
