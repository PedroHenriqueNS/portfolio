# Armadilhas — histórico

A história completa por trás de cada regra de [PITFALLS.md](./PITFALLS.md). Leia uma entrada quando a regra não bastar para decidir.

## Produção em LiteSpeed com regras testadas em Apache

**Data:** 2026-11-27.

**Sintoma:** as regras do `public/.htaccess` passavam no `yarn check:apache`, mas nada no repositório provava que o servidor de produção as entendia do mesmo jeito.

**Causa:** pedidos GET ao site em produção mostraram que a origem é LiteSpeed atrás da CDN da Hostinger (a página 403 padrão do LiteSpeed em `/assets/`). As regras do site anterior já provam lá `%{THE_REQUEST}`, `%{DOCUMENT_ROOT}/... -f`, `[R=404]`, `Header` dentro de `FilesMatch` e `AddType`. Não estão provados lá: `DirectorySlash Off`, `<If>` e `ErrorDocument`. LiteSpeed costuma ignorar o que não suporta, então um teste em Apache pode passar com um laço em produção. As URLs em português não dependem das diretivas não provadas: `/` é o índice da pasta e `/projetos/<slug>` usa a forma `%{DOCUMENT_ROOT}/$1.html -f`, que já roda lá. A exposição são as homes `/en` e `/es` e a página 404.

**Correção:** o `scripts/check-apache.sh` ganhou o modo remoto (`BASE_URL=...`), que pula o Docker, roda a mesma tabela no host indicado só com GET e HEAD e acrescenta as linhas de HTTPS e www; quando `/en` ou `/es` respondem `301 /en/`, imprime `causa: o servidor ignorou DirectorySlash Off`. A regra geral voltou para a forma `%{DOCUMENT_ROOT}/$1.html -f`, a mesma que já roda em produção. O README ganhou "Antes de publicar" com o comando, a leitura de uma falha e como voltar atrás. Commits `c948254`, `f817f22`, `5a4917a`, `7ac7737`.

**Depois:** em 2026-11-28, com o site publicado, o modo remoto passou contra a produção com 92 linhas e 0 falhas. O LiteSpeed respeita `DirectorySlash Off` e o `ErrorDocument`, e reexecuta as regras ao buscar a página de erro, que é o que a 404 por idioma precisa.

## DirectorySlash Off nunca sai do htaccess

**Data:** 2026-11-27.

**Sintoma:** sem a diretiva, `/en` respondia `301 /en/` no Apache 2.4, e a regra que tira a barra final mandava de volta para `/en`.

**Causa:** o build usa `build.format: 'file'`, então `dist/` tem `en.html` e a pasta `en/` lado a lado. O mod_dir roda depois do mod_rewrite e redireciona para a barra sempre que a URL aponta para uma pasta real, mesmo com a reescrita para `en.html` já feita. Quatro combinações de flags no `RewriteRule` foram testadas, sem efeito.

**Correção:** `DirectorySlash Off` fica no `public/.htaccess`, com comentário explicando o porquê, e o `check-apache.sh` confere as pastas (`/es/`, `/projetos/`, `/en/projects/`, `/es/proyectos/`, `/_astro/`, `/og/`) com 301 para a versão sem barra. A alternativa, mudar o layout do build, ficou de fora. No LiteSpeed a diretiva é conferida pelo modo remoto. Commits `c948254`, `f817f22`.

## Nunca um htaccess aninhado

**Data:** 2026-11-27.

**Sintoma:** com um `public/en/.htaccess` e um `public/es/.htaccess` contendo só `ErrorDocument`, as URLs sob `/en/` e `/es/` pararam de passar pelas regras da raiz (URL limpa, barra final, 404).

**Causa:** observado no `httpd:2.4` do `check-apache.sh`: com um `.htaccess` na subpasta, as regras de reescrita da raiz deixam de valer para aquela árvore. O mecanismo exato não foi investigado, e o comportamento no LiteSpeed não foi testado.

**Correção:** a ideia foi descartada antes do commit e a 404 por idioma passou a sair de `%{THE_REQUEST}` no `.htaccess` da raiz (entrada seguinte). Commit `f817f22`.

## A 404 por idioma depende de THE_REQUEST

**Data:** 2026-11-27.

**Sintoma:** a primeira versão escolhia a 404 de cada idioma com blocos `<If>`, que não estão provados no LiteSpeed.

**Causa:** o `ErrorDocument 404 /404.html` faz um redirect interno; a URL vista pelas regras passa a ser `/404.html` e o idioma do pedido se perde, salvo em `%{THE_REQUEST}`, que guarda a linha original do pedido.

**Correção:** duas regras `RewriteCond %{THE_REQUEST} ^\S+\s/en(/|\?|\s)` (e o mesmo para `/es`) reescrevem `404.html` para `en/404.html` ou `es/404.html`. `THE_REQUEST` já é usado em produção pelas regras antigas. Se o servidor não reexecutar as regras no redirect interno, a 404 cai em português, que é a falha aceitável. Limitação conhecida: o valor é comparado cru, então `/%65n/nada` recebe a 404 em português. Commit `f817f22`.

## O dist é copiado para o contêiner

**Data:** 2026-11-27.

**Sintoma:** nenhum em produção; é prevenção.

**Causa:** o disco padrão do macOS não diferencia maiúsculas de minúsculas, e a produção diferencia. Um volume montado faria `/EN` achar `en.html` no teste e falhar em produção.

**Correção:** o script copia o `dist/` com `docker cp` e a tabela tem a linha `/EN` → 404. Commit `c948254`.

## Pins nascem depois do scroll do roteador

**Data:** 2026-11-27.

**Sintoma:** três casos no desktop, todos com a mesma raiz. (1) Ao voltar para a home pelo histórico, a posição restaurada saía cortada (6016 px em vez de 6791). (2) No WebKit, na volta à home pelo ClientRouter, os pins saíam curtos e o palco ficava vazio. (3) Chegar à home com `#âncora` (o link "Todos os projetos" das páginas de projeto, a troca de idioma que leva o hash, a carga direta de `/#projects`) deixava o visitante milhares de pixels longe do alvo, dentro do palco: `#projects` 5006 px abaixo do topo, `#contact` 7204 px. Em 390 px funcionava, porque lá não há pins.

**Causa:** o roteador rola para a posição salva ou para a âncora antes de as cenas existirem. Os três pins do desktop (Sobre, Experiência e palco) acrescentam várias telas de espaçador acima do alvo depois do scroll. No WebKit, além disso, uma folha de estilo ainda não vale no `astro:page-load`, e as seções medem sem CSS.

**Correção:** `src/motion/index.ts` guarda `history.state.scrollY` no `astro:before-swap` quando a navegação é `traverse`; depois das cenas, um `requestAnimationFrame` roda `ScrollTrigger.refresh()` e, nessa ordem, reaplica a posição salva ou faz `scrollIntoView` no elemento do hash (só na primeira rodada da página; uma troca de breakpoint não volta à âncora). `tests/e2e/anchor.spec.ts` confere a posição do alvo. Limitação conhecida: recarregar `/#projects` sobrepõe a posição que o navegador restauraria. Commits `acbc613`, `f1f3ebc`, `21c7ce4`, `df2441a`.

## Ancoragem de scroll desligada

**Data:** 2026-11-27.

**Sintoma:** no WebKit, ao entrar no palco, a página rolava sozinha até o fim dele (de 6164 para 10124 px em 1,5 s). No Firefox, as animações de entrada já deslocavam o scroll.

**Causa:** a ancoragem de scroll do navegador escolhia como âncora um cartão do palco preso, que se move com o scroll, e compensava o movimento rolando a página.

**Correção:** `html { overflow-anchor: none; }` em `src/styles/global.css`; `tests/e2e/firefox-drift.spec.ts` mede o deslocamento no Firefox. As regras `overflow-anchor` por elemento que existiam em `src/motion/hero.ts`, `src/motion/contact.ts` e `src/components/ProjectPage.astro` saíram depois, por serem redundantes com a global. Commits `55954e7` e `4bc30da`.

## Classe de elemento igual a flag de estado

**Data:** 2026-11-27.

**Sintoma:** num protótipo dos efeitos de fundo (fora do repositório), a classe que ligava um efeito no `<body>` era a mesma do elemento de luz que segue o cursor. A regra escrita para o elemento passou a valer para o `<body>` e deslocou a página inteira. A regra entrou no projeto antes do primeiro componente; não há commit de correção.

**Causa:** o `<html>` recebe por script as classes `motion` (`src/motion/index.ts`), `dark` (`src/layouts/Base.astro`, `src/components/ThemeToggle.astro`) e `theme-fade` (durante a troca de tema). O CSS usa seletores como `html.motion .x` e `html.dark .x`, e scripts e testes leem `classList.contains('dark')`. Um elemento com a mesma classe casaria com seletores de descendente e com buscas por classe que esperam só o `<html>`.

**Correção:** nenhum elemento usa esses nomes; estados de componente usam o prefixo `is-` (`is-current`, `is-unseen`).

## CSS sob html.motion nunca esconde conteúdo

**Data:** 2026-11-27.

**Sintoma:** se uma cena lançasse erro ao iniciar, a classe `motion` ficava no `<html>`, as cenas seguintes não rodavam e o CSS delas (`height: 100vh; overflow: clip`, itens do palco em posição absoluta) continuava valendo: seções cortadas, sem o motion que as completaria.

**Causa:** o laço das cenas registrava o erro e seguia com a página no layout de motion.

**Correção:** desde o início, o CSS sob `html.motion` só troca o modo de layout e os estados iniciais das entradas são postos pelo GSAP. No erro, o `index.ts` agenda `media.revert()` num microtask (o `matchMedia` ainda está montando a rodada), o que desfaz pins e entradas e roda as limpezas, que tiram a classe. A página fica estática até a próxima navegação. `tests/e2e/static.spec.ts` força a cena do palco a lançar e confere que não há classe `motion`, texto escondido, `.pin-spacer` nem rolagem horizontal. Commits `60fd155`, `abd1dbe`.

## Tudo que o contexto do GSAP não rastreia sai por onRevert

**Data:** 2026-11-27.

**Sintoma:** os tweens da névoa e o callback de `document.fonts.ready` sobreviviam ao revert, e uma limpeza que lançasse erro impedia as seguintes.

**Causa:** o `gsap.matchMedia()` reverte o que foi criado dentro do seu contexto; ouvintes de evento, timers e tweens criados depois, em callbacks, ficam de fora.

**Correção:** `src/motion/scene.ts` concentra `onRevert(fn)` e `runCleanups()`; cada limpeza roda em `try/catch`, e a remoção de `html.motion` é registrada antes das cenas. O `refresh` de `fonts.ready` só roda enquanto a rodada está viva. `tests/e2e/lifecycle.spec.ts` faz idas e voltas home → projeto → home e confere um único conjunto de pins e nenhum erro. Commit `b4ae685`.

## Mensagens só no servidor com idioma explícito

**Data:** 2026-11-27.

**Sintoma:** o código de `src/lib/seo.ts` não era testável no Vitest dependendo do idioma global, e a renderização de páginas em paralelo poderia misturar idiomas.

**Causa:** o Paraglide guarda um idioma global (`setLocale`), que o `src/middleware.ts` define por pedido; ele vale como padrão, não como garantia.

**Correção:** toda chamada passa `{ locale }` (`m.chave(params, { locale })`); o `vitest.config.ts` usa `getViteConfig` do Astro para ter o alias e o plugin do Paraglide nos testes. O `scripts/check-dist.mjs` falha se algum `.js` do `dist/` contiver `paraglide`. Commits `a0ba5dc`, `c024d7d`.

## Fatos só dos arquivos de dados

**Data:** 2026-11-27.

**Sintoma:** versões do texto afirmavam mais do que a fonte: o tooltip do cadeado dizia "Privado por contrato com o cliente." nos 11 projetos sem repositório público, inclusive projetos que não são de cliente; a primeira versão em inglês e espanhol trocava "acompanhei juniores" por "mentored juniors" e "candidato à reeleição" por uma apresentação do prefeito, entre outros.

**Causa:** texto reescrito por idioma tende a arredondar para cima; o site anterior dizia só "Repositório privado".

**Correção:** o tooltip passou a "Repositório privado." nos três idiomas; inglês e espanhol foram revistos frase a frase contra o português. Os fatos ficam em `src/data/*.ts` e o texto apenas os descreve. Commits `43b05fe`, `0f91ba8`, `f72800c`.

## Links do currículo com data-astro-reload

**Data:** 2026-11-27.

**Sintoma:** clicar num currículo fazia o ClientRouter buscar o PDF como se fosse uma página, e só depois cair numa navegação normal.

**Causa:** o roteador intercepta todo link da mesma origem e só desiste quando a resposta não é HTML.

**Correção:** os quatro links de PDF (`src/components/sections/Hero.astro`, `src/components/sections/Contact.astro`) levam `data-astro-reload`. Commit `abd1dbe`.

## Contraste medido contra o fundo real

**Data:** 2026-11-27.

**Sintoma:** os tokens do esboço não passavam AA: o apagado claro `#7F899B` dava cerca de 3,2:1 sobre `#EEF0F3`. O primeiro ajuste (`#616B7D`) passava sobre o token plano, mas caía para 3,3:1 onde a névoa tinge o fundo; o acento `#2B4BFF` caía para 3,6:1.

**Causa:** atrás do texto não está a cor do token: a névoa tinge o gelo até cerca de `#C3C9E9` e clareia o marinho até cerca de `#343951`, e parte do texto fica sobre capturas.

**Correção:** tokens escolhidos contra o fundo de fato, nos dois temas: claro `--muted: #4C5362`, `--accent: #243ED4`; escuro `--muted: #A1A8CA`, `--accent: #92A4FF` (`src/styles/global.css`). O fim do gradiente claro passou a `#5A75FF`. Exceção consciente: o nome gigante do hero fica sem contorno; a foto fica por cima do nome, e a medição baixa ali vem dos pixels da foto. Commit `3a84b6d`.

## TypeScript fica em 5.9

**Data:** 2026-11-27.

**Sintoma:** com o TypeScript 7 a instalação e o `astro check` quebravam.

**Causa:** o `@astrojs/check` declara `typescript` como peer `^5.0.0 || ^6.0.0`, e o Yarn aplica um patch embutido ao pacote do TypeScript que não se aplica ao 7.

**Correção:** `"typescript": "^5.9"` no `package.json` (instalado: 5.9.3). Commit `2710df5`.

## Preview do Playwright em porta própria

**Data:** 2026-11-27.

**Sintoma:** com um `astro dev` aberto na 4321, o e2e colidia com ele.

**Causa:** o `webServer` do Playwright usava a mesma porta padrão do servidor de desenvolvimento.

**Correção:** `yarn preview --port 4391 --ignore-lock` com `reuseExistingServer: false`: a suíte falha em vez de testar um servidor alheio. O `--ignore-lock` mantém o preview do Astro 7 em primeiro plano, para o Playwright não o dar por encerrado. Commit `1c628cf`.

## Os literais 17 57 e 54

**Data:** 2026-11-27.

**Sintoma:** ao acrescentar um projeto, `yarn build` falha com "esperava 57 páginas .html" e `yarn check:apache` com "esperava 17 projetos".

**Causa:** as contagens são literais de propósito, para o build pegar uma página perdida: 17 projetos × 3 idiomas + 3 homes + 3 páginas 404 = 57 páginas; o sitemap lista as 54 que não são 404.

**Correção:** o README, "Adicionar um projeto", lista os três números. Commits `c024d7d`, `c948254`, `7ac7737`.

## O build baixa o módulo de mensagens

**Data:** 2026-11-27.

**Sintoma:** nenhum até hoje; é dependência de rede no build.

**Causa:** `project.inlang/settings.json` aponta `modules` para `https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4.5.0/dist/index.js`.

**Correção:** a versão está fixada. Apontar o módulo para a cópia em `node_modules` tiraria a dependência; ficou para depois ([ROADMAP.md](./ROADMAP.md)). Commit `a0ba5dc`.
