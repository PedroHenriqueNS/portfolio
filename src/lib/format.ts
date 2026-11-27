import * as m from '@/paraglide/messages.js'
import { HTML_LANG, type Locale } from '@/i18n/locales'
import type { ExperienceFacts } from '@/data/experiences'

/** '2024-12' -> 'dezembro de 2024' */
export function formatMonth(date: string | undefined, locale: Locale): string | undefined {
  if (!date) return undefined
  const [year, month] = date.split('-').map(Number)
  return new Intl.DateTimeFormat(HTML_LANG[locale], { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(year, month - 1, 1)),
  )
}

export const yearOf = (date?: string) => date?.slice(0, 4)

/** Início – fim (ou presente); só o ano de início vira 'desde 2021'. */
export function formatPeriod(e: Pick<ExperienceFacts, 'start' | 'end' | 'current'>, locale: Locale): string {
  if (!e.start.includes('-')) return m.xp_since({ year: e.start }, { locale })
  const end = e.current ? m.xp_present({}, { locale }) : formatMonth(e.end, locale)
  return `${formatMonth(e.start, locale)} – ${end}`
}
