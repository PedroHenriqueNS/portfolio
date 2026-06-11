import useObserver from "@/hooks/useObserver"
import { cn } from "@/lib/utils"

const AboutMe = () => {

    const {
        containerRef,
        hasAlreadyViewed
    } = useObserver()

    return (
        <section
            ref={containerRef}
            className={cn(
                'flex-center flex-col gap-4 w-2/3 mb-24 transition-all ease-in-out duration-[800ms] delay-500 transform -translate-y-10 opacity-0 max-sm:w-full max-sm:px-5',
                hasAlreadyViewed && 'translate-y-0 opacity-100'
            )}
        >
            <h2 className='h2-bold font-jakarta'>Sobre mim</h2>

            <div className='flex-center flex-col gap-1 text-neutral-600 base-regular text-center !leading-[180%] dark:text-neutral-400'>
                <p>
                    Engenheiro de Software Pleno com mais de 4 anos de experiência em desenvolvimento full stack de aplicações web e mobile em produção. Stack centrada em TypeScript (React.js, Next.js, React Native, NestJS), com infraestrutura AWS e bancos relacionais e NoSQL.
                    <br />
                    Atualmente na Dry Telecom, defino padrões técnicos, decisões de arquitetura e fluxos de CI/CD, além de mentorar desenvolvedores via code reviews e pair programming. Foco em arquitetura escalável, qualidade de código e entrega contínua.
                </p>
                <p className='mt-3 small-regular text-neutral-500'>
                    Bacharel em Ciência da Computação — Universidade Anhembi Morumbi, 2025.
                </p>
            </div>
        </section>
    )
}

export default AboutMe