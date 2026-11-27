import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { headerCover, onRevert, type Scene } from './scene'

/** Tempo de cada projeto na linha do tempo: 1 de troca e 0,5 parado. */
const STEP = 1.5

/**
 * Bordas: as curvas de entrada e de saída achatam enquanto sobem pela tela.
 * Desktop: o palco fica preso; cada projeto traz a palavra pela lateral, o cartão por baixo e a própria cor.
 * Celular: os painéis grudam por CSS (sticky); aqui só o anterior recua e escurece quando o próximo sobe.
 */
export const stage: Scene = (root, c) => {
  const section = root.querySelector<HTMLElement>('[data-section="stage"]')
  if (!section) return
  const frame = section.querySelector<HTMLElement>('.stage-frame')!
  const items = [...section.querySelectorAll<HTMLElement>('.stage-item')]
  const [capTop, capBot] = section.querySelectorAll<HTMLElement>('.stage-cap')

  // A curva de cima é medida pela moldura, que ainda não foi presa; a de baixo vem depois do pin, pela ordem do DOM.
  gsap.fromTo(capTop.firstElementChild, { scaleY: 1 }, { scaleY: 0, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'top top', scrub: true } })

  const st = c.desktop ? desktop(frame, items, c.cursor) : undefined
  if (!c.desktop) mobile(section, items)

  // O palco é o momento de tela cheia: enquanto cobre a faixa de cima, o cabeçalho fica fora (fx.ts).
  // Desktop: do início do pin até a moldura sair por cima. Celular: da lista no topo até ela sair por cima.
  const cover = (on: boolean) => {
    headerCover.covered = on
    headerCover.changed()
  }
  const list = section.querySelector<HTMLElement>('.stage-list')!
  ScrollTrigger.create(
    st
      ? { start: () => st.start, end: () => st.end + frame.offsetHeight, onToggle: (s) => cover(s.isActive) }
      : { trigger: list, start: 'top top', end: 'bottom top', onToggle: (s) => cover(s.isActive) },
  )
  onRevert(() => cover(false))

  gsap.fromTo(capBot.firstElementChild, { scaleY: 1 }, { scaleY: 0, ease: 'none', scrollTrigger: { trigger: capBot, start: 'top bottom', end: 'top top', scrub: true } })
}

function desktop(frame: HTMLElement, items: HTMLElement[], cursor: boolean): ScrollTrigger {
  const bg = frame.querySelector<HTMLElement>('.stage-bg')!
  const count = frame.querySelector<HTMLElement>('.stage-count')!
  const label = count.textContent
  const cards = items.map((it) => it.querySelector<HTMLElement>('.stage-card')!)
  const words = (it: HTMLElement) => it.querySelectorAll('.stage-word')
  const meta = (it: HTMLElement) => it.querySelector('.stage-meta')
  // Quanto a palavra, centrada, anda até sair inteira pela lateral.
  const offstage = (el: HTMLElement) => (innerWidth + el.scrollWidth) / 2 + 40
  let current = -1

  // O projeto que está na frente: o da metade da troca em diante. Só ele recebe o ponteiro.
  const sync = () => {
    const i = Math.round(tl.time() / STEP)
    if (i === current) return
    items[current]?.classList.remove('is-current')
    items[i].classList.add('is-current')
    count.textContent = `${i + 1} / ${items.length}`
    current = i
  }

  gsap.set(bg, { backgroundColor: items[0].dataset.color })
  gsap.set(cards, { rotation: -3 })
  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut', duration: 1 },
    onUpdate: sync,
    scrollTrigger: { trigger: frame, start: 'top top', end: `+=${(items.length - 1) * 110}%`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
  })
  tl.addLabel('p0', 0)
  items.forEach((it, i) => {
    if (!i) return
    const prev = items[i - 1]
    const at = (i - 1) * STEP + 0.25
    tl.to(words(prev), { x: (_: number, el: HTMLElement) => -offstage(el) }, at)
      .to(cards[i - 1], { yPercent: -200, rotation: -12 }, at)
      .to(meta(prev), { opacity: 0, duration: 0.3, ease: 'none' }, at)
      .fromTo(words(it), { x: (_: number, el: HTMLElement) => offstage(el) }, { x: 0 }, at)
      .fromTo(cards[i], { yPercent: 200, rotation: 10 }, { yPercent: 0, rotation: -3 }, at)
      .fromTo(meta(it), { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none' }, at + 0.7)
      .to(bg, { backgroundColor: it.dataset.color, ease: 'none' }, at)
      .addLabel(`p${i}`, i * STEP)
  })
  tl.set({}, {}, (items.length - 1) * STEP) // o último projeto também tem o seu tempo parado
  sync()
  const st = tl.scrollTrigger as ScrollTrigger
  onRevert(() => {
    items.forEach((it) => it.classList.remove('is-current'))
    count.textContent = label
  })

  // Foco por teclado num projeto que não está na frente: rola até o ponto em que ele está parado.
  const onFocus = (e: FocusEvent) => {
    const i = items.indexOf((e.target as Element).closest<HTMLElement>('.stage-item')!)
    if (i >= 0 && i !== current) scrollTo({ top: st.labelToScroll(`p${i}`), behavior: 'instant' })
  }
  frame.addEventListener('focusin', onFocus)
  onRevert(() => frame.removeEventListener('focusin', onFocus))

  if (cursor) tiltCards(frame, cards)
  return st
}

/** Os cartões inclinam para o cursor e o brilho atravessa no sentido oposto. */
function tiltCards(frame: HTMLElement, cards: HTMLElement[]) {
  gsap.set(cards, { transformPerspective: 900 })
  const tilt = (px: number, py: number) =>
    gsap.to(cards, { rotationY: px * 16, rotationX: -py * 12, duration: 0.6, ease: 'power3.out', overwrite: 'auto' })
  const onMove = (e: MouseEvent) => {
    const px = e.clientX / innerWidth - 0.5
    const py = e.clientY / innerHeight - 0.5
    tilt(px, py)
    frame.style.setProperty('--sx', `${px * 240}%`)
  }
  const onLeave = () => {
    tilt(0, 0)
    frame.style.removeProperty('--sx')
  }
  frame.addEventListener('mousemove', onMove)
  frame.addEventListener('mouseleave', onLeave)
  onRevert(() => {
    frame.removeEventListener('mousemove', onMove)
    frame.removeEventListener('mouseleave', onLeave)
    frame.style.removeProperty('--sx')
    gsap.killTweensOf(cards, 'rotationX,rotationY')
    gsap.set(cards, { clearProps: 'transform' })
  })
}

function mobile(section: HTMLElement, items: HTMLElement[]) {
  const list = section.querySelector<HTMLElement>('.stage-list')!
  // Painéis grudados mudam de posição com o scroll: as marcas saem da lista, que não gruda.
  const above = (i: number) => items.slice(0, i).reduce((y, it) => y + it.offsetHeight, 0)

  items.forEach((panel, i) => {
    if (i === items.length - 1) return
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: list, start: () => `top+=${above(i + 1)} bottom`, end: () => `top+=${above(i + 1)} top`, scrub: true, invalidateOnRefresh: true },
      })
      .to(panel, { scale: 0.92 }, 0)
      .to(panel.querySelector('.stage-shade'), { opacity: 0.4 }, 0)
  })

  // Shift+Tab sobe para um painel coberto pelos de baixo (o navegador o julga visível e não rola).
  const onFocus = (e: FocusEvent) => {
    const el = e.target as HTMLElement
    const i = items.indexOf(el.closest<HTMLElement>('.stage-item')!)
    if (i < 0) return
    const r = el.getBoundingClientRect()
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
    if (hit && el.contains(hit)) return
    scrollTo({ top: list.getBoundingClientRect().top + scrollY + above(i), behavior: 'instant' })
  }
  section.addEventListener('focusin', onFocus)
  onRevert(() => section.removeEventListener('focusin', onFocus))
}
