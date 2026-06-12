import { useState } from 'react'
import Header from './components/Header'
import Presentation from './components/Presentation'
import AboutMe from './components/AboutMe'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contacts from './components/Contacts'

function App() {

  const [isViewingPresentation, setIsViewingPresentation] = useState(false)

  return (
    <>
      <Header isViewingPresentation={isViewingPresentation} />

      <article className='w-full flex-center flex-col'>
        <Presentation setIsViewingPresentation={(isViewing) => setIsViewingPresentation(isViewing)} />

        <AboutMe />

        <Experience />

        <Skills />

        <Projects />

        <Contacts />
      </article>
    </>
  )
}

export default App
