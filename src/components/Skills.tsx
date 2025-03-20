import { CSSIcon, DockerIcon, ExpoIcon, ExpressIcon, GitIcon, HTMLIcon, JavaScriptIcon, MongoDBIcon, MySQLIcon, NextJSIcon, NodeJSIcon, PostgreSQLIcon, ReactIcon, TailwindIcon, TypeScriptIcon, ViteJSIcon } from "@/assets/icons"
import SkillCard from "./SkillCard"
import { cn } from "@/lib/utils"
import useObserver from "@/hooks/useObserver"

const Skills = () => {

    const {
        containerRef,
        hasAlreadyViewed
    } = useObserver()

    return (
        <section
            ref={containerRef}
            className={cn(
                'flex-center flex-col gap-4 w-2/3 mb-24 transition-all ease-in-out duration-[800ms] delay-200 transform -translate-y-10 opacity-0 max-sm:w-full max-sm:px-5',
                hasAlreadyViewed && 'translate-y-0 opacity-100'
            )}
        >
            <h2 className='h2-bold font-jakarta'>Skills</h2>

            <div className="flex-center flex-wrap gap-5">
                <SkillCard
                    title="React.js"
                    description="Lib"
                    level={4}
                    icon={ReactIcon}
                />
                <SkillCard
                    title="Next.js"
                    description="Framework"
                    level={4}
                    icon={NextJSIcon}
                />
                <SkillCard
                    title="Vite"
                    description="Framework"
                    level={4}
                    icon={ViteJSIcon}
                />
                <SkillCard
                    title="React Native"
                    description="Framework"
                    level={3}
                    icon={ReactIcon}
                />
                <SkillCard
                    title="Expo"
                    description="Framework"
                    level={3}
                    icon={ExpoIcon}
                />
                <SkillCard
                    title="TypeScript"
                    description="Linguagem"
                    level={4}
                    icon={TypeScriptIcon}
                />
                <SkillCard
                    title="Tailwind CSS"
                    description="Lib"
                    level={5}
                    icon={TailwindIcon}
                />
                <SkillCard
                    title="Git / GitHub"
                    description="Controle de versão"
                    level={3}
                    icon={GitIcon}
                />
                <SkillCard
                    title="JavaScript"
                    description="Linguagem"
                    level={4}
                    icon={JavaScriptIcon}
                />
                <SkillCard
                    title="CSS"
                    description="Linguagem"
                    level={3}
                    icon={CSSIcon}
                />
                <SkillCard
                    title="HTML"
                    description="Linguagem de tags"
                    level={5}
                    icon={HTMLIcon}
                />
                <SkillCard
                    title="MySQL"
                    description="Banco de dados"
                    level={3}
                    icon={MySQLIcon}
                />
                <SkillCard
                    title="PostgreSQL"
                    description="Banco de dados"
                    level={4}
                    icon={PostgreSQLIcon}
                />
                <SkillCard
                    title="MongoDB"
                    description="Banco de dados"
                    level={3}
                    icon={MongoDBIcon}
                />
                <SkillCard
                    title="Node.js"
                    description="Software"
                    level={4}
                    icon={NodeJSIcon}
                />
                <SkillCard
                    title="Express"
                    description="Node.js Framework"
                    level={3}
                    icon={ExpressIcon}
                />
                <SkillCard
                    title="Docker"
                    description="Container"
                    level={2}
                    icon={DockerIcon}
                />
            </div>
        </section>
    )
}

export default Skills