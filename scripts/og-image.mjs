// Gera public/og-image.jpg (1200x630). Rodar à mão: yarn og:image
import { chromium } from '@playwright/test'
import { readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const font = (pkg, file) => pathToFileURL(`node_modules/@fontsource-variable/${pkg}/files/${file}`).href
const photo = `data:image/jpeg;base64,${readFileSync('src/assets/images/pedro.jpg').toString('base64')}`

const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:B;src:url(${font('bricolage-grotesque', 'bricolage-grotesque-latin-wdth-normal.woff2')});font-weight:200 800;font-stretch:75% 100%}
@font-face{font-family:H;src:url(${font('hanken-grotesk', 'hanken-grotesk-latin-wght-normal.woff2')});font-weight:100 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#EEF0F3;color:#0E1420;position:relative;overflow:hidden;font-family:H}
.fog{position:absolute;width:760px;height:760px;right:-120px;top:-60px;border-radius:50%;background:#2B4BFF;opacity:.22;filter:blur(130px)}
.name{position:absolute;left:60px;top:100px;font:800 188px/.9 B;font-stretch:75%;letter-spacing:-.02em}
.card{position:absolute;right:92px;top:60px;width:330px;height:440px;border-radius:22px;overflow:hidden;transform:rotate(4deg);box-shadow:0 30px 60px rgba(0,0,0,.38)}
.card img{width:100%;height:100%;object-fit:cover;display:block}
.tech{position:absolute;left:60px;bottom:104px;font:500 30px H}
.dom{position:absolute;left:60px;bottom:60px;font:600 26px H;color:#2B4BFF}
</style><div class="fog"></div>
<div class="name">Pedro<br>Henrique</div>
<div class="card"><img src="${photo}"></div>
<div class="tech">React, Next.js, React Native, NestJS, AWS</div>
<div class="dom">pedrohenriquens.com.br</div>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
// setContent roda em about:blank, que não carrega fontes de file://; por isso um arquivo.
const tmp = join(tmpdir(), 'og-image.html')
writeFileSync(tmp, html)
await page.goto(pathToFileURL(tmp).href)
await page.evaluate(() => document.fonts.ready)
const buf = await page.screenshot({ type: 'jpeg', quality: 82 })
await browser.close()

const w = buf.readUInt16BE(buf.indexOf(Buffer.from([0xff, 0xc0])) + 7)
const h = buf.readUInt16BE(buf.indexOf(Buffer.from([0xff, 0xc0])) + 5)
if (w !== 1200 || h !== 630) throw new Error(`og-image ${w}x${h}, esperado 1200x630`)
writeFileSync('public/og-image.jpg', buf)
console.log(`public/og-image.jpg ${w}x${h} ${buf.length} bytes`)
