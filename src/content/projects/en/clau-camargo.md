---
summary: "Campaign platform for Clau Camargo (2026): in-browser photo frames, supporter frames, per-city videos for QR Codes and a ballot cheat sheet in canvas."
---

Campaign site for Clau Camargo, a 2026 candidate for state representative, that grew from a photo frame generator into a platform with several fronts.

A frame generator that processes the photo only in the browser (**Canvas API**, HEIC support), frames co-signed by supporters at their own URLs, per-city video pages for printed QR Codes with a custom player, and "Minha Colinha", which draws and exports the voter's ballot cheat sheet in canvas.

Supporter and city pages are prerendered at build time by a custom **Vite** plugin, so each link shows the right preview on WhatsApp. Metrics per city and channel with **Google Tag Manager** and **GA4**, under a privacy policy aligned with Brazil's LGPD.

Built with **React 19** and the **React Compiler**, **TypeScript**, **TanStack Router** and **Tailwind CSS**, with more than 370 tests in **Vitest** and a **GitHub Actions** deploy on every release.
