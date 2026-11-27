---
summary: "Site de campanha de Jé Modesto (2026): gerador de selo com a foto processada só no navegador via Canvas API, com suporte a HEIC. React 19 e Vitest."
---

Site de campanha do candidato a deputado estadual Jé Modesto, no Sudoeste Paulista, em 2026: o apoiador envia uma foto, posiciona dentro do selo oficial da campanha e baixa a imagem pronta para compartilhar.

Todo o processamento acontece no navegador com a **Canvas API**: a foto nunca sai do aparelho e não existe backend. Aceita fotos de iPhone (HEIC) com um decodificador WebAssembly carregado só quando necessário.

Reaproveita o motor de molduras do projeto da Clau Camargo, com a geometria remedida para a nova arte e o layout reproduzido a partir do design em desktop e celular.

Feito em **React 19** com **React Compiler**, **TypeScript**, **Vite** e **Tailwind CSS**, com 74 testes em **Vitest** e deploy automatizado via **GitHub Actions**.
