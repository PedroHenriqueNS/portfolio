import { useEffect, useState } from "react";
import { FlickeringGrid } from "./magicui/flickering-grid";
import { cn } from "@/lib/utils";

interface SkillCardProps {
    title: string;
    description: string;
    level: 1 | 2 | 3 | 4 | 5;
    icon: string;
    featured?: boolean;
}

const SkillCard = ({
    title,
    description,
    level,
    icon,
    featured = false,
}: SkillCardProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [overPos, setOverPos] = useState(false)

    const isMobile = window.innerWidth <= 768 ? true : false;

    useEffect(() => {
        setOverPos(true)

        const interval = setInterval(() => setOverPos(false), 650) // delay + transition_duration <= 650ms

        return () => clearInterval(interval)
    }, [isOpen])

    const cardSize = featured ? 'size-[140px]' : 'size-[120px]'
    const iconSize = featured ? 'size-[66px]' : 'size-[60px]'
    const borderColor = featured
        ? 'border-cyan-500/60 dark:border-cyan-500/50 shadow-[0_0_18px_0_rgba(34,211,238,0.22)]'
        : 'border-blue-800 dark:border-blue-900'

    return (
        <div
            className={cn(
                "relative flex-center cursor-pointer",
                isOpen && 'max-sm:w-full'
            )}
            onMouseEnter={isMobile ? undefined : () => setIsOpen(true)}
            onMouseLeave={isMobile ? undefined : () => setIsOpen(false)}
            onClick={() => setIsOpen(!isOpen)}
        >
            {featured && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-30 font-jakarta font-bold text-[10px] tracking-wide whitespace-nowrap text-[#04111a] bg-gradient-to-r from-cyan-200 to-cyan-500 rounded-full px-2.5 py-0.5">★ destaque</span>
            )}

            <div className={cn(
                "absolute flex transition-[scale] delay-300 bg-background ease-out",
                isOpen && 'sm:delay-400 sm:scale-125 z-20',
                overPos && 'z-10'
            )}>
                <div className={cn(
                    "border-1 border-b-4 rounded-t-xl flex-center flex-col gap-1 transition-(--skill-card-transition) transform delay-300 ease-in",
                    cardSize,
                    borderColor,
                    isOpen && 'delay-400 rounded-tr-none'
                )}>
                    <img
                        className={iconSize}
                        src={icon}
                        alt={`${title} icon`}
                    />

                    <p className="font-jakarta font-bold text-[1em] whitespace-nowrap">{title}</p>

                    <FlickeringGrid
                        className={cn(
                            "absolute inset-0 -z-10 size-full rounded-t-xl overflow-hidden transition-[border-radius] dark:opacity-80",
                            isOpen && 'rounded-tr-none delay-500'
                        )}
                        squareSize={4.1}
                        gridGap={1}
                        color="#3b82f6"
                        flickerChance={isOpen ? 0.6 : 0}
                    />
                </div>

                <div className={cn(
                    'bg-blue-800 transition-all w-0 overflow-hidden',
                    isOpen && 'sm:delay-1000 w-50'
                )}
                >
                    <div className="flex flex-col justify-between p-2 px-4 h-full">
                        <div className="flex flex-col gap-2">
                            <p className="font-jakarta font-semibold text-neutral-200 whitespace-nowrap">Nível</p>

                            <div className="flex-center gap-0.5 rounded-full overflow-hidden">
                                {Array(5).fill(0).map((_, i) => (
                                    <div key={i} className={cn("bg-sky-100 h-1.5 w-8", level >= i + 1 && 'bg-teal-500')} />
                                ))}
                            </div>
                        </div>

                        <p className="font-jakarta font-medium text-xs mt-2 text-neutral-300 whitespace-nowrap">{description}</p>
                    </div>
                </div>
            </div>


            <div className={cn(
                "border-1 border-b-4 rounded-t-xl flex-center flex-col gap-1 border-blue-900 opacity-0",
                cardSize
            )}>
                <img
                    className={iconSize}
                    src={icon}
                    alt={`${title} icon`}
                />

                <p className="font-jakarta font-bold text-xl text-blue-700">{title}</p>
            </div>
        </div>
    )
}

export default SkillCard
