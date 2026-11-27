import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { paraglideVitePlugin } from '@inlang/paraglide-js';

export default defineConfig({
  site: 'https://pedrohenriquens.com.br',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br', 'en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide',
        strategy: ['url', 'globalVariable', 'baseLocale'],
        urlPatterns: [
          {
            pattern: '/projetos/:slug',
            localized: [
              ['pt-br', '/projetos/:slug'],
              ['en', '/en/projects/:slug'],
              ['es', '/es/proyectos/:slug'],
            ],
          },
          {
            pattern: '/:path(.*)?',
            localized: [
              ['pt-br', '/:path(.*)?'],
              ['en', '/en/:path(.*)?'],
              ['es', '/es/:path(.*)?'],
            ],
          },
        ],
      }),
    ],
  },
});
