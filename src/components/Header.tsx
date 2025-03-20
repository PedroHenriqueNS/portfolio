import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

import MyImage from '@/assets/images/my_img_1.jpg'

interface IHeader {
    isViewingPresentation: boolean
}

const Header = ({ isViewingPresentation }: IHeader) => {

    // const [isScrolled, setIsScrolled] = useState(false);
    const [theme, setTheme] = useState<string>(() => {
        return localStorage.getItem("data-theme") || "dark";
    })

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollPosition = window.scrollY;
    //         setIsScrolled(scrollPosition > 50);
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    const toggleTheme = () => {
        const newTheme = theme == 'dark' ? 'light' : 'dark';

        setTheme(newTheme)
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.toggle(newTheme)
        localStorage.setItem('data-theme', newTheme)

    }

    return (
        <header className={cn(
            'sticky top-0 z-10 flex items-center justify-between w-full bg-[#000012] backdrop-blur-2xl max-lg:w-dvw border-b-1 border-blue-600',
            // isScrolled && 'bg-[#000012]/30'
        )}>
            <div className={cn(
                'absolute transition-all ease-in-out duration-500 transform -translate-x-1/2 left-1/2',
                !isViewingPresentation && 'sm:-translate-x-0 sm:left-0'
            )}>
                <h1 className={cn(
                    'text-transparent font-jakarta select-none text-3xl font-bold bg-clip-text bg-gradient-to-r from-slate-300 to-cyan-200 m-7 mx-20 z-0',
                    // isScrolled && 'from-slate-900 to-cyan-800 dark:from-slate-300 dark:to-cyan-200'
                )}>Portfólio</h1>
            </div>

            <div className={cn(
                'absolute transition-all ease-in-out duration-500 transform -translate-x-1/2 left-1/2 opacity-0 max-lg:hidden',
                !isViewingPresentation && 'opacity-100'
            )}>
                <div className='flex-center flex-row gap-5'>
                    <img
                        className='size-12 object-cover rounded-full outline-1 outline-blue-600 p-0.5'
                        src={MyImage}
                    />
                    <h1 className={cn(
                        'transition-all ease-in-out duration-1000 w-0 truncate text-transparent font-jakarta select-none text-xl font-bold bg-clip-text bg-gradient-to-r from-slate-300 to-cyan-200',
                        !isViewingPresentation && 'w-full'
                    )}>
                        Pedro Henrique
                    </h1>
                </div>
            </div>

            {/* <div className='absolute transform -translate-x-1/2 left-1/2'>
                <h1 className={cn(
                    'text-transparent font-jakarta select-none text-3xl font-bold bg-clip-text bg-gradient-to-r from-slate-300 to-cyan-200',
                    isScrolled && 'from-slate-900 to-cyan-800 dark:from-slate-300 dark:to-cyan-200'
                )}>Portfólio</h1>
            </div> */}

            <div className={cn(
                'flex items-center justify-end flex-1 text-right m-7 mx-20 max-sm:mx-5 z-10',
                !isViewingPresentation && 'max-sm:opacity-0'
            )}>
                <Button
                    variant={'ghost'}
                    className={cn(
                        '!bg-transparent rounded-full border-2 border-transparent hover:border-blue-600/40 !px-6 !py-5 cursor-pointer !text-white',
                        // isScrolled && '!text-slate-800'
                    )}
                    onClick={toggleTheme}
                >
                    {theme == 'dark'
                        ? <Moon className='!size-6' />
                        : <Sun className='!size-6' />
                    }

                    <p className='font-jakarta text-lg max-sm:hidden'>{theme}</p>
                </Button>
            </div>
        </header>
    )
}

export default Header