import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

/** Compara cada idioma com as chaves do português; devolve os problemas. */
export function checkMessages(all) {
  const errors = []
  const base = Object.keys(all['pt-br'])
  for (const [locale, messages] of Object.entries(all)) {
    for (const key of base) {
      if (!(key in messages)) errors.push(`${locale}: falta "${key}"`)
      else if (!String(messages[key]).trim()) errors.push(`${locale}: "${key}" está vazia`)
    }
  }
  return errors
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const read = (l) => JSON.parse(readFileSync(new URL(`../messages/${l}.json`, import.meta.url), 'utf8'))
  const errors = checkMessages({ 'pt-br': read('pt-br'), en: read('en'), es: read('es') })
  if (errors.length) {
    console.error(errors.join('\n'))
    process.exit(1)
  }
  console.log('messages ok')
}
