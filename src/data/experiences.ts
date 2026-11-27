export interface ExperienceFacts {
  id: string
  /** Vazio no freelancer: o nome vem da mensagem `xp_freelancer_company`. */
  company: string
  location: string
  year: number
  /** AAAA-MM, ou só AAAA quando o mês não importa. */
  start: string
  end?: string
  current?: boolean
  stack: string[]
}

export const EXPERIENCES: ExperienceFacts[] = [
  { id: 'linkeza', company: 'Linkeza', location: 'Carapicuíba, SP', year: 2026, start: '2026-10', current: true,
    stack: ['TypeScript', 'Astro', 'NestJS', 'TypeORM', 'Redis', 'Clerk', 'Cloudflare'] },
  { id: 'dry-pleno', company: 'Dry Telecom', location: 'Barueri, SP', year: 2026, start: '2026-03', end: '2026-07',
    stack: ['TypeScript', 'React.js', 'Next.js', 'React Native', 'NestJS', 'RabbitMQ', 'Python', 'AWS', 'Docker', 'PostgreSQL'] },
  { id: 'dry', company: 'Dry Telecom', location: 'Barueri, SP', year: 2025, start: '2025-05', end: '2026-03',
    stack: ['TypeScript', 'React.js', 'Next.js', 'NestJS', 'Python', 'AWS', 'ArgoCD', 'Grafana'] },
  { id: 'gobuzz', company: 'GoBuzz', location: 'São Paulo, SP', year: 2023, start: '2023-11', end: '2025-02',
    stack: ['TypeScript', 'React.js', 'Next.js', 'React Native', 'Electron', 'Node.js', 'Python', 'PostgreSQL'] },
  { id: 'freelancer', company: '', location: 'São Paulo, SP', year: 2021, start: '2021',
    stack: ['React.js', 'React Native', 'Next.js', 'Node.js', 'Express', 'TypeScript'] },
]

/** `dry-pleno`, 'role' -> `xp_dry_pleno_role` (as chaves de mensagem não aceitam hífen). */
export const xpKey = (id: string, field: 'role' | 'summary' | 'company') => `xp_${id.replace(/-/g, '_')}_${field}`
