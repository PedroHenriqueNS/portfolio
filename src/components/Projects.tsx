import useObserver from '@/hooks/useObserver'
import { cn } from '@/lib/utils'
import ProjectCard from './ProjectCard'
import { AutoCropPdfPreview, ClauCamargoPreview, CloudBarueriPreview, JeModestoPreview, WSAMarmoresPreview, EduardoBoiguesPreview, FlaviaMorandoPreview, GobuzzAdsManagerPreview, PautasGobuzzPreview, SandroMastellariPreview, SeedingControlePreview, SnowHunterPreview, SodiEasyPreview, TwoNotePreview, YTDLPGUIPreview, YTMusicClone } from '@/assets/images'
import { ProjectTechnologies } from '@/constants'

const Projects = () => {

    const {
        containerRef,
        hasAlreadyViewed
    } = useObserver()

    return (
        <section
            ref={containerRef}
            className={cn(
                'flex-center flex-col gap-4 w-5/6 mb-24 transition-all ease-in-out duration-[800ms] delay-200 transform -translate-y-10 opacity-0 max-sm:w-full max-sm:px-5',
                hasAlreadyViewed && 'translate-y-0 opacity-100'
            )}
        >
            <h2 className='h2-bold font-jakarta'>Projetos</h2>

            <div className='flex-center flex-wrap gap-10'>
                <ProjectCard
                    title="Jé Modesto 22555"
                    imageUrl={JeModestoPreview}
                    technologyIcons={ProjectTechnologies['je_modesto']}
                    creationAt='Agosto de 2026'
                    repoUrl='Private'
                    description={(
                        <div className='project-description-text'>
                            <p>Site de campanha do candidato a deputado estadual Jé Modesto, no Sudoeste Paulista, em 2026: o apoiador envia uma foto, posiciona dentro do selo oficial da campanha e baixa a imagem pronta para compartilhar.</p>
                            <p>Todo o processamento acontece no navegador com a <strong>Canvas API</strong>: a foto nunca sai do aparelho e não existe backend. Aceita fotos de iPhone (HEIC) com um decodificador WebAssembly carregado só quando necessário.</p>
                            <p>Reaproveita o motor de molduras do projeto da Clau Camargo, com a geometria remedida para a nova arte e o layout reproduzido a partir do design em desktop e celular.</p>
                            <p>Feito em <strong>React 19</strong> com <strong>React Compiler</strong>, <strong>TypeScript</strong>, <strong>Vite</strong> e <strong>Tailwind CSS</strong>, com 74 testes em <strong>Vitest</strong> e deploy automatizado via <strong>GitHub Actions</strong>.</p>
                        </div>
                    )}
                />
                <ProjectCard
                    title="Clau Camargo 55655"
                    imageUrl={ClauCamargoPreview}
                    technologyIcons={ProjectTechnologies['clau_camargo']}
                    creationAt='Junho de 2026'
                    repoUrl='Private'
                    description={(
                        <div className='project-description-text'>
                            <p>Site de campanha da candidata a deputada estadual Clau Camargo em 2026, que cresceu de um gerador de moldura de foto para uma plataforma com várias frentes.</p>
                            <p>Gerador de moldura com a foto processada só no navegador (<strong>Canvas API</strong>, suporte a HEIC), molduras co-assinadas por apoiadores em URLs próprias, páginas de vídeo por cidade para QR Codes impressos com player próprio, e a "Minha Colinha", que desenha e exporta a colinha de votação em canvas.</p>
                            <p>As páginas de apoiadores e cidades são pré-renderizadas no build por um plugin <strong>Vite</strong> próprio, para que o link mostre a prévia certa no WhatsApp. Métricas por cidade e canal com <strong>Google Tag Manager</strong> e <strong>GA4</strong>, com política de privacidade alinhada à LGPD.</p>
                            <p>Feito em <strong>React 19</strong> com <strong>React Compiler</strong>, <strong>TypeScript</strong>, <strong>TanStack Router</strong> e <strong>Tailwind CSS</strong>, com mais de 370 testes em <strong>Vitest</strong> e deploy via <strong>GitHub Actions</strong> a cada release.</p>
                        </div>
                    )}
                />
                <ProjectCard
                    title="WSA Mármores e Granitos"
                    imageUrl={WSAMarmoresPreview}
                    technologyIcons={ProjectTechnologies['wsa_marmores']}
                    creationAt='Janeiro de 2026'
                    repoUrl='Private'
                    description={(
                        <div className='project-description-text'>
                            <p>Site institucional de uma marmoraria, com landing page, página sobre a empresa, galeria de obras por categoria, catálogo de pedras e contato com mapa do <strong>Google Maps</strong>.</p>
                            <p>A navegação é feita com <strong>React Router</strong> e as animações com <strong>GSAP</strong>, <strong>Motion</strong> e efeitos de parallax, com versão própria para celular.</p>
                            <p>Todos os pedidos de orçamento levam ao <strong>WhatsApp</strong>, e o site conta com SEO, <strong>Google Analytics</strong> e política de privacidade.</p>
                            <p>Feito em <strong>React.js</strong> com <strong>Vite</strong>, <strong>TypeScript</strong>, <strong>Tailwind CSS</strong> e componentes do <strong>ShadCN</strong>.</p>
                        </div>
                    )}
                />
                <ProjectCard
                    title="Pautas Gobuzz"
                    imageUrl={PautasGobuzzPreview}
                    technologyIcons={ProjectTechnologies['pautas_gobuzz']}
                    creationAt='Dezembro de 2024'
                    projectUrl='Private'
                    repoUrl='Private'
                    description={(
                        <div className='project-description-text'>
                            <p>Um gerenciador de pautas para publicações de redes sociais, onde todo o processo de controle de pautas e visualização de insights de seus resultados são totalmente automatizados.</p>
                            <p>O registro das pautas e atualização de estatisticas é feito de forma automática utilizando as Functions do <strong>Appwrite</strong>, que também é responsável pelo Banco de dados e Autenticação de usuários.</p>
                            <p>A interface é padronizada, utlizando os componentes customizaveis do <strong>ShadCN</strong> e utiliza o <strong>React Query</strong> para padronizar, controlar e minimizar chamadas de API.</p>
                            <p>Com o objetivo de otimizar a página foi utilizado o framework <strong>Vite</strong>.</p>
                        </div>
                    )}

                />
                <ProjectCard
                    title="Gobuzz Ads Manager"
                    imageUrl={GobuzzAdsManagerPreview}
                    technologyIcons={ProjectTechnologies['gobuzz_ads_manager']}
                    creationAt='Setembro de 2024'
                    projectUrl='Private'
                    repoUrl='Private'
                    description={(
                        <div className='project-description-text'>
                            <p>Um gerenciador de anúncios da <strong>Meta</strong>, onde é possível publicar novos anúncios, programar anúncios automáticos e visualizar alguns insights sobre eles.</p>
                            <p>A aplicação realiza requisições diretamente à API da <strong>Meta</strong> utilizando dados previamente registrados sobre os perfis e as contas de anúncio, que são salvos no banco de dados do <strong>Appwrite</strong>.</p>
                            <p>Toda ação é realizada no lado do servidor utilizando o server-side rendering do <strong>Next.js</strong>, o usuário tem acesso apenas às informoções que devem aparecer na interface.</p>
                        </div>
                    )}
                />
                <ProjectCard
                    title="Seeding Controle"
                    imageUrl={SeedingControlePreview}
                    technologyIcons={ProjectTechnologies['seeding_controle']}
                    creationAt='Agosto de 2024'
                    repoUrl='Private'
                    description={(
                        <div className='project-description-text'>
                            <p>Um controlador de comentários, onde os <strong>Seeders</strong> das redes sociais registram seus resultados na medida em que vão o fazendo.</p>
                            <p>Posteriormente o aplicativo adapta os dados para o banco de dados utilizado pela empresa para análise através do botão <strong>Seeding</strong></p>
                            <p>A aplicação desktop é montada através do framework <strong>Electron</strong> onde tudo é programado em <strong>React.js</strong> com <strong>Vite</strong> e compilado de forma que a máquina compreenda.</p>
                            <p>Todo o controle é salvo em nuvem através do <strong>Supabase</strong> que também é responsável pela autenticação dos usuários.</p>
                            <p>A aplicação construída baseado em <i>"UI otimistas"</i> onde uma resposta já é prevista e modificada instantaneamente, enquanto no plano de fundo requisições com <strong>React Query</strong> salvam as modificações.</p>
                        </div>
                    )}
                />
                <ProjectCard
                    title="Sandro Mastellari"
                    imageUrl={SandroMastellariPreview}
                    technologyIcons={ProjectTechnologies['sandro_mastellari']}
                    creationAt='Setembro de 2024'
                    projectUrl='https://sandromastellari.com.br/'
                    repoUrl='Private'
                    description={(
                        <div className='project-description-text'>
                            <p>Uma página web para apresentar o candidato à vereador em Santos, SP em 2024.</p>
                            <p>A página foi feita em <strong>React.js</strong> com <strong>Vite</strong> e estilizada em <strong>Tailwind CSS</strong>.</p>
                            <p>Design simples, feito para ressaltar o candidato.</p>
                        </div>
                    )}
                />
                <ProjectCard
                    title="Eduardo Boigues"
                    imageUrl={EduardoBoiguesPreview}
                    technologyIcons={ProjectTechnologies['eduardo_boigues']}
                    creationAt='Agosto de 2024'
                    projectUrl='https://eduardoboigues.com.br/'
                    repoUrl='Private'
                    description={(
                        <div className='project-description-text'>
                            <p>Uma página web para apresentar o candidato à reeleição para prefeito de Itaquaquecetuba, SP em 2024 e fomentar a interação dos eleitores com contribuições de ideias de ações para executar em seu próximo governo caso reeleito.</p>
                            <p>A página foi feita em <strong>React.js</strong> com <strong>Vite</strong> e estilizada em <strong>Tailwind CSS</strong>.</p>
                            <p>Formulário harmônico, feito para ser fácil de preencher pelos usuários em qualquer dispositivo, e com respeito às informações mais privadas que o usuário pode escolher enviar ou não.</p>
                            <p>As ideias são enviadas à uma <strong>API</strong> que salva as informações para futuras análises.</p>
                        </div>
                    )}
                />
                <ProjectCard
                    title="Flavia Morando SBC"
                    imageUrl={FlaviaMorandoPreview}
                    technologyIcons={ProjectTechnologies['flavia_morando_sbc']}
                    creationAt='Agosto de 2024'
                    projectUrl='https://flaviamorandosbc.com.br/'
                    repoUrl='Private'
                    description={(
                        <div className='project-description-text'>
                            <p>Uma página web para apresentar a candidata à prefeita de São Bernardo do Campo, SP em 2024.</p>
                            <p>Feito em <strong>React.js</strong> com <strong>Vite</strong> e estilizado em <strong>Tailwind CSS</strong></p>
                            <p>Design simples e baseado em artes feitas por <i>Designers</i> para ressaltar a candidata e seus apoiadores.</p>
                        </div>
                    )}
                />
                <ProjectCard
                    title="YT DLP GUI"
                    imageUrl={YTDLPGUIPreview}
                    technologyIcons={ProjectTechnologies['yt_dlp_gui']}
                    creationAt='Agosto de 2024'
                    repoUrl='https://github.com/PedroHenriqueNS/yt-dlp-gui'
                    description={(
                        <div className='project-description-text'>
                            <p>Um aplicativo desktop para baixar vídeos de qualquer website que o <strong>yt_dlp</strong> suporte.</p>
                            <p>A aplicação é construída ao redor do pacote <strong>yt_dlp</strong> com o objetivo de dar à este pacote uma interface gráfica.</p>
                            <p>Além de ser possível baixar vídeos de qualquer site com suporte e em alta qualidade, também é possível realizar conversões de qualidade e formato.</p>
                            <p>Para a interface gráfica foi utilizado o pacote do <strong>CustomTkinter</strong>.</p>
                        </div>
                    )}
                />
                <ProjectCard
                    title="Auto Crop PDF"
                    imageUrl={AutoCropPdfPreview}
                    technologyIcons={ProjectTechnologies['auto_crop_pdf']}
                    repoUrl='https://github.com/PedroHenriqueNS/auto_crop_pdf'
                    description={(
                        <div className='project-description-text'>
                            <p>Uma aplicação desktop para recortar automáticamente PDFs.</p>
                            <p>Foi construído com o objetivo de recortar relatórios do <strong>Power BI</strong> que deixam grandes bordas quando exportados em PDF.</p>
                            <p>A aplicação é montada com <strong>Electron</strong> e <strong>React.js</strong> com <strong>Vite</strong>.</p>
                            <p>Para recortar o PDF o usuário seleciona múltiplos arquivos, seleciona determinadas configurações e envia para uma API local que é aberta pelo aplicativo utilizando <strong>Flask</strong> com <strong>Python</strong>.</p>
                        </div>
                    )}
                />
                <ProjectCard
                    title="Cloud Barueri"
                    imageUrl={CloudBarueriPreview}
                    technologyIcons={ProjectTechnologies['cloud_barueri']}
                    projectUrl='Private'
                    repoUrl='Private'
                    description={(
                        <div className='project-description-text'>
                            <p>Uma aplicação Web para armazenar grandes arquivos em um servidor local específico.</p>
                            <p>A ideia é interagir com os arquivos de gravação e transmissão com facilidade, armazenando e acessando com uma grande familiaridade à interface do <strong>Google Drive</strong>.</p>
                            <p>A página web é construída usando <strong>React.js</strong>.</p>
                            <p>O serviço back-end é feito em <strong>Node.js</strong>, com acesso ao banco de dados <strong>MySQL</strong> e uma unidade de armazenamento fornecido pelo <strong>Docker</strong> através do sistema operacional <strong>Unraid</strong>.</p>
                        </div>
                    )}
                />
                {/* <ProjectCard
                    title="LISU"
                    imageUrl={PautasGobuzzPreview}
                    technologyIcons={ProjectTechnologies['cloud_barueri']}
                    creationAt='Julho de 2023'
                    projectUrl='Private'
                    repoUrl='Private'
                    description="Libs that I should use"
                /> */}
                <ProjectCard
                    title="SnowHunter"
                    imageUrl={SnowHunterPreview}
                    technologyIcons={ProjectTechnologies['snowhunter']}
                    projectUrl='https://snowhunter.netlify.app/'
                    repoUrl='Private'
                    description={(
                        <div className='project-description-text'>
                            <p>Um site para exibir projetos de modelagem 3D e publicar novidades das redes sociais do criador.</p>
                            <p>A página é feita utilizando <strong>React.js</strong> com um back-end feito através do <strong>Sanity</strong>.</p>
                        </div>
                    )}
                />
                <ProjectCard
                    title="Youtube Music Clone"
                    imageUrl={YTMusicClone}
                    technologyIcons={ProjectTechnologies['yt_music_clone']}
                    repoUrl='https://github.com/PedroHenriqueNS/yt-music-clone'
                    description={(
                        <div className='project-description-text'>
                            <p>Um aplicativo mobile clone do antigo <strong>YouTube Music</strong> com acesso às músicas salvas localmente no dispositivo.</p>
                            <p>Uma interface simples, extremamente parecido com o <i>original</i> mas sem os recursos de pesquisa de música online no YouTube.</p>
                            <p>A aplicação é feita em <strong>React Native</strong> usando o framework <strong>Expo</strong>.</p>
                        </div>
                    )}
                />
                <ProjectCard
                    title="SodiEasy"
                    imageUrl={SodiEasyPreview}
                    technologyIcons={ProjectTechnologies['sodieasy']}
                    repoUrl='Private'
                    description={(
                        <div className='project-description-text'>
                            <p>Um aplicativo mobile para fazer orçamentos de materiais de construção usando produtos disponível na <strong>Sodimac</strong>.</p>
                            <p>A aplicação realiza requisições para uma API que realiza o <i>"Web Scrapping"</i> do site da Sodimac com base do ID do produto, salvando seus dados e atualizando a medida que sofrem modificações pelo site oficial.</p>
                            <p>Este projeto é destinado à um funcionário atendente da empresa, que naturalmente deve realizar a busca de um produto pelo ID, por isto toda a busca é baseada no ID do produto.</p>
                            <p>O aplicativo é construído utilizando <strong>React Native</strong> com o framework <strong>Expo</strong>.</p>
                        </div>
                    )}
                />
                <ProjectCard
                    title="TwoNote"
                    imageUrl={TwoNotePreview}
                    technologyIcons={ProjectTechnologies['twonote']}
                    repoUrl='https://github.com/PedroHenriqueNS/Notes'
                    description={(
                        <div className='project-description-text'>
                            <p>O primeiro projeto mobile, feito para finalizar o semestre na universidade.</p>
                            <p>O objetivo é fazer um bloco de notas com salvamento automático, daí vem o nome originado do <i>"Microsoft OneNote"</i> 😁😁</p>
                            <p>A aplicação é construída utilizando <strong>Angular.js</strong> através do framework <strong>Ionic</strong>.</p>
                        </div>
                    )}
                />
            </div>
        </section>
    )
}

export default Projects