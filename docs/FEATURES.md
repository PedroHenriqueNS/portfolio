# Funcionalidades

O que o site faz, um bloco por funcionalidade. Nenhuma tem PRD próprio; o produto como um todo está em [PRD.md](./PRD.md). Todas foram publicadas juntas em 2026-11-27, na reconstrução do site (veja [ROADMAP.md](./ROADMAP.md)).

## Hero

- **Purpose:** apresentar quem é o Pedro Henrique em uma tela, com o nome e a foto como prova visual.
- **Behavior:** no desktop, o nome numa linha gigante atravessa a tela conforme o scroll, com a foto em cartão inclinado por cima e leve paralaxe; três ações (Currículo, Resume EN, Fale comigo). No celular, o nome em duas linhas que deslizam em sentidos opostos, a foto entre elas, a ação principal em largura total. Nome e foto estão no HTML sem JavaScript.
- **Implementation:** `src/components/sections/Hero.astro`, cena `src/motion/hero.ts`.
- **PRD:** none
- **Status:** shipped (2026-11-27)

## Sobre e números

- **Purpose:** dizer em uma frase a experiência e o produto atual.
- **Behavior:** uma frase gigante cujas palavras se preenchem na ordem de leitura, com os números em gradiente de acento; no desktop a seção fica presa por cerca de 1,3 tela, no celular o preenchimento acompanha a passagem. Abaixo, chips de formação com detalhe em tooltip.
- **Implementation:** `src/components/sections/About.astro`, cena `src/motion/about.ts`; frase na mensagem `about_sentence`, com os destaques marcados por `**…**`.
- **PRD:** none
- **Status:** shipped (2026-11-27)

## Experiência

- **Purpose:** mostrar a trajetória (4 entradas) sem um bloco de texto por cargo.
- **Behavior:** no desktop, trilho horizontal preso, com o ano em tipo gigante vazado; clique ou Enter abre no lugar o resumo e os ícones da stack. A entrada atual tem ponto de acento. A Dry Telecom é uma entrada só, com o selo da promoção. No celular, folhas empilhadas que grudam no topo, cada uma com um botão que abre uma gaveta; sem JavaScript o resumo aparece na própria folha.
- **Implementation:** `src/components/sections/Experience.astro`, `src/components/Drawer.astro`, cena `src/motion/experience.ts`, fatos em `src/data/experiences.ts`.
- **PRD:** none
- **Status:** shipped (2026-11-27)

## Palco dos projetos em destaque

- **Purpose:** dar aos 5 projetos principais um momento forte, com imagem real.
- **Behavior:** no desktop, o palco fica preso; cada projeto entra com o nome gigante pela lateral, um cartão inclinado com a prévia e a própria cor de fundo; contador, botão "Ver projeto" e "Todos (17)". O cartão inclina para o cursor. No celular, 5 painéis de tela cheia empilhados por `position: sticky`, com segmentos de progresso. O cabeçalho some enquanto o palco cobre o topo.
- **Implementation:** `src/components/sections/Stage.astro`, cena `src/motion/stage.ts`; destaques e cores em `src/data/projects.ts` (`featured`, `color`).
- **PRD:** none
- **Status:** shipped (2026-11-27)

## Lista dos outros projetos

- **Purpose:** listar os 12 projetos restantes sem o peso do palco.
- **Behavior:** no desktop, duas colunas de linhas-link com nome, tipo e ano; no hover a miniatura vai até o cursor e o segue. No celular, uma coluna em que a linha mais próxima do centro fica em foco.
- **Implementation:** `src/components/sections/ProjectList.astro`, cena `src/motion/list.ts`.
- **PRD:** none
- **Status:** shipped (2026-11-27)

## Competências

- **Purpose:** mostrar 31 tecnologias em 3 grupos, com nível de 1 a 5.
- **Behavior:** no desktop, três faixas de nomes gigantes alternando cheio e vazado, em laço, aceleradas pelo scroll e paradas fora da tela; hover ou foco num nome mostra tooltip com ícone, categoria e nível. No celular, uma faixa com os destaques e uma grade de ícones para frontend e backend. Os 31 itens existem no HTML como lista.
- **Implementation:** `src/components/sections/Skills.astro`, cena `src/motion/skills.ts`, fatos em `src/data/skills.ts` e `src/data/tech.ts`.
- **PRD:** none
- **Status:** shipped (2026-11-27)

## Contato e rodapé

- **Purpose:** fechar a página com um convite e os canais de contato.
- **Behavior:** fecho escuro com horizonte de luz e emenda em gradiente; frase gigante e quatro botões (WhatsApp, E-mail, LinkedIn, GitHub), com efeito magnético no cursor no desktop e linhas de largura total no celular. Rodapé com os dois currículos.
- **Implementation:** `src/components/sections/Contact.astro`, cena `src/motion/contact.ts`, canais em `src/data/site.ts`.
- **PRD:** none
- **Status:** shipped (2026-11-27)

## Página do projeto

- **Purpose:** dar a cada um dos 17 projetos uma página com o texto longo, a stack e os links.
- **Behavior:** capa, nome gigante, data, resumo, descrição, stack com ícone e nome, links de site e código (cadeado com tooltip "Repositório privado." quando não há repositório público) e "Próximo projeto", que leva ao seguinte. A capa nasce do cartão do palco ou da miniatura da lista por transição nomeada. No celular, barra de ações fixa no pé.
- **Implementation:** `src/components/ProjectPage.astro`, rotas `src/pages/projetos/[slug].astro`, `src/pages/en/projects/[slug].astro`, `src/pages/es/proyectos/[slug].astro`, cena `src/motion/page.ts`, texto em `src/content/projects/<locale>/<slug>.md`.
- **PRD:** none
- **Status:** shipped (2026-11-27)

## Três idiomas

- **Purpose:** atender recrutadores e clientes em português, inglês americano e espanhol neutro.
- **Behavior:** português na raiz, `/en` e `/es`; o seletor (globo no cabeçalho) leva à mesma página e à mesma seção no outro idioma. Quando o idioma do navegador difere e não há escolha salva, uma pílula sugere o idioma; a escolha fica no `localStorage`. Datas e números formatados pelo idioma. Em `/es` os currículos oferecidos são o português e o inglês.
- **Implementation:** `src/i18n/`, `src/components/LangSwitch.astro`, `src/components/Header.astro`, `messages/`, `project.inlang/settings.json`, `src/middleware.ts`.
- **PRD:** none
- **Status:** shipped (2026-11-27)

## Tema claro e escuro

- **Purpose:** manter o tema do site anterior sem piscar na carga.
- **Behavior:** na primeira visita segue o sistema; depois vale a escolha salva em `localStorage` (`data-theme`). A troca é um crossfade de 300 ms e atualiza o `theme-color`.
- **Implementation:** script inline em `src/layouts/Base.astro`, `src/components/ThemeToggle.astro`, tokens em `src/styles/global.css`.
- **PRD:** none
- **Status:** shipped (2026-11-27)

## Layout estático sem JavaScript ou com movimento reduzido

- **Purpose:** conteúdo inteiro para quem não roda o motion, para leitores de tela e para buscadores.
- **Behavior:** sem JavaScript ou com `prefers-reduced-motion: reduce`, todas as seções aparecem em fluxo normal, nada preso, nada escondido; as trocas de estado viram um crossfade curto.
- **Implementation:** CSS sob `html.motion` nos componentes de seção, `src/motion/index.ts`; coberto por `tests/e2e/static.spec.ts`.
- **PRD:** none
- **Status:** shipped (2026-11-27)

## SEO e rotas geradas

- **Purpose:** não regredir a busca em relação ao site anterior.
- **Behavior:** cada página tem um canonical, `hreflang` recíproco nos três idiomas e `x-default`, Open Graph e JSON-LD. `/sitemap.xml` lista as 54 páginas indexáveis; `/llms.txt` é o resumo do site em Markdown, formato llmstxt.org, em português com ponteiros para EN e ES. As 404 levam `noindex`.
- **Implementation:** `src/lib/seo.ts`, `src/layouts/Base.astro`, `src/pages/sitemap.xml.ts`, `src/pages/llms.txt.ts`, conferido por `scripts/check-dist.mjs`.
- **PRD:** none
- **Status:** shipped (2026-11-27)

## URLs limpas e 404 por idioma

- **Purpose:** URLs canônicas sem `.html` e sem barra final, que respondem 200 direto.
- **Behavior:** formas antigas e duplicadas (`/projeto-<slug>.html`, `/index.html`, `/en.html`, barra final) recebem 301 para a canônica; o que não existe recebe a 404 do idioma do pedido.
- **Implementation:** `public/.htaccess`, conferido por `scripts/check-apache.sh`.
- **PRD:** none
- **Status:** shipped (2026-11-27)

## Ícones de interface

- **Purpose:** reduzir texto e tornar ações reconhecíveis.
- **Behavior:** todo botão e rótulo curto leva um ícone Lucide, o mesmo para o mesmo significado; ícones de tecnologia ganham um chip claro no tema escuro.
- **Implementation:** `src/components/Icon.astro`, `src/data/icons.ts`, classe `.tech-icon` em `src/styles/global.css`.
- **PRD:** none
- **Status:** shipped (2026-11-27)
