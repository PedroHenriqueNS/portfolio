import {
    AWSIcon, CSharpIcon, CSSIcon, DockerIcon, DotNetIcon, DynamoDBIcon, ExpoIcon, ExpressIcon,
    GitIcon, GSAPIcon, HTMLIcon, JavaIcon, JavaScriptIcon, KubernetesIcon, MongoDBIcon, MySQLIcon,
    NestJSIcon, NextJSIcon, NodeJSIcon, PostgreSQLIcon, PythonIcon, ReactIcon, ReactQueryIcon,
    TailwindIcon, TypeScriptIcon, ViteJSIcon, ZustandIcon,
} from "@/assets/icons"
import SkillCard from "./SkillCard"
import { cn } from "@/lib/utils"
import useObserver from "@/hooks/useObserver"

type Skill = {
    title: string
    description: string
    level: 1 | 2 | 3 | 4 | 5
    icon: string
}

const featuredSkills: Skill[] = [
    { title: 'Next.js', description: 'Framework', level: 5, icon: NextJSIcon },
    { title: 'React Native', description: 'Framework', level: 4, icon: ReactIcon },
    { title: 'NestJS', description: 'Node.js Framework', level: 5, icon: NestJSIcon },
]

const frontendSkills: Skill[] = [
    { title: 'React.js', description: 'Lib', level: 5, icon: ReactIcon },
    { title: 'Vite', description: 'Framework', level: 5, icon: ViteJSIcon },
    { title: 'Expo', description: 'Framework', level: 4, icon: ExpoIcon },
    { title: 'TypeScript', description: 'Linguagem', level: 4, icon: TypeScriptIcon },
    { title: 'JavaScript', description: 'Linguagem', level: 4, icon: JavaScriptIcon },
    { title: 'Tailwind CSS', description: 'Lib', level: 5, icon: TailwindIcon },
    { title: 'CSS', description: 'Linguagem', level: 3, icon: CSSIcon },
    { title: 'HTML', description: 'Linguagem de tags', level: 5, icon: HTMLIcon },
    { title: 'React Query', description: 'Lib', level: 4, icon: ReactQueryIcon },
    { title: 'Zustand', description: 'Estado', level: 4, icon: ZustandIcon },
    { title: 'GSAP', description: 'Animação', level: 2, icon: GSAPIcon },
]

const backendSkills: Skill[] = [
    { title: 'Node.js', description: 'Software', level: 4, icon: NodeJSIcon },
    { title: 'Express', description: 'Node.js Framework', level: 3, icon: ExpressIcon },
    { title: 'Python', description: 'Linguagem', level: 4, icon: PythonIcon },
    { title: 'AWS', description: 'Cloud', level: 4, icon: AWSIcon },
    { title: 'Kubernetes', description: 'Orquestração', level: 4, icon: KubernetesIcon },
    { title: 'Docker', description: 'Container', level: 4, icon: DockerIcon },
    { title: 'Git / GitHub', description: 'Controle de versão', level: 4, icon: GitIcon },
    { title: 'PostgreSQL', description: 'Banco de dados', level: 4, icon: PostgreSQLIcon },
    { title: 'MySQL', description: 'Banco de dados', level: 3, icon: MySQLIcon },
    { title: 'MongoDB', description: 'Banco de dados', level: 3, icon: MongoDBIcon },
    { title: 'DynamoDB', description: 'Banco de dados', level: 3, icon: DynamoDBIcon },
    { title: 'C#', description: 'Linguagem', level: 2, icon: CSharpIcon },
    { title: '.NET', description: 'Framework', level: 2, icon: DotNetIcon },
    { title: 'Java', description: 'Linguagem', level: 2, icon: JavaIcon },
]

const SkillGroup = ({ title, skills, featured = false }: { title: string; skills: Skill[]; featured?: boolean }) => (
    <div className="flex flex-col items-center gap-6 w-full mb-12">
        <h3 className={cn(
            'font-jakarta font-bold text-lg flex items-center gap-3',
            !featured && 'text-slate-700 dark:text-slate-300',
            featured && 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-cyan-200 dark:to-cyan-500'
        )}>
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-blue-600/60" />
            {featured ? '★ Destaques' : title}
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-blue-600/60" />
        </h3>

        <div className="flex-center flex-wrap gap-5">
            {skills.map((skill) => (
                <SkillCard
                    key={skill.title}
                    title={skill.title}
                    description={skill.description}
                    level={skill.level}
                    icon={skill.icon}
                    featured={featured}
                />
            ))}
        </div>
    </div>
)

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
            <h2 className='h2-bold font-jakarta mb-4'>Skills</h2>

            <SkillGroup title="Destaques" skills={featuredSkills} featured />
            <SkillGroup title="Frontend" skills={frontendSkills} />
            <SkillGroup title="Backend" skills={backendSkills} />
        </section>
    )
}

export default Skills
