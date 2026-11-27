import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onRevert, type Scene } from './scene'

/**
 * Lista dos outros projetos. Com cursor no desktop, a miniatura de cada linha vai até o cursor, cresce e o segue;
 * no foco por teclado cresce no lugar. No celular, a linha que cruza o meio da tela fica em foco, uma por vez.
 */
export const list: Scene = (root, c) => {
  const section = root.querySelector<HTMLElement>('[data-section="projects"]')
  if (!section) return
  const rows = [...section.querySelectorAll<HTMLElement>('.plist-row')]

  if (c.mobile) {
    for (const row of rows) {
      ScrollTrigger.create({
        trigger: row,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => (row.dataset.focus = String(self.isActive)),
      })
    }
    onRevert(() => rows.forEach((row) => delete row.dataset.focus))
    return
  }
  if (!c.cursor) return

  section.dataset.follow = ''
  const thumbs = rows.map((row) => row.querySelector<HTMLElement>('.plist-thumb')!)
  // Repete o CSS (--big: min(34vw, 420px)) e a margem acima do rótulo.
  const big = () => Math.min(innerWidth * 0.34, 420)
  const rest = () => parseFloat(getComputedStyle(section).getPropertyValue('--tw')) / big()
  const GAP = 6
  const EDGE = 16
  const TILT = 5
  // Girando no canto de baixo à direita, o cartão passa da caixa em até h·sen(TILT) à direita e w·sen(TILT) embaixo.
  const lean = Math.sin((TILT * Math.PI) / 180)
  gsap.set(thumbs, { scale: rest() })

  const off: (() => void)[] = []
  const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement | Window, type: K, fn: (e: HTMLElementEventMap[K]) => void) => {
    el.addEventListener(type, fn as EventListener)
    off.push(() => el.removeEventListener(type, fn as EventListener))
  }

  rows.forEach((row, i) => {
    const th = thumbs[i]
    const meta = row.querySelector<HTMLElement>('.plist-meta')!
    const x = gsap.quickTo(th, 'x', { duration: 0.5, ease: 'power3' })
    const y = gsap.quickTo(th, 'y', { duration: 0.5, ease: 'power3' })
    const grow = (rotate: number) => gsap.to(th, { scale: 1, rotate, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
    const shrink = () => {
      x(0)
      y(0)
      gsap.to(th, { scale: rest(), rotate: 0, duration: 0.4, ease: 'power3.inOut', overwrite: 'auto' })
    }
    // A caixa sem transformação: canto de baixo à direita sobre o rótulo. O destino fica dentro da janela.
    const follow = (e: MouseEvent) => {
      const m = meta.getBoundingClientRect()
      const w = big()
      const h = (w * 9) / 16
      const left = Math.max(EDGE, Math.min(e.clientX + 24, innerWidth - w - h * lean - EDGE))
      const top = Math.max(EDGE, Math.min(e.clientY - 120, innerHeight - h - w * lean - EDGE))
      x(left - (m.right - w))
      y(top - (m.top - GAP - h))
    }
    on(row, 'mouseenter', (e) => {
      follow(e)
      grow(gsap.utils.random(-TILT, TILT))
    })
    on(row, 'mousemove', follow)
    // Foco por teclado: cresce no lugar, a partir do canto à direita, mas sobe até a borda de cima da linha para não cobrir o nome.
    const raise = () => {
      x(0)
      y(row.getBoundingClientRect().top - (meta.getBoundingClientRect().top - GAP))
      grow(0)
    }
    on(row, 'mouseleave', () => (row.matches(':focus-visible') ? raise() : shrink()))
    on(row, 'focus', () => row.matches(':focus-visible') && !row.matches(':hover') && raise())
    on(row, 'blur', () => row.matches(':hover') || shrink())
  })
  on(window, 'resize', () => thumbs.forEach((th, i) => rows[i].matches(':hover, :focus-visible') || gsap.set(th, { scale: rest() })))

  onRevert(() => {
    off.forEach((fn) => fn())
    gsap.killTweensOf(thumbs)
    gsap.set(thumbs, { clearProps: 'transform' })
    delete section.dataset.follow
  })
}
