import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import { resolveProject } from './lib/route'

/** Roteamento mínimo por caminho: página de projeto ou, para qualquer outro caminho, a home. */
function App({ pathname }: { pathname: string }) {
    const project = resolveProject(pathname)
    return project ? <ProjectPage project={project} /> : <HomePage />
}

export default App
