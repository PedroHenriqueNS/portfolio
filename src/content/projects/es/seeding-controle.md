---
summary: "App de escritorio en Electron para que los seeders registren comentarios en redes sociales, con UI optimista, React Query y sincronización con Supabase."
---

Un controlador de comentarios en el que los **Seeders** de redes sociales registran sus resultados mientras trabajan.

Después, con el botón **Seeding**, la aplicación adapta los datos a la base de datos que usa la empresa para su análisis.

La aplicación de escritorio está hecha con **Electron**, todo programado en **React.js** con **Vite**.

Todo el control se guarda en la nube en **Supabase**, que también se encarga de la autenticación de usuarios.

La aplicación sigue el patrón de *"UI optimista"*: la respuesta se anticipa y se aplica al instante, mientras las solicitudes con **React Query** guardan los cambios en segundo plano.
