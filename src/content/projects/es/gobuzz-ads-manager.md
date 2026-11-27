---
summary: "Gestor de anuncios de Meta en Next.js: publicación, programación automática y métricas, con toda la lógica en el servidor y los datos en Appwrite."
---

Un gestor de anuncios de **Meta** para publicar anuncios nuevos, programar anuncios automáticos y ver sus métricas.

La aplicación hace solicitudes directas a la API de **Meta** con datos ya registrados de los perfiles y las cuentas publicitarias, guardados en la base de datos de **Appwrite**.

Toda acción se ejecuta del lado del servidor con el server-side rendering de **Next.js**: el usuario solo accede a la información que debe aparecer en la interfaz.
