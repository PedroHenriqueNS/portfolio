import useObserver from '@/hooks/useObserver'
import { cn } from '@/lib/utils'
import { ProjectTechnologies } from '@/constants'
import HoverInfo from './HoverInfo'
import { buttonVariants } from './ui/button'
import { ExternalLink, Github, QrCode, Shuffle, BarChart3 } from 'lucide-react'

const LINKEZA_URL = 'https://linkeza.com'
// Imagem de compartilhamento (Open Graph) publicada pelo próprio site do Linkeza
const LINKEZA_PREVIEW = 'https://linkeza.com/compartilhamento-landing-1200x630.jpg'

const highlights = [
    {
        icon: QrCode,
        title: 'QR Code dinâmico',
        text: 'O destino muda quando o negócio precisar, sem reimprimir nada.',
    },
    {
        icon: Shuffle,
        title: 'Rodízio de atendentes',
        text: 'Cada cliente que escaneia cai em um atendente sorteado no WhatsApp.',
    },
    {
        icon: BarChart3,
        title: 'Origem de cada contato',
        text: 'Estatísticas mostram de onde veio cada clique e conversa.',
    },
]

const FeaturedProject = () => {
    const { containerRef, hasAlreadyViewed } = useObserver()

    return (
        <section
            ref={containerRef}
            className={cn(
                'flex-center flex-col gap-4 w-5/6 mb-24 transition-all ease-in-out duration-[800ms] delay-200 transform -translate-y-10 opacity-0 max-sm:w-full max-sm:px-5',
                hasAlreadyViewed && 'translate-y-0 opacity-100'
            )}
        >
            <h2 className='h2-bold font-jakarta'>Projeto em destaque</h2>

            <div className='relative w-full max-w-6xl my-6 rounded-3xl p-[1.5px] bg-gradient-to-br from-violet-500 via-fuchsia-600/40 to-violet-900 shadow-[0_0_60px_-15px_rgba(139,92,246,0.55)]'>
                <div className='relative overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-[#0a0612] text-white'>
                    {/* Brilhos de fundo na paleta do Linkeza */}
                    <div aria-hidden className='pointer-events-none absolute -top-32 -left-24 size-96 rounded-full bg-violet-600/30 blur-3xl' />
                    <div aria-hidden className='pointer-events-none absolute -bottom-40 right-0 size-[28rem] rounded-full bg-fuchsia-700/20 blur-3xl' />

                    <div className='relative grid grid-cols-[1.1fr_1fr] gap-10 p-10 max-lg:grid-cols-1 max-sm:p-5 max-sm:gap-6'>
                        <a
                            href={LINKEZA_URL}
                            target='_blank'
                            rel='noopener'
                            className='group block self-center overflow-hidden rounded-2xl border border-violet-500/30 bg-black/40'
                        >
                            <img
                                className='w-full aspect-[1200/630] object-cover transition-transform duration-700 group-hover:scale-[1.03]'
                                src={LINKEZA_PREVIEW}
                                alt='Landing page do Linkeza: QR Code que leva ao WhatsApp certo, sem reimprimir'
                                width={1200}
                                height={630}
                                loading='lazy'
                                decoding='async'
                            />
                        </a>

                        <div className='flex flex-col gap-5 max-sm:items-center max-sm:text-center'>
                            <div className='flex items-center gap-3 flex-wrap max-sm:justify-center'>
                                <span className='text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full text-[#12051f] bg-gradient-to-r from-violet-300 to-fuchsia-400'>
                                    Pré-lançamento
                                </span>
                                <span className='text-xs font-jakarta text-violet-200/70'>Produto próprio · desde outubro de 2026</span>
                            </div>

                            <div>
                                <h3 className='font-jakarta font-extrabold text-5xl max-sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-violet-400 pb-1'>
                                    Linkeza
                                </h3>
                                <p className='font-jakarta font-semibold text-lg text-violet-100 mt-2 leading-[140%]'>
                                    Um QR Code que leva ao WhatsApp certo, sem reimprimir.
                                </p>
                            </div>

                            <p className='text-sm text-violet-100/70 leading-[170%]'>
                                Encurtador de links brasileiro com QR Code dinâmico e link de WhatsApp com rodízio de atendentes, pensado para negócios locais. Um SaaS que estou construindo sozinho de ponta a ponta: produto, arquitetura, front-end, API, identidade visual e lançamento.
                            </p>

                            <ul className='flex flex-col gap-3 w-full'>
                                {highlights.map(({ icon: Icon, title, text }) => (
                                    <li key={title} className='flex items-start gap-3 text-left'>
                                        <span className='flex-center shrink-0 size-9 rounded-lg bg-violet-500/15 border border-violet-500/30'>
                                            <Icon className='size-4 text-violet-300' />
                                        </span>
                                        <div>
                                            <p className='text-sm font-semibold text-white'>{title}</p>
                                            <p className='text-xs text-violet-100/60 leading-[150%]'>{text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className='flex gap-3 flex-wrap max-sm:justify-center'>
                                {ProjectTechnologies['linkeza'].map((icon) => (
                                    <HoverInfo key={icon.title} info={icon.title} hasIcon={false}>
                                        <span className='flex-center size-9 rounded-lg bg-white/5 border border-white/10'>
                                            <img className='size-5' src={icon.image} alt={icon.title} />
                                        </span>
                                    </HoverInfo>
                                ))}
                            </div>

                            <div className='flex gap-3 flex-wrap mt-1 max-sm:justify-center'>
                                <a
                                    className={buttonVariants({
                                        variant: 'default',
                                        size: 'default',
                                        className: 'cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-700 text-white transition-all hover:from-fuchsia-600 hover:to-violet-700 hover:shadow-[0_0_24px_0_rgba(167,139,250,0.6)]'
                                    })}
                                    href={LINKEZA_URL}
                                    target='_blank'
                                    rel='noopener'
                                >
                                    Conhecer o Linkeza <ExternalLink />
                                </a>
                                <a
                                    className={buttonVariants({
                                        variant: 'outline',
                                        size: 'default',
                                        className: 'cursor-pointer !bg-transparent border-violet-500/40 text-violet-100 hover:!bg-violet-500/10 hover:text-white'
                                    })}
                                    href='https://github.com/linkeza'
                                    target='_blank'
                                    rel='noopener'
                                >
                                    GitHub <Github />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedProject
