import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import HoverInfo from "./HoverInfo"
import { Button, buttonVariants } from "./ui/button"
import { ExternalLink, Github } from "lucide-react"

interface ProjectModalProps {
    title: string
    imageUrl: string
    technologyIcons?: Array<{
        title: string,
        image: string
    }>
    creationAt?: string
    description: string | React.ReactNode
    projectUrl?: string | 'Private'
    repoUrl?: string | 'Private'

    children: React.ReactNode
}

const ProjectModal = ({
    title,
    imageUrl,
    technologyIcons,
    creationAt,
    description,
    projectUrl,
    repoUrl,

    children
}: ProjectModalProps) => {

    const isMobile = window.innerWidth <= 760 ? true : false

    if (isMobile) return (
        <Drawer>
            <DrawerTrigger asChild>{children}</DrawerTrigger>

            <DrawerContent>
                <div className="mx-5">
                    <img
                        className=""
                        src={imageUrl}
                        alt={`${title} preview`}
                    />
                </div>

                <DrawerHeader>
                    <DrawerTitle className="flex-center">{title}</DrawerTitle>
                </DrawerHeader>

                <div className="flex-center flex-col gap-1">
                    <div className="flex gap-3">
                        {technologyIcons?.map((icon, i) => (
                            <HoverInfo
                                key={i}
                                info={icon.title}
                                hasIcon={false}
                            >
                                <img
                                    className="size-5"
                                    src={icon.image}
                                    alt="icon"
                                />
                            </HoverInfo>
                        ))}
                    </div>

                    <p className="font-medium text-sm text-blue-700 dark:text-blue-500">{creationAt}</p>
                </div>

                {description}

                <DrawerFooter>
                    <div className="flex items-center justify-between w-full">
                        {projectUrl && <HoverInfo hasIcon={false} info={projectUrl == 'Private' ? "Projeto privado" : null} side="top">
                            <a
                                className={buttonVariants({
                                    variant: 'default',
                                    size: 'default',
                                    className: `${projectUrl == 'Private' ? 'opacity-50' : 'cursor-pointer'} bg-gradient-to-r from-blue-600 to-cyan-700 text-white transition-colors hover:from-cyan-600 hover:to-blue-700 hover:shadow-[0_0_20px_0_rgba(34,211,238,0.7)] dark:hover:shadow-[0_0_20px_0_rgba(34,211,238,0.3)]`
                                })}
                                href={projectUrl == 'Private' ? undefined : projectUrl}
                                target="_blank"
                            >
                                Acessar Projeto <ExternalLink />
                            </a>
                        </HoverInfo>
                        }

                        {repoUrl && <HoverInfo hasIcon={false} info={repoUrl == 'Private' ? "Projeto privado" : null} side="top">
                            <a
                                className={buttonVariants({
                                    variant: 'default',
                                    size: 'default',
                                    className: `${repoUrl == 'Private' ? 'opacity-50' : 'cursor-pointer'} bg-gradient-to-r from-blue-600 to-cyan-700 text-white transition-colors hover:from-cyan-600 hover:to-blue-700 hover:shadow-[0_0_20px_0_rgba(34,211,238,0.7)] dark:hover:shadow-[0_0_20px_0_rgba(34,211,238,0.3)]`
                                })}
                                href={repoUrl == 'Private' ? undefined : repoUrl}
                                target="_blank"
                            >
                                Acessar Repositório <Github />
                            </a>
                        </HoverInfo>
                        }
                    </div>

                    <DrawerClose>
                        <Button className="w-full">Fechar</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="flex gap-10 !max-w-[80dvw] !w-max max-lg:flex-col">
                <div className="w-[70rem] max-w-[70rem] border-1 rounded-md overflow-hidden border-neutral-400 dark:border-neutral-700 xl:min-w-[30rem] max-lg:min-w-0 max-lg:w-auto">
                    <img
                        src={imageUrl}
                        alt={`${title} preview`}
                    />
                </div>

                <div className="flex flex-col gap-5">
                    <DialogTitle className="text-xl leading-[140%]">{title}</DialogTitle>

                    <div className="flex items-center gap-10">
                        <div className="flex gap-3">
                            {technologyIcons?.map((icon, i) => (
                                <HoverInfo
                                    key={i}
                                    info={icon.title}
                                    hasIcon={false}
                                >
                                    <img
                                        className="size-5"
                                        src={icon.image}
                                        alt="icon"
                                    />
                                </HoverInfo>
                            ))}
                        </div>

                        {technologyIcons && creationAt && <div className="h-0.5 w-4 bg-blue-600" />}

                        <p className="font-medium text-sm text-blue-700 dark:text-blue-500">{creationAt}</p>
                    </div>

                    {description}

                    <DialogFooter className="mt-auto">
                        {projectUrl && <HoverInfo hasIcon={false} info={projectUrl == 'Private' ? "Projeto privado" : null} side="top">
                            <a
                                className={buttonVariants({
                                    variant: 'default',
                                    size: 'default',
                                    className: `${projectUrl == 'Private' ? 'opacity-50 cursor-default' : 'cursor-pointer'} bg-gradient-to-r from-blue-600 to-cyan-700 text-white transition-colors hover:from-cyan-600 hover:to-blue-700 hover:shadow-[0_0_20px_0_rgba(34,211,238,0.7)] dark:hover:shadow-[0_0_20px_0_rgba(34,211,238,0.3)]`
                                })}
                                href={projectUrl == 'Private' ? undefined : projectUrl}
                                target="_blank"
                            >
                                Acessar Projeto <ExternalLink />
                            </a>
                        </HoverInfo>
                        }

                        {repoUrl && <HoverInfo hasIcon={false} info={repoUrl == 'Private' ? "Projeto privado" : null} side="top">
                            <a
                                className={buttonVariants({
                                    variant: 'default',
                                    size: 'default',
                                    className: `${repoUrl == 'Private' ? 'opacity-50 cursor-default' : 'cursor-pointer'} bg-gradient-to-r from-blue-600 to-cyan-700 text-white transition-colors hover:from-cyan-600 hover:to-blue-700 hover:shadow-[0_0_20px_0_rgba(34,211,238,0.7)] dark:hover:shadow-[0_0_20px_0_rgba(34,211,238,0.3)]`
                                })}
                                href={repoUrl == 'Private' ? undefined : repoUrl}
                                target="_blank"
                            >
                                Acessar Repositório <Github />
                            </a>
                        </HoverInfo>
                        }
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default ProjectModal