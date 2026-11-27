import type { IconName } from '@/components/Icon.astro'
import type { Kind } from './projects'

// Um significado, um ícone, em todo o site (nomes de src/components/Icon.astro).
export const KIND_ICON: Record<Kind, IconName> = {
  saas: 'rocket',
  campaign: 'megaphone',
  institutional: 'building-2',
  internal: 'lock-keyhole',
  desktop: 'monitor',
  web: 'globe',
  mobile: 'smartphone',
}

export const GROUP_ICON: Record<'featured' | 'frontend' | 'backend', IconName> = {
  featured: 'star',
  frontend: 'layout-template',
  backend: 'server',
}
