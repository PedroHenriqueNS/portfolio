export const LOCALES = ['pt-br', 'en', 'es'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'pt-br'

export const HTML_LANG: Record<Locale, string> = { 'pt-br': 'pt-BR', en: 'en-US', es: 'es' }
export const HREFLANG: Record<Locale, string> = { 'pt-br': 'pt-BR', en: 'en', es: 'es' }
export const OG_LOCALE: Record<Locale, string> = { 'pt-br': 'pt_BR', en: 'en_US', es: 'es_LA' }
