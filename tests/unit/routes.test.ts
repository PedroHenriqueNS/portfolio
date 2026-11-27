import { describe, expect, it } from 'vitest'
import { alternates, homePath, localeOf, notFoundPath, pagePath, projectPath } from '@/i18n/routes'

describe('routes', () => {
  it('builds paths per locale', () => {
    expect(homePath('pt-br')).toBe('/'); expect(homePath('en')).toBe('/en'); expect(homePath('es')).toBe('/es')
    expect(projectPath('pt-br', 'linkeza')).toBe('/projetos/linkeza')
    expect(projectPath('en', 'linkeza')).toBe('/en/projects/linkeza')
    expect(projectPath('es', 'linkeza')).toBe('/es/proyectos/linkeza')
    expect(notFoundPath('en')).toBe('/en/404')
  })
  it('normalizes page paths', () => {
    expect(pagePath('/index.html')).toBe('/'); expect(pagePath('/en.html')).toBe('/en')
    expect(pagePath('/en/projects/linkeza.html')).toBe('/en/projects/linkeza'); expect(pagePath('/es')).toBe('/es')
  })
  it('detects the locale', () => {
    expect(localeOf('/')).toBe('pt-br'); expect(localeOf('/projetos/x')).toBe('pt-br')
    expect(localeOf('/en')).toBe('en'); expect(localeOf('/es/proyectos/x')).toBe('es'); expect(localeOf('/enigma')).toBe('pt-br')
  })
  it('maps alternates', () => {
    expect(alternates('/')).toEqual({ 'pt-br': '/', en: '/en', es: '/es' })
    expect(alternates('/es/proyectos/linkeza')).toEqual({ 'pt-br': '/projetos/linkeza', en: '/en/projects/linkeza', es: '/es/proyectos/linkeza' })
  })
})
