import { expect, test } from '@playwright/test'

// Cada projeto do Playwright já roda em 1440 e em 390; aqui entram os três idiomas.
for (const path of ['/', '/en', '/es']) {
  test(`${path}: toda frase [data-fit] cabe na largura`, async ({ page }) => {
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    const report = await page.evaluate(() => ({
      count: document.querySelectorAll('[data-fit]').length,
      bad: [...document.querySelectorAll<HTMLElement>('[data-fit]')]
        .filter((el) => {
          const box = el.getBoundingClientRect()
          return el.scrollWidth > el.clientWidth + 1 || box.left < -1 || box.right > innerWidth + 1
        })
        .map((el) => el.outerHTML.slice(0, 80)),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }))
    expect(report.count).toBeGreaterThan(0)
    expect(report.bad).toEqual([])
    expect(report.overflow).toBe(0)
  })

  test(`${path}: nenhuma linha da frase do Sobre é uma palavra curta sozinha`, async ({ page }) => {
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    // Agrupa as palavras da cópia visível pela linha em que caem (topo do retângulo da palavra).
    const lines = await page.locator('.about-sentence [aria-hidden="true"]').evaluate((root) => {
      const rows = new Map<number, string[]>()
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        for (const match of node.textContent!.matchAll(/\S+/g)) {
          const range = document.createRange()
          range.setStart(node, match.index!)
          range.setEnd(node, match.index! + match[0].length)
          const top = Math.round(range.getClientRects()[0].top / 8)
          rows.set(top, [...(rows.get(top) ?? []), match[0]])
        }
      }
      return [...rows.values()].map((words) => words.join(' '))
    })
    expect(lines.length).toBeGreaterThan(1)
    const lonely = lines.filter((line) => !line.includes(' ') && line.replace(/[.,]/g, '').length <= 4)
    expect(lonely, lines.join(' | ')).toEqual([])
  })
}
