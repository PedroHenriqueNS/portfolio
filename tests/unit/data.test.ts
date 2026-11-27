import { describe, expect, it } from 'vitest'
import { LOCALES } from '@/i18n/locales'
import { TECH } from '@/data/tech'
import { PROJECTS } from '@/data/projects'
import { EXPERIENCES, stackOf } from '@/data/experiences'
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
    const titles = (slug: string) => PROJECTS.find((p) => p.slug === slug)!.stack.map((t) => TECH[t].title)
    expect(titles('youtube-music-clone')).toEqual(['React Native', 'Expo'])
    expect(titles('sodieasy')).toEqual(['React Native', 'Expo', 'Node.js', 'Express'])
  })
  it('skills and experiences', () => {
    expect(SKILLS).toHaveLength(31)
    expect(new Set(SKILLS.map((s) => s.id)).size).toBe(31)
    expect(SKILLS.filter((s) => s.group === 'featured').map((s) => s.id)).toEqual(['nextjs', 'react-native', 'nestjs'])
    expect(SKILLS.filter((s) => s.group === 'frontend')).toHaveLength(11)
    expect(SKILLS.filter((s) => s.group === 'backend')).toHaveLength(17)
    expect(EXPERIENCES.map((e) => e.id)).toEqual(['linkeza', 'dry-telecom', 'gobuzz', 'freelancer'])
    expect(EXPERIENCES.map((e) => e.year)).toEqual([2026, 2025, 2023, 2021])
  })
  it('dry telecom: one entry, two roles, merged stack', () => {
    const dry = EXPERIENCES.find((e) => e.id === 'dry-telecom')!
    expect(dry).toMatchObject({ start: '2025-05', end: '2026-07' })
    expect(dry.roles.map((r) => r.id)).toEqual(['dry-pleno', 'dry'])
    expect(dry.roles.map((r) => r.start)).toEqual(['2026-03', '2025-05'])
    for (const e of EXPERIENCES.filter((e) => e.id !== 'dry-telecom')) expect(e.roles).toHaveLength(1)
    // As duas stacks de old/src/constants/index.ts (pleno e o cargo anterior).
    const old = [
      ['TypeScript', 'React.js', 'Next.js', 'React Native', 'NestJS', 'RabbitMQ', 'Python', 'AWS', 'Docker', 'PostgreSQL'],
      ['TypeScript', 'React.js', 'Next.js', 'NestJS', 'Python', 'AWS', 'ArgoCD', 'Grafana'],
    ]
    const stack = stackOf(dry)
    for (const t of new Set(old.flat())) expect(stack.filter((s) => s === t)).toHaveLength(1)
    expect(stack).toHaveLength(new Set(old.flat()).size)
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
