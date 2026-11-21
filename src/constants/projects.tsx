import type { ReactNode } from 'react'
import {
    AutoCropPdfPreview, ClauCamargoPreview, CloudBarueriPreview, EduardoBoiguesPreview, FlaviaMorandoPreview,
    GobuzzAdsManagerPreview, JeModestoPreview, PautasGobuzzPreview, SandroMastellariPreview, SeedingControlePreview,
    SnowHunterPreview, SodiEasyPreview, TwoNotePreview, WSAMarmoresPreview, YTDLPGUIPreview, YTMusicClone,
} from '@/assets/images'
import { ProjectTechnologies } from '@/constants'

export type Technology = { title: string; image: string }

export interface Project {
    /** Usado na URL: /projetos/<slug>. Minúsculas, números e hífens. */
    slug: string
    title: string
    /** Prévia exibida no card, no modal e na página do projeto. */
    image: string
    /** Imagem de compartilhamento 1200x630 (caminho absoluto no site ou URL completa). */
    ogImage: string
    technologies: Technology[]
    /** Mês de criação no formato AAAA-MM, quando conhecido. */
    date?: string
    projectUrl?: string | 'Private'
    repoUrl?: string | 'Private'
    /** Uma frase, até ~155 caracteres: meta description, JSON-LD e llms.txt. */
    summary: string
    description: ReactNode
}

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

/** '2024-12' -> 'Dezembro de 2024' */
export const formatMonth = (date?: string) => {
    if (!date) return undefined
    const [year, month] = date.split('-').map(Number)
    return `${MONTHS[month - 1]} de ${year}`
}

export const projectPath = (slug: string) => `/projetos/${slug}`

export const FEATURED_PROJECT: Project = {
    slug: 'linkeza',
    title: 'Linkeza',
    image: 'https://linkeza.com/compartilhamento-landing-1200x630.jpg',
    ogImage: 'https://linkeza.com/compartilhamento-landing-1200x630.jpg',
    technologies: ProjectTechnologies['linkeza'],
    date: '2026-10',
    projectUrl: 'https://linkeza.com',
    repoUrl: 'https://github.com/linkeza',
    summary: 'Linkeza: encurtador de links brasileiro com QR Code dinâmico e WhatsApp com rodízio de atendentes. SaaS próprio, feito com Astro, NestJS e Redis.',
    description: (
        <div className='project-description-text'>
            <p>O <strong>Linkeza</strong> é um encurtador de links brasileiro com <strong>QR Code dinâmico</strong> e link de <strong>WhatsApp com rodízio de atendentes</strong>, pensado para negócios locais.</p>
            <p>O mesmo QR Code impresso leva cada cliente a um atendente sorteado no WhatsApp, mostra de onde veio cada contato e muda de destino quando o negócio precisar, sem reimprimir nada.</p>
            <p>É um SaaS que estou construindo sozinho de ponta a ponta: produto, arquitetura, front-end em <strong>Astro</strong>, API em <strong>NestJS</strong> com <strong>TypeORM</strong>, filas e cache com <strong>Redis</strong>, autenticação com <strong>Clerk</strong> e borda na <strong>Cloudflare</strong>, além da identidade visual e do lançamento.</p>
            <p>Está em pré-lançamento, com lista de espera aberta em linkeza.com.</p>
        </div>
    ),
}

/** Ordem da grade: do mais recente para o mais antigo. */
export const PROJECTS: Project[] = [
    {
        slug: 'je-modesto',
        title: 'Jé Modesto 22555',
        image: JeModestoPreview,
        ogImage: '/og/je-modesto.jpg',
        technologies: ProjectTechnologies['je_modesto'],
        date: '2026-08',
        repoUrl: 'Private',
        summary: 'Site de campanha de Jé Modesto (2026): gerador de selo com a foto processada só no navegador via Canvas API, com suporte a HEIC. React 19 e Vitest.',
        description: (
            <div className='project-description-text'>
                <p>Site de campanha do candidato a deputado estadual Jé Modesto, no Sudoeste Paulista, em 2026: o apoiador envia uma foto, posiciona dentro do selo oficial da campanha e baixa a imagem pronta para compartilhar.</p>
                <p>Todo o processamento acontece no navegador com a <strong>Canvas API</strong>: a foto nunca sai do aparelho e não existe backend. Aceita fotos de iPhone (HEIC) com um decodificador WebAssembly carregado só quando necessário.</p>
                <p>Reaproveita o motor de molduras do projeto da Clau Camargo, com a geometria remedida para a nova arte e o layout reproduzido a partir do design em desktop e celular.</p>
                <p>Feito em <strong>React 19</strong> com <strong>React Compiler</strong>, <strong>TypeScript</strong>, <strong>Vite</strong> e <strong>Tailwind CSS</strong>, com 74 testes em <strong>Vitest</strong> e deploy automatizado via <strong>GitHub Actions</strong>.</p>
            </div>
        ),
    },
    {
        slug: 'clau-camargo',
        title: 'Clau Camargo 55655',
        image: ClauCamargoPreview,
        ogImage: '/og/clau-camargo.jpg',
        technologies: ProjectTechnologies['clau_camargo'],
        date: '2026-06',
        repoUrl: 'Private',
        summary: 'Plataforma de campanha de Clau Camargo (2026): moldura de foto no navegador, molduras de apoiadores, vídeos por cidade para QR Codes e colinha em canvas.',
        description: (
            <div className='project-description-text'>
                <p>Site de campanha da candidata a deputada estadual Clau Camargo em 2026, que cresceu de um gerador de moldura de foto para uma plataforma com várias frentes.</p>
                <p>Gerador de moldura com a foto processada só no navegador (<strong>Canvas API</strong>, suporte a HEIC), molduras co-assinadas por apoiadores em URLs próprias, páginas de vídeo por cidade para QR Codes impressos com player próprio, e a "Minha Colinha", que desenha e exporta a colinha de votação em canvas.</p>
                <p>As páginas de apoiadores e cidades são pré-renderizadas no build por um plugin <strong>Vite</strong> próprio, para que o link mostre a prévia certa no WhatsApp. Métricas por cidade e canal com <strong>Google Tag Manager</strong> e <strong>GA4</strong>, com política de privacidade alinhada à LGPD.</p>
                <p>Feito em <strong>React 19</strong> com <strong>React Compiler</strong>, <strong>TypeScript</strong>, <strong>TanStack Router</strong> e <strong>Tailwind CSS</strong>, com mais de 370 testes em <strong>Vitest</strong> e deploy via <strong>GitHub Actions</strong> a cada release.</p>
            </div>
        ),
    },
    {
        slug: 'wsa-marmores',
        title: 'WSA Mármores e Granitos',
        image: WSAMarmoresPreview,
        ogImage: '/og/wsa-marmores.jpg',
        technologies: ProjectTechnologies['wsa_marmores'],
        date: '2026-01',
        repoUrl: 'Private',
        summary: 'Site institucional da WSA Mármores e Granitos: galeria de obras, catálogo de pedras e contato com mapa. React, Vite, Tailwind CSS e animações em GSAP.',
        description: (
            <div className='project-description-text'>
                <p>Site institucional de uma marmoraria, com landing page, página sobre a empresa, galeria de obras por categoria, catálogo de pedras e contato com mapa do <strong>Google Maps</strong>.</p>
                <p>A navegação é feita com <strong>React Router</strong> e as animações com <strong>GSAP</strong>, <strong>Motion</strong> e efeitos de parallax, com versão própria para celular.</p>
                <p>Todos os pedidos de orçamento levam ao <strong>WhatsApp</strong>, e o site conta com SEO, <strong>Google Analytics</strong> e política de privacidade.</p>
                <p>Feito em <strong>React.js</strong> com <strong>Vite</strong>, <strong>TypeScript</strong>, <strong>Tailwind CSS</strong> e componentes do <strong>ShadCN</strong>.</p>
            </div>
        ),
    },
    {
        slug: 'pautas-gobuzz',
        title: 'Pautas Gobuzz',
        image: PautasGobuzzPreview,
        ogImage: '/og/pautas-gobuzz.jpg',
        technologies: ProjectTechnologies['pautas_gobuzz'],
        date: '2024-12',
        projectUrl: 'Private',
        repoUrl: 'Private',
        summary: 'Gerenciador de pautas para redes sociais com registro e estatísticas automatizados via Appwrite Functions. React, Vite, ShadCN e React Query.',
        description: (
            <div className='project-description-text'>
                <p>Um gerenciador de pautas para publicações de redes sociais, em que todo o processo de controle de pautas e de visualização de insights dos resultados é automatizado.</p>
                <p>O registro das pautas e a atualização de estatísticas são feitos automaticamente pelas Functions do <strong>Appwrite</strong>, que também cuida do banco de dados e da autenticação de usuários.</p>
                <p>A interface é padronizada com os componentes customizáveis do <strong>ShadCN</strong> e usa o <strong>React Query</strong> para padronizar, controlar e minimizar chamadas de API.</p>
                <p>Para otimizar a página, foi utilizado o <strong>Vite</strong>.</p>
            </div>
        ),
    },
    {
        slug: 'gobuzz-ads-manager',
        title: 'Gobuzz Ads Manager',
        image: GobuzzAdsManagerPreview,
        ogImage: '/og/gobuzz-ads-manager.jpg',
        technologies: ProjectTechnologies['gobuzz_ads_manager'],
        date: '2024-09',
        projectUrl: 'Private',
        repoUrl: 'Private',
        summary: 'Gerenciador de anúncios da Meta em Next.js: publicação, agendamento automático e insights, com toda a lógica no servidor e dados no Appwrite.',
        description: (
            <div className='project-description-text'>
                <p>Um gerenciador de anúncios da <strong>Meta</strong>, em que é possível publicar novos anúncios, programar anúncios automáticos e visualizar insights sobre eles.</p>
                <p>A aplicação faz requisições diretamente à API da <strong>Meta</strong> usando dados previamente registrados sobre os perfis e as contas de anúncio, que ficam salvos no banco de dados do <strong>Appwrite</strong>.</p>
                <p>Toda ação é realizada no lado do servidor com o server-side rendering do <strong>Next.js</strong>: o usuário tem acesso apenas às informações que devem aparecer na interface.</p>
            </div>
        ),
    },
    {
        slug: 'seeding-controle',
        title: 'Seeding Controle',
        image: SeedingControlePreview,
        ogImage: '/og/seeding-controle.jpg',
        technologies: ProjectTechnologies['seeding_controle'],
        date: '2024-08',
        repoUrl: 'Private',
        summary: 'App desktop em Electron para seeders registrarem comentários em redes sociais, com UI otimista, React Query e sincronização em nuvem via Supabase.',
        description: (
            <div className='project-description-text'>
                <p>Um controlador de comentários em que os <strong>Seeders</strong> das redes sociais registram seus resultados à medida que trabalham.</p>
                <p>Depois, o aplicativo adapta os dados para o banco de dados usado pela empresa para análise, através do botão <strong>Seeding</strong>.</p>
                <p>A aplicação desktop é montada com o <strong>Electron</strong>, com tudo programado em <strong>React.js</strong> com <strong>Vite</strong>.</p>
                <p>Todo o controle é salvo em nuvem no <strong>Supabase</strong>, que também cuida da autenticação dos usuários.</p>
                <p>A aplicação foi construída com <i>"UI otimista"</i>: a resposta é prevista e aplicada na hora, enquanto requisições com <strong>React Query</strong> salvam as modificações em segundo plano.</p>
            </div>
        ),
    },
    {
        slug: 'sandro-mastellari',
        title: 'Sandro Mastellari',
        image: SandroMastellariPreview,
        ogImage: '/og/sandro-mastellari.jpg',
        technologies: ProjectTechnologies['sandro_mastellari'],
        date: '2024-09',
        projectUrl: 'https://sandromastellari.com.br/',
        repoUrl: 'Private',
        summary: 'Página de apresentação do candidato a vereador Sandro Mastellari, em Santos (SP), em 2024. React.js com Vite e Tailwind CSS.',
        description: (
            <div className='project-description-text'>
                <p>Uma página web para apresentar o candidato a vereador em Santos, SP, em 2024.</p>
                <p>A página foi feita em <strong>React.js</strong> com <strong>Vite</strong> e estilizada em <strong>Tailwind CSS</strong>.</p>
                <p>Design simples, feito para ressaltar o candidato.</p>
            </div>
        ),
    },
    {
        slug: 'eduardo-boigues',
        title: 'Eduardo Boigues',
        image: EduardoBoiguesPreview,
        ogImage: '/og/eduardo-boigues.jpg',
        technologies: ProjectTechnologies['eduardo_boigues'],
        date: '2024-08',
        projectUrl: 'https://eduardoboigues.com.br/',
        repoUrl: 'Private',
        summary: 'Site de campanha à reeleição em Itaquaquecetuba (SP), 2024, com formulário de ideias enviado a uma API. React.js, Vite e Tailwind CSS.',
        description: (
            <div className='project-description-text'>
                <p>Uma página web para apresentar o candidato à reeleição para prefeito de Itaquaquecetuba, SP, em 2024, e incentivar os eleitores a contribuir com ideias de ações para o próximo governo.</p>
                <p>A página foi feita em <strong>React.js</strong> com <strong>Vite</strong> e estilizada em <strong>Tailwind CSS</strong>.</p>
                <p>O formulário é fácil de preencher em qualquer dispositivo e respeita as informações mais privadas, que o usuário escolhe enviar ou não.</p>
                <p>As ideias são enviadas a uma <strong>API</strong>, que salva as informações para análise posterior.</p>
            </div>
        ),
    },
    {
        slug: 'flavia-morando-sbc',
        title: 'Flavia Morando SBC',
        image: FlaviaMorandoPreview,
        ogImage: '/og/flavia-morando-sbc.jpg',
        technologies: ProjectTechnologies['flavia_morando_sbc'],
        date: '2024-08',
        projectUrl: 'https://flaviamorandosbc.com.br/',
        repoUrl: 'Private',
        summary: 'Página de apresentação da candidata à prefeita de São Bernardo do Campo (SP), em 2024. React.js com Vite e Tailwind CSS.',
        description: (
            <div className='project-description-text'>
                <p>Uma página web para apresentar a candidata à prefeita de São Bernardo do Campo, SP, em 2024.</p>
                <p>Feita em <strong>React.js</strong> com <strong>Vite</strong> e estilizada em <strong>Tailwind CSS</strong>.</p>
                <p>Design simples, baseado em artes feitas por <i>designers</i> para ressaltar a candidata e seus apoiadores.</p>
            </div>
        ),
    },
    {
        slug: 'yt-dlp-gui',
        title: 'YT DLP GUI',
        image: YTDLPGUIPreview,
        ogImage: '/og/yt-dlp-gui.jpg',
        technologies: ProjectTechnologies['yt_dlp_gui'],
        date: '2024-08',
        repoUrl: 'https://github.com/PedroHenriqueNS/yt-dlp-gui',
        summary: 'Interface gráfica desktop em Python (CustomTkinter) para o yt-dlp: baixa vídeos de qualquer site suportado e converte qualidade e formato.',
        description: (
            <div className='project-description-text'>
                <p>Um aplicativo desktop para baixar vídeos de qualquer site que o <strong>yt_dlp</strong> suporte.</p>
                <p>A aplicação é construída em torno do pacote <strong>yt_dlp</strong>, com o objetivo de dar a ele uma interface gráfica.</p>
                <p>Além de baixar vídeos de qualquer site suportado e em alta qualidade, também é possível converter qualidade e formato.</p>
                <p>Para a interface gráfica foi usado o pacote <strong>CustomTkinter</strong>.</p>
            </div>
        ),
    },
    {
        slug: 'auto-crop-pdf',
        title: 'Auto Crop PDF',
        image: AutoCropPdfPreview,
        ogImage: '/og/auto-crop-pdf.jpg',
        technologies: ProjectTechnologies['auto_crop_pdf'],
        repoUrl: 'https://github.com/PedroHenriqueNS/auto_crop_pdf',
        summary: 'App desktop que recorta PDFs automaticamente, feito para relatórios do Power BI: Electron e React no front, API local em Flask (Python) no back.',
        description: (
            <div className='project-description-text'>
                <p>Uma aplicação desktop para recortar PDFs automaticamente.</p>
                <p>Foi construída para recortar relatórios do <strong>Power BI</strong>, que deixam grandes bordas quando exportados em PDF.</p>
                <p>A aplicação é montada com <strong>Electron</strong> e <strong>React.js</strong> com <strong>Vite</strong>.</p>
                <p>Para recortar, o usuário seleciona vários arquivos, escolhe as configurações e os envia para uma API local aberta pelo aplicativo, feita em <strong>Flask</strong> com <strong>Python</strong>.</p>
            </div>
        ),
    },
    {
        slug: 'cloud-barueri',
        title: 'Cloud Barueri',
        image: CloudBarueriPreview,
        ogImage: '/og/cloud-barueri.jpg',
        technologies: ProjectTechnologies['cloud_barueri'],
        projectUrl: 'Private',
        repoUrl: 'Private',
        summary: 'Armazenamento de arquivos grandes em servidor local com interface no estilo Google Drive: React.js, API em Node.js e MySQL, rodando em Docker.',
        description: (
            <div className='project-description-text'>
                <p>Uma aplicação web para armazenar arquivos grandes em um servidor local específico.</p>
                <p>A ideia é lidar com os arquivos de gravação e transmissão com facilidade, armazenando e acessando com uma interface familiar a quem usa o <strong>Google Drive</strong>.</p>
                <p>A página web é construída com <strong>React.js</strong>.</p>
                <p>O back-end é feito em <strong>Node.js</strong>, com banco de dados <strong>MySQL</strong> e uma unidade de armazenamento fornecida pelo <strong>Docker</strong> no sistema operacional <strong>Unraid</strong>.</p>
            </div>
        ),
    },
    {
        slug: 'snowhunter',
        title: 'SnowHunter',
        image: SnowHunterPreview,
        ogImage: '/og/snowhunter.jpg',
        technologies: ProjectTechnologies['snowhunter'],
        projectUrl: 'https://snowhunter.netlify.app/',
        repoUrl: 'Private',
        summary: 'Site para exibir projetos de modelagem 3D e novidades das redes sociais do criador, feito em React.js com conteúdo gerenciado no Sanity.',
        description: (
            <div className='project-description-text'>
                <p>Um site para exibir projetos de modelagem 3D e publicar novidades das redes sociais do criador.</p>
                <p>A página é feita em <strong>React.js</strong>, com back-end no <strong>Sanity</strong>.</p>
            </div>
        ),
    },
    {
        slug: 'youtube-music-clone',
        title: 'Youtube Music Clone',
        image: YTMusicClone,
        ogImage: '/og/youtube-music-clone.jpg',
        technologies: ProjectTechnologies['yt_music_clone'],
        repoUrl: 'https://github.com/PedroHenriqueNS/yt-music-clone',
        summary: 'Clone mobile do antigo YouTube Music que toca as músicas salvas no aparelho, feito em React Native com Expo.',
        description: (
            <div className='project-description-text'>
                <p>Um aplicativo mobile clone do antigo <strong>YouTube Music</strong>, com acesso às músicas salvas localmente no dispositivo.</p>
                <p>Uma interface simples, muito parecida com a <i>original</i>, mas sem a pesquisa de músicas online no YouTube.</p>
                <p>A aplicação é feita em <strong>React Native</strong> com o framework <strong>Expo</strong>.</p>
            </div>
        ),
    },
    {
        slug: 'sodieasy',
        title: 'SodiEasy',
        image: SodiEasyPreview,
        ogImage: '/og/sodieasy.jpg',
        technologies: ProjectTechnologies['sodieasy'],
        repoUrl: 'Private',
        summary: 'App mobile para orçamentos de materiais de construção da Sodimac pelo ID do produto, com API em Node.js que faz web scraping dos preços.',
        description: (
            <div className='project-description-text'>
                <p>Um aplicativo mobile para fazer orçamentos de materiais de construção com produtos disponíveis na <strong>Sodimac</strong>.</p>
                <p>A aplicação faz requisições a uma API que realiza o <i>web scraping</i> do site da Sodimac a partir do ID do produto, salvando os dados e atualizando-os conforme mudam no site oficial.</p>
                <p>O projeto é destinado a um atendente da empresa, que naturalmente busca os produtos pelo ID; por isso toda a busca é baseada no ID do produto.</p>
                <p>O aplicativo é construído em <strong>React Native</strong> com o framework <strong>Expo</strong>.</p>
            </div>
        ),
    },
    {
        slug: 'twonote',
        title: 'TwoNote',
        image: TwoNotePreview,
        ogImage: '/og/twonote.jpg',
        technologies: ProjectTechnologies['twonote'],
        repoUrl: 'https://github.com/PedroHenriqueNS/Notes',
        summary: 'Primeiro projeto mobile, da faculdade: bloco de notas com salvamento automático feito em Angular com o framework Ionic.',
        description: (
            <div className='project-description-text'>
                <p>O primeiro projeto mobile, feito para finalizar o semestre na universidade.</p>
                <p>O objetivo é um bloco de notas com salvamento automático; daí o nome, inspirado no <i>"Microsoft OneNote"</i> 😁😁</p>
                <p>A aplicação é construída com <strong>Angular</strong> através do framework <strong>Ionic</strong>.</p>
            </div>
        ),
    },
]

export const ALL_PROJECTS: Project[] = [FEATURED_PROJECT, ...PROJECTS]

export const findProject = (slug: string) =>
    ALL_PROJECTS.find(p => p.slug === slug)
