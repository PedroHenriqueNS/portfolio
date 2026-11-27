import type { APIRoute } from 'astro'
import * as m from '@/paraglide/messages.js'
import { homePath, projectPath } from '@/i18n/routes'
import { EXPERIENCES, isCurrentRole, xpKey } from '@/data/experiences'
import { TECH } from '@/data/tech'
import { CONTACTS } from '@/data/site'
import { getProjects, isPublic, type Project } from '@/lib/projects'
import { formatPeriod } from '@/lib/format'
import { KNOWS_ABOUT, NAME, SITE } from '@/lib/seo'

const locale = 'pt-br'
type Message = (inputs: object, options: { locale: typeof locale }) => string
const msg = (key: string) => (m as unknown as Record<string, Message>)[key]({}, { locale })

/** Resumo em Markdown para assistentes de IA (https://llmstxt.org), em português, com links para EN e ES. */
export const GET: APIRoute = async () => {
  const buildDate = new Date().toISOString().slice(0, 10)
  const projects = await getProjects(locale)
  const project = (p: Project) => {
    const links = [isPublic(p.projectUrl) && `site: ${p.projectUrl}`, isPublic(p.repoUrl) && `código: ${p.repoUrl}`]
      .filter(Boolean)
      .join(' · ')
    const stack = p.stack.map((t) => TECH[t].title).join(', ')
    return `- [${p.title}](${SITE}${projectPath(locale, p.slug)}): ${p.summary} Stack: ${stack}.${links ? ` (${links})` : ''}`
  }
  const experience = EXPERIENCES.flatMap((e) => {
    const company = e.company || msg(xpKey(e.id, 'company'))
    return e.roles.map((r) => {
      const period = formatPeriod({ ...r, current: isCurrentRole(e, r) }, locale)
      return `- **${msg(xpKey(r.id, 'role'))}, ${company}** (${e.location}, ${period}): ${msg(xpKey(r.id, 'summary'))} Stack: ${r.stack.join(', ')}.`
    })
  })

  const text = `# ${NAME}

> ${m.hero_role({}, { locale })} em Carapicuíba, SP (Grande São Paulo), com mais de 5 anos de experiência em TypeScript: React, Next.js, React Native, Node.js e NestJS, na AWS. Fundador do Linkeza. Português nativo, inglês avançado.

Atualizado em ${buildDate}. Fonte: ${SITE}/

## Outros idiomas

- English: ${SITE}${homePath('en')}
- Español: ${SITE}${homePath('es')}

## Contato

- E-mail: ${CONTACTS.email.href.replace('mailto:', '')}
- WhatsApp: +55 11 97016-8417
- GitHub: ${CONTACTS.github.href}
- LinkedIn: ${CONTACTS.linkedin.href}
- Currículo em português (PDF): ${SITE}/curriculo_PedroHenrique.pdf
- Resume in English (PDF): ${SITE}/resume_PedroHenrique_EN.pdf

## Experiência

${experience.join('\n')}

## Formação

- Bacharelado em Ciência da Computação, Universidade Anhembi Morumbi (2025)
- Técnico em Telecomunicações, ITB Brasílio Flores de Azevedo

## Competências

${KNOWS_ABOUT.join(', ')}.

## Projetos em destaque

${projects.filter((p) => p.featured).map(project).join('\n')}

## Outros projetos

${projects.filter((p) => !p.featured).map(project).join('\n')}
`
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
