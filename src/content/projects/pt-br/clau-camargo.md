---
summary: "Plataforma de campanha de Clau Camargo (2026): moldura de foto no navegador, molduras de apoiadores, vídeos por cidade para QR Codes e colinha em canvas."
---

Site de campanha da candidata a deputada estadual Clau Camargo em 2026, que cresceu de um gerador de moldura de foto para uma plataforma com várias frentes.

Gerador de moldura com a foto processada só no navegador (**Canvas API**, suporte a HEIC), molduras co-assinadas por apoiadores em URLs próprias, páginas de vídeo por cidade para QR Codes impressos com player próprio, e a "Minha Colinha", que desenha e exporta a colinha de votação em canvas.

As páginas de apoiadores e cidades são pré-renderizadas no build por um plugin **Vite** próprio, para que o link mostre a prévia certa no WhatsApp. Métricas por cidade e canal com **Google Tag Manager** e **GA4**, com política de privacidade alinhada à LGPD.

Feito em **React 19** com **React Compiler**, **TypeScript**, **TanStack Router** e **Tailwind CSS**, com mais de 370 testes em **Vitest** e deploy via **GitHub Actions** a cada release.
