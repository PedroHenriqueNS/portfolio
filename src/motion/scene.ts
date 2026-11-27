export interface Conditions {
  desktop: boolean
  mobile: boolean
  cursor: boolean
}
export type Scene = (root: HTMLElement, c: Conditions) => void

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
