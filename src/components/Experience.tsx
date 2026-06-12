import { useEffect, useRef, useState } from 'react'
import useObserver from '@/hooks/useObserver'
import { cn } from '@/lib/utils'
import { FlickeringGrid } from './magicui/flickering-grid'
import { Experiences, Metrics, type IMetric } from '@/constants'
import ExperienceCard from './ExperienceCard'

const Counter = ({ metric, active }: { metric: IMetric; active: boolean }) => {
    const [value, setValue] = useState(0)
    const startedRef = useRef(false)

    useEffect(() => {
        if (!active || startedRef.current) return
        startedRef.current = true

        const duration = 1400
        let raf = 0
        let start = 0

        const tick = (now: number) => {
            if (!start) start = now
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(metric.value * eased))
            if (progress < 1) raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [active, metric.value])

    const prefix = metric.prefix ?? ''
    const suffix = metric.suffix ?? ''

    return (
        <span aria-label={`${prefix}${metric.value.toLocaleString('pt-BR')}${suffix}`}>
            {prefix}{value.toLocaleString('pt-BR')}{suffix}
        </span>
    )
}

const Experience = () => {
    const { containerRef, hasAlreadyViewed } = useObserver()

    return (
        <section
            ref={containerRef}
            className={cn(
                'flex-center flex-col gap-4 w-5/6 mb-24 transition-all ease-in-out duration-[800ms] delay-200 transform -translate-y-10 opacity-0 max-sm:w-full max-sm:px-5',
                hasAlreadyViewed && 'translate-y-0 opacity-100'
            )}
        >
            <h2 className='h2-bold font-jakarta'>Experiência Profissional</h2>

            <div className='relative w-full max-w-4xl flex flex-wrap justify-center rounded-2xl overflow-hidden my-6 bg-blue-950/10'>
                <FlickeringGrid
                    className='absolute inset-0 -z-10 size-full opacity-20'
                    squareSize={4.1}
                    gridGap={1}
                    color='#3b82f6'
                    maxOpacity={0.4}
                    flickerChance={0.25}
                />
                {Metrics.map((metric, i) => (
                    <div key={i} className='flex-1 min-w-[150px] text-center px-4 py-7 border-b-4 border-blue-900'>
                        <p className='font-jakarta font-extrabold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500'>
                            <Counter metric={metric} active={hasAlreadyViewed} />
                        </p>
                        <p className='font-jakarta text-xs text-neutral-500 mt-2'>{metric.label}</p>
                    </div>
                ))}
            </div>

            <div className='relative w-full max-w-4xl'>
                <div
                    aria-hidden
                    className='absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-600 to-transparent'
                />
                <div className='flex flex-col gap-8'>
                    {Experiences.map((experience, i) => (
                        <ExperienceCard
                            key={i}
                            experience={experience}
                            index={i}
                            show={hasAlreadyViewed}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experience
