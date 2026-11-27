# Requisitos do produto

## Problema

O portfólio anterior (React + Vite, hoje em `old/`) passava as informações certas, mas com texto demais e pouco movimento, e só em português. Para quem avalia um desenvolvedor de front-end, o próprio site é a primeira amostra de trabalho.

> TODO: Confirmar o porquê: o site serve de prova do nível do Pedro para recrutadores, tech leads e clientes, e o próprio site é a demonstração de front-end e motion?

## Público

- **Principal:** recrutadores, tech leads e clientes que avaliam o Pedro Henrique.
- **Secundário:** buscadores e leitores automáticos que indexam o site (sitemap, JSON-LD, `/llms.txt`, o resumo do site em Markdown no formato llmstxt.org).

## Objetivos

- A mesma informação do site anterior, com menos texto e mais desenho.
- Motion em todas as seções, com o scroll como motor principal, sem deixar de ser minimalista.
- Versão própria para o celular: uma seção pode ter desenho e motion diferentes abaixo de 768 px.
- Todo projeto tem página de detalhes; os 5 destaques ficam num palco e os outros 12 numa lista.
- Três idiomas: português do Brasil, inglês americano e espanhol neutro latino-americano.
- Não regredir SEO: as mesmas URLs em português, metadados, dados estruturados, `sitemap.xml` e `llms.txt`.

## Não objetivos

- Blog, CMS ou formulário de contato.
- Trocar hospedagem ou pipeline de deploy.
- Adicionar ou remover projetos na reconstrução.
- Mexer em analytics.

Também são falhas, mesmo funcionando:

- O visual genérico de dev: fundo escuro, fonte mono e acento neon.
- Página carregada de texto, ou o mesmo bloco "título + caixa" em todas as seções.
- Sequestrar o scroll com uma biblioteca de smooth scroll.
- Conteúdo que só aparece com JavaScript ou com motion ligado.
- Corte seco entre seções ou entre estados.
- Celular travando ou pulando durante o scroll.

## Métricas de sucesso

- As 17 páginas de projeto, a home e a 404 existem em `dist/` nos três idiomas (57 páginas), com `sitemap.xml` e `llms.txt`; o build falha se uma página perder canonical, JSON-LD ou `hreflang` recíproco, ou se faltar texto num idioma.
- O seletor de idioma leva à mesma página e à mesma seção nos outros dois idiomas; nenhuma frase aparece cortada em inglês ou espanhol.
- Cada URL canônica responde 200 direto, sem redirect, com o HTML completo sem JavaScript.
- Em 1440 px e 390 px, nos temas claro e escuro: nenhuma rolagem horizontal, nenhum texto cortado, nenhum corte seco.
- Com `prefers-reduced-motion: reduce` e sem JavaScript: todo o conteúdo visível, nada preso.
- Teclado: todo link e botão alcançável, foco visível e nunca escondido atrás de uma folha; tooltips e gavetas abrem e fecham por teclado.
- Firefox e Safari conferidos, com a medição do deslocamento de scroll no Firefox.
- Lighthouse mobile da home e de uma página de projeto não pior que o do site anterior em Performance, Acessibilidade e SEO.

## Restrições

- As URLs canônicas não mudam: `/` e `/projetos/<slug>`, sem barra final e sem salto de redirect.
- O deploy não muda: `yarn build` gera `dist/` e o push na `main` o espelha na Hostinger por rsync.
- Os fatos não mudam e batem com o currículo; inglês e espanhol são adaptados do português, nunca mais fortes que ele. Nomes de tecnologias, empresas e projetos não se traduzem.
- Texto mínimo: o elemento principal é o conteúdo; texto secundário em tooltip, ícone ou gaveta. Texto nunca abaixo de 11 px; tooltip alcançável por teclado e toque; gaveta em vez de modal abaixo de 768 px; alvos de toque de 44 px.
- Contraste AA de texto e foco nos dois temas, medido contra o fundo real.
- Tema claro e escuro com a chave `data-theme` no `localStorage` e o script inline que evita piscar.
- Fontes servidas pelo próprio site, não por CDN.
- O site anterior fica preservado em `old/` e nada dele entra no `dist/`.
