---
summary: "Sitio de campaña de Jé Modesto (2026): generador de sellos con la foto procesada solo en el navegador vía Canvas API, compatible con HEIC. React 19 y Vitest."
---

Sitio de campaña de Jé Modesto, candidato a diputado estatal en el suroeste del estado de São Paulo, en 2026: el simpatizante sube una foto, la acomoda dentro del sello oficial de la campaña y descarga la imagen lista para compartir.

Todo el procesamiento ocurre en el navegador con la **Canvas API**: la foto nunca sale del dispositivo y no hay backend. Acepta fotos de iPhone (HEIC) con un decodificador WebAssembly que se carga solo cuando hace falta.

Reutiliza el motor de marcos del proyecto de Clau Camargo, con la geometría medida de nuevo para el nuevo arte y el diseño reproducido a partir de las maquetas de escritorio y móvil.

Hecho con **React 19** y **React Compiler**, **TypeScript**, **Vite** y **Tailwind CSS**, con 74 pruebas en **Vitest** y despliegue automatizado con **GitHub Actions**.
