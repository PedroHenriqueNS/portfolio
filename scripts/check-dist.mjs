import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = 'https://pedrohenriquens.com.br'
const LANG = { 'pt-br': 'pt-BR', en: 'en-US', es: 'es' }
const HREFLANG = ['pt-BR', 'en', 'es', 'x-default']
const PAGES = 57
const SITEMAP_URLS = 54

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]))

/** dist/en/projects/x.html -> /en/projects/x; index.html -> / */
const pathOf = (file) => ('/' + file.replace(/\.html$/, '')).replace(/\/index$/, '') || '/'
const localeOf = (path) => (['en', 'es'].includes(path.split('/')[1]) ? path.split('/')[1] : 'pt-br')
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'")

/** Confere o dist/ construído; devolve a lista de problemas e o número de páginas. */
export function checkDist(dist, messages) {
  const errors = []
  const files = walk(dist).map((f) => relative(dist, f).split('\\').join('/'))
  const pages = files.filter((f) => f.endsWith('.html'))
  if (pages.length !== PAGES) errors.push(`esperava ${PAGES} páginas .html, achei ${pages.length}`)

  const hreflangs = new Map()
  for (const file of pages) {
    const html = readFileSync(join(dist, file), 'utf8')
    const path = pathOf(file)
    const locale = localeOf(path)
    const lang = html.match(/<html[^>]*\blang="([^"]*)"/)?.[1]
    if (lang !== LANG[locale]) errors.push(`${file}: lang="${lang}", esperava "${LANG[locale]}"`)

    const canonical = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*>/g)].map((t) => attr(t[0], 'href'))
    if (canonical.length !== 1 || canonical[0] !== SITE + path) errors.push(`${file}: canonical ${canonical.join(', ') || 'ausente'}, esperava ${SITE + path}`)

    const alts = Object.fromEntries(
      [...html.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang[^>]*>/g)].map((t) => [attr(t[0], 'hreflang'), attr(t[0], 'href')]),
    )
    for (const h of HREFLANG) if (!alts[h]) errors.push(`${file}: falta hreflang="${h}"`)
    hreflangs.set(SITE + path, { file, alts })

    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    if (!ld.length) errors.push(`${file}: sem JSON-LD`)
    for (const [, json] of ld) {
      try {
        JSON.parse(json)
      } catch (e) {
        errors.push(`${file}: JSON-LD inválido (${e.message})`)
      }
    }

    const skip = messages[locale].header_skip
    if (!decode(html).includes(skip)) errors.push(`${file}: não contém "${skip}" (texto de ${locale})`)
  }

  // Recíproco: cada alternativa aponta de volta para esta página com o hreflang desta página.
  for (const [url, { file, alts }] of hreflangs) {
    const own = { 'pt-br': 'pt-BR', en: 'en', es: 'es' }[localeOf(url.slice(SITE.length) || '/')]
    if (alts[own] !== url) errors.push(`${file}: hreflang="${own}" deveria apontar para a própria página`)
    if (alts['x-default'] !== alts['pt-BR']) errors.push(`${file}: x-default aponta para ${alts['x-default']}, esperava ${alts['pt-BR']}`)
    for (const h of ['pt-BR', 'en', 'es']) {
      const other = hreflangs.get(alts[h])
      if (!other) errors.push(`${file}: hreflang="${h}" aponta para ${alts[h]}, que não existe`)
      else if (other.alts[own] !== url) errors.push(`${file}: ${alts[h]} não devolve hreflang="${own}" para ${url}`)
    }
  }

  const sitemap = existsSync(join(dist, 'sitemap.xml')) ? readFileSync(join(dist, 'sitemap.xml'), 'utf8') : ''
  const locs = sitemap.match(/<loc>/g)?.length ?? 0
  if (locs !== SITEMAP_URLS) errors.push(`sitemap.xml: ${locs} <loc>, esperava ${SITEMAP_URLS}`)
  if (!existsSync(join(dist, 'llms.txt'))) errors.push('falta llms.txt')

  for (const file of files.filter((f) => f.endsWith('.js'))) {
    if (readFileSync(join(dist, file), 'utf8').includes('paraglide')) errors.push(`${file}: contém "paraglide" (mensagem importada em script do navegador)`)
  }
  return { errors, pages: pages.length }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = new URL('..', import.meta.url)
  const read = (l) => JSON.parse(readFileSync(new URL(`messages/${l}.json`, root), 'utf8'))
  const { errors, pages } = checkDist(fileURLToPath(new URL('dist', root)), { 'pt-br': read('pt-br'), en: read('en'), es: read('es') })
  if (errors.length) {
    console.error(`check-dist: ${errors.length} problema(s)\n` + errors.join('\n'))
    process.exit(1)
  }
  console.log(`check-dist ok: ${pages} páginas, sitemap com ${SITEMAP_URLS} URLs, llms.txt presente`)
}
