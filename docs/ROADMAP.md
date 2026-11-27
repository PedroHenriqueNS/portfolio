# Roadmap

> **Status (2026-11-27):** a reconstrução está pronta na branch `feat/astro-gsap-redesign`; o próximo passo é validar as regras de hospedagem no servidor de produção e publicar.

## Fase 0 — Reconstrução em Astro com motion (done)

- Site anterior movido para `old/`; base nova em Astro com saída estática.
- As sete seções da home e a página de projeto, com motion GSAP no desktop e no celular e layout estático completo sem JavaScript ou com movimento reduzido.
- Três idiomas (pt-BR na raiz, `/en`, `/es`) com Paraglide, seletor e sugestão de idioma.
- SEO por idioma: canonical, `hreflang`, JSON-LD, `sitemap.xml`, `llms.txt`.
- Regras de hospedagem em `public/.htaccess` e o teste delas em Apache 2.4 (`yarn check:apache`).
- Testes de unidade, ponta a ponta em Chromium e Firefox, checagens de build e CI de pull request.

**Concluído quando:** `yarn build` gera 57 páginas e passa o `check-dist`, `yarn test`, `yarn e2e` e `yarn check:apache` passam no HEAD da branch. Atingido em 2026-11-27.

## Fase 1 — Validar no servidor de produção e publicar (planned)

- Publicar o `dist/` num host de teste no mesmo servidor LiteSpeed e rodar `BASE_URL=https://<host de teste> yarn check:apache` ([README](../README.md#antes-de-publicar)).
- Se `DirectorySlash Off`, o `ErrorDocument` ou a 404 por idioma falharem lá, ajustar as regras antes do merge.
- Merge na `main` (que publica) e o mesmo comando contra `https://pedrohenriquens.com.br` logo depois.

**Concluído quando:** o modo remoto do `check:apache` termina com zero falhas contra o host de teste e, depois do deploy, contra a produção.

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
