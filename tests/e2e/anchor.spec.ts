import { expect, test } from '@playwright/test'
import { expectSectionAtTop } from './anchor'

test('o link de voltar da página do projeto leva à lista de projetos da home', async ({ page }) => {
  await page.goto('/projetos/linkeza')
  await page.locator('a.pp-back').click()
  await expect(page).toHaveURL(/\/#projects$/)
  await expectSectionAtTop(page, 'projects')
})

test('a carga direta de /#projects para na lista de projetos', async ({ page }) => {
  await page.goto('/#projects')
  await expectSectionAtTop(page, 'projects')
})
