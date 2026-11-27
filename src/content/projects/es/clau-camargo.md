---
summary: "Plataforma de campaña de Clau Camargo (2026): marcos de foto en el navegador, marcos de simpatizantes, videos por ciudad para Códigos QR y guía de votación en canvas."
---

Sitio de campaña de la candidata a diputada estatal Clau Camargo en 2026, que creció de un generador de marcos de foto a una plataforma con varios frentes.

Generador de marcos con la foto procesada solo en el navegador (**Canvas API**, soporte para HEIC), marcos cofirmados por simpatizantes en URLs propias, páginas de video por ciudad para Códigos QR impresos con reproductor propio, y "Minha Colinha" (Mi Guía), que dibuja y exporta la guía de votación en canvas.

Las páginas de simpatizantes y ciudades se prerrenderizan en el build con un plugin de **Vite** propio, para que el enlace muestre la vista previa correcta en WhatsApp. Métricas por ciudad y canal con **Google Tag Manager** y **GA4**, con política de privacidad alineada a la LGPD.

Hecho con **React 19** y **React Compiler**, **TypeScript**, **TanStack Router** y **Tailwind CSS**, con más de 370 pruebas en **Vitest** y despliegue con **GitHub Actions** en cada release.
