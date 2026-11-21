import MyImage from '@/assets/images/my_img_2.webp'
import { buttonVariants } from './ui/button'
import { ArrowDownToLine } from 'lucide-react'
import useObserver from '@/hooks/useObserver'
import { useEffect } from 'react'

interface IPresentation {
    // isViewingPresentation: boolean
    setIsViewingPresentation: (isViewing: boolean) => void
}

const Presentation = ({ setIsViewingPresentation }: IPresentation) => {

    const {
        containerRef,
        isViewing,
    } = useObserver()

    useEffect(() => {
        setIsViewingPresentation(isViewing)
    }, [isViewing, setIsViewingPresentation])

    // A entrada é uma animação CSS, não uma classe trocada por JavaScript: o topo da
    // página aparece assim que o HTML pré-renderizado chega, e o LCP pode ser medido.
    return (
        <section
            ref={containerRef}
            className="p-24 px-40 flex-center gap-24 animate-in fade-in slide-in-from-top-10 duration-[800ms] max-sm:flex-col max-sm:px-12 max-sm:gap-14"
        >
            <img
                className='object-cover rounded-full size-[20rem] outline-1 outline-blue-600 p-1 max-sm:size-[15rem]'
                src={MyImage}
                alt='Foto de Pedro Henrique, engenheiro de software full stack'
                width={320}
                height={320}
                fetchPriority='high'
            />

            <div className='flex flex-col gap-3 max-sm:items-center'>
                <h1 className='flex flex-col gap-3 max-sm:items-center'>
                    <span className='text-4xl font-jakarta font-medium text-center'>
                        Olá, sou{" "}
                        <br className='sm:hidden' />
                        <span className='font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500'>Pedro Henrique</span>
                    </span>

                    <span className='text-base text-neutral-600 dark:text-neutral-400 font-medium'>Engenheiro de Software · Full Stack</span>
                </h1>

                <div className='flex gap-5 max-lg:gap-3 max-sm:flex-col max-sm:items-center'>
                    <a
                        className={buttonVariants({
                            variant: 'default',
                            size: 'default',
                            className: 'bg-gradient-to-r from-blue-600 to-cyan-500 w-max mt-1 px-8 py-5 !rounded-full text-white text-md cursor-pointer font-semibold hover:drop-shadow-2xl hover:text-cyan-100 hover:from-cyan-600 hover:to-blue-700 transition-colors hover:shadow-[0_0_20px_0_rgba(34,211,238,1)] dark:hover:shadow-[0_0_20px_0_rgba(34,211,238,0.4)]'
                        })}
                        href='/curriculo_PedroHenrique.pdf'
                        download="Currículo - Pedro Henrique do Nascimento Silva"
                    >
                        Baixar currículo
                        <div>
                            <ArrowDownToLine className='!size-5' />
                        </div>
                    </a>
                    <a
                        className={buttonVariants({
                            variant: 'default',
                            size: 'icon',
                            className: '!p-0 !size-max overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 border-transparent border-2 bg-clip-border w-max mt-1 !rounded-full text-white text-md cursor-pointer font-semibold hover:drop-shadow-2xl hover:text-cyan-100 hover:from-cyan-600 hover:to-blue-700 transition-all hover:shadow-[0_0_15px_0_rgba(34,211,238,0.5)] dark:hover:shadow-[0_0_20px_0_rgba(34,211,238,0.35)]'
                        })}
                        // className={'p-0 size-max border-2 !bg-gradient-to-r !from-blue-600 !to-cyan-500 !border-transparent !bg-clip-border'}
                        href='#contatos'
                    >
                        <div className='px-8 py-2 h-9 bg-background'>
                            <p className='text-neutral-900 dark:text-white'>Contato</p>
                            {/* <div>
                        <ArrowDownToLine className='!size-5' />
                    </div> */}
                        </div>
                    </a>
                </div>

                <a
                    className='w-max text-sm font-medium text-neutral-600 dark:text-neutral-400 underline underline-offset-4 decoration-blue-600/50 hover:text-cyan-600 dark:hover:text-cyan-400 max-sm:self-center'
                    href='/resume_PedroHenrique_EN.pdf'
                    hrefLang='en'
                    lang='en'
                    download="Resume - Pedro Henrique do Nascimento Silva"
                >
                    Resume in English (PDF)
                </a>
            </div>
        </section>
    )
}

export default Presentation