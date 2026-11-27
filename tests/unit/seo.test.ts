import { describe, expect, it } from 'vitest'
import { PROJECTS } from '@/data/projects'
import { homeSeo, notFoundSeo, projectSeo } from '@/lib/seo'

const SITE = 'https://pedrohenriquens.com.br'
const projects = PROJECTS.map((p) => ({ ...p, summary: `Resumo de ${p.title}.` }))
const graph = (ld: object) => (ld as { '@graph': Record<string, unknown>[] })['@graph']
const types = (ld: object) => graph(ld).map((n) => n['@type'])

describe('seo', () => {
  it('home', () => {
    const seo = homeSeo('en', projects)
    expect(seo.path).toBe('/en')
    expect(seo.type).toBe('profile')
    expect(types(seo.jsonLd)).toEqual(expect.arrayContaining(['Person', 'WebSite', 'ProfilePage', 'ItemList']))
    const list = graph(seo.jsonLd).find((n) => n['@type'] === 'ItemList') as { itemListElement: { item: { url: string } }[] }
    expect(list.itemListElement).toHaveLength(17)
    expect(list.itemListElement[0].item.url).toBe(`${SITE}/en/projects/linkeza`)
    expect(homeSeo('pt-br', projects).path).toBe('/')
  })

  it('project', () => {
    const p = projects.find((x) => x.slug === 'je-modesto')!
    const seo = projectSeo('es', p)
    expect(seo.path).toBe('/es/proyectos/je-modesto')
    expect(seo.type).toBe('article')
    expect(seo.date).toBe('2026-08')
    expect(types(seo.jsonLd)).toEqual(expect.arrayContaining(['CreativeWork', 'BreadcrumbList']))
    const work = graph(seo.jsonLd).find((n) => n['@type'] === 'CreativeWork')!
    expect(work.inLanguage).toBe('es')
    const crumbs = graph(seo.jsonLd).find((n) => n['@type'] === 'BreadcrumbList') as { itemListElement: { item: string }[] }
    expect(crumbs.itemListElement[0].item).toBe(`${SITE}/es`)
    expect(crumbs.itemListElement[2].item).toBe(`${SITE}/es/proyectos/je-modesto`)
    expect(seo.image).toBe(`${SITE}/og/je-modesto.jpg`)
  })

  it('not found', () => {
    expect(notFoundSeo('es').path).toBe('/es/404')
  })
})
