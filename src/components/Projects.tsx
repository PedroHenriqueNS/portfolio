import useObserver from '@/hooks/useObserver'
import { cn } from '@/lib/utils'
import ProjectCard from './ProjectCard'
import { AutoCropPdfPreview, CloudBarueriPreview, GobuzzAdsManagerPreview, PautasGobuzzPreview, SeedingControlePreview, SnowHunterPreview, SodiEasyPreview, TwoNotePreview, YTDLPGUIPreview, YTMusicClone } from '@/assets/images'
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