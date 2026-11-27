---
summary: "Campaign site for Jé Modesto (2026): badge generator with the photo processed only in the browser via Canvas API, with HEIC support. React 19 and Vitest."
---

Campaign site for Jé Modesto, a 2026 candidate for state representative in southwestern São Paulo state: supporters upload a photo, position it inside the campaign's official badge and download an image ready to share.

All processing happens in the browser with the **Canvas API**: the photo never leaves the device and there is no back end. It accepts iPhone photos (HEIC) through a WebAssembly decoder that loads only when needed.

It reuses the frame engine from the Clau Camargo project, with the geometry re-measured for the new artwork and the layout reproduced from the desktop and mobile designs.

Built with **React 19** and the **React Compiler**, **TypeScript**, **Vite** and **Tailwind CSS**, with 74 tests in **Vitest** and automated deploys through **GitHub Actions**.
