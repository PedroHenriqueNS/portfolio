import type { ImageMetadata } from 'astro'
import type { TechId } from './tech'
import LinkezaImage from '@/assets/images/linkeza_preview.webp'
import JeModestoImage from '@/assets/images/je_modesto_preview.webp'
import ClauCamargoImage from '@/assets/images/clau_camargo_preview.webp'
import WsaMarmoresImage from '@/assets/images/wsa_marmores_preview.webp'
import PautasGobuzzImage from '@/assets/images/pautas_gobuzz_preview.webp'
import GobuzzAdsManagerImage from '@/assets/images/gobuzz_ads_manager_preview.webp'
import SeedingControleImage from '@/assets/images/seeding_controle_preview.webp'
import SandroMastellariImage from '@/assets/images/sandro_mastellari_preview.webp'
import EduardoBoiguesImage from '@/assets/images/eduardo_boigues_preview.webp'
import FlaviaMorandoSbcImage from '@/assets/images/flavia_morando_sbc_preview.webp'
import YtDlpGuiImage from '@/assets/images/yt_dlp_gui_preview.webp'
import AutoCropPdfImage from '@/assets/images/auto_crop_pdf_preview.webp'
import CloudBarueriImage from '@/assets/images/cloud_barueri_preview.webp'
import SnowhunterImage from '@/assets/images/snowhunter_preview.webp'
import YoutubeMusicCloneImage from '@/assets/images/yt_music_clone_preview.webp'
import SodieasyImage from '@/assets/images/sodieasy_preview.webp'
import TwonoteImage from '@/assets/images/twonote_preview.webp'

export type Kind = 'saas' | 'campaign' | 'institutional' | 'internal' | 'desktop' | 'web' | 'mobile'

export interface ProjectFacts {
  slug: string
  title: string
  /** Nome curto para títulos longos. */
  short?: string
  kind: Kind
  /** AAAA-MM, quando conhecido. */
  date?: string
  stack: TechId[]
  projectUrl?: string
  repoUrl?: string
  image: ImageMetadata
  ogImage: string
  featured: boolean
  /** Cor de palco dos destaques. */
  color?: string
}

/** Ordem de old/src/constants/projects.tsx: Linkeza e depois do mais recente ao mais antigo. */
export const PROJECTS: ProjectFacts[] = [
  { slug: 'linkeza', title: 'Linkeza', kind: 'saas', date: '2026-10', stack: ['typescript', 'astro', 'nestjs', 'typeorm', 'redis', 'clerk', 'cloudflare'], projectUrl: 'https://linkeza.com', repoUrl: 'https://github.com/linkeza', image: LinkezaImage, ogImage: 'https://linkeza.com/compartilhamento-landing-1200x630.jpg', featured: true, color: '#2B2BD9' },
  { slug: 'je-modesto', title: 'Jé Modesto 22555', short: 'Jé Modesto', kind: 'campaign', date: '2026-08', stack: ['react', 'typescript', 'vitejs', 'tailwind', 'tanstack', 'vitest'], image: JeModestoImage, ogImage: '/og/je-modesto.jpg', featured: true, color: '#0B6B3A' },
  { slug: 'clau-camargo', title: 'Clau Camargo 55655', short: 'Clau Camargo', kind: 'campaign', date: '2026-06', stack: ['react', 'typescript', 'vitejs', 'tailwind', 'tanstack', 'vitest'], image: ClauCamargoImage, ogImage: '/og/clau-camargo.jpg', featured: true, color: '#A8500A' },
  { slug: 'wsa-marmores', title: 'WSA Mármores e Granitos', short: 'WSA Mármores', kind: 'institutional', date: '2026-01', stack: ['react', 'typescript', 'vitejs', 'tailwind', 'gsap', 'shadcn'], image: WsaMarmoresImage, ogImage: '/og/wsa-marmores.jpg', featured: true, color: '#3B3A38' },
  { slug: 'pautas-gobuzz', title: 'Pautas Gobuzz', kind: 'internal', date: '2024-12', stack: ['react', 'vitejs', 'appwrite', 'tailwind', 'shadcn', 'react-query'], image: PautasGobuzzImage, ogImage: '/og/pautas-gobuzz.jpg', featured: true, color: '#A31750' },
  { slug: 'gobuzz-ads-manager', title: 'Gobuzz Ads Manager', kind: 'internal', date: '2024-09', stack: ['react', 'nextjs', 'appwrite', 'tailwind', 'shadcn'], image: GobuzzAdsManagerImage, ogImage: '/og/gobuzz-ads-manager.jpg', featured: false },
  { slug: 'seeding-controle', title: 'Seeding Controle', kind: 'desktop', date: '2024-08', stack: ['electron', 'vitejs', 'supabase', 'tailwind', 'shadcn', 'react-query'], image: SeedingControleImage, ogImage: '/og/seeding-controle.jpg', featured: false },
  { slug: 'sandro-mastellari', title: 'Sandro Mastellari', kind: 'campaign', date: '2024-09', stack: ['react', 'vitejs', 'tailwind', 'shadcn'], projectUrl: 'https://sandromastellari.com.br/', image: SandroMastellariImage, ogImage: '/og/sandro-mastellari.jpg', featured: false },
  { slug: 'eduardo-boigues', title: 'Eduardo Boigues', kind: 'campaign', date: '2024-08', stack: ['react', 'vitejs', 'tailwind', 'shadcn'], projectUrl: 'https://eduardoboigues.com.br/', image: EduardoBoiguesImage, ogImage: '/og/eduardo-boigues.jpg', featured: false },
  { slug: 'flavia-morando-sbc', title: 'Flavia Morando SBC', kind: 'campaign', date: '2024-08', stack: ['react', 'vitejs', 'tailwind', 'shadcn'], projectUrl: 'https://flaviamorandosbc.com.br/', image: FlaviaMorandoSbcImage, ogImage: '/og/flavia-morando-sbc.jpg', featured: false },
  { slug: 'yt-dlp-gui', title: 'YT DLP GUI', kind: 'desktop', date: '2024-08', stack: ['python'], repoUrl: 'https://github.com/PedroHenriqueNS/yt-dlp-gui', image: YtDlpGuiImage, ogImage: '/og/yt-dlp-gui.jpg', featured: false },
  { slug: 'auto-crop-pdf', title: 'Auto Crop PDF', kind: 'desktop', stack: ['electron', 'python', 'flask', 'vitejs'], repoUrl: 'https://github.com/PedroHenriqueNS/auto_crop_pdf', image: AutoCropPdfImage, ogImage: '/og/auto-crop-pdf.jpg', featured: false },
  { slug: 'cloud-barueri', title: 'Cloud Barueri', kind: 'web', stack: ['react', 'nodejs', 'express', 'docker', 'mysql'], image: CloudBarueriImage, ogImage: '/og/cloud-barueri.jpg', featured: false },
  { slug: 'snowhunter', title: 'SnowHunter', kind: 'web', stack: ['react', 'sanity', 'nodejs'], projectUrl: 'https://snowhunter.netlify.app/', image: SnowhunterImage, ogImage: '/og/snowhunter.jpg', featured: false },
  { slug: 'youtube-music-clone', title: 'Youtube Music Clone', kind: 'mobile', stack: ['react-native', 'expo'], repoUrl: 'https://github.com/PedroHenriqueNS/yt-music-clone', image: YoutubeMusicCloneImage, ogImage: '/og/youtube-music-clone.jpg', featured: false },
  { slug: 'sodieasy', title: 'SodiEasy', kind: 'mobile', stack: ['react-native', 'expo', 'nodejs', 'express'], image: SodieasyImage, ogImage: '/og/sodieasy.jpg', featured: false },
  { slug: 'twonote', title: 'TwoNote', kind: 'mobile', stack: ['ionic', 'angular'], repoUrl: 'https://github.com/PedroHenriqueNS/Notes', image: TwonoteImage, ogImage: '/og/twonote.jpg', featured: false },
]
