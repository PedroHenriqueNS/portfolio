import { gsap } from 'gsap'
import type { Scene } from './scene'

/**
 * A frase se preenche na ordem de leitura. No desktop a seção fica presa por 1,3 tela;
 * no celular não prende: o preenchimento acompanha a passagem do bloco pela tela.
 */
export const about: Scene = (root, c) => {
  const section = root.querySelector<HTMLElement>('[data-section="about"]')
  if (!section) return
  const sentence = section.querySelector<HTMLElement>('.about-sentence')!

  gsap.fromTo(
    section.querySelectorAll('.about-sentence .w'),
    { opacity: 0.14 },
    {
      opacity: 1,
      stagger: 0.08,
      ease: 'none',
      scrollTrigger: c.desktop
        ? { trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.3 }
        : { trigger: sentence, start: 'top 85%', end: 'bottom 45%', scrub: 0.3 },
    },
  )

  // Formas flutuantes: cada uma sobe ou desce numa velocidade própria; no celular, a metade do percurso.
  const reach = c.desktop ? 1 : 0.5
  section.querySelectorAll<HTMLElement>('.about-shapes i').forEach((shape, i) => {
    const dir = i % 2 ? -1 : 1
    gsap.fromTo(
      shape,
      { y: 0, rotate: 0 },
      { y: dir * (120 + i * 60) * reach, rotate: dir * 90, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: '+=260%', scrub: 0.8 } },
    )
  })
}
