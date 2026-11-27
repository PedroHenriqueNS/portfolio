import { defineConfig, devices } from '@playwright/test'

const DESKTOP = { width: 1440, height: 900 }
const MOBILE = { width: 390, height: 844 }

// Testa o dist/ construído: `yarn build` antes de `yarn e2e`. --ignore-lock mantém o preview em primeiro
// plano (o Astro o manda para o fundo quando detecta um agente, e o Playwright o daria por encerrado).
// Porta própria, longe da 4321 do `astro dev`; sem reuso, a suíte falha em vez de testar um servidor alheio.
const URL = 'http://localhost:4391'
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  use: { baseURL: URL },
  webServer: { command: 'yarn preview --port 4391 --ignore-lock', url: URL, reuseExistingServer: false },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'], viewport: DESKTOP } },
    { name: 'chromium-mobile', use: { ...devices['Desktop Chrome'], viewport: MOBILE } },
    { name: 'firefox-desktop', use: { ...devices['Desktop Firefox'], viewport: DESKTOP } },
    { name: 'firefox-mobile', use: { ...devices['Desktop Firefox'], viewport: MOBILE } },
  ],
})
