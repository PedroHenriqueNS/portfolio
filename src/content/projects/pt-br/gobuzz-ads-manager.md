---
summary: "Gerenciador de anúncios da Meta em Next.js: publicação, agendamento automático e insights, com toda a lógica no servidor e dados no Appwrite."
---

Um gerenciador de anúncios da **Meta**, em que é possível publicar novos anúncios, programar anúncios automáticos e visualizar insights sobre eles.

A aplicação faz requisições diretamente à API da **Meta** usando dados previamente registrados sobre os perfis e as contas de anúncio, que ficam salvos no banco de dados do **Appwrite**.

Toda ação é realizada no lado do servidor com o server-side rendering do **Next.js**: o usuário tem acesso apenas às informações que devem aparecer na interface.
