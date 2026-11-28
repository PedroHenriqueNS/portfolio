# Roadmap

> **Status (2026-11-28):** a reconstrução está publicada em produção e as regras de hospedagem passaram no servidor de produção; o próximo passo é a conferência em aparelhos reais.

## Fase 0 — Reconstrução em Astro com motion (done)

- Site anterior movido para `old/`; base nova em Astro com saída estática.
- As sete seções da home e a página de projeto, com motion GSAP no desktop e no celular e layout estático completo sem JavaScript ou com movimento reduzido.
- Três idiomas (pt-BR na raiz, `/en`, `/es`) com Paraglide, seletor e sugestão de idioma.
- SEO por idioma: canonical, `hreflang`, JSON-LD, `sitemap.xml`, `llms.txt`.
- Regras de hospedagem em `public/.htaccess` e o teste delas em Apache 2.4 (`yarn check:apache`).
- Testes de unidade, ponta a ponta em Chromium e Firefox, checagens de build e CI de pull request.

**Concluído quando:** `yarn build` gera 57 páginas e passa o `check-dist`, `yarn test`, `yarn e2e` e `yarn check:apache` passam no HEAD da branch. Atingido em 2026-11-27.

## Fase 1 — Validar no servidor de produção e publicar (done)

- Merge na `main` em 2026-11-27 (pull request #6, commit `4653483`), que publicou o site.
- Em 2026-11-28, `BASE_URL=https://pedrohenriquens.com.br yarn check:apache` a partir de um build do mesmo commit: 92 linhas, 0 falhas. O LiteSpeed respeita `DirectorySlash Off` e o `ErrorDocument`, e a 404 por idioma funciona.
- Não há registro de uma rodada num host de teste antes do merge; a prova é a da produção.

**Concluído quando:** o modo remoto do `check:apache` termina com zero falhas contra a produção depois do deploy. Atingido em 2026-11-28.

## Fase 2 — Conferência em aparelhos reais (planned)

- Safari no iPhone e no Mac: pins, transições de página, barra com safe-area, folhas e gavetas.
- Taxa de quadros dos fundos desfocados (névoa) num celular real; em navegador headless os 60 fps não mostram o custo do desfoque.
- Navegação por teclado com Option+Tab na Experiência, num Mac.

**Concluído quando:** cada item acima foi visto num aparelho real e o que falhou virou correção ou entrada em [PITFALLS.md](./PITFALLS.md).

## Fase 3 — Conteúdo pendente do dono (planned)

- Cores de palco definitivas dos 5 destaques (as de `src/data/projects.ts` são provisórias).
- Ano dos 6 projetos sem data: Auto Crop PDF, Cloud Barueri, SnowHunter, Youtube Music Clone, SodiEasy, TwoNote.
- Capturas maiores das prévias, para a capa da página do projeto em tela retina.
- Currículo em PDF em espanhol (hoje `/es` oferece o português e o inglês).
- Uma captura real para a prévia do Youtube Music Clone, que é uma imagem toda preta (já era no site anterior).
- Âncoras do site anterior `/#projetos` e `/#contatos`: não têm alvo na home nova (`#projects`, `#contact`) e o visitante cai no topo. Decidir se ganham alvo.

**Concluído quando:** os dados acima estão em `src/data/` ou em `public/`, o build passa e a decisão sobre as âncoras antigas está registrada aqui.

## Depois

Pequenas dívidas de engenharia, sem efeito para o visitante hoje:

- Muitas requisições de SVG na home: o mesmo ícone de tecnologia sai uma vez por tamanho renderizado pelo `<Image>`; um arquivo por ícone dimensionado por CSS reduziria para cerca da metade.
- Sem preload da fonte de display (Bricolage Grotesque): até ela chegar, a fonte reserva é desenhada no tamanho calculado para ela no hero. Um `<link rel="preload">` em `src/layouts/Base.astro`.
- Testes com espera fixa (`waitForTimeout`) e com asserções sobre o texto exato (`experience.spec.ts`, `stage.spec.ts`, `skills.spec.ts`), que quebram numa mudança de redação.
- O mesmo `@id` de `WebSite` leva `name` e `inLanguage` diferentes em cada home (`src/lib/seo.ts`); um nó neutro de idioma seria mais limpo.
- O módulo de mensagens baixado do jsDelivr no build poderia vir de `node_modules`.
- `scripts/og-image.mjs` ainda usa o acento antigo `#2B4BFF`; a imagem de compartilhamento ficou com o azul anterior aos tokens AA.
