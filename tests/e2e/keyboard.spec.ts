import { expect, test, type Page } from '@playwright/test'

/** O que o foco atual mostra, depois que a página para de rolar e de se mexer sobre ele. */
type Stop = { id: string; outline: boolean; inside: boolean; onTop: boolean }

/** Espera o scroll e a caixa do foco ficarem parados por dois quadros seguidos (sem espera fixa); diz se parou. */
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
    return still >= 2
  })

/** A parada atual; null quando o foco está no body (ninguém focado ou foco fora do documento). */
const inspect = (page: Page) =>
  page.evaluate((): Stop | null => {
    const el = document.activeElement as HTMLElement | null
    if (!el || el === document.body) return null
    const cs = getComputedStyle(el)
    // O contorno do foco é o outline (global.css e as seções); sombra decorativa não conta. Cor com alfa > 0.
    const rgba = cs.outlineColor.match(/[\d.]+%?/g) ?? []
    const alpha = cs.outlineColor === 'transparent' ? 0 : rgba.length > 3 ? parseFloat(rgba[3]) / (rgba[3].endsWith('%') ? 100 : 1) : 1
    const outline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 1 && alpha > 0
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

/** O elemento focado é o último da ordem de Tab do documento (nenhum focável visível depois dele). */
const isLastTabbable = (page: Page, id: string) =>
  page.evaluate((n) => {
    const w = window as unknown as { __kb: WeakMap<Element, number> }
    const all = [...document.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), summary, input, select, textarea, [tabindex]')]
      .filter((el) => el.tabIndex >= 0 && el.checkVisibility() && !el.closest('[inert], [aria-hidden="true"]'))
    const prev = all.find((el) => w.__kb.get(el) === n)
    return !!prev && all.indexOf(prev) === all.length - 1
  }, parseInt(id))

/**
 * Tab do começo ao fim da home. O fim vale só de dois jeitos: o foco volta ao primeiro elemento (o navegador deu a
 * volta), ou sai do documento (body focado) logo depois do último focável, e o Tab seguinte o traz de volta ao
 * primeiro. Body focado em qualquer outro ponto (foco perdido no meio) é falha.
 */
async function walk(page: Page) {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const stops: Stop[] = []
  let first: string | undefined
  const tab = async () => {
    await page.keyboard.press('Tab')
    expect(await settle(page), `o scroll não parou depois do Tab ${stops.length + 1}`).toBe(true)
    return inspect(page)
  }
  for (let i = 0; i < 400; i++) {
    const stop = await tab()
    if (stop && stop.id === first) return stops
    if (!stop) {
      const last = stops.at(-1)
      expect(last, 'o primeiro Tab não focou nada').toBeDefined()
      expect(await isLastTabbable(page, last!.id), `o foco se perdeu (body) depois de ${last!.id}`).toBe(true)
      // Fora do documento (interface do navegador): até dois Tabs para voltar à página, e tem de ser pelo começo.
      let back = await tab()
      if (!back) back = await tab()
      expect(back?.id, 'depois do fim, o Tab volta ao primeiro elemento').toBe(first)
      return stops
    }
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
