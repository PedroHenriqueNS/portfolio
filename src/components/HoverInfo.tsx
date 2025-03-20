import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface HoverInfoProps {
    info?: string | null
    children?: React.ReactNode
    size?: number
    side?: "top" | "bottom"
    hasIcon?: boolean
    className?: string
}

const HoverInfo = ({ info, children, size = 13, hasIcon = true, className = "", side="bottom" }: HoverInfoProps) => {

    const isMobile = window.innerWidth < 768 ? true : false

    if (isMobile) return (
        <Popover>
            <PopoverTrigger asChild>
                {hasIcon
                    ? <Info size={size} className={cn("rounded-full hover:bg-neutral-900/10 cursor-help text-neutral-400", className)} />
                    : children
                }
            </PopoverTrigger>
            {info != null && <PopoverContent className="p-2 px-4 text-xs text-center w-max" side={side}>
                {info
                    ? <pre className="text-xs text-center whitespace-pre-wrap font-jakarta">{info}</pre>
                    : children
                }
            </PopoverContent>}
        </Popover>

    )

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {hasIcon
                        ? <Info size={size} className={cn("rounded-full hover:bg-neutral-900/10 cursor-help text-neutral-400", className)} />
                        : children
                    }
                </TooltipTrigger>
                {info != null && <TooltipContent side={side}>
                    {info
                        ? <pre className="text-xs text-center whitespace-pre-wrap font-jakarta">{info}</pre>
                        : children
                    }
                </TooltipContent>}
            </Tooltip>
        </TooltipProvider>

    )
}

export default HoverInfo