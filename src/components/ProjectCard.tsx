import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import ProjectModal from "./ProjectModal"
import { projectPath, type Project } from "@/constants/projects"
import useIsBelow from "@/hooks/useIsBelow"

interface ProjectCardProps {
    project: Project
}

/**
 * O card é um link de verdade para a página do projeto (/projetos/<slug>), que é o
 * que buscadores e robôs de IA seguem. Um clique comum abre o modal; com Ctrl/Cmd,
 * Shift ou o botão do meio, o navegador abre a página normalmente.
 */
const ProjectCard = ({ project }: ProjectCardProps) => {
    const { title, image: imageUrl, technologies: technologyIcons } = project

    const [isHover, setIsHover] = useState(false)
    const [overPos, setOverPos] = useState(false)
    const [open, setOpen] = useState(false)

    const isMobile = useIsBelow(768)

    useEffect(() => {
        setOverPos(true)

        const interval = setInterval(() => setOverPos(false), 200)

        return () => clearInterval(interval)
    }, [isHover])

    return (
        <>
            <a
                href={projectPath(project.slug)}
                aria-label={`${title}: ver detalhes do projeto`}
                className="relative flex-center cursor-pointer rounded-t-2xl focus-visible:outline-2 focus-visible:outline-cyan-500 focus-visible:outline-offset-4"
                onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
                    e.preventDefault()
                    setIsHover(false)
                    setOpen(true)
                }}
                onMouseEnter={isMobile ? undefined : () => setIsHover(true)}
                onMouseLeave={isMobile ? undefined : () => setIsHover(false)}
            >
                <div className={cn(
                    "absolute border-b-4 border-transparent transition-all delay-0 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-border rounded-t-2xl overflow-hidden",
                    isHover && 'scale-125 z-20 delay-300 rounded-none',
                    overPos && 'z-10'
                )}>
                    <div className="relative bg-background overflow-hidden aspect-[17/9]">
                        <div className={cn(
                            "absolute flex-center flex-col size-full transition-all duration-300 gap-1 p-4 z-10 transform translate-y-1/3 max-sm:translate-y-1/4",
                            isHover && 'translate-y-0'
                        )}>
                            <h3 className="font-medium text-lg drop-shadow-[0_0_10px_0_#000] text-white">{title}</h3>

                            <div className="flex gap-2">
                                {technologyIcons?.map((icon, i) => (
                                    <img
                                        className="drop-shadow-[0_0_10px_#000] size-5 max-sm:size-4"
                                        key={i}
                                        src={icon.image}
                                        alt={icon.title}
                                        width={20}
                                        height={20}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className={cn(
                            "absolute flex-end size-full flex-col drop-shadow-[0_0_10px_#000] z-10 transition-all !w-0 duration-75 overflow-hidden transform -translate-x-1/2 left-1/2",
                            isHover && '!w-full delay-200 duration-300'
                        )}>
                            <div className="absolute w-max p-4">
                                <p className="font-medium text-sm text-white whitespace-nowrap">Ver mais</p>
                                <div className="w-full h-[3px] bg-gradient-to-r from-blue-600 to-cyan-600" />
                            </div>
                        </div>

                        <img
                            className={cn(
                                "h-full object-cover w-[30rem] brightness-[50%] transition-[filter] max-sm:w-[20rem]",
                                isHover && 'brightness-[60%]'
                            )}
                            src={imageUrl}
                            alt={`Prévia do projeto ${title}`}
                            width={480}
                            height={254}
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>


                {/* Modelo contra 'absolute' */}
                <div className="border-b-4 opacity-100">
                    <div className="relative overflow-hidden aspect-[17/9]">
                        <div className="w-[30rem] max-sm:w-[20rem]" />
                    </div>
                </div>
            </a>

            <ProjectModal project={project} open={open} onOpenChange={setOpen} />
        </>
    )
}

export default ProjectCard