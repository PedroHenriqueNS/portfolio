export interface RoleFacts {
  /** Prefixo das mensagens do cargo (`xpKey`): 'dry-pleno' -> `xp_dry_pleno_role`. */
  id: string
  /** AAAA-MM, ou só AAAA quando o mês não importa. */
  start: string
  end?: string
  stack: string[]
}

export interface ExperienceFacts {
  /** Também é o prefixo de `xp_<id>_company` quando `company` está vazio. */
  id: string
  /** Vazio no freelancer: o nome vem da mensagem `xp_freelancer_company`. */
  company: string
  location: string
  /** Ano de entrada na empresa (o ano gigante). */
  year: number
  /** Período inteiro na empresa. */
  start: string
  end?: string
  current?: boolean
  /** Do mais recente para o mais antigo; um item quando não houve promoção. */
  roles: RoleFacts[]
}

export const EXPERIENCES: ExperienceFacts[] = [
  { id: 'linkeza', company: 'Linkeza', location: 'Carapicuíba, SP', year: 2026, start: '2026-10', current: true, roles: [
    { id: 'linkeza', start: '2026-10', stack: ['TypeScript', 'Astro', 'NestJS', 'TypeORM', 'Redis', 'Clerk', 'Cloudflare'] },
  ] },
  { id: 'dry-telecom', company: 'Dry Telecom', location: 'Barueri, SP', year: 2025, start: '2025-05', end: '2026-07', roles: [
    { id: 'dry-pleno', start: '2026-03', end: '2026-07',
      stack: ['TypeScript', 'React.js', 'Next.js', 'React Native', 'NestJS', 'RabbitMQ', 'Python', 'AWS', 'Docker', 'PostgreSQL'] },
    { id: 'dry', start: '2025-05', end: '2026-03',
      stack: ['TypeScript', 'React.js', 'Next.js', 'NestJS', 'Python', 'AWS', 'ArgoCD', 'Grafana'] },
  ] },
  { id: 'gobuzz', company: 'GoBuzz', location: 'São Paulo, SP', year: 2023, start: '2023-11', end: '2025-02', roles: [
    { id: 'gobuzz', start: '2023-11', end: '2025-02',
      stack: ['TypeScript', 'React.js', 'Next.js', 'React Native', 'Electron', 'Node.js', 'Python', 'PostgreSQL'] },
  ] },
  { id: 'freelancer', company: '', location: 'São Paulo, SP', year: 2021, start: '2021', roles: [
    { id: 'freelancer', start: '2021', stack: ['React.js', 'React Native', 'Next.js', 'Node.js', 'Express', 'TypeScript'] },
  ] },
]

/** União das stacks dos cargos, sem repetição, na ordem em que aparecem. */
export const stackOf = (e: ExperienceFacts) => [...new Set(e.roles.flatMap((r) => r.stack))]

/** O cargo sem fim numa empresa atual é o atual. */
export const isCurrentRole = (e: ExperienceFacts, r: RoleFacts) => !!e.current && !r.end

/** `dry-pleno`, 'role' -> `xp_dry_pleno_role` (as chaves de mensagem não aceitam hífen). */
export const xpKey = (id: string, field: 'role' | 'summary' | 'company') => `xp_${id.replace(/-/g, '_')}_${field}`
