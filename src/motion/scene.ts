export interface Conditions {
  desktop: boolean
  mobile: boolean
  cursor: boolean
}
export type Scene = (root: HTMLElement, c: Conditions) => void

/**
 * Uma cena de tela cheia (o palco) cobre a faixa de cima: pede o cabeçalho fora enquanto isso valer.
 * O fx.ts liga `changed` e lê `covered` a cada scroll; quem liga `covered` o desliga no próprio onRevert.
 */
export const headerCover = { covered: false, changed: () => {} }

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
