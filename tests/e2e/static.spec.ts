import { expect, test, type Page } from '@playwright/test'

const PAGES = ['/', '/en', '/es', '/projetos/linkeza']

/** Sem JS ou sem motion: tudo visível, em fluxo normal, sem pin e sem rolagem horizontal. */
async function expectStatic(page: Page) {
  const report = await page.evaluate(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-section]')]
    const hidden = [...document.querySelectorAll<HTMLElement>('body *')]
      .filter((el) => [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent!.trim()))
      .filter((el) => {
        const s = getComputedStyle(el)
        return s.opacity === '0' || s.visibility === 'hidden'
      })
      .map((el) => el.outerHTML.slice(0, 80))
    return {
      sections: sections.map((s) => [s.dataset.section, s.getBoundingClientRect().height]),
      hidden,
      pinSpacers: document.querySelectorAll('.pin-spacer').length,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }
  })
  for (const [name, height] of report.sections) expect(height, `altura de ${name}`).toBeGreaterThan(0)
  expect(report.hidden).toEqual([])
  expect(report.pinSpacers).toBe(0)
  expect(report.overflow).toBe(0)
  return report
}

test.describe('sem JavaScript', () => {
  test.use({ javaScriptEnabled: false })
  for (const path of PAGES) {
    test(path, async ({ page }) => {
      await page.goto(path)
      const { sections } = await expectStatic(page)
      if (path !== '/projetos/linkeza') expect(sections.map(([s]) => s)).toEqual(['hero', 'about', 'experience', 'stage', 'projects', 'skills', 'contact'])
    })
  }
})

test.describe('com movimento reduzido', () => {
  test.use({ reducedMotion: 'reduce' })
  for (const path of PAGES) {
    test(path, async ({ page }) => {
      await page.goto(path)
      await expectStatic(page)
    })
  }
})

test('uma cena que lança erro ao iniciar devolve a home ao layout estático', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))
  // A cena do palco é a quinta: as quatro de antes já ligaram pins e entradas quando ela falha.
  await page.addInitScript(() => {
    const original = Element.prototype.querySelector
    Element.prototype.querySelector = function (this: Element, selector: string) {
      if (selector === '.stage-frame') throw new Error('cena quebrada de propósito')
      return original.call(this, selector)
    } as typeof original
  })
  await page.goto('/')
  await expect(page.locator('html')).not.toHaveClass(/\bmotion\b/)
  await page.waitForTimeout(1500) // fim das entradas que tivessem ficado de pé
  await expectStatic(page)
  expect(errors.length, 'o erro vai para o console').toBeGreaterThan(0) // o Firefox mostra só "Error"
})
