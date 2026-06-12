import { cn } from '@/lib/utils'
import type { IExperience } from '@/constants'

interface ExperienceCardProps {
    experience: IExperience
    index: number
    show: boolean
}

const ExperienceCard = ({ experience, index, show }: ExperienceCardProps) => {
    const { role, highlight, company, location, period, current, summary, stack } = experience

    return (
        <div
            className={cn(
                'relative pl-12 transition-all ease-out duration-700 transform translate-y-7 opacity-0 max-sm:pl-10',
                show && 'translate-y-0 opacity-100'
            )}
            style={{ transitionDelay: `${index * 120}ms` }}
        >
            <span
                aria-hidden
                className={cn(
                    'absolute left-0 top-1.5 size-[18px] rounded-full border-2 border-blue-600 bg-background z-[2]',
                    current && 'border-0 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-[0_0_18px_0_rgba(34,211,238,0.6)] animate-pulse'
                )}
            />

            <div className='border-1 border-b-4 rounded-xl border-blue-800 dark:border-blue-900 p-5 px-6 bg-background/40 max-sm:px-4 [transform:translateZ(0)] [backface-visibility:hidden]'>
                <div className='flex justify-between items-baseline gap-3 flex-wrap'>
                    <h3 className='font-jakarta font-bold text-lg'>
                        {role}{highlight && ' '}
                        {highlight && (
                            <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500'>{highlight}</span>
                        )}
                        {current && (
                            <span className='ml-2 align-middle text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-[#04111a] bg-gradient-to-r from-cyan-200 to-cyan-500'>presente</span>
                        )}
                    </h3>
                    <span className='font-jakarta text-xs text-neutral-500 whitespace-nowrap'>{period}</span>
                </div>

                <p className='font-jakarta font-semibold text-sm mt-1 w-max bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500'>
                    {company} · {location}
                </p>

                <p className='text-sm text-neutral-600 dark:text-neutral-400 leading-[170%] mt-3'>{summary}</p>

                <div className='flex flex-wrap gap-2 mt-3.5'>
                    {stack.map((tech) => (
                        <span
                            key={tech}
                            className='font-jakarta text-xs text-neutral-700 dark:text-slate-300 border border-blue-800/60 rounded-full px-3 py-1 bg-blue-500/5'
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExperienceCard
