import { DEFAULT_LOCALE, LOCALES, type Locale } from './locales'

const SEGMENT: Record<Locale, string> = { 'pt-br': 'projetos', en: 'projects', es: 'proyectos' }
const prefix = (locale: Locale) => (locale === DEFAULT_LOCALE ? '' : `/${locale}`)

export const homePath = (locale: Locale) => prefix(locale) || '/'
export const projectPath = (locale: Locale, slug: string) => `${prefix(locale)}/${SEGMENT[locale]}/${slug}`
export const notFoundPath = (locale: Locale) => `${prefix(locale)}/404`

/** Caminho canônico de um arquivo gerado: sem `.html` e sem `/index`. */
export function pagePath(pathname: string): string {
  return pathname.replace(/\.html$/, '').replace(/\/index$/, '') || '/'
}

export function localeOf(path: string): Locale {
  const first = path.split('/')[1]
  return LOCALES.find((l) => l !== DEFAULT_LOCALE && l === first) ?? DEFAULT_LOCALE
}

export function alternates(path: string): Record<Locale, string> {
  const from = localeOf(path)
  const rest = path.slice(prefix(from).length).replace(/^\/$/, '') //'' | '/404' | '/projetos/x'
  const slug = rest.startsWith(`/${SEGMENT[from]}/`) ? rest.slice(SEGMENT[from].length + 2) : null
  return Object.fromEntries(
    LOCALES.map((l) => [l, slug ? projectPath(l, slug) : prefix(l) + rest || '/']),
  ) as Record<Locale, string>
}
