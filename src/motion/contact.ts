import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { headerCover, onRevert, type Scene } from './scene'

/**
 * Fecho: o título entra em foco e o horizonte sobe com o scroll; os botões puxam para o cursor.
 * É a última seção: os fins ficam em clamp() para terminarem no fim da página.
 */
export const contact: Scene = (root, c) => {
  const section = root.querySelector<HTMLElement>('[data-section="contact"]')
  if (!section) return
  const title = section.querySelector<HTMLElement>('.ct-title')!
  const horizon = section.querySelector<HTMLElement>('.ct-horizon i')!

  // Desfoque em tipo gigante é caro: no celular o foco é só opacidade.
  gsap.fromTo(
    title,
    { opacity: 0.3, filter: c.desktop ? 'blur(16px)' : 'none' },
    { opacity: 1, filter: c.desktop ? 'blur(0px)' : 'none', ease: 'none', scrollTrigger: { trigger: title, start: 'top 95%', end: 'clamp(top 55%)', scrub: true } },
  )
  gsap.fromTo(horizon, { yPercent: 6, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top 85%', end: 'clamp(top 10%)', scrub: true } })

  // Fundo escuro na faixa de cima: o cabeçalho claro sai (fx.ts).
  ScrollTrigger.create({ trigger: section, start: 'top 80px', end: 'bottom top', onToggle: (s) => headerCover.set('contact', s.isActive) })
  onRevert(() => headerCover.set('contact', false))

  if (c.desktop && c.cursor) magnetic([...section.querySelectorAll<HTMLElement>('.ct-link')])
}

/** Puxa cada botão para o cursor (até 30% da distância ao centro) e solta com mola ao sair. */
function magnetic(links: HTMLElement[]) {
  for (const link of links) {
    const x = gsap.quickTo(link, 'x', { duration: 0.4, ease: 'power3' })
    const y = gsap.quickTo(link, 'y', { duration: 0.4, ease: 'power3' })
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = link.getBoundingClientRect()
      x((e.clientX - r.left - r.width / 2) * 0.3)
      y((e.clientY - r.top - r.height / 2) * 0.3)
    }
    const leave = () => gsap.to(link, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)', overwrite: true })
    link.addEventListener('pointermove', move)
    link.addEventListener('pointerleave', leave)
    onRevert(() => {
      link.removeEventListener('pointermove', move)
      link.removeEventListener('pointerleave', leave)
      gsap.killTweensOf(link)
      gsap.set(link, { clearProps: 'transform' })
    })
  }
}
