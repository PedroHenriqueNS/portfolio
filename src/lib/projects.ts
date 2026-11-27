import { getCollection, render } from 'astro:content'
import type { Locale } from '@/i18n/locales'
import { PROJECTS, type ProjectFacts } from '@/data/projects'

export interface Project extends ProjectFacts {
  summary: string
  /** Descrição do projeto, renderizada no idioma pedido. */
  Content: Awaited<ReturnType<typeof render>>['Content']
}

export const isPublic = (url?: string) => !!url && url !== 'Private'

/** O projeto seguinte da lista; do último volta ao primeiro. */
export function nextSlug(slug: string): string {
  const i = PROJECTS.findIndex((p) => p.slug === slug)
  return PROJECTS[(i + 1) % PROJECTS.length].slug
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  const entries = new Map((await getCollection('projects')).map((e) => [e.id, e]))
  return Promise.all(
    PROJECTS.map(async (facts) => {
      const entry = entries.get(`${locale}/${facts.slug}`)
      if (!entry) throw new Error(`Falta src/content/projects/${locale}/${facts.slug}.md`)
      const { Content } = await render(entry)
      return { ...facts, summary: entry.data.summary, Content }
    }),
  )
}
