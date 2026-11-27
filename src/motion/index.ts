import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onRevert, runCleanups, type Scene } from './scene'
import { fx } from './fx'
import { hero } from './hero'
import { about } from './about'
import { experience } from './experience'

export type { Conditions, Scene } from './scene'

/** Na ordem do DOM: um gatilho criado antes de uma seção presa acima dele erra a posição. */
export const SCENES: Scene[] = [fx, hero, about, experience]

gsap.registerPlugin(ScrollTrigger)
// A barra de endereço do celular muda a altura da janela; isso não deve recalcular as cenas.
ScrollTrigger.config({ ignoreMobileResize: true })

let mm: gsap.MatchMedia | undefined

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
      let live = true
      // Registrada antes das cenas: se uma delas lançar erro, a limpeza ainda tira a classe e o que já foi ligado.
      onRevert(() => {
        live = false
        html.classList.remove('motion')
      })
      html.classList.add('motion')
      try {
        for (const scene of SCENES) scene(document.body, { desktop, mobile, cursor })
      } catch (err) {
        console.error(err)
      }
      // As posições dependem das fontes (o tipo gigante muda de altura quando a fonte chega).
      document.fonts?.ready.then(() => live && ScrollTrigger.refresh())
      return runCleanups
    },
  )
}

document.addEventListener('astro:page-load', start)
document.addEventListener('astro:before-swap', () => {
  mm?.revert()
  mm = undefined
})
