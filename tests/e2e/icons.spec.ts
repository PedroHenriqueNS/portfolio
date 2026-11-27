import { expect, test, type Page } from '@playwright/test'

const icon = (loc: ReturnType<Page['locator']>) => loc.locator('svg[data-icon]')

async function expectAllDecorative(page: Page) {
  const bad = await page.evaluate(() => {
    const noAria = [...document.querySelectorAll('svg[data-icon]')].filter((s) => s.getAttribute('aria-hidden') !== 'true').length
    const unnamed = [...document.querySelectorAll<HTMLElement>('a, button')]
      .filter((el) => el.offsetParent !== null || getComputedStyle(el).position === 'fixed')
      .filter((el) => !(el.getAttribute('aria-label') || el.innerText.trim() || el.textContent!.trim() || el.querySelector('img[alt]:not([alt=""])')))
      .map((el) => el.outerHTML.slice(0, 80))
    return { noAria, unnamed }
  })
  expect(bad.noAria).toBe(0)
  expect(bad.unnamed).toEqual([])
}

for (const path of ['/', '/en']) {
  test(`ícones na home ${path}`, async ({ page }) => {
    await page.goto(path)

    const actions = page.locator('[data-section="hero"] a[data-action]')
    expect(await actions.count()).toBe(3)
    for (const a of await actions.all()) await expect(icon(a)).toHaveCount(1)

    for (const chip of await page.locator('[data-section="about"] .about-edu .tip-chip').all()) await expect(icon(chip).first()).toBeAttached()
    expect(await page.locator('[data-section="about"] .about-edu .tip-chip svg[data-icon]:not([data-icon="plus"])').count()).toBe(3)

    for (const [sel, n] of [['[data-section="stage"] .stage-kind', 5], ['[data-section="projects"] .plist-label', 12]] as const) {
      const labels = await page.locator(sel).all()
      expect(labels).toHaveLength(n)
      const byKind = new Map<string, Set<string>>()
      for (const l of labels) {
        const name = (await l.locator('svg[data-icon]').first().getAttribute('data-icon'))!
        expect(name).toBeTruthy()
        const kind = (await l.innerText()).split('·')[0].trim()
        byKind.set(kind, (byKind.get(kind) ?? new Set()).add(name))
      }
      for (const set of byKind.values()) expect(set.size).toBe(1)
    }

    const groups = page.locator('[data-section="skills"] .sk-label')
    expect(await groups.count()).toBe(3)
    for (const g of await groups.all()) await expect(icon(g)).toHaveCount(1)

    const resumes = page.locator('[data-section="contact"] .ct-resume')
    expect(await resumes.count()).toBe(2)
    for (const r of await resumes.all()) await expect(icon(r)).toHaveCount(1)

    await expectAllDecorative(page)
  })
}

test('ações do hero em uma linha', async ({ page }) => {
  await page.goto('/')
  const wraps = await page.locator('[data-section="hero"] a[data-action]').evaluateAll((els) =>
    els.map((el) => {
      const tops = new Set<number>()
      for (const n of el.childNodes) {
        if (n.nodeType !== Node.TEXT_NODE || !n.textContent!.trim()) continue
        const r = document.createRange()
        r.selectNodeContents(n)
        for (const q of r.getClientRects()) if (q.width > 0) tops.add(Math.round(q.top))
      }
      return tops.size
    }),
  )
  for (const n of wraps) expect(n).toBe(1)
})

test('ícones na página do projeto', async ({ page }) => {
  await page.goto('/projetos/linkeza')
  for (const sel of ['.pp-back', '.pp-kind', '.pp-date', '.pp-action[data-link="site"]', '.pp-action[data-link="code"]', '.pp-next']) {
    await expect(icon(page.locator(sel).first()), sel).not.toHaveCount(0)
  }
  await expectAllDecorative(page)
})
