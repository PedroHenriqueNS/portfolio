---
summary: "Campaign platform for Clau Camargo (2026): in-browser photo frames, supporter frames, per-city videos for QR Codes and a voting cheat sheet in canvas."
---

Campaign site for Clau Camargo, a candidate for state representative in 2026, that grew from a photo frame generator into a platform with several fronts.

A frame generator with the photo processed only in the browser (**Canvas API**, HEIC support), frames co-signed by supporters on their own URLs, per-city video pages for printed QR Codes with a custom player, and "Minha Colinha" (My Cheat Sheet), which draws and exports the voting cheat sheet in canvas.

The supporter and city pages are prerendered at build time by a custom **Vite** plugin, so the link shows the right preview on WhatsApp. Metrics per city and channel with **Google Tag Manager** and **GA4**, with a privacy policy aligned with the LGPD.

Built with **React 19** and the **React Compiler**, **TypeScript**, **TanStack Router** and **Tailwind CSS**, with more than 370 tests in **Vitest** and deploys through **GitHub Actions** on every release.
