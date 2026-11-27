import { describe, expect, it } from 'vitest'
import { LOCALES } from '@/i18n/locales'
import { TECH } from '@/data/tech'
import { PROJECTS } from '@/data/projects'
import { EXPERIENCES } from '@/data/experiences'
import { SKILLS } from '@/data/skills'
import { isPublic, nextSlug } from '@/lib/projects'

describe('data', () => {
  it('projects', () => {
    expect(PROJECTS).toHaveLength(17)
    expect(PROJECTS.filter((p) => p.featured).map((p) => p.slug)).toEqual(['linkeza', 'je-modesto', 'clau-camargo', 'wsa-marmores', 'pautas-gobuzz'])
    expect(PROJECTS.filter((p) => p.featured).map((p) => p.color)).toEqual(['#2B2BD9', '#0B6B3A', '#A8500A', '#3B3A38', '#A31750'])
    expect(PROJECTS.filter((p) => !p.date).map((p) => p.slug)).toEqual(['auto-crop-pdf', 'cloud-barueri', 'snowhunter', 'youtube-music-clone', 'sodieasy', 'twonote'])
    expect(Object.fromEntries(PROJECTS.map((p) => [p.slug, p.kind]))).toMatchObject({
      linkeza: 'saas', 'wsa-marmores': 'institutional', 'gobuzz-ads-manager': 'internal', 'seeding-controle': 'desktop',
      snowhunter: 'web', twonote: 'mobile', 'sandro-mastellari': 'campaign',
    })
    for (const p of PROJECTS) for (const t of p.stack) expect(TECH[t]).toBeDefined()
  })
  it('skills and experiences', () => {
    expect(SKILLS).toHaveLength(31)
    expect(new Set(SKILLS.map((s) => s.id)).size).toBe(31)
    expect(SKILLS.filter((s) => s.group === 'featured').map((s) => s.id)).toEqual(['nextjs', 'react-native', 'nestjs'])
    expect(SKILLS.filter((s) => s.group === 'frontend')).toHaveLength(11)
    expect(SKILLS.filter((s) => s.group === 'backend')).toHaveLength(17)
    expect(EXPERIENCES.map((e) => e.year)).toEqual([2026, 2026, 2025, 2023, 2021])
  })
  it('helpers', () => {
    expect(nextSlug('linkeza')).toBe('je-modesto')
    expect(nextSlug('twonote')).toBe('linkeza')
    expect(isPublic('Private')).toBe(false)
    expect(isPublic(undefined)).toBe(false)
    expect(isPublic('https://linkeza.com')).toBe(true)
  })
  it('has a content file per locale and project', () => {
    // import.meta.glob lists the files without importing them (no @types/node needed).
    const files = Object.keys(import.meta.glob('/src/content/projects/*/*.md'))
    for (const l of LOCALES) for (const p of PROJECTS) expect(files).toContain(`/src/content/projects/${l}/${p.slug}.md`)
    expect(files).toHaveLength(LOCALES.length * PROJECTS.length)
  })
})
