export interface Conditions {
  desktop: boolean
  mobile: boolean
  cursor: boolean
}
export type Scene = (root: HTMLElement, c: Conditions) => void

const covering = new Set<string>()

/**
 * Uma cena de tela cheia (o palco, o fecho) cobre a faixa de cima: pede o cabeçalho fora enquanto isso valer.
 * Cada cena liga e desliga só o próprio pedido (`set`), e o desliga no próprio onRevert.
 * O fx.ts liga `changed` e lê `covered` a cada scroll.
 */
export const headerCover = {
  get covered() {
    return covering.size > 0
  },
  set(scene: string, on: boolean) {
    if (on) covering.add(scene)
    else covering.delete(scene)
    headerCover.changed()
  },
  changed: () => {},
}

let cleanups: (() => void)[] = []

/** Para o que a cena faz fora do Context do GSAP (ouvintes, tweens criados depois): roda quando as cenas revertem. */
export const onRevert = (fn: () => void) => {
  cleanups.push(fn)
}

/** Roda e esvazia as limpezas registradas; uma que falhe não impede as outras. */
export function runCleanups() {
  const pending = cleanups
  cleanups = []
  for (const fn of pending) {
    try {
      fn()
    } catch (err) {
      console.error(err)
    }
  }
}
