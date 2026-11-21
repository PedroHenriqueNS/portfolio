import { formatMonth } from '@/constants/projects'

/** Data do build (AAAA-MM-DD), injetada pelo Vite; vale igual no HTML pré-renderizado e no cliente. */
const BUILD_DATE = __BUILD_DATE__

const Footer = () => (
    <footer className='w-full border-t-1 border-blue-600/30 py-8 px-5 text-center font-jakarta text-sm text-neutral-600 dark:text-neutral-400'>
        <p>© {BUILD_DATE.slice(0, 4)} Pedro Henrique do Nascimento Silva · Engenheiro de Software Full Stack · Carapicuíba, SP</p>
        <p className='mt-1'>
            Atualizado em <time dateTime={BUILD_DATE}>{formatMonth(BUILD_DATE.slice(0, 7))?.toLowerCase()}</time>
        </p>
    </footer>
)

export default Footer
