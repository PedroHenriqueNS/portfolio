import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import HoverInfo from "./HoverInfo"
import { Button, buttonVariants } from "./ui/button"
import { ExternalLink, FileText, Github } from "lucide-react"
import useIsBelow from "@/hooks/useIsBelow"
import { formatMonth, projectPath, type Project, type Technology } from "@/constants/projects"

interface ProjectModalProps {
    project: Project
    open: boolean
    onOpenChange: (open: boolean) => void
}

const gradientButton = 'bg-gradient-to-r from-blue-600 to-cyan-700 text-white transition-colors hover:from-cyan-600 hover:to-blue-700 hover:shadow-[0_0_20px_0_rgba(34,211,238,0.7)] dark:hover:shadow-[0_0_20px_0_rgba(34,211,238,0.3)]'

/** Ícones da stack: o nome vai no alt (leitores de tela) e no title (dica ao passar o mouse). */
export const TechIcons = ({ technologies, size = 'size-5' }: { technologies: Technology[], size?: string }) => (
    <ul className="flex gap-3 flex-wrap" aria-label="Tecnologias">
        {technologies.map((icon) => (
            <li key={icon.title} title={icon.title}>
                <img className={size} src={icon.image} alt={icon.title} width={20} height={20} />
            </li>
        ))}
    </ul>
)

const ProjectLinks = ({ projectUrl, repoUrl }: Pick<Project, 'projectUrl' | 'repoUrl'>) => (
    <>
        {projectUrl && <HoverInfo hasIcon={false} info={projectUrl == 'Private' ? "Projeto privado" : null} side="top">
            <a
                className={buttonVariants({
                    variant: 'default',
                    size: 'default',
                    className: `${projectUrl == 'Private' ? 'opacity-50 cursor-default' : 'cursor-pointer'} ${gradientButton}`
                })}
                href={projectUrl == 'Private' ? undefined : projectUrl}
                aria-disabled={projectUrl == 'Private' ? true : undefined}
                target="_blank"
                rel="noopener"
            >
                Acessar Projeto <ExternalLink />
            </a>
        </HoverInfo>}

        {repoUrl && <HoverInfo hasIcon={false} info={repoUrl == 'Private' ? "Repositório privado" : null} side="top">
            <a
                className={buttonVariants({
                    variant: 'default',
                    size: 'default',
                    className: `${repoUrl == 'Private' ? 'opacity-50 cursor-default' : 'cursor-pointer'} ${gradientButton}`
                })}
                href={repoUrl == 'Private' ? undefined : repoUrl}
                aria-disabled={repoUrl == 'Private' ? true : undefined}
                target="_blank"
                rel="noopener"
            >
                Acessar Repositório <Github />
            </a>
        </HoverInfo>}
    </>
)

const PageLink = ({ slug }: { slug: string }) => (
    <a
        className={buttonVariants({ variant: 'outline', size: 'default', className: 'cursor-pointer' })}
        href={projectPath(slug)}
    >
        Página do projeto <FileText />
    </a>
)

const ProjectModal = ({ project, open, onOpenChange }: ProjectModalProps) => {
    const { slug, title, image: imageUrl, technologies, date, description, summary, projectUrl, repoUrl } = project
    const creationAt = formatMonth(date)

    const isMobile = useIsBelow(760)

    if (isMobile) return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className="mx-5">
                    <img src={imageUrl} alt={`Prévia do projeto ${title}`} />
                </div>

                <DrawerHeader>
                    <DrawerTitle className="flex-center">{title}</DrawerTitle>
                    <DrawerDescription className="sr-only">{summary}</DrawerDescription>
                </DrawerHeader>

                <div className="flex-center flex-col gap-1">
                    <TechIcons technologies={technologies} />
                    {creationAt && <p className="font-medium text-sm text-blue-700 dark:text-blue-500">{creationAt}</p>}
                </div>

                {description}

                <DrawerFooter>
                    <div className="flex items-center justify-between w-full gap-2 flex-wrap">
                        <ProjectLinks projectUrl={projectUrl} repoUrl={repoUrl} />
                    </div>
                    <PageLink slug={slug} />

                    <DrawerClose asChild>
                        <Button className="w-full">Fechar</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex gap-10 !max-w-[80dvw] !w-max max-lg:flex-col">
                <div className="w-[70rem] max-w-[70rem] border-1 rounded-md overflow-hidden border-neutral-400 dark:border-neutral-700 xl:min-w-[30rem] max-lg:min-w-0 max-lg:w-auto">
                    <img src={imageUrl} alt={`Prévia do projeto ${title}`} />
                </div>

                <div className="flex flex-col gap-5">
                    <DialogTitle className="text-xl leading-[140%]">{title}</DialogTitle>
                    <DialogDescription className="sr-only">{summary}</DialogDescription>

                    <div className="flex items-center gap-10">
                        <TechIcons technologies={technologies} />

                        {creationAt && <div className="h-0.5 w-4 bg-blue-600" />}

                        {creationAt && <p className="font-medium text-sm text-blue-700 dark:text-blue-500">{creationAt}</p>}
                    </div>

                    {description}

                    <DialogFooter className="mt-auto flex-wrap gap-2">
                        <PageLink slug={slug} />
                        <ProjectLinks projectUrl={projectUrl} repoUrl={repoUrl} />
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProjectModal
