import useObserver from '@/hooks/useObserver'
import { cn } from '@/lib/utils'
import ContactCard from './ContactCard'

const Contacts = () => {

    const {
        containerRef,
        hasAlreadyViewed
    } = useObserver()

    return (
        <section
            ref={containerRef}
            className={cn(
                'flex-center flex-col gap-10 w-5/6 mb-52 transition-all ease-in-out duration-[800ms] delay-200 transform -translate-y-10 opacity-0 max-sm:w-full max-sm:px-5',
                hasAlreadyViewed && 'translate-y-0 opacity-100'
            )}
        >
            <h2 id='contatos' className='h2-bold font-jakarta'>Contatos</h2>

            <div className='flex-center gap-20 max-md:flex-wrap'>
                <ContactCard
                    logo='GitHub'
                    description='@PedroHenriqueNS'
                    href="https://www.github.com/PedroHenriqueNS"
                />
                <ContactCard
                    logo='CellPhone'
                    description='(11) 97016 - 8417'
                    href="https://api.whatsapp.com/send?phone=5511970168417"
                />
                <ContactCard
                    logo='Email'
                    description='pedrohe.contato@gmail.com'
                    href="mailto:pedrohe.contato@gmail.com"
                />
                <ContactCard
                    logo='LinkedIn'
                    description='@PedroHenriqueNS'
                    href="https://www.linkedin.com/in/PedroHenriqueNS/"
                />
            </div>

        </section>
    )
}

export default Contacts