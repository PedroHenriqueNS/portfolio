---
summary: "Gestor de anuncios de Meta en Next.js: publicación, programación automática e insights, con toda la lógica en el servidor y datos en Appwrite."
---

Un gestor de anuncios de **Meta**, en el que se pueden publicar nuevos anuncios, programar anuncios automáticos y ver insights sobre ellos.

La aplicación hace solicitudes directamente a la API de **Meta** usando datos registrados previamente sobre los perfiles y las cuentas publicitarias, que quedan guardados en la base de datos de **Appwrite**.

Toda acción se realiza del lado del servidor con el server-side rendering de **Next.js**: el usuario solo tiene acceso a la información que debe aparecer en la interfaz.
