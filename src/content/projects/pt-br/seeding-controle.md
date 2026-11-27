---
summary: "App desktop em Electron para seeders registrarem comentários em redes sociais, com UI otimista, React Query e sincronização em nuvem via Supabase."
---

Um controlador de comentários em que os **Seeders** das redes sociais registram seus resultados à medida que trabalham.

Depois, o aplicativo adapta os dados para o banco de dados usado pela empresa para análise, através do botão **Seeding**.

A aplicação desktop é montada com o **Electron**, com tudo programado em **React.js** com **Vite**.

Todo o controle é salvo em nuvem no **Supabase**, que também cuida da autenticação dos usuários.

A aplicação foi construída com *"UI otimista"*: a resposta é prevista e aplicada na hora, enquanto requisições com **React Query** salvam as modificações em segundo plano.
