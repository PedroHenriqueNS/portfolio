# Armadilhas

Pegadinhas e restrições não óbvias, uma regra por entrada. As regras de código daqui para frente moram em [CONVENTIONS.md](./CONVENTIONS.md); a história de cada entrada (sintoma, causa, correção, datas) está em [PITFALLS-HISTORY.md](./PITFALLS-HISTORY.md).

## Hospedagem

### Produção em LiteSpeed com regras testadas em Apache

A produção é LiteSpeed atrás da CDN da Hostinger; o `yarn check:apache` prova as regras num Apache 2.4. As regras atuais valem nos dois: em 2026-11-28 a mesma tabela passou contra a produção. Uma regra nova só nasce provada em Apache: ao mudar o `public/.htaccess`, rode `BASE_URL=https://<host de teste> yarn check:apache` num host de teste no mesmo servidor antes de publicar, e de novo contra a produção logo depois do deploy. [História](./PITFALLS-HISTORY.md#produção-em-litespeed-com-regras-testadas-em-apache)

### DirectorySlash Off nunca sai do htaccess

Com `en/` e `en.html` lado a lado no `dist/`, o mod_dir do Apache redireciona `/en` para `/en/` depois do mod_rewrite, e a regra de barra final devolve para `/en`: laço. `DirectorySlash Off` tem de ficar no `public/.htaccess`; trocar isso exige mudar o layout do build. [História](./PITFALLS-HISTORY.md#directoryslash-off-nunca-sai-do-htaccess)

### Nunca um htaccess aninhado

Um `.htaccess` dentro de `public/en/` ou `public/es/`, mesmo só com `ErrorDocument`, derruba as regras de reescrita da raiz para tudo sob aquela pasta. Todas as regras ficam no `public/.htaccess` da raiz. [História](./PITFALLS-HISTORY.md#nunca-um-htaccess-aninhado)

### A 404 por idioma depende de THE_REQUEST

A 404 em inglês ou espanhol sai do redirect interno do `ErrorDocument 404 /404.html`, reescrito por `RewriteCond %{THE_REQUEST}` (que guarda o pedido original). Não use `<If>`. Se o servidor não reexecutar as regras no redirect interno, todos veem a 404 em português. [História](./PITFALLS-HISTORY.md#a-404-por-idioma-depende-de-the_request)

### O dist é copiado para o contêiner

O `check-apache.sh` copia o `dist/` para o Apache em Docker em vez de montar a pasta: o disco do macOS ignora maiúsculas e a produção não. Nunca troque o `docker cp` por um volume. [História](./PITFALLS-HISTORY.md#o-dist-é-copiado-para-o-contêiner)

## Motion e scroll

### Pins nascem depois do scroll do roteador

O ClientRouter rola (posição do histórico ou `#âncora`) antes de as cenas criarem os pins, que somam telas de altura acima do alvo. A posição salva e a âncora têm de ser reaplicadas no quadro seguinte, depois do `ScrollTrigger.refresh()` (`src/motion/index.ts`). Nunca remova esse passo. [História](./PITFALLS-HISTORY.md#pins-nascem-depois-do-scroll-do-roteador)

### Ancoragem de scroll desligada

`html { overflow-anchor: none; }` em `src/styles/global.css` não sai: no WebKit a ancoragem prendia num cartão do palco e arrastava a página sozinha até o fim do palco; no Firefox as entradas deslocavam o scroll. [História](./PITFALLS-HISTORY.md#ancoragem-de-scroll-desligada)

### Classe de elemento igual a flag de estado

Nunca dê a um elemento uma classe que também é flag de estado no `<html>` ou no `<body>` (`motion`, `dark`, `theme-fade`): seletores e scripts que leem a flag passam a casar com o elemento. [História](./PITFALLS-HISTORY.md#classe-de-elemento-igual-a-flag-de-estado)

### CSS sob html.motion nunca esconde conteúdo

CSS sob `html.motion` só muda o modo de layout. Nada de `opacity: 0` ou `visibility: hidden` esperando script: o estado inicial de uma entrada é posto pelo GSAP. Se uma cena lançar erro, o `index.ts` reverte tudo e tira a classe; não engula o erro de outro jeito. [História](./PITFALLS-HISTORY.md#css-sob-htmlmotion-nunca-esconde-conteúdo)

### Tudo que o contexto do GSAP não rastreia sai por onRevert

Ouvintes, tweens criados em callbacks, timers e pedidos ao `headerCover` têm de ser desfeitos com `onRevert` (`src/motion/scene.ts`). Sem isso eles sobrevivem ao `astro:before-swap` e a uma troca de breakpoint e se acumulam a cada navegação. [História](./PITFALLS-HISTORY.md#tudo-que-o-contexto-do-gsap-não-rastreia-sai-por-onrevert)

## Texto e idiomas

### Mensagens só no servidor com idioma explícito

Mensagens do Paraglide só em frontmatter `.astro` e em `src/lib/`, sempre com `{ locale }` explícito. O idioma global do middleware é só padrão; renderização paralela e testes no Vitest não podem depender dele. Nenhum script do navegador importa mensagens (o build falha). [História](./PITFALLS-HISTORY.md#mensagens-só-no-servidor-com-idioma-explícito)

### Fatos só dos arquivos de dados

Fatos sobre o trabalho do dono (datas, cargos, números, stack, links) vêm só de `src/data/*.ts` e batem com o currículo. Nenhum texto em inglês ou espanhol afirma algo mais forte ou diferente do português. [História](./PITFALLS-HISTORY.md#fatos-só-dos-arquivos-de-dados)

### Links do currículo com data-astro-reload

Todo link para um PDF leva `data-astro-reload`; sem ele o ClientRouter busca o arquivo como se fosse página antes de cair numa navegação normal. [História](./PITFALLS-HISTORY.md#links-do-currículo-com-data-astro-reload)

### Contraste medido contra o fundo real

Os tokens `--muted` e `--accent` foram escolhidos contra o fundo de fato atrás do texto (o gelo ou o marinho tingidos pela névoa, e as capturas), não contra o token plano. Ao mudar uma cor, meça o contraste AA ali, nos dois temas. [História](./PITFALLS-HISTORY.md#contraste-medido-contra-o-fundo-real)

## Ferramentas e build

### TypeScript fica em 5.9

`typescript` fica em `^5.9`. O `@astrojs/check` 0.9 aceita só `^5.0.0 || ^6.0.0` como peer, e o TypeScript 7 quebra o patch que o Yarn aplica ao pacote. Não suba sem rever os dois. [História](./PITFALLS-HISTORY.md#typescript-fica-em-59)

### Preview do Playwright em porta própria

O `playwright.config.ts` sobe `yarn preview --port 4391 --ignore-lock` sem reaproveitar servidor. Nunca volte para a 4321, que é do `astro dev`: o e2e testaria um servidor alheio. O `--ignore-lock` mantém o preview em primeiro plano. [História](./PITFALLS-HISTORY.md#preview-do-playwright-em-porta-própria)

### Os literais 17 57 e 54

Um projeto novo muda três números: `17` em `scripts/check-apache.sh` (+1 por projeto), `57` (páginas, +3) e `54` (URLs do sitemap, +3) em `scripts/check-dist.mjs`. Sem isso o build ou o check falham. [História](./PITFALLS-HISTORY.md#os-literais-17-57-e-54)

### O build baixa o módulo de mensagens

`project.inlang/settings.json` carrega o módulo de formato de mensagens do jsDelivr (versão fixada em 4.5.0): o build precisa de rede. Uma queda da CDN falha o build, o que é o lado seguro. [História](./PITFALLS-HISTORY.md#o-build-baixa-o-módulo-de-mensagens)
