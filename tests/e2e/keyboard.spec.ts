import { expect, test, type Page } from '@playwright/test'

/** O que o foco atual mostra, depois que a página para de rolar e de se mexer sobre ele. */
type Stop = { id: string; outline: boolean; inside: boolean; onTop: boolean }

/** Espera o scroll e a caixa do foco ficarem parados por dois quadros seguidos (sem espera fixa). */
const settle = (page: Page) =>
  page.evaluate(async () => {
    const frame = () => new Promise(requestAnimationFrame)
    const read = () => {
      const r = document.activeElement?.getBoundingClientRect()
      return `${scrollY}|${r?.top}|${r?.left}`
    }
    let last = read()
    let still = 0
    for (let i = 0; i < 240 && still < 2; i++) {
      await frame()
      const now = read()
      still = now === last ? still + 1 : 0
      last = now
    }
  })

const inspect = (page: Page) =>
  page.evaluate((): Stop | null => {
    const el = document.activeElement as HTMLElement | null
    if (!el || el === document.body) return null
    const cs = getComputedStyle(el)
    const outline = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 1) || cs.boxShadow !== 'none'
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const inside = r.width > 0 && r.height > 0 && r.left >= -1 && r.right <= innerWidth + 1 && r.top >= -1 && r.bottom <= innerHeight + 1
    const hit = document.elementFromPoint(cx, cy)
    // Número de série por elemento (dois botões iguais são paradas diferentes) e uma descrição legível.
    const w = window as unknown as { __kb?: WeakMap<Element, number>; __kbN?: number }
    w.__kb ??= new WeakMap()
    if (!w.__kb.has(el)) w.__kb.set(el, (w.__kbN = (w.__kbN ?? 0) + 1))
    const where = el.closest('[data-section]')?.getAttribute('data-section') ?? el.closest('header, main, footer')?.tagName.toLowerCase() ?? '?'
    const href = el.getAttribute('href')
    const id = `${w.__kb.get(el)} ${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ''}${href ? `[href="${href}"]` : ''} @${where}`
    return { id, outline, inside, onTop: !!hit && (el === hit || el.contains(hit)) }
  })

/** Tab do começo ao fim da home; para quando o foco volta ao primeiro elemento ou sai do documento. */
async function walk(page: Page) {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const stops: Stop[] = []
  let first: string | undefined
  for (let i = 0; i < 400; i++) {
    await page.keyboard.press('Tab')
    await settle(page)
    const stop = await inspect(page)
    if (!stop || stop.id === first) return stops
    first ??= stop.id
    // Preso: o mesmo elemento duas vezes seguidas.
    expect(stop.id, `foco preso em ${stop.id}`).not.toBe(stops.at(-1)?.id)
    stops.push(stop)
  }
  throw new Error(`o foco não chegou ao fim da página em 400 Tabs; último: ${stops.at(-1)?.id}`)
}

function check(stops: Stop[]) {
  expect(stops.length, 'a home tem elementos focáveis').toBeGreaterThan(10)
  expect(stops[0].id, 'o primeiro Tab cai no atalho para o conteúdo').toContain('[href="#main"]')
  const bad = stops.filter((s) => !s.outline || !s.inside || !s.onTop)
  expect(bad, 'foco sem contorno, fora da janela ou coberto').toEqual([])
}

test('Tab percorre a home inteira: foco visível, na janela, por cima, sem ficar preso', async ({ page }) => {
  test.setTimeout(180_000)
  check(await walk(page))
})

test.describe('com movimento reduzido', () => {
  test.use({ reducedMotion: 'reduce' })
  test('Tab percorre a home inteira do mesmo jeito', async ({ page }) => {
    test.setTimeout(180_000)
    check(await walk(page))
  })
})
