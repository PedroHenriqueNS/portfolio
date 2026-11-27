import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fx } from './fx'
import { hero } from './hero'
import { about } from './about'

export interface Conditions {
  desktop: boolean
  mobile: boolean
  cursor: boolean
}
export type Scene = (root: HTMLElement, c: Conditions) => void

/** Na ordem do DOM: um gatilho criado antes de uma seção presa acima dele erra a posição. */
export const SCENES: Scene[] = [fx, hero, about]

gsap.registerPlugin(ScrollTrigger)
// A barra de endereço do celular muda a altura da janela; isso não deve recalcular as cenas.
ScrollTrigger.config({ ignoreMobileResize: true })

let mm: gsap.MatchMedia | undefined
let cleanups: (() => void)[] = []
/** Para o que a cena faz fora do Context do GSAP (ouvintes, tweens criados depois): roda quando as cenas revertem. */
export const onRevert = (fn: () => void) => cleanups.push(fn)

function start() {
  mm?.revert()
  mm = gsap.matchMedia()
  mm.add(
    {
      desktop: '(min-width: 768px)',
      mobile: '(max-width: 767.98px)',
      motion: '(prefers-reduced-motion: no-preference)',
      cursor: '(hover: hover) and (pointer: fine)',
    },
    (ctx) => {
      const { desktop, mobile, motion, cursor } = ctx.conditions as Record<string, boolean>
      if (!motion) return
      const html = document.documentElement
      html.classList.add('motion')
      for (const scene of SCENES) scene(document.body, { desktop, mobile, cursor })
      return () => {
        cleanups.forEach((fn) => fn())
        cleanups = []
        html.classList.remove('motion')
      }
    },
  )
  // As posições dependem das fontes (o tipo gigante muda de altura quando a fonte chega).
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
}

document.addEventListener('astro:page-load', start)
document.addEventListener('astro:before-swap', () => {
  mm?.revert()
  mm = undefined
})
