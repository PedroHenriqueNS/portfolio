import useObserver from '@/hooks/useObserver'
import { cn } from '@/lib/utils'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '@/constants/projects'

const Projects = () => {

    const {
        containerRef,
        hasAlreadyViewed
    } = useObserver()

    return (
        <section
            ref={containerRef}
            aria-labelledby='projetos'
            className={cn(
                'flex-center flex-col gap-4 w-5/6 mb-24 transition-all ease-in-out duration-[800ms] delay-200 transform -translate-y-10 opacity-0 max-sm:w-full max-sm:px-5',
                hasAlreadyViewed && 'translate-y-0 opacity-100'
            )}
        >
            <h2 id='projetos' className='h2-bold font-jakarta scroll-mt-28'>Projetos</h2>

            <div className='flex-center flex-wrap gap-10'>
                {PROJECTS.map(project => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </section>
    )
}

export default Projects
