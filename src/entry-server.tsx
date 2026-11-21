/**
 * Entrada usada só no build (vite build --ssr). scripts/prerender.mjs importa este
 * módulo para gerar o HTML estático de cada página, com <head> próprio, JSON-LD,
 * sitemap.xml e llms.txt. Nada aqui vai para o navegador.
 */
import { renderToString } from 'react-dom/server'
import App from './App'
import { ALL_PROJECTS, FEATURED_PROJECT, PROJECTS, projectPath, type Project } from './constants/projects'
import { Experiences } from './constants'

export const SITE = 'https://pedrohenriquens.com.br'
const PERSON_ID = `${SITE}/#pessoa`
const WEBSITE_ID = `${SITE}/#site`

const NAME = 'Pedro Henrique do Nascimento Silva'
const JOB_TITLE = 'Engenheiro de Software Full Stack'

const HOME_TITLE = 'Pedro Henrique | Engenheiro de Software Full Stack'
const HOME_DESCRIPTION = 'Engenheiro de Software Full Stack com mais de 5 anos em React, Next.js, React Native, NestJS e AWS. Fundador do Linkeza. Veja projetos, experiência e skills.'

const absolute = (url: string) => (url.startsWith('http') ? url : `${SITE}${url}`)
const isPublic = (url?: string) => !!url && url !== 'Private'

export interface Page {
    path: string
    /** Nome do arquivo gerado em dist/. */
    file: string
    title: string
    description: string
    image: string
    imageAlt: string
    type: 'profile' | 'article'
    jsonLd: object
    /** AAAA-MM, quando houver. */
    date?: string
}

const person = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: NAME,
    alternateName: ['Pedro Henrique', 'PedroHenriqueNS'],
    url: `${SITE}/`,
    image: `${SITE}/my_img_2.jpg`,
    jobTitle: JOB_TITLE,
    description: 'Engenheiro de software full stack com mais de 5 anos de experiência em TypeScript (React, Next.js, React Native, Node.js e NestJS) na AWS, sistemas orientados a eventos com RabbitMQ e SQS, e Kubernetes com ArgoCD e Grafana.',
    email: 'mailto:pedrohe.contato@gmail.com',
    telephone: '+55-11-97016-8417',
    address: { '@type': 'PostalAddress', addressLocality: 'Carapicuíba', addressRegion: 'SP', addressCountry: 'BR' },
    knowsLanguage: [
        { '@type': 'Language', name: 'Português', alternateName: 'pt' },
        { '@type': 'Language', name: 'Inglês', alternateName: 'en' },
    ],
    knowsAbout: [
        'TypeScript', 'JavaScript', 'Python', 'React', 'Next.js', 'React Native', 'Expo', 'Vite', 'Tailwind CSS',
        'Node.js', 'NestJS', 'Express', 'REST APIs', 'Domain-Driven Design', 'SOLID',
        'RabbitMQ', 'Amazon SQS', 'Arquitetura orientada a eventos',
        'PostgreSQL', 'MongoDB', 'DynamoDB', 'MySQL',
        'AWS', 'Kubernetes', 'ArgoCD', 'Grafana', 'Docker', 'CI/CD',
    ],
    alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Universidade Anhembi Morumbi' },
        { '@type': 'EducationalOrganization', name: 'ITB Brasílio Flores de Azevedo' },
    ],
    hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: 'Bacharelado em Ciência da Computação',
        credentialCategory: 'degree',
        recognizedBy: { '@type': 'CollegeOrUniversity', name: 'Universidade Anhembi Morumbi' },
    },
    worksFor: { '@type': 'Organization', name: 'Linkeza', url: 'https://linkeza.com' },
    sameAs: [
        'https://github.com/PedroHenriqueNS',
        'https://www.linkedin.com/in/PedroHenriqueNS/',
    ],
}

const creativeWork = (p: Project) => ({
    '@type': 'CreativeWork',
    '@id': `${SITE}${projectPath(p.slug)}#projeto`,
    name: p.title,
    description: p.summary,
    url: `${SITE}${projectPath(p.slug)}`,
    image: absolute(p.ogImage),
    ...(p.date && { dateCreated: p.date }),
    keywords: p.technologies.map(t => t.title).join(', '),
    creator: { '@id': PERSON_ID },
    inLanguage: 'pt-BR',
    ...((isPublic(p.projectUrl) || isPublic(p.repoUrl)) && {
        sameAs: [p.projectUrl, p.repoUrl].filter(isPublic),
    }),
})

const homePage: Page = {
    path: '/',
    file: 'index.html',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    image: `${SITE}/og-image.jpg`,
    imageAlt: 'Pedro Henrique, Engenheiro de Software Full Stack: React, Next.js, React Native, NestJS e AWS',
    type: 'profile',
    jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
            person,
            {
                '@type': 'WebSite',
                '@id': WEBSITE_ID,
                url: `${SITE}/`,
                name: 'Pedro Henrique | Portfólio',
                inLanguage: 'pt-BR',
                publisher: { '@id': PERSON_ID },
            },
            {
                '@type': 'ProfilePage',
                '@id': `${SITE}/#perfil`,
                url: `${SITE}/`,
                name: HOME_TITLE,
                description: HOME_DESCRIPTION,
                isPartOf: { '@id': WEBSITE_ID },
                mainEntity: { '@id': PERSON_ID },
                inLanguage: 'pt-BR',
            },
            {
                '@type': 'ItemList',
                name: 'Projetos de Pedro Henrique',
                itemListElement: ALL_PROJECTS.map((p, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    item: creativeWork(p),
                })),
            },
        ],
    },
}

const projectPage = (p: Project): Page => ({
    path: projectPath(p.slug),
    file: `projeto-${p.slug}.html`,
    title: `${p.title} | Projeto de Pedro Henrique`,
    description: p.summary,
    image: absolute(p.ogImage),
    imageAlt: `Prévia do projeto ${p.title}`,
    type: 'article',
    date: p.date,
    jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
            { ...creativeWork(p), creator: { '@type': 'Person', '@id': PERSON_ID, name: NAME, url: `${SITE}/` } },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE}/` },
                    { '@type': 'ListItem', position: 2, name: 'Projetos', item: `${SITE}/#projetos` },
                    { '@type': 'ListItem', position: 3, name: p.title, item: `${SITE}${projectPath(p.slug)}` },
                ],
            },
        ],
    },
})

export const PAGES: Page[] = [homePage, ...ALL_PROJECTS.map(projectPage)]

export const render = (path: string) => renderToString(<App pathname={path} />)

const attr = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** <head> de uma página. O JSON-LD tem `<` escapado para nunca fechar o <script>. */
export const head = (page: Page) => {
    const url = `${SITE}${page.path}`
    const json = JSON.stringify(page.jsonLd).replace(/</g, '\\u003c')
    return [
        `<title>${attr(page.title)}</title>`,
        `<meta name="description" content="${attr(page.description)}" />`,
        `<link rel="canonical" href="${url}" />`,
        `<meta property="og:type" content="${page.type}" />`,
        `<meta property="og:site_name" content="Pedro Henrique" />`,
        `<meta property="og:locale" content="pt_BR" />`,
        `<meta property="og:title" content="${attr(page.title)}" />`,
        `<meta property="og:description" content="${attr(page.description)}" />`,
        `<meta property="og:url" content="${url}" />`,
        `<meta property="og:image" content="${attr(page.image)}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="${attr(page.imageAlt)}" />`,
        ...(page.type === 'profile'
            ? [`<meta property="profile:first_name" content="Pedro Henrique" />`, `<meta property="profile:last_name" content="do Nascimento Silva" />`]
            : [`<meta property="article:author" content="${SITE}/" />`]),
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${attr(page.title)}" />`,
        `<meta name="twitter:description" content="${attr(page.description)}" />`,
        `<meta name="twitter:image" content="${attr(page.image)}" />`,
        `<script type="application/ld+json">${json}</script>`,
    ].join('\n    ')
}

export const sitemap = (buildDate: string) => {
    const entries = PAGES.map(p => [
        '  <url>',
        `    <loc>${SITE}${p.path}</loc>`,
        `    <lastmod>${buildDate}</lastmod>`,
        '  </url>',
    ].join('\n'))
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`
}

/** Resumo em Markdown para assistentes de IA (https://llmstxt.org). */
export const llmsTxt = (buildDate: string) => {
    const project = (p: Project) => {
        const links = [
            isPublic(p.projectUrl) && `site: ${p.projectUrl}`,
            isPublic(p.repoUrl) && `código: ${p.repoUrl}`,
        ].filter(Boolean).join(' · ')
        return `- [${p.title}](${SITE}${projectPath(p.slug)}): ${p.summary} Stack: ${p.technologies.map(t => t.title).join(', ')}.${links ? ` (${links})` : ''}`
    }

    return `# Pedro Henrique do Nascimento Silva

> ${JOB_TITLE} em Carapicuíba, SP (Grande São Paulo), com mais de 5 anos de experiência em TypeScript: React, Next.js, React Native, Node.js e NestJS, na AWS. Fundador do Linkeza. Português nativo, inglês avançado.

Atualizado em ${buildDate}. Fonte: ${SITE}/

## Contato

- E-mail: pedrohe.contato@gmail.com
- WhatsApp: +55 11 97016-8417
- GitHub: https://github.com/PedroHenriqueNS
- LinkedIn: https://www.linkedin.com/in/PedroHenriqueNS/
- Currículo em português (PDF): ${SITE}/curriculo_PedroHenrique.pdf
- Resume in English (PDF): ${SITE}/resume_PedroHenrique_EN.pdf

## Experiência

${Experiences.map(e => `- **${e.role}${e.highlight ? ` ${e.highlight}` : ''}, ${e.company}** (${e.location}, ${e.period}): ${e.summary} Stack: ${e.stack.join(', ')}.`).join('\n')}

## Formação

- Bacharelado em Ciência da Computação, Universidade Anhembi Morumbi (2025)
- Técnico em Telecomunicações, ITB Brasílio Flores de Azevedo

## Competências

${person.knowsAbout.join(', ')}.

## Projeto em destaque

${project(FEATURED_PROJECT)}

## Projetos

${PROJECTS.map(project).join('\n')}
`
}
