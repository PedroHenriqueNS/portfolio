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
                    Estudante de Ciências da Computação no último semestre. Adoro desenvolvimento de software e estou pronto para iniciar minha carreira na área. Tenho experiência prática com projetos pessoais que fortaleceram minhas habilidades em ReactJS, NextJS, ViteJS, React Native com Expo e controle de versão com Git.
                    <br />
                    Entusiasta e dedicado, estou motivado para crescer como profissional, contribuir com soluções inovadoras e me aprimorar continuamente neste campo.
                </p>
            </div>
        </section>
    )
}

export default AboutMe