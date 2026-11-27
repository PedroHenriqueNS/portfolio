import { gsap } from 'gsap'
import type { Scene } from './scene'

/**
 * Entrada da página do projeto. A capa não se mexe aqui: ela é o elemento que a transição entre páginas
 * leva do cartão (ou da miniatura) até o topo. O nome sobe, e o resto chega logo depois, em ordem de leitura.
 * No fim, o nome do próximo projeto desliza para o lugar enquanto entra na tela. Sem pin.
 */
export const page: Scene = (root) => {
  const pp = root.querySelector<HTMLElement>('[data-page="project"]')
  if (!pp) return

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.from(pp.querySelector('.pp-title'), { yPercent: 28, opacity: 0, duration: 1.1, ease: 'power4.out' }, 0.1)
  tl.from(pp.querySelectorAll('.pp-date, .pp-text, .pp-side'), { y: 32, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.3)

  // Termina quando o pé da página chega ao pé da tela, o que sempre acontece: o bloco é o último da página.
  gsap.fromTo(
    pp.querySelector('.pp-next-name'),
    { xPercent: 12 },
    { xPercent: 0, ease: 'none', scrollTrigger: { trigger: pp.querySelector('.pp-next'), start: 'top bottom', end: 'bottom bottom', scrub: 0.4 } },
  )
}
