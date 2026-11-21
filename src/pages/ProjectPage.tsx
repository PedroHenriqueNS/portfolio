import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { buttonVariants } from '@/components/ui/button'
import { TechIcons } from '@/components/ProjectModal'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { ALL_PROJECTS, formatMonth, projectPath, type Project } from '@/constants/projects'

const linkButton = 'cursor-pointer bg-gradient-to-r from-blue-600 to-cyan-700 text-white transition-colors hover:from-cyan-600 hover:to-blue-700'

/**
 * Página própria de cada projeto (/projetos/<slug>). É pré-renderizada no build, então
 * buscadores e robôs de IA leem título, descrição e stack sem executar JavaScript.
 */
const ProjectPage = ({ project }: { project: Project }) => {
    const creationAt = formatMonth(project.date)
    const others = ALL_PROJECTS.filter(p => p.slug !== project.slug).slice(0, 6)
    const hasPublicSite = project.projectUrl && project.projectUrl !== 'Private'
    const hasPublicRepo = project.repoUrl && project.repoUrl !== 'Private'

    return (
        <>
            <Header isViewingPresentation={false} />

            <main className='w-full flex-center flex-col'>
                <article className='flex flex-col gap-8 w-full max-w-4xl px-5 py-14'>
                    <nav aria-label='Trilha de navegação' className='font-jakarta text-sm text-neutral-600 dark:text-neutral-400'>
                        <ol className='flex flex-wrap gap-2'>
                            <li><a className='hover:text-cyan-600 underline-offset-4 hover:underline' href='/'>Início</a></li>
                            <li aria-hidden='true'>/</li>
                            <li><a className='hover:text-cyan-600 underline-offset-4 hover:underline' href='/#projetos'>Projetos</a></li>
                            <li aria-hidden='true'>/</li>
                            <li aria-current='page' className='text-neutral-800 dark:text-neutral-200'>{project.title}</li>
                        </ol>
                    </nav>

                    <header className='flex flex-col gap-4'>
                        <h1 className='font-jakarta font-bold text-4xl max-sm:text-3xl'>{project.title}</h1>
                        <p className='text-lg text-neutral-700 dark:text-neutral-300 !leading-[170%]'>{project.summary}</p>

                        <div className='flex items-center gap-6 flex-wrap'>
                            <TechIcons technologies={project.technologies} />
                            {creationAt && (
                                <p className='font-medium text-sm text-blue-700 dark:text-blue-500'>
                                    <time dateTime={project.date}>{creationAt}</time>
                                </p>
                            )}
                        </div>

                        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                            <span className='font-semibold'>Tecnologias:</span> {project.technologies.map(t => t.title).join(', ')}
                        </p>
                    </header>

                    <img
                        className='w-full rounded-lg border-1 border-neutral-300 dark:border-neutral-700'
                        src={project.image}
                        alt={`Prévia do projeto ${project.title}`}
                        width={1200}
                        height={630}
                    />

                    <section
                        aria-labelledby='sobre-o-projeto'
                        // O texto vem do mesmo componente do modal; aqui ele é corpo de página: alinhado à esquerda e maior.
                        className='flex flex-col gap-2 [&_.project-description-text]:!mx-0 [&_.project-description-text]:!text-left [&_.project-description-text]:gap-3 [&_p]:!text-base [&_p]:!leading-[170%]'
                    >
                        <h2 id='sobre-o-projeto' className='font-jakarta font-bold text-2xl'>Sobre o projeto</h2>
                        {project.description}
                    </section>

                    <div className='flex gap-3 flex-wrap'>
                        {hasPublicSite && (
                            <a className={buttonVariants({ className: linkButton })} href={project.projectUrl} target='_blank' rel='noopener'>
                                Acessar projeto <ExternalLink />
                            </a>
                        )}
                        {hasPublicRepo && (
                            <a className={buttonVariants({ className: linkButton })} href={project.repoUrl} target='_blank' rel='noopener'>
                                Ver repositório <Github />
                            </a>
                        )}
                        {!hasPublicSite && !hasPublicRepo && (
                            <p className='text-sm text-neutral-600 dark:text-neutral-400'>Código e acesso privados, por contrato com o cliente.</p>
                        )}
                        <a className={buttonVariants({ variant: 'outline', className: 'cursor-pointer' })} href='/#projetos'>
                            <ArrowLeft /> Todos os projetos
                        </a>
                    </div>

                    <section aria-labelledby='outros-projetos' className='flex flex-col gap-4 mt-8'>
                        <h2 id='outros-projetos' className='font-jakarta font-bold text-2xl'>Outros projetos</h2>
                        <ul className='grid grid-cols-2 gap-3 max-sm:grid-cols-1'>
                            {others.map(p => (
                                <li key={p.slug}>
                                    <a
                                        className='block h-full rounded-lg border-1 border-neutral-300 dark:border-neutral-700 p-4 hover:border-cyan-600 transition-colors'
                                        href={projectPath(p.slug)}
                                    >
                                        <span className='font-jakarta font-semibold block'>{p.title}</span>
                                        <span className='text-sm text-neutral-600 dark:text-neutral-400'>{p.summary}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                </article>
            </main>

            <Footer />
        </>
    )
}

export default ProjectPage
