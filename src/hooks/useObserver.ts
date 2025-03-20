import { useEffect, useRef, useState } from "react"

export default function useObserver(
    onView?: () => void
) {

    const containerRef = useRef<HTMLDivElement>(null)
    const [isViewing, setIsViewing] = useState(false)
    const [hasAlreadyViewed, setHasAlreadyViewed] = useState(false)

    const isMobile = window.innerWidth <= 700 ? true : false


    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            const [entry] = entries
            setIsViewing(entry.isIntersecting)

            if (onView) onView()
            if (entry.isIntersecting) setHasAlreadyViewed(true)
        }, {
            root: null,
            rootMargin: isMobile ? '0px' : '-190px',
            threshold: 0
        })

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            if (containerRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(containerRef.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        containerRef,
        isViewing,
        hasAlreadyViewed
    }
}