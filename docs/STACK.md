# Stack

## Linguagens e runtimes

- TypeScript `^5.9` (instalado 5.9.3), modo estrito do Astro — todo o código de `src/`, `tests/` e as configurações. Por que não o 7: [PITFALLS.md](./PITFALLS.md#typescript-fica-em-59).
- Node 22.23.4 ou mais novo — mínimo declarado pelo Astro instalado (`engines.node: >=22.23.4`). O CI usa `node-version: 22`.
- Yarn 4.16.0 via Corepack (`packageManager` no `package.json`), `nodeLinker: node-modules` (`.yarnrc.yml`).
- Bash — `scripts/check-apache.sh`.

## Pins

Versões copiadas do `package.json`; entre parênteses, a instalada (`node_modules/<pacote>/package.json`).

| Pacote | Versão | Por quê |
|---|---|---|
| `astro` | `^7.4.13` (7.4.13) | gerador do site, saída estática, i18n, ClientRouter, content collections |
| `@astrojs/check` | `^0.9.12` (0.9.12) | `astro check` de tipos no build |
| `typescript` | `^5.9` (5.9.3) | tipos; preso abaixo do 7 |
| `tailwindcss` | `^4.3.5` (4.3.5) | utilitários de CSS, tokens via `@theme` |
| `@tailwindcss/vite` | `^4.3.5` (4.3.5) | plugin do Tailwind no Vite |
| `gsap` | `^3.15.1` (3.15.1) | motion; `gsap/ScrollTrigger` para pins e scrub |
| `@inlang/paraglide-js` | `^3.2.2` (3.2.2) | mensagens nos três idiomas, compiladas para `src/paraglide/` |
| `@lucide/astro` | `^1.82.0` (1.82.0) | ícones de interface, atrás de `src/components/Icon.astro` |
| `@fontsource-variable/bricolage-grotesque` | `^5.3.0` (5.3.0) | fonte display, com eixo de largura (`wdth.css`) |
| `@fontsource-variable/hanken-grotesk` | `^5.3.0` (5.3.0) | fonte de texto |
| `vitest` | `^5.1.2` (5.1.2) | testes de unidade, com a config do Vite do Astro |
| `@playwright/test` | `^1.65.1` (1.65.1) | testes ponta a ponta; também gera a imagem OG |

Módulo do inlang, fora do `package.json`: `@inlang/plugin-message-format@4.5.0`, carregado do jsDelivr por `project.inlang/settings.json`.

**Política de versões:** faixas com circunflexo no `package.json`; o `yarn.lock` é a verdade e o CI instala com `yarn install --immutable`. Exceção: `typescript` em `^5.9`, para não subir para o 7.

## Infraestrutura e serviços

- Hostinger, hospedagem compartilhada — produção em `https://pedrohenriquens.com.br`; LiteSpeed atrás da CDN da Hostinger, configurado por `public/.htaccess`.
- GitHub Actions:
  - `.github/workflows/ci.yml` — em cada PR para a `main`: `yarn build` e `yarn test`, sem segredos.
  - `.github/workflows/deploy.yml` — em push na `main`: build e `rsync --delete` do `dist/` por SSH (host key fixada, `.well-known` preservado, até 4 tentativas). Segredos no environment `Hostinger PROD`. `workflow_dispatch` é dry-run por padrão e só faz deploy real na `main`.
  - `.github/workflows/publish.yml` — em push na `main`: build e cópia do `dist/` para a branch `build`.
- jsDelivr — serve o módulo de formato de mensagens do inlang no build.

> TODO: Quem consome a branch `build` gerada pelo `publish.yml` (prévia em outro serviço, ou nada)? Se ninguém, o workflow pode sair.

## Ferramentas de desenvolvimento

- `astro dev` — servidor de desenvolvimento na porta 4321.
- `astro preview` — serve o `dist/`; o Playwright o sobe na porta 4391.
- Docker com `httpd:2.4` — Apache de teste do `yarn check:apache`, na porta 8097, com `scripts/apache/httpd.conf` (mod_rewrite, mod_headers, `AllowOverride All`).
- `curl` — as linhas da tabela do `check-apache.sh`.
- Chromium do Playwright — `yarn og:image` gera `public/og-image.jpg` (1200×630) a partir de HTML.
