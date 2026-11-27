import type { TechId } from './tech'

export interface Skill {
  id: string
  title: string
  icon: TechId
  group: 'featured' | 'frontend' | 'backend'
  level: 1 | 2 | 3 | 4 | 5
  /** Sufixo da mensagem `cat_<category>`. */
  category: string
}

export const SKILLS: Skill[] = [
  { id: 'nextjs', title: 'Next.js', icon: 'nextjs', group: 'featured', level: 5, category: 'framework' },
  { id: 'react-native', title: 'React Native', icon: 'react-native', group: 'featured', level: 4, category: 'framework' },
  { id: 'nestjs', title: 'NestJS', icon: 'nestjs', group: 'featured', level: 5, category: 'nodejs_framework' },
  { id: 'react', title: 'React.js', icon: 'react', group: 'frontend', level: 5, category: 'lib' },
  { id: 'vite', title: 'Vite', icon: 'vitejs', group: 'frontend', level: 5, category: 'framework' },
  { id: 'expo', title: 'Expo', icon: 'expo', group: 'frontend', level: 4, category: 'framework' },
  { id: 'typescript', title: 'TypeScript', icon: 'typescript', group: 'frontend', level: 4, category: 'linguagem' },
  { id: 'javascript', title: 'JavaScript', icon: 'javascript', group: 'frontend', level: 4, category: 'linguagem' },
  { id: 'tailwind', title: 'Tailwind CSS', icon: 'tailwind', group: 'frontend', level: 5, category: 'lib' },
  { id: 'css', title: 'CSS', icon: 'css', group: 'frontend', level: 3, category: 'linguagem' },
  { id: 'html', title: 'HTML', icon: 'html', group: 'frontend', level: 5, category: 'linguagem_de_tags' },
  { id: 'react-query', title: 'React Query', icon: 'react-query', group: 'frontend', level: 4, category: 'lib' },
  { id: 'zustand', title: 'Zustand', icon: 'zustand', group: 'frontend', level: 4, category: 'estado' },
  { id: 'gsap', title: 'GSAP', icon: 'gsap', group: 'frontend', level: 2, category: 'animacao' },
  { id: 'nodejs', title: 'Node.js', icon: 'nodejs', group: 'backend', level: 4, category: 'software' },
  { id: 'express', title: 'Express', icon: 'express', group: 'backend', level: 3, category: 'nodejs_framework' },
  { id: 'rabbitmq', title: 'RabbitMQ', icon: 'rabbitmq', group: 'backend', level: 4, category: 'mensageria' },
  { id: 'python', title: 'Python', icon: 'python', group: 'backend', level: 4, category: 'linguagem' },
  { id: 'aws', title: 'AWS', icon: 'aws', group: 'backend', level: 4, category: 'cloud' },
  { id: 'kubernetes', title: 'Kubernetes', icon: 'kubernetes', group: 'backend', level: 4, category: 'orquestracao' },
  { id: 'argocd', title: 'ArgoCD', icon: 'argocd', group: 'backend', level: 4, category: 'gitops_cd' },
  { id: 'grafana', title: 'Grafana', icon: 'grafana', group: 'backend', level: 3, category: 'observabilidade' },
  { id: 'docker', title: 'Docker', icon: 'docker', group: 'backend', level: 4, category: 'container' },
  { id: 'git', title: 'Git / GitHub', icon: 'git', group: 'backend', level: 4, category: 'controle_de_versao' },
  { id: 'postgresql', title: 'PostgreSQL', icon: 'postgresql', group: 'backend', level: 4, category: 'banco_de_dados' },
  { id: 'mysql', title: 'MySQL', icon: 'mysql', group: 'backend', level: 3, category: 'banco_de_dados' },
  { id: 'mongodb', title: 'MongoDB', icon: 'mongodb', group: 'backend', level: 3, category: 'banco_de_dados' },
  { id: 'dynamodb', title: 'DynamoDB', icon: 'dynamodb', group: 'backend', level: 3, category: 'banco_de_dados' },
  { id: 'csharp', title: 'C#', icon: 'csharp', group: 'backend', level: 2, category: 'linguagem' },
  { id: 'dotnet', title: '.NET', icon: 'dotnet', group: 'backend', level: 2, category: 'framework' },
  { id: 'java', title: 'Java', icon: 'java', group: 'backend', level: 2, category: 'linguagem' },
]
