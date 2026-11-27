// Pré-renderização: roda depois de `vite build` (cliente) e `vite build --ssr` (servidor).
// Para cada página gera um HTML com o conteúdo já renderizado e o <head> próprio, para
// que buscadores e robôs de IA (que em geral não executam JavaScript) leiam o site todo.
import { readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const { PAGES, render, head, sitemap, llmsTxt } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

const buildDate = process.env.BUILD_DATE ?? new Date().toISOString().slice(0, 10)
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const SEO = /<!--seo:start-->[\s\S]*?<!--seo:end-->/
const APP = '<!--app-->'
if (!SEO.test(template)) throw new Error('index.html sem o bloco <!--seo:start-->…<!--seo:end-->')
if (!template.includes(APP)) throw new Error('index.html sem o marcador <!--app--> dentro de #root')

// A fonte do texto corrido entra com preload, para o primeiro texto já sair com ela.
const assets = readdirSync(join(dist, 'assets'))
const inter = assets.find(f => /^inter-latin-.*\.woff2$/.test(f))
const fontPreload = inter ? `\n    <link rel="preload" href="/assets/${inter}" as="font" type="font/woff2" crossorigin />` : ''
// Na home, a foto do topo é o maior elemento visível (LCP): pedida junto com o HTML.
const photo = assets.find(f => /^my_img_2-.*\.webp$/.test(f))
const photoPreload = photo ? `\n    <link rel="preload" href="/assets/${photo}" as="image" fetchpriority="high" />` : ''

for (const page of PAGES) {
    const html = template
        // Funções como substituto: `$` no conteúdo não vira padrão de substituição.
        .replace(SEO, () => head(page) + fontPreload + (page.path === '/' ? photoPreload : ''))
        .replace(APP, () => render(page.path))
    if (html.includes(APP) || !html.includes('<h1')) throw new Error(`pré-renderização vazia em ${page.path}`)
    writeFileSync(join(dist, page.file), html)
}

writeFileSync(join(dist, 'sitemap.xml'), sitemap(buildDate))
writeFileSync(join(dist, 'llms.txt'), llmsTxt(buildDate))
rmSync(ssrDir, { recursive: true, force: true })

console.log(`pré-renderizadas ${PAGES.length} páginas, sitemap.xml e llms.txt (${buildDate})`)
