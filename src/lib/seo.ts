import * as m from '@/paraglide/messages.js'
import { HTML_LANG, type Locale } from '@/i18n/locales'
import { homePath, notFoundPath, projectPath } from '@/i18n/routes'
import type { ProjectFacts } from '@/data/projects'
import { TECH } from '@/data/tech'
import { CONTACTS } from '@/data/site'
import { isPublic } from '@/lib/projects'

export const SITE = 'https://pedrohenriquens.com.br'
const PERSON_ID = `${SITE}/#pessoa`
const WEBSITE_ID = `${SITE}/#site`
export const NAME = 'Pedro Henrique do Nascimento Silva'

export interface Seo {
  title: string
  description: string
  path: string
  image: string
  imageAlt: string
  type: 'profile' | 'article'
  date?: string
  jsonLd: object
  /** Só a 404: não indexar. */
  noindex?: boolean
}

/** O que o SEO precisa de um projeto; `Project` de `lib/projects` satisfaz. */
export type SeoProject = ProjectFacts & { summary: string }

export const absolute = (url: string) => (url.startsWith('http') ? url : `${SITE}${url}`)
const url = (path: string) => `${SITE}${path}`

const languageName = (code: string, locale: Locale) =>
  new Intl.DisplayNames([HTML_LANG[locale]], { type: 'language' }).of(code)!

export const KNOWS_ABOUT = [
  'TypeScript', 'JavaScript', 'Python', 'React', 'Next.js', 'React Native', 'Expo', 'Vite', 'Tailwind CSS',
  'Node.js', 'NestJS', 'Express', 'REST APIs', 'Domain-Driven Design', 'SOLID',
  'RabbitMQ', 'Amazon SQS', 'Event-driven architecture',
  'PostgreSQL', 'MongoDB', 'DynamoDB', 'MySQL',
  'AWS', 'Kubernetes', 'ArgoCD', 'Grafana', 'Docker', 'CI/CD',
]

const person = (locale: Locale) => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: NAME,
  alternateName: ['Pedro Henrique', 'PedroHenriqueNS'],
  // Uma pessoa, um @id, uma url: a raiz canônica em todos os idiomas (as páginas por idioma ficam no ProfilePage).
  url: `${SITE}/`,
  image: `${SITE}/my_img_2.jpg`,
  jobTitle: m.hero_role({}, { locale }),
  description: m.seo_person_description({}, { locale }),
  email: CONTACTS.email.href,
  telephone: '+55-11-97016-8417',
  address: { '@type': 'PostalAddress', addressLocality: 'Carapicuíba', addressRegion: 'SP', addressCountry: 'BR' },
  knowsLanguage: ['pt', 'en'].map((code) => ({ '@type': 'Language', name: languageName(code, locale), alternateName: code })),
  knowsAbout: KNOWS_ABOUT,
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Universidade Anhembi Morumbi' },
    { '@type': 'EducationalOrganization', name: 'ITB Brasílio Flores de Azevedo' },
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: m.edu_cs_label({}, { locale }),
    credentialCategory: 'degree',
    recognizedBy: { '@type': 'CollegeOrUniversity', name: 'Universidade Anhembi Morumbi' },
  },
  worksFor: { '@type': 'Organization', name: 'Linkeza', url: 'https://linkeza.com' },
  sameAs: ['https://github.com/PedroHenriqueNS', CONTACTS.linkedin.href],
})

const creativeWork = (locale: Locale, p: SeoProject) => ({
  '@type': 'CreativeWork',
  '@id': `${url(projectPath(locale, p.slug))}#projeto`,
  name: p.title,
  description: p.summary,
  url: url(projectPath(locale, p.slug)),
  image: absolute(p.ogImage),
  ...(p.date && { dateCreated: p.date }),
  keywords: p.stack.map((t) => TECH[t].title).join(', '),
  creator: { '@id': PERSON_ID },
  inLanguage: HTML_LANG[locale],
  ...((isPublic(p.projectUrl) || isPublic(p.repoUrl)) && { sameAs: [p.projectUrl, p.repoUrl].filter(isPublic) }),
})

export function homeSeo(locale: Locale, projects: SeoProject[]): Seo {
  const path = homePath(locale)
  const title = m.seo_home_title({}, { locale })
  const description = m.seo_home_description({}, { locale })
  const inLanguage = HTML_LANG[locale]
  return {
    title,
    description,
    path,
    image: `${SITE}/og-image.jpg`,
    imageAlt: m.seo_home_image_alt({}, { locale }),
    type: 'profile',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        person(locale),
        { '@type': 'WebSite', '@id': WEBSITE_ID, url: `${SITE}/`, name: m.seo_site_name({}, { locale }), inLanguage, publisher: { '@id': PERSON_ID } },
        {
          '@type': 'ProfilePage',
          '@id': `${url(path)}#perfil`,
          url: url(path),
          name: title,
          description,
          isPartOf: { '@id': WEBSITE_ID },
          mainEntity: { '@id': PERSON_ID },
          inLanguage,
        },
        {
          '@type': 'ItemList',
          name: m.seo_projects_list({}, { locale }),
          itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: creativeWork(locale, p) })),
        },
      ],
    },
  }
}

export function projectSeo(locale: Locale, p: SeoProject): Seo {
  return {
    title: m.seo_project_title({ title: p.title }, { locale }),
    description: p.summary,
    path: projectPath(locale, p.slug),
    image: absolute(p.ogImage),
    imageAlt: m.project_cover_alt({ title: p.title }, { locale }),
    type: 'article',
    date: p.date,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        { ...creativeWork(locale, p), creator: { '@type': 'Person', '@id': PERSON_ID, name: NAME, url: `${SITE}/` } },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: m.project_breadcrumb_home({}, { locale }), item: url(homePath(locale)) },
            { '@type': 'ListItem', position: 2, name: m.project_breadcrumb_projects({}, { locale }), item: `${url(homePath(locale))}#projects` },
            { '@type': 'ListItem', position: 3, name: p.title, item: url(projectPath(locale, p.slug)) },
          ],
        },
      ],
    },
  }
}

export function notFoundSeo(locale: Locale): Seo {
  const title = m.notfound_seo_title({}, { locale })
  return {
    title,
    description: m.notfound_text({}, { locale }),
    path: notFoundPath(locale),
    image: `${SITE}/og-image.jpg`,
    imageAlt: m.seo_home_image_alt({}, { locale }),
    type: 'profile',
    noindex: true,
    jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage', name: title, inLanguage: HTML_LANG[locale] },
  }
}
