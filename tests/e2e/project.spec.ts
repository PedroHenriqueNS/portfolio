import { expect, test } from '@playwright/test'

const CASES = [
  {
    path: '/projetos/linkeza',
    title: 'Linkeza',
    date: 'outubro de 2026',
    stack: ['TypeScript', 'Astro', 'NestJS', 'TypeORM', 'Redis', 'Clerk', 'Cloudflare'],
    next: '/projetos/je-modesto',
    site: true,
    code: true,
  },
  {
    path: '/en/projects/linkeza',
    title: 'Linkeza',
    date: 'October 2026',
    stack: ['TypeScript', 'Astro', 'NestJS', 'TypeORM', 'Redis', 'Clerk', 'Cloudflare'],
    next: '/en/projects/je-modesto',
    site: true,
    code: true,
  },
  {
    path: '/es/proyectos/clau-camargo',
    title: 'Clau Camargo 55655',
    date: 'junio de 2026',
    stack: ['React.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'TanStack Router', 'Vitest'],
    next: '/es/proyectos/wsa-marmores',
    site: false,
    code: false,
  },
  {
    // Um dos seis projetos sem data.
    path: '/projetos/cloud-barueri',
    title: 'Cloud Barueri',
    date: null,
    stack: ['React.js', 'Node.js', 'Express', 'Docker', 'MySQL'],
    next: '/projetos/snowhunter',
    site: false,
    code: false,
  },
]

for (const c of CASES) {
  test(`${c.path}: capa, título, data, textos, stack, links e próximo`, async ({ page }) => {
    await page.goto(c.path)
    const cover = page.locator('.pp-cover img')
    await expect(cover).toBeVisible()
    expect(await cover.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true)
    await expect(page.locator('h1')).toHaveText(c.title)
    if (c.date) await expect(page.locator('.pp-date time')).toHaveText(c.date)
    else await expect(page.locator('.pp-date')).toHaveCount(0)
    await expect(page.locator('.pp-summary')).not.toBeEmpty()
    expect(await page.locator('.pp-desc p').count()).toBeGreaterThan(0)
    await expect(page.locator('.pp-stack li')).toHaveText(c.stack)
    await expect(page.locator('.pp-stack li img')).toHaveCount(c.stack.length)

    await expect(page.locator('.pp-side a[data-link="site"]')).toHaveCount(c.site ? 1 : 0)
    await expect(page.locator('.pp-side a[data-link="code"]')).toHaveCount(c.code ? 1 : 0)
    // Código privado: cadeado com dica alcançável por clique (toque) e teclado.
    const lock = page.locator('.pp-private button')
    await expect(lock).toHaveCount(c.code ? 0 : 1)
    if (!c.code) {
      await lock.click()
      await expect(page.locator('.pp-private [popover]')).toBeVisible()
    }

    await expect(page.locator('a.pp-next')).toHaveAttribute('href', c.next)
  })
}

test.describe('no celular', () => {
  test.skip(({ viewport }) => viewport!.width >= 768, 'só abaixo de 768 px')

  test('barra de ações fixa só quando há link público, sem cobrir o fim da página', async ({ page }) => {
    await page.goto('/projetos/linkeza')
    const bar = page.locator('.pp-bar')
    await expect(bar).toBeVisible()
    expect(await bar.evaluate((el) => getComputedStyle(el).position)).toBe('fixed')
    await expect(bar.locator('a')).toHaveCount(2)
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight))
    const gap = await page.evaluate(() => {
      const next = document.querySelector('.pp-next')!.getBoundingClientRect()
      return document.querySelector('.pp-bar')!.getBoundingClientRect().top - next.bottom
    })
    expect(gap).toBeGreaterThanOrEqual(0)
    // A stack rola na própria linha; a página não rola de lado.
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0)

    await page.goto('/es/proyectos/clau-camargo')
    await expect(page.locator('.pp-bar')).toHaveCount(0)
  })

  test('o nome cabe em no máximo duas linhas', async ({ page }) => {
    for (const slug of ['linkeza', 'wsa-marmores', 'flavia-morando-sbc', 'gobuzz-ads-manager', 'youtube-music-clone']) {
      await page.goto(`/projetos/${slug}`)
      await page.evaluate(() => document.fonts.ready)
      const { lines, overflow } = await page.locator('h1').evaluate((h) => ({
        lines: Math.round(h.getBoundingClientRect().height / parseFloat(getComputedStyle(h).lineHeight)),
        overflow: h.scrollWidth - h.clientWidth,
      }))
      expect(lines, slug).toBeLessThanOrEqual(2)
      expect(overflow, slug).toBeLessThanOrEqual(1)
    }
  })
})
