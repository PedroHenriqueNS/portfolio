import { AngularIcon, AppwriteIcon, DockerIcon, ElectronIcon, ExpoIcon, ExpressIcon, FlaskIcon, IonicIcon, MySQLIcon, NextJSIcon, NodeJSIcon, PythonIcon, ReactIcon, ReactQueryIcon, SanityIcon, ShadCNIcon, SupabaseIcon, TailwindIcon, ViteJSIcon } from "@/assets/icons";

export const ProjectTechnologies = {
    'pautas_gobuzz': [
        {
            title: 'React.js',
            image: ReactIcon
        },
        {
            title: 'Vite',
            image: ViteJSIcon
        },
        {
            title: 'Appwrite',
            image: AppwriteIcon
        },
        {
            title: 'Tailwind CSS',
            image: TailwindIcon
        },
        {
            title: 'ShadCN/ui',
            image: ShadCNIcon
        },
        {
            title: 'React Query',
            image: ReactQueryIcon
        },
    ],
    'gobuzz_ads_manager': [
        {
            title: 'React.js',
            image: ReactIcon,
        },
        {
            title: 'Next.js',
            image: NextJSIcon,
        },
        {
            title: 'Appwrite',
            image: AppwriteIcon,
        },
        {
            title: 'Tailwind CSS',
            image: TailwindIcon,
        },
        {
            title: 'ShadCN/ui',
            image: ShadCNIcon,
        },
    ],
    'seeding_controle': [
        {
            title: 'Electron',
            image: ElectronIcon
        },
        {
            title: 'Vite',
            image: ViteJSIcon,
        },
        {
            title: 'Supabase',
            image: SupabaseIcon,
        },
        {
            title: 'Tailwind CSS',
            image: TailwindIcon,
        },
        {
            title: 'ShadCN/ui',
            image: ShadCNIcon,
        },
        {
            title: 'React Query',
            image: ReactQueryIcon,
        },
    ],
    'sandro_mastellari': [
        {
            title: 'React.js',
            image: ReactIcon,
        },
        {
            title: 'Vite',
            image: ViteJSIcon,
        },
        {
            title: 'Tailwind CSS',
            image: TailwindIcon,
        },
        {
            title: 'ShadCN/ui',
            image: ShadCNIcon,
        },
    ],
    'eduardo_boigues': [
        {
            title: 'React.js',
            image: ReactIcon,
        },
        {
            title: 'Vite',
            image: ViteJSIcon,
        },
        {
            title: 'Tailwind CSS',
            image: TailwindIcon,
        },
        {
            title: 'ShadCN/ui',
            image: ShadCNIcon,
        },
    ],
    'flavia_morando_sbc': [
        {
            title: 'React.js',
            image: ReactIcon,
        },
        {
            title: 'Vite',
            image: ViteJSIcon,
        },
        {
            title: 'Tailwind CSS',
            image: TailwindIcon,
        },
        {
            title: 'ShadCN/ui',
            image: ShadCNIcon,
        },
    ],
    'yt_dlp_gui': [
        {
            title: 'Python',
            image: PythonIcon,
        },
    ],
    'auto_crop_pdf': [
        {
            title: 'Electron',
            image: ElectronIcon,
        },
        {
            title: 'Python',
            image: PythonIcon,
        },
        {
            title: 'Flask',
            image: FlaskIcon,
        },
        {
            title: 'Vite',
            image: ViteJSIcon,
        },
    ],
    'cloud_barueri': [
        {
            title: 'React.js',
            image: ReactIcon,
        },
        {
            title: 'Node.js',
            image: NodeJSIcon,
        },
        {
            title: 'Express',
            image: ExpressIcon,
        },
        {
            title: 'Docker',
            image: DockerIcon,
        },
        {
            title: 'MySQL',
            image: MySQLIcon,
        },
    ],
    'snowhunter': [
        {
            title: 'React.js',
            image: ReactIcon,
        },
        {
            title: 'Sanity',
            image: SanityIcon,
        },
        {
            title: 'Node.js',
            image: NodeJSIcon,
        },
    ],
    'yt_music_clone': [
        {
            title: 'React Native',
            image: ReactIcon,
        },
        {
            title: 'Expo',
            image: ExpoIcon,
        }
    ],
    'sodieasy': [
        {
            title: 'React Native',
            image: ReactIcon,
        },
        {
            title: 'Expo',
            image: ExpoIcon,
        },
        {
            title: 'Node.js',
            image: NodeJSIcon,
        },
        {
            title: 'Express',
            image: ExpressIcon,
        },
    ],
    'twonote': [
        {
            title: 'Ionic',
            image: IonicIcon,
        },
        {
            title: 'Angular',
            image: AngularIcon,
        },
    ]
}

export interface IExperience {
    role: string
    highlight?: string
    company: string
    location: string
    period: string
    current?: boolean
    summary: string
    stack: string[]
}

export const Experiences: IExperience[] = [
    {
        role: 'Engenheiro de Software',
        highlight: 'Pleno',
        company: 'Dry Telecom',
        location: 'São Paulo, SP',
        period: 'mar/2026 — presente',
        current: true,
        summary: 'Defino padrões técnicos, decisões de arquitetura e fluxos de CI/CD para um time de 5 desenvolvedores; mentoria via code reviews e pair programming; 10+ aplicações em produção (10k+ usuários, 20k+ linhas de TypeScript).',
        stack: ['TypeScript', 'React.js', 'Next.js', 'React Native', 'NestJS', 'Python', 'AWS', 'Docker', 'PostgreSQL'],
    },
    {
        role: 'Engenheiro de Software',
        company: 'Dry Telecom',
        location: 'São Paulo, SP',
        period: 'mai/2025 — mar/2026',
        summary: 'Interfaces web com React (Vite) e Next.js (SSR); APIs REST em NestJS com PostgreSQL/DynamoDB; automações em Python; gestão de infraestrutura AWS (EC2, EKS, Lambda, S3, RDS, SQS, Cognito, SES).',
        stack: ['TypeScript', 'React.js', 'Next.js', 'NestJS', 'Python', 'AWS'],
    },
    {
        role: 'Analista de Dados & Desenvolvedor',
        company: 'GoBuzz',
        location: 'São Paulo, SP',
        period: 'nov/2023 — fev/2025',
        summary: 'Dashboards e análise de dados de redes sociais com Python/PostgreSQL/Power BI; sistemas internos web, desktop e mobile; automações e integrações de API.',
        stack: ['Python', 'PostgreSQL', 'React.js', 'React Native', 'Electron', 'Node.js'],
    },
    {
        role: 'Desenvolvedor Full Stack (Freelancer)',
        company: 'Atuação independente',
        location: 'São Paulo, SP',
        period: 'desde 2022',
        summary: 'Aplicações web e mobile sob demanda, ponta a ponta — requisitos, arquitetura, desenvolvimento e deploy.',
        stack: ['React.js', 'React Native', 'Next.js', 'Node.js', 'Express', 'TypeScript'],
    },
]

export interface IMetric {
    value: number
    prefix?: string
    suffix?: string
    label: string
}

export const Metrics: IMetric[] = [
    { value: 4, suffix: '+', label: 'anos de experiência' },
    { value: 10, suffix: '+', label: 'apps em produção' },
    { value: 10, suffix: 'k+', label: 'usuários atendidos' },
    { value: 1275, label: 'commits · 234 PRs revisados' },
]