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
                    Engenheiro de Software Full Stack com mais de 5 anos de experiência em aplicações web e mobile em produção. Stack centrada em TypeScript (React.js, Next.js, React Native, Node.js, NestJS) na AWS, com sistemas orientados a eventos (RabbitMQ, SQS), Kubernetes com ArgoCD e Grafana, e bancos relacionais e NoSQL.
                    <br />
                    Hoje construo o Linkeza, meu próprio SaaS de links e QR Codes dinâmicos, cuidando de produto, arquitetura e entrega de ponta a ponta. Antes, na Dry Telecom, implementei do zero um sistema de mensageria com RabbitMQ e NestJS, defini padrões técnicos e fluxos de CI/CD e mentorei desenvolvedores via code reviews e pair programming. No dia a dia uso Claude Code com subagentes num fluxo de Spec-Driven Development.
                </p>
                <p className='mt-3 small-regular text-neutral-600 dark:text-neutral-400'>
                    Bacharel em Ciência da Computação — Universidade Anhembi Morumbi, 2025 · Técnico em Telecomunicações — ITB Brasílio Flores de Azevedo · Inglês avançado
                </p>
            </div>
        </section>
    )
}

export default AboutMe