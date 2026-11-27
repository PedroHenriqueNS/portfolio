import { HTML_LANG, type Locale } from '@/i18n/locales'

/** '2024-12' -> 'dezembro de 2024' */
export function formatMonth(date: string | undefined, locale: Locale): string | undefined {
  if (!date) return undefined
  const [year, month] = date.split('-').map(Number)
  return new Intl.DateTimeFormat(HTML_LANG[locale], { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(year, month - 1, 1)),
  )
}

export const yearOf = (date?: string) => date?.slice(0, 4)
