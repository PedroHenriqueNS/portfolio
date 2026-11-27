# Portfolio

Site pessoal de Pedro Henrique em Astro (saída estática) com Tailwind e GSAP. O site anterior (React + Vite) está em `old/`, com `package.json` e `yarn.lock` próprios.

## Comandos

`yarn dev`, `yarn build`, `yarn preview`, `yarn test`, `yarn check`.

- `yarn e2e`: Playwright (Chromium e Firefox, 1440 e 390 px) contra o `dist/`; rode `yarn build` antes.
- `yarn check:apache`: sobe o `dist/` num Apache 2.4 em Docker com o `public/.htaccess` e confere status, redirects, 404 e cache; rode `yarn build` antes.
- `yarn og:image`: gera `public/og-image.jpg` (1200×630), à mão.

## Versões instaladas

Node 22.23.4 ou mais novo (mínimo do Astro instalado). astro 7.4.13, tailwindcss 4.3.5, gsap 3.15.1, typescript 5.9.3, vitest 5.1.2.

## Antes de publicar

O merge na `main` publica em produção: o push dispara `.github/workflows/deploy.yml`, que builda e copia o `dist/` para o Hostinger.

A produção é LiteSpeed, e três coisas do `public/.htaccess` só foram provadas em Apache: `DirectorySlash Off`, o `ErrorDocument` e a 404 por idioma. Antes do merge, confira num host de teste no mesmo servidor:

```sh
yarn build && BASE_URL=https://<host de teste> yarn check:apache
```

Só faz GET e HEAD. A pasta do host de teste fica fora de `public_html/`; dentro dela, o próximo deploy a apaga.

- **Falha:** uma linha `causa: o servidor ignorou DirectorySlash Off` em `/en` ou `/es` quer dizer que as homes em inglês e espanhol entram em loop de redirect. Não publique.
- **Logo depois do deploy:** o mesmo comando contra `https://pedrohenriquens.com.br`, a partir de um build local do mesmo commit.
- **Voltar atrás:** reverta o commit de merge na `main` (`git revert -m 1 <merge>` e push). O site antigo volta para a raiz do repositório, o mesmo workflow o builda e o `rsync --delete` o republica por cima.

## Adicionar um projeto

1. Os fatos em `src/data/projects.ts` (e a imagem em `src/assets/images/`).
2. O texto nos três idiomas: `src/content/projects/{pt-br,en,es}/<slug>.md` (`summary` no cabeçalho, a descrição no corpo; vazio falha o build).
3. Os números literais: `17` em `scripts/check-apache.sh` (+1 por projeto) e `57` e `54` em `scripts/check-dist.mjs` (páginas e URLs do sitemap, +3 cada).
