import { gsap } from 'gsap'
import type { ScrollTrigger as ST } from 'gsap/ScrollTrigger'
import { onRevert, type Scene } from './scene'

/**
 * Desktop: o trilho fica preso e anda na horizontal pelo quanto passa da janela; as entradas começam fechadas.
 * Celular: as folhas grudam por CSS (sticky); aqui só a anterior recua quando a próxima sobe.
 */
export const experience: Scene = (root, c) => {
  const section = root.querySelector<HTMLElement>('[data-section="experience"]')
  if (!section) return
  const items = [...section.querySelectorAll<HTMLElement>('.xp-item')]

  if (c.desktop) {
    const track = section.querySelector<HTMLElement>('.xp-list')!
    const dist = () => Math.max(0, track.scrollWidth - innerWidth)
    const toggles = section.querySelectorAll('.xp-toggle')
    toggles.forEach((t) => t.setAttribute('aria-expanded', 'false'))
    onRevert(() => toggles.forEach((t) => t.setAttribute('aria-expanded', 'true')))

    const st = gsap.to(track, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.5, invalidateOnRefresh: true },
    }).scrollTrigger as ST

    // Foco por teclado numa entrada fora da janela: rola até o ponto do trilho em que ela fica no centro.
    const onFocus = (e: FocusEvent) => {
      const item = (e.target as Element).closest<HTMLElement>('.xp-item')
      const r = item?.getBoundingClientRect()
      if (!item || !r || (r.left >= 0 && r.right <= innerWidth)) return
      const p = gsap.utils.clamp(0, 1, (item.offsetLeft + item.offsetWidth / 2 - innerWidth / 2) / dist())
      scrollTo({ top: st.start + p * (st.end - st.start), behavior: 'instant' })
    }
    section.addEventListener('focusin', onFocus)
    onRevert(() => section.removeEventListener('focusin', onFocus))
    return
  }

  const stop = (el: HTMLElement) => parseFloat(getComputedStyle(el).top) || 0
  items.forEach((sheet, i) => {
    const next = items[i + 1]
    if (next)
      gsap.to(sheet, {
        scale: 0.92,
        ease: 'none',
        scrollTrigger: { trigger: next, start: 'top bottom', end: () => `top ${stop(next)}px`, scrub: true, invalidateOnRefresh: true },
      })
  })

  // Shift+Tab sobe para uma folha que continua coberta pelas de baixo (o navegador a julga visível e não rola).
  // Só se algo cobre o foco: rola até a folha ficar no seu lugar, pela soma das folhas acima (que não muda com o sticky).
  const list = section.querySelector<HTMLElement>('.xp-list')!
  const onFocus = (e: FocusEvent) => {
    const el = e.target as HTMLElement
    const sheet = el.closest<HTMLElement>('.xp-item')
    if (!sheet) return
    const r = el.getBoundingClientRect()
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
    if (hit && el.contains(hit)) return
    let y = list.getBoundingClientRect().top + scrollY
    for (const s of items) {
      if (s === sheet) break
      y += s.offsetHeight + parseFloat(getComputedStyle(s).marginBottom)
    }
    scrollTo({ top: y - stop(sheet), behavior: 'instant' })
  }
  section.addEventListener('focusin', onFocus)
  onRevert(() => section.removeEventListener('focusin', onFocus))
}
