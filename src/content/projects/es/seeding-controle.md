---
summary: "App de escritorio en Electron para que los seeders registren comentarios en redes sociales, con UI optimista, React Query y sincronización en la nube con Supabase."
---

Un controlador de comentarios en el que los **Seeders** de las redes sociales registran sus resultados a medida que trabajan.

Después, la aplicación adapta los datos a la base de datos que usa la empresa para el análisis, mediante el botón **Seeding**.

La aplicación de escritorio se arma con **Electron**, con todo programado en **React.js** con **Vite**.

Todo el control se guarda en la nube en **Supabase**, que también se encarga de la autenticación de los usuarios.

La aplicación se construyó con *"UI optimista"*: la respuesta se predice y se aplica al instante, mientras las solicitudes con **React Query** guardan los cambios en segundo plano.
