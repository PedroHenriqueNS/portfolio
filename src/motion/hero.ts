import { gsap } from 'gsap'
import type { Scene } from './scene'

/**
 * Entrada: o nome sobe entrando em foco e a foto cresce. Scroll: no desktop o nome atravessa a tela e a foto
 * sobe em paralaxe; no celular as duas linhas deslizam em sentidos opostos e a foto gira e encolhe.
 * A entrada anima a figura e o scroll anima a imagem dentro dela, para os dois nunca disputarem o mesmo transform.
 */
export const hero: Scene = (root, c) => {
  const section = root.querySelector<HTMLElement>('[data-section="hero"]')
  if (!section) return
  const name = section.querySelector<HTMLElement>('.hero-name')!
  const lines = section.querySelectorAll<HTMLElement>('.hero-line')
  const card = section.querySelector<HTMLElement>('.hero-card')!
  const photo = section.querySelector<HTMLElement>('.hero-photo')!
  const scrub = { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.4 }

  // overflow-anchor: o Firefox desloca o scroll pelo deslocamento de uma entrada se ancorar num elemento que se move.
  gsap.set([name, card], { overflowAnchor: 'none' })
  const done = (el: HTMLElement, props: string) => () => gsap.set(el, { clearProps: props })

  // Desfoque em tipo gigante é caro: curto, limpo ao terminar, e no celular só opacidade e deslocamento.
  // Nunca parte de opacidade zero: o nome é o LCP.
  gsap.from(name, {
    yPercent: 40,
    opacity: 0.15,
    filter: c.desktop ? 'blur(18px)' : 'none',
    duration: c.desktop ? 0.9 : 0.8,
    ease: 'power4.out',
    onComplete: done(name, 'filter,opacity,overflowAnchor'),
  })
  gsap.from(card, {
    scale: 0.6,
    y: 60,
    opacity: 0,
    duration: 1,
    delay: 0.15,
    ease: 'power3.out',
    onComplete: done(card, 'opacity,overflowAnchor'),
  })

  if (c.desktop) {
    gsap.to(name, { xPercent: -28, ease: 'none', scrollTrigger: scrub })
    gsap.to(photo, { yPercent: -40, ease: 'none', scrollTrigger: scrub })
  } else {
    gsap.to(lines[0], { xPercent: -45, ease: 'none', scrollTrigger: scrub })
    gsap.to(lines[1], { xPercent: 45, ease: 'none', scrollTrigger: scrub })
    gsap.to(photo, { scale: 0.7, rotate: 14, ease: 'none', scrollTrigger: scrub })
  }
}
