---
summary: "Plataforma de campaña de Clau Camargo (2026): marcos de foto en el navegador y de simpatizantes, videos por ciudad para QR y guía de votación en canvas."
---

Sitio de campaña de Clau Camargo, candidata a diputada estatal en 2026, que creció de un generador de marcos de foto a una plataforma con varios frentes.

Un generador de marcos con la foto procesada solo en el navegador (**Canvas API**, compatible con HEIC), marcos firmados en conjunto con simpatizantes en URLs propias, páginas de video por ciudad para códigos QR impresos con reproductor propio, y "Minha Colinha", que dibuja y exporta la guía de votación en canvas.

Las páginas de simpatizantes y de ciudades se prerrenderizan en el build con un plugin propio de **Vite**, para que el enlace muestre la vista previa correcta en WhatsApp. Métricas por ciudad y canal con **Google Tag Manager** y **GA4**, con una política de privacidad alineada con la LGPD de Brasil.

Hecho con **React 19** y **React Compiler**, **TypeScript**, **TanStack Router** y **Tailwind CSS**, con más de 370 pruebas en **Vitest** y despliegue con **GitHub Actions** en cada release.
