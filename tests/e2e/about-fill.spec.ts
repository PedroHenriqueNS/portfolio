import { expect, test, type Page } from '@playwright/test'

const isMobile = (page: Page) => page.viewportSize()!.width < 768

/** Opacidade computada de cada palavra da frase, na ordem do texto. */
const opacities = (page: Page) =>
  page.locator('.about-sentence .w').evaluateAll((els) => els.map((el) => parseFloat(getComputedStyle(el).opacity)))

/** Rola até a fração `p` do trecho de preenchimento e espera o scrub assentar. */
async function scrollToFill(page: Page, p: number) {
  const y = await page.evaluate(
    ([p, mobile]) => {
      const section = document.querySelector<HTMLElement>('[data-section="about"]')!
      if (!mobile) {
        // Desktop: o trecho preso vai de top top até +130% da janela.
        const spacer = section.closest<HTMLElement>('.pin-spacer')!
        return spacer.getBoundingClientRect().top + scrollY + p * 1.3 * innerHeight
      }
      // Celular: p = 0.5 põe a frase no centro da tela; p = 1 leva o fim da frase bem acima do fim do trecho.
      const s = document.querySelector<HTMLElement>('.about-sentence')!.getBoundingClientRect()
      const center = s.top + scrollY + s.height / 2 - innerHeight / 2
      return p < 1 ? center : s.bottom + scrollY - innerHeight * 0.3
    },
    [p, isMobile(page)] as const,
  )
  await page.evaluate((y) => scrollTo(0, y), y)
  await page.waitForTimeout(900)
}

test('a frase do Sobre tem uma frente de leitura nítida', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html.motion')).toHaveCount(1)

  await scrollToFill(page, 0.5)
  const mid = await opacities(page)
  const moving = mid.filter((o) => o > 0.15 && o < 0.9)
  expect(moving.length, `em transição: ${moving.join(', ')}`).toBeLessThanOrEqual(2)
  const lastRead = mid.map((o) => o >= 0.99).lastIndexOf(true)
  const firstUnread = mid.findIndex((o) => o <= 0.09)
  expect(lastRead).toBeGreaterThanOrEqual(0)
  expect(firstUnread).toBeGreaterThanOrEqual(0)
  expect(firstUnread).toBeGreaterThan(lastRead)

  await scrollToFill(page, 1)
  for (const o of await opacities(page)) expect(o).toBeGreaterThanOrEqual(0.99)
})
