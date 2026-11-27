import { defineMiddleware } from 'astro:middleware'
import { assertIsLocale, baseLocale, setLocale } from '@/paraglide/runtime.js'

// Locale global só como padrão; código de biblioteca passa { locale } à mensagem.
export const onRequest = defineMiddleware((context, next) => {
  setLocale(assertIsLocale(context.currentLocale ?? baseLocale))
  return next()
})
