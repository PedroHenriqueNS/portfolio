import type { ImageMetadata } from 'astro'

import i_typescript from '@/assets/icons/typescript.svg'
import i_astro from '@/assets/icons/astro.svg'
import i_nestjs from '@/assets/icons/nestjs.svg'
import i_typeorm from '@/assets/icons/typeorm.svg'
import i_redis from '@/assets/icons/redis.svg'
import i_clerk from '@/assets/icons/clerk.svg'
import i_cloudflare from '@/assets/icons/cloudflare.svg'
import i_react from '@/assets/icons/react.svg'
import i_vitejs from '@/assets/icons/vitejs.svg'
import i_tailwind from '@/assets/icons/tailwind.svg'
import i_tanstack from '@/assets/icons/tanstack.svg'
import i_vitest from '@/assets/icons/vitest.svg'
import i_gsap from '@/assets/icons/gsap.svg'
import i_shadcn from '@/assets/icons/shadcn.svg'
import i_appwrite from '@/assets/icons/appwrite.svg'
import i_react_query from '@/assets/icons/react-query.svg'
import i_nextjs from '@/assets/icons/nextjs.svg'
import i_electron from '@/assets/icons/electron.svg'
import i_supabase from '@/assets/icons/supabase.svg'
import i_python from '@/assets/icons/python.svg'
import i_flask from '@/assets/icons/flask.svg'
import i_nodejs from '@/assets/icons/nodejs.svg'
import i_express from '@/assets/icons/express.svg'
import i_docker from '@/assets/icons/docker.svg'
import i_mysql from '@/assets/icons/mysql.svg'
import i_sanity from '@/assets/icons/sanity.svg'
import i_expo from '@/assets/icons/expo.svg'
import i_ionic from '@/assets/icons/ionic.svg'
import i_angular from '@/assets/icons/angular.svg'
import i_javascript from '@/assets/icons/javascript.svg'
import i_css from '@/assets/icons/css.svg'
import i_html from '@/assets/icons/html.svg'
import i_zustand from '@/assets/icons/zustand.svg'
import i_rabbitmq from '@/assets/icons/rabbitmq.svg'
import i_aws from '@/assets/icons/aws.svg'
import i_kubernetes from '@/assets/icons/kubernetes.svg'
import i_argocd from '@/assets/icons/argocd.svg'
import i_grafana from '@/assets/icons/grafana.svg'
import i_git from '@/assets/icons/git.svg'
import i_postgresql from '@/assets/icons/postgresql.svg'
import i_mongodb from '@/assets/icons/mongodb.svg'
import i_dynamodb from '@/assets/icons/dynamodb.svg'
import i_csharp from '@/assets/icons/csharp.svg'
import i_dotnet from '@/assets/icons/dotnet.svg'
import i_java from '@/assets/icons/java.svg'

const tech = (title: string, icon: ImageMetadata) => ({ title, icon })

export const TECH = {
  typescript: tech('TypeScript', i_typescript),
  astro: tech('Astro', i_astro),
  nestjs: tech('NestJS', i_nestjs),
  typeorm: tech('TypeORM', i_typeorm),
  redis: tech('Redis', i_redis),
  clerk: tech('Clerk', i_clerk),
  cloudflare: tech('Cloudflare', i_cloudflare),
  react: tech('React.js', i_react),
  // Mesmo ícone do React; o título mantém o nome usado no site antigo.
  'react-native': tech('React Native', i_react),
  vitejs: tech('Vite', i_vitejs),
  tailwind: tech('Tailwind CSS', i_tailwind),
  tanstack: tech('TanStack Router', i_tanstack),
  vitest: tech('Vitest', i_vitest),
  gsap: tech('GSAP', i_gsap),
  shadcn: tech('ShadCN/ui', i_shadcn),
  appwrite: tech('Appwrite', i_appwrite),
  'react-query': tech('React Query', i_react_query),
  nextjs: tech('Next.js', i_nextjs),
  electron: tech('Electron', i_electron),
  supabase: tech('Supabase', i_supabase),
  python: tech('Python', i_python),
  flask: tech('Flask', i_flask),
  nodejs: tech('Node.js', i_nodejs),
  express: tech('Express', i_express),
  docker: tech('Docker', i_docker),
  mysql: tech('MySQL', i_mysql),
  sanity: tech('Sanity', i_sanity),
  expo: tech('Expo', i_expo),
  ionic: tech('Ionic', i_ionic),
  angular: tech('Angular', i_angular),
  javascript: tech('JavaScript', i_javascript),
  css: tech('CSS', i_css),
  html: tech('HTML', i_html),
  zustand: tech('Zustand', i_zustand),
  rabbitmq: tech('RabbitMQ', i_rabbitmq),
  aws: tech('AWS', i_aws),
  kubernetes: tech('Kubernetes', i_kubernetes),
  argocd: tech('ArgoCD', i_argocd),
  grafana: tech('Grafana', i_grafana),
  git: tech('Git / GitHub', i_git),
  postgresql: tech('PostgreSQL', i_postgresql),
  mongodb: tech('MongoDB', i_mongodb),
  dynamodb: tech('DynamoDB', i_dynamodb),
  csharp: tech('C#', i_csharp),
  dotnet: tech('.NET', i_dotnet),
  java: tech('Java', i_java),
} satisfies Record<string, { title: string; icon: ImageMetadata }>

export type TechId = keyof typeof TECH
