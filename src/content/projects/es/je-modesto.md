---
summary: "Sitio de campaña de Jé Modesto (2026): generador de sello con la foto procesada solo en el navegador mediante la Canvas API, con soporte para HEIC. React 19 y Vitest."
---

Sitio de campaña del candidato a diputado estatal Jé Modesto, en el Sudoeste Paulista, en 2026: el simpatizante envía una foto, la coloca dentro del sello oficial de la campaña y descarga la imagen lista para compartir.

Todo el procesamiento ocurre en el navegador con la **Canvas API**: la foto nunca sale del dispositivo y no existe backend. Acepta fotos de iPhone (HEIC) con un decodificador WebAssembly que se carga solo cuando hace falta.

Reutiliza el motor de marcos del proyecto de Clau Camargo, con la geometría remedida para la nueva arte y el diseño reproducido a partir del diseño original en escritorio y celular.

Hecho con **React 19** y **React Compiler**, **TypeScript**, **Vite** y **Tailwind CSS**, con 74 pruebas en **Vitest** y despliegue automatizado con **GitHub Actions**.
