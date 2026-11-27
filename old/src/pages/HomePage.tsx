import { useState } from 'react'
import Header from '@/components/Header'
import Presentation from '@/components/Presentation'
import AboutMe from '@/components/AboutMe'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import FeaturedProject from '@/components/FeaturedProject'
import Contacts from '@/components/Contacts'
import Footer from '@/components/Footer'

function HomePage() {

  const [isViewingPresentation, setIsViewingPresentation] = useState(false)

  return (
    <>
      <Header isViewingPresentation={isViewingPresentation} />

      <main className='w-full flex-center flex-col'>
        <Presentation setIsViewingPresentation={setIsViewingPresentation} />

        <AboutMe />

        <Experience />

        <Skills />

        <FeaturedProject />

        <Projects />

        <Contacts />
      </main>

      <Footer />
    </>
  )
}

export default HomePage
