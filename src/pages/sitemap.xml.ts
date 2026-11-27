import type { APIRoute } from 'astro'
import { HREFLANG, LOCALES } from '@/i18n/locales'
import { alternates, homePath, projectPath } from '@/i18n/routes'
import { PROJECTS } from '@/data/projects'
import { SITE } from '@/lib/seo'

/** As 54 páginas indexáveis (home e projetos nos três idiomas), cada uma com suas alternativas. */
export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10)
  const paths = LOCALES.flatMap((l) => [homePath(l), ...PROJECTS.map((p) => projectPath(l, p.slug))])
  const entries = paths.map((path) => {
    const alts = alternates(path)
    return [
      '  <url>',
      `    <loc>${SITE}${path}</loc>`,
      ...LOCALES.map((l) => `    <xhtml:link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE}${alts[l]}" />`),
      `    <lastmod>${lastmod}</lastmod>`,
      '  </url>',
    ].join('\n')
  })
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
