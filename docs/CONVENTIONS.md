# Portfolio — Convenções

Lugar canônico das regras de código do projeto. Toda regra que vale para o código inteiro mora aqui: nomes, padrões de chamada, formatos de erro, atalhos proibidos, escolha de bibliotecas, fluxo de branch e PR, e o que mais houver.

Quando uma regra daqui conflita com o README, com outro documento de `docs/` ou com um comentário no código, **este arquivo vence**. Os outros devem ser corrigidos para bater com ele.

Uma convenção nova entra AQUI, no mesmo PR que a estabelece; nunca só numa mensagem de commit, numa nota pessoal ou num comentário perdido no código.

---

## Linguagens e estilo de código

- TypeScript estrito: `tsconfig.json` estende `astro/tsconfigs/strict`. Importe pelo alias `@/` (`@/*` → `src/*`), não por caminho relativo longo.
- `old/` (o site anterior) fica fora de tudo: excluído no `tsconfig.json` e no Tailwind (`@source not "../../old"` em `src/styles/global.css`). Nada de `old/` entra no `dist/`.
- Comentários, mensagens de erro de script e testes em português. Comentário só para o porquê que o código não mostra.
- Componentes `.astro` em `src/components/` (seções da home em `src/components/sections/`); lógica sem UI em `src/lib/`; fatos em `src/data/`; cenas de motion em `src/motion/`, uma por arquivo.
- **Fatos e texto separados.** Fatos (datas, stack, links, imagens, cor de palco, destaque) ficam só em `src/data/*.ts`. Texto por idioma fica em `messages/{pt-br,en,es}.json` (interface) e em `src/content/projects/<locale>/<slug>.md` (resumo e descrição de cada projeto).
- **Mensagens só no servidor, com idioma explícito:** `m.chave(params, { locale })`, em frontmatter `.astro` ou em `src/lib/`. Nenhum script do navegador importa mensagens; o `scripts/check-dist.mjs` falha se um `.js` do `dist/` contiver `paraglide`.
- Texto novo leva chave nos três arquivos de mensagens (pt-BR real; en em inglês americano; es em espanhol neutro latino-americano). `yarn check:messages` falha com chave faltando, vazia ou que só existe em en ou es.
- Nomes de tecnologias, empresas e projetos não se traduzem. Datas e números passam por `Intl` (`src/lib/format.ts`).
- Imagens pelo `<Image>` do Astro. Ícones de interface pelo `src/components/Icon.astro` (Lucide), com os mapas em `src/data/icons.ts`: todo botão e todo rótulo curto leva ícone, o mesmo ícone para o mesmo significado. O tipo gigante fica sem ícone.
- Cores só dos tokens de `src/styles/global.css`, nos dois temas (`:root` e `html.dark`). Exceção: as cores de palco de cada projeto, que vêm de `src/data/projects.ts`. Sombra nunca derivada da tinta.
- Texto nunca abaixo de 11 px; alvos de toque com 44 px ou mais; o que estiver num tooltip (`src/components/Tip.astro`) é alcançável por teclado e por toque. Abaixo de 768 px, gaveta (`dialog[data-drawer]`, `src/components/Drawer.astro`) em vez de modal.
- Texto mínimo: o elemento principal é o conteúdo; texto secundário vai para tooltip, ícone ou gaveta.

### Contrato de marcação

Testes e scripts dependem destes seletores; não os renomeie sem atualizar `tests/e2e/`:

| Seletor | Onde |
|---|---|
| `section[data-section="hero\|about\|experience\|stage\|projects\|skills\|contact"]` | cada seção da home |
| `a[data-project="<slug>"]` | todo link para um projeto |
| `#theme-toggle` | botão de tema |
| `a[data-lang]` | links do seletor de idioma |
| `dialog[data-drawer]` | gavetas |
| `[data-fit]` | frase que precisa caber na largura |

### Motion

- Uma cena por arquivo em `src/motion/`, do tipo `Scene` de `src/motion/scene.ts`, inserida em `SCENES` (`src/motion/index.ts`) **na posição do DOM**: um gatilho criado antes de uma seção presa acima dele erra a posição.
- Só `src/motion/index.ts` liga e desliga a classe `motion` no `<html>`. Estados "de" das entradas são postos pelo GSAP em tempo de execução, nunca no CSS.
- CSS sob `html.motion` só troca o modo de layout; nunca esconde conteúdo. Sem JavaScript ou com `prefers-reduced-motion: reduce`, a página é um layout estático completo, em fluxo normal, nada preso, nada escondido.
- O que o contexto do GSAP não rastreia (ouvintes, tweens criados em callbacks, timers) é desfeito por `onRevert`.
- Abaixo de 768 px: `position: sticky` em vez de prender por script, alturas em `svh`, só `transform` e `opacity`, sem efeito de cursor. Efeito de cursor só sob `(hover: hover) and (pointer: fine)`.
- Sem corte seco: toda troca de seção ou de estado tem transição; com movimento reduzido, só um crossfade curto de opacidade.
- Nunca dê a um elemento um nome de classe que também é flag de estado no `<html>` ou no `<body>` (`motion`, `dark`, `theme-fade`).
- Sem biblioteca de smooth scroll: o scroll nativo não é sequestrado.

Detalhe de cada regra e o que já quebrou: [PITFALLS.md](./PITFALLS.md).

---

## Branches e fluxo de PR

- A branch padrão é `main`. **Merge na `main` publica em produção** (`.github/workflows/deploy.yml`); antes do merge, siga "Antes de publicar" no [README](../README.md#antes-de-publicar).
- Trabalho em branch `<tipo>/<slug-curto>`, com o tipo do Conventional Commits e o slug descrevendo a mudança (exemplo: `feat/astro-gsap-redesign`).
- PR sempre para a `main`. O `.github/workflows/ci.yml` roda `yarn build` e `yarn test` em cada PR (Node 22, sem segredos); o Playwright e o `check:apache` não rodam no CI e ficam para a máquina local.
- Commits como o autor humano, sem trailers de coautoria automática.
- Uma correção depois de revisão é commit novo, não `--amend`.
- Em `docs/`, só os nove documentos vivos desta pasta vão para o git; qualquer outro arquivo ali é rascunho local e não é commitado. Nunca `git add -A` nem `git add .`: adicione os arquivos pelo nome.

---

## Conventional Commits

Formato `tipo(escopo): descrição`, em português, no imperativo ou no presente, minúsculas.

- **Tipos:** `feat`, `fix`, `chore`, `docs`, `test`, `refactor`.
- **Escopos em uso:** `home`, `projeto`, `ui`, `motion`, `a11y`, `texto`, `i18n`, `dados`, `seo`, `deploy`, `scripts`. O escopo é opcional quando a mudança atravessa várias áreas.

Exemplos do histórico: `fix(motion): leva à âncora depois de montar os pins`, `feat(i18n): rotas em três idiomas e mensagens com Paraglide`.

---

## Testes

| Camada | Comando | Onde | O que cobre |
|---|---|---|---|
| Mensagens | `yarn check:messages` | `scripts/check-messages.mjs` | as mesmas chaves, não vazias, nos três idiomas |
| Tipos | `yarn check` | `astro check` | TypeScript e `.astro` |
| Build | `yarn build` | `scripts/check-dist.mjs` | 57 páginas, `lang`, um canonical, `hreflang` recíproco e `x-default`, JSON-LD válido, texto do idioma, sitemap com 54 URLs, `llms.txt`, nenhuma mensagem em JS do navegador |
| Unidade | `yarn test` | `tests/unit/*.test.ts` (Vitest) | rotas, SEO, formatação, dados, ícones, checagem de mensagens |
| Ponta a ponta | `yarn e2e` | `tests/e2e/*.spec.ts` (Playwright) | contra o `dist/` construído, em Chromium e Firefox, 1440×900 e 390×844 |
| Hospedagem | `yarn check:apache` | `scripts/check-apache.sh` | status, redirects, 404 por idioma e cache num Apache 2.4 em Docker |

- `yarn build` roda as três primeiras camadas em sequência; ele precisa passar antes de qualquer commit.
- `yarn e2e` e `yarn check:apache` testam o `dist/`: rode `yarn build` antes.
- Comportamento novo leva teste e2e escrito antes, que falha antes da mudança.
- Testes que não podem quebrar: `static.spec.ts` (sem JavaScript e com movimento reduzido), `resize.spec.ts`, `lifecycle.spec.ts`, `firefox-drift.spec.ts`, `fit.spec.ts`, `anchor.spec.ts`.
- Prefira esperar por uma condição (`expect.poll`, `toHaveX`) a `waitForTimeout` fixo.
- Servidores: o preview do Playwright sobe na porta 4391 sem reaproveitar servidor; o Apache de teste na 8097. A 4321 é do `astro dev`; não a use em teste nem em script. Pare todo servidor que você iniciar.
- Adicionar um projeto muda três números literais nos scripts: veja o README, "Adicionar um projeto".

---

## Diagramas

Mermaid apenas (texto puro: legível, compara em diff, o visualizador de Markdown desenha; nunca uma imagem exportada). Diagrame um fluxo só quando ele tem ramificação, ordem que importa ou 4+ relações não óbvias E é estável. Fora disso, prosa, tabela ou árvore ASCII. A topologia vai no diagrama; as restrições ("idempotente", "nunca repetir em 4xx") vão em prosa ao lado. Derive estritamente do código, limite a ~7 nós (divida fluxos maiores) e atualize o diagrama no mesmo commit da mudança de código que ele mostra.

---

## Tamanho dos documentos vivos

`docs/CONVENTIONS.md` e `docs/PITFALLS.md` ficam abaixo de 200 linhas cada: são os que se leem inteiros antes de mexer no código. Detalhe além disso vai para um arquivo que ninguém precisa ler inteiro, com link a partir deste. Se a forma curta de um deles ainda passar de 200 linhas, divida por tema em arquivos separados e mantenha aqui um índice deles.

---

## Manutenção da documentação

Estes arquivos são documentos vivos. Quem muda o projeto atualiza os documentos afetados no mesmo commit:

- Mudança de arquitetura → atualize `docs/ARCHITECTURE.md`
- Mudança de arquitetura que altera um fluxo desenhado num diagrama Mermaid → atualize esse diagrama NO MESMO commit (um diagrama velho engana porque parece oficial). Diagrama só com topologia; as restrições ficam na prosa ao lado.
- Código construído que estava só desenhado → atualize a linha de status de `docs/ARCHITECTURE.md`
- Funcionalidade nova ou alterada → atualize `docs/FEATURES.md`
- PRD de uma funcionalidade → `docs/prds/<slug>.md`, registrado em `docs/FEATURES.md` e `docs/ROADMAP.md`
- Armadilha descoberta → regra em `docs/PITFALLS.md`, história em `docs/PITFALLS-HISTORY.md`
- Mudança de stack (dependência nova, versão, serviço) → atualize `docs/STACK.md`
- Mudança de escopo ou de requisitos → atualize `docs/PRD.md` e `docs/SUMMARY.md`
- Regra de código nova, atalho proibido ou convenção de fluxo → acrescente a `docs/CONVENTIONS.md` (A fonte da verdade: nunca enterre regras em mensagem de commit, em outro documento ou em nota pessoal)
- Fase alcançada ou prioridades mudaram → atualize `docs/ROADMAP.md`
- Prioridades ou status mudaram → atualize a linha de status de `docs/SUMMARY.md`

Se pular a atualização de um documento, diga o porquê na mensagem do commit.

---

## Onde moram as convenções

| Escopo | Arquivo |
|---|---|
| Este arquivo | Regras de código do projeto inteiro |
| Regras de armadilhas | `docs/PITFALLS.md` (histórias completas em `docs/PITFALLS-HISTORY.md`) |
| Comandos, publicação e como adicionar um projeto | `README.md` |

`old/` é arquivo do site anterior e não tem convenções próprias: não se desenvolve nele.

Ao estabelecer uma convenção nova (numa revisão de código, numa discussão, por pedido direto do dono), acrescente-a AQUI, no mesmo PR.
