import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// Um arquivo por idioma e projeto: src/content/projects/<locale>/<slug>.md; o corpo é a descrição.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({ summary: z.string() }),
})

export const collections = { projects }
