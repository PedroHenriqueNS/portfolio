import { useEffect, useState } from "react"

/**
 * true quando a viewport tem até `maxWidth` px.
 *
 * Começa em false (o mesmo valor no HTML pré-renderizado e no primeiro render do
 * cliente, para a hidratação bater) e só depois lê a viewport real.
 */
export default function useIsBelow(maxWidth: number) {
    const [isBelow, setIsBelow] = useState(false)

    useEffect(() => {
        const query = window.matchMedia(`(max-width: ${maxWidth}px)`)
        const update = () => setIsBelow(query.matches)
        update()
        query.addEventListener("change", update)
        return () => query.removeEventListener("change", update)
    }, [maxWidth])

    return isBelow
}
