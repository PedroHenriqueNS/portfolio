import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onRevert, type Scene } from './scene'

/** Deriva própria, em px/s; o scroll soma a isso uma parte da sua velocidade. */
const DRIFT = 36
const BOOST = 0.35
const MAX_BOOST = 1400
/** Margem que um nome focado guarda das bordas da janela. */
const EDGE = 24

/**
 * Skills. Cada faixa corre em laço sem emenda (a lista de verdade e cópias aria-hidden e inertes atrás dela),
 * sentidos alternados; o scroll acelera e a faixa para fora da tela, sob o cursor e com foco num nome.
 * No celular só a faixa dos Destaques corre; os tiles da grade entram em sequência.
 */
export const skills: Scene = (root, c) => {
  const section = root.querySelector<HTMLElement>('[data-section="skills"]')
  if (!section) return
  const groups = [...section.querySelectorAll<HTMLElement>('.sk-group')]
  const bands = c.mobile ? groups.filter((g) => g.dataset.group === 'featured') : groups
  const copies: HTMLElement[] = []
  const ticks: (() => void)[] = []
  const off: (() => void)[] = []

  bands.forEach((group, i) => {
    const band = group.querySelector<HTMLElement>('.sk-band')!
    const track = group.querySelector<HTMLElement>('.sk-track')!
    const list = track.querySelector<HTMLElement>('.sk-list')!
    const dir = i % 2 ? 1 : -1

    // A cópia é só desenho: sem ids, sem popovers, fora da árvore de acessibilidade e do foco.
    const copy = list.cloneNode(true) as HTMLElement
    copy.querySelectorAll('[popover]').forEach((el) => el.remove())
    copy.querySelectorAll('[id], [popovertarget]').forEach((el) => {
      el.removeAttribute('id')
      el.removeAttribute('popovertarget')
      el.removeAttribute('style')
    })
    copy.setAttribute('aria-hidden', 'true')
    copy.inert = true
    copy.dataset.copy = ''

    let period = 0
    const measure = () => {
      period = 0
      const first = track.querySelector<HTMLElement>('[data-copy]')
      if (first) period = first.offsetLeft - list.offsetLeft
    }
    // Cópias que cubram a tela mais larga em que esta janela pode ficar, mais uma para o laço e uma de folga
    // (a medida é feita antes das fontes chegarem, e a fonte condensada encurta o período).
    track.append(copy)
    measure()
    const need = period ? Math.ceil(Math.max(screen.width, innerWidth) / period) + 1 : 1
    for (let k = 1; k < need; k++) track.append(copy.cloneNode(true))
    copies.push(...track.querySelectorAll<HTMLElement>('[data-copy]'))

    const wrap = (v: number) => (period ? gsap.utils.wrap(-period, 0, v) : 0)
    const setX = gsap.quickSetter(track, 'x', 'px') as (v: number) => void
    let x = dir > 0 ? -period / 2 : 0
    let boost = 0
    let target: number | null = null
    setX(x)

    const tick = (_t: number, dt: number) => {
      const s = Math.min(dt, 64) / 1000
      boost *= Math.pow(0.04, s) // some em ~1 s depois que o scroll para
      if (band.matches(':hover, :focus-within')) {
        // Parada; só anda para pôr inteiro na tela um nome focado.
        if (target !== null) {
          x += (target - x) * Math.min(1, s * 10)
          if (Math.abs(target - x) < 0.5) (x = target), (target = null)
          setX(x)
        }
        return
      }
      target = null
      x = wrap(x + dir * (DRIFT + boost) * s)
      setX(x)
    }
    let running = false
    const run = (on: boolean) => {
      if (on === running) return
      running = on
      if (on) gsap.ticker.add(tick)
      else gsap.ticker.remove(tick)
    }
    ticks.push(() => run(false))
    const st = ScrollTrigger.create({
      trigger: band,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => run(self.isActive),
      onUpdate: (self) => (boost = Math.max(boost, Math.min(MAX_BOOST, Math.abs(self.getVelocity()) * BOOST))),
      onRefresh: (self) => {
        measure()
        x = wrap(x)
        setX(x)
        run(self.isActive)
      },
    })
    run(st.isActive)

    // Foco num nome: a faixa para (tick) e desliza até o nome ficar inteiro na janela.
    const focus = (e: FocusEvent) => {
      const name = (e.target as Element).closest?.('.sk-name')
      if (!name) return
      const r = name.getBoundingClientRect()
      let shift = 0
      if (r.left < EDGE) shift = EDGE - r.left
      else if (r.right > innerWidth - EDGE) shift = innerWidth - EDGE - r.right
      // Só a lista de verdade recebe foco: o destino fica em [-period, 0], sem dar a volta.
      if (shift) target = Math.min(0, Math.max(-period, x + shift))
    }
    band.addEventListener('focusin', focus)
    off.push(() => band.removeEventListener('focusin', focus))
  })

  if (c.mobile) {
    for (const group of groups.filter((g) => g.dataset.group !== 'featured')) {
      gsap.from(group.querySelectorAll('.sk-item'), {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.04,
        scrollTrigger: { trigger: group.querySelector('.sk-list'), start: 'top 90%' },
      })
    }
  }

  onRevert(() => {
    ticks.forEach((stop) => stop())
    off.forEach((fn) => fn())
    copies.forEach((el) => el.remove())
    section.querySelectorAll<HTMLElement>('.sk-track').forEach((t) => gsap.set(t, { clearProps: 'transform' }))
  })
}
