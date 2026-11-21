import { findProject } from '@/constants/projects'

/**
 * /projetos/<slug> abre a página do projeto. Só minúsculas, como no servidor: o Apache
 * só serve o arquivo pré-renderizado para o slug exato, e o cliente precisa concordar
 * com o HTML que recebeu, ou a hidratação falha. Aceita também o nome do arquivo
 * pré-renderizado (/projeto-<slug>.html), caso alguém abra o arquivo diretamente.
 */
export const resolveProject = (pathname: string) => {
    const match = pathname.match(/^\/projetos\/([a-z0-9-]+)\/?$/) ?? pathname.match(/^\/projeto-([a-z0-9-]+)(?:\.html)?$/)
    return match ? findProject(match[1]) : undefined
}
