---
summary: "Campaign site for Jé Modesto (2026): a badge generator whose photo is processed only in the browser via the Canvas API, with HEIC support. React 19 and Vitest."
---

Campaign site for Jé Modesto, a candidate for state representative in Southwest São Paulo, in 2026: supporters upload a photo, position it inside the campaign's official badge and download the finished image to share.

All processing happens in the browser with the **Canvas API**: the photo never leaves the device and there is no backend. It accepts iPhone photos (HEIC) using a WebAssembly decoder that loads only when needed.

It reuses the frame engine from the Clau Camargo project, with the geometry remeasured for the new artwork and the layout reproduced from the design on desktop and phone.

Built with **React 19** and the **React Compiler**, **TypeScript**, **Vite** and **Tailwind CSS**, with 74 tests in **Vitest** and automated deploys through **GitHub Actions**.
