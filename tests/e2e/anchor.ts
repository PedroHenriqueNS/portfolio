import { expect, type Page } from '@playwright/test'

/** O topo da seção fica dentro da janela, perto do topo (o scroll-padding-top do cabeçalho). */
export async function expectSectionAtTop(page: Page, section: string) {
  const top = () => page.locator(`[data-section="${section}"]`).evaluate((el) => el.getBoundingClientRect().top)
  await expect.poll(top, { message: `topo de [data-section="${section}"]` }).toBeGreaterThanOrEqual(0)
  await expect.poll(top).toBeLessThanOrEqual(200)
  // Os pins se montam um quadro depois: a posição tem de continuar certa depois disso.
  await page.waitForTimeout(300)
  expect(await top()).toBeGreaterThanOrEqual(0)
  expect(await top()).toBeLessThanOrEqual(200)
}
