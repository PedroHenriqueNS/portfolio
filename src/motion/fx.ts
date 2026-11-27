import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onRevert, type Scene } from './index'

/** Névoa que troca de lugar a cada 1,2 tela, luz do cursor e cabeçalho que some ao descer. */
export const fx: Scene = (root, c) => {
  const mists = [...root.querySelectorAll<HTMLElement>('.fx-bg .mist')]
  const zoneOf = () => Math.floor(scrollY / innerHeight / 1.2)
  // Começa na zona atual sem sortear: as manchas não voam na primeira pintura.
  let zone = zoneOf()
  if (mists.length) {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate() {
        const z = zoneOf()
        if (z === zone) return
        zone = z
        for (const n of mists)
          gsap.to(n, {
            x: gsap.utils.random(-18, 18) + 'vw',
            y: gsap.utils.random(-16, 16) + 'vh',
            rotate: gsap.utils.random(-60, 60),
            scaleX: gsap.utils.random(0.75, 1.3),
            scaleY: gsap.utils.random(0.75, 1.3),
            duration: 2.4,
            ease: 'power2.inOut',
            overwrite: true,
          })
      },
    })
    onRevert(() => gsap.set(mists, { clearProps: 'transform' }))
  }

  const light = root.querySelector<HTMLElement>('.luz-cursor')
  if (light && c.cursor) {
    const x = gsap.quickTo(light, 'x', { duration: 0.8, ease: 'power3' })
    const y = gsap.quickTo(light, 'y', { duration: 0.8, ease: 'power3' })
    let shown = false
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (!shown) {
        shown = true
        gsap.set(light, { x: e.clientX, y: e.clientY })
        gsap.to(light, { opacity: 1, duration: 0.6 })
      }
      x(e.clientX)
      y(e.clientY)
    }
    addEventListener('pointermove', move)
    onRevert(() => {
      removeEventListener('pointermove', move)
      gsap.killTweensOf(light)
      gsap.set(light, { clearProps: 'all' })
    })
  }

  const header = root.querySelector<HTMLElement>(':scope > header')
  if (header) {
    let hidden = false
    let last = scrollY
    const show = (on: boolean) => {
      if (hidden === !on) return
      hidden = !on
      gsap.to(header, { yPercent: on ? 0 : -100, duration: on ? 0.35 : 0.3, ease: on ? 'power3.out' : 'power2.in', overwrite: true })
    }
    // shortcut: um salto maior que a tela (âncora, tecla End) conta como navegação e mantém o cabeçalho; trocar por um sinal de interação real se incomodar.
    const onScroll = () => {
      const d = scrollY - last
      last = scrollY
      if (Math.abs(d) > innerHeight) show(true)
      else if (d > 0 && scrollY > header.offsetHeight) show(false)
      else if (d < 0) show(true)
    }
    const onFocus = () => show(true)
    addEventListener('scroll', onScroll, { passive: true })
    header.addEventListener('focusin', onFocus)
    onRevert(() => {
      removeEventListener('scroll', onScroll)
      header.removeEventListener('focusin', onFocus)
      gsap.killTweensOf(header)
      gsap.set(header, { clearProps: 'transform' })
    })
  }
}
