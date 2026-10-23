/* global process, Buffer, console, Image, document */
// Otimização local, sem recorte ou alteração do conteúdo das fotos.
// Uso: node scripts/import-service-media.mjs "C:\caminho\LUCAS"
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { chromium } from 'playwright'

const source = process.argv[2]
if (!source) throw new Error('Informe a pasta LUCAS como argumento.')
const entries = [
  ['CHAVES CANIVETE OK/IMG_20231229_165452.jpg', 'canivete-renault'],
  ['CHAVES CANIVETE OK/PROPAGANDA.jfif', 'chaves-apresentacao'],
  ['CHAVES CANIVETE OK/Screenshot_2024-01-23-10-59-38-794_com.whatsapp.jpg', 'presenca-jeep'],
  ['CHAVES CANIVETE OK/WhatsApp Image 2026-10-22 at 12.56.14.jpeg', 'canivete-kwid'],
  ['CHAVES CANIVETE OK/WhatsApp Image 2026-10-22 at 12.56.15.jpeg', 'canivete-fiat'],
  ['CHAVES CANIVETE OK/WhatsApp Image 2026-10-22 at 12.56.16.jpeg', 'canivete-ford'],
  ['REPARO AUTOMOTIVO/1792759391024.jpg', 'reparo-punto'],
  ['REPARO AUTOMOTIVO/ANTES.jpg', 'ignicao-antes'],
  ['REPARO AUTOMOTIVO/DEPOIS.jpeg', 'ignicao-depois'],
  ['RESET E DECODE DE CENTRAIS/1792760443972.jpg', 'bancada-centrais'],
  ['RESET E DECODE DE CENTRAIS/1792760896852.jpg', 'painel-bancada'],
  ['RESET E DECODE DE CENTRAIS/1792760896883.jpg', 'reparo-placa'],
  ['RESIDENCIAL/1792700984127.jpg', 'residencial-preparacao'],
  ['RESIDENCIAL/1792700984139.jpg', 'residencial-fechadura'],
  ['RESIDENCIAL/1792700984152.jpg', 'residencial-instalacao'],
  ['RESIDENCIAL/Capturar.JPG', 'fechadura-referencia'],
  ['RESIDENCIAL/images.jfif', 'fechadura-antes-depois'],
]
const destination = resolve('public/images/services')
await mkdir(destination, { recursive: true })
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  let originalBytes = 0, outputBytes = 0
  for (const [file, name] of entries) {
    const buffer = await readFile(join(source, file))
    originalBytes += buffer.length
    for (const [suffix, maxSize, quality] of [['', 1600, .84], ['-thumb', 640, .8]]) {
      const encoded = await page.evaluate(async ({ data, maxSize, quality }) => {
        const img = new Image()
        img.src = `data:image/jpeg;base64,${data}`
        await img.decode()
        const scale = Math.min(1, maxSize / Math.max(img.naturalWidth, img.naturalHeight))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.naturalWidth * scale)
        canvas.height = Math.round(img.naturalHeight * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        return canvas.toDataURL('image/webp', quality).split(',')[1]
      }, { data: buffer.toString('base64'), maxSize, quality })
      const output = Buffer.from(encoded, 'base64')
      await writeFile(join(destination, `${name}${suffix}.webp`), output)
      outputBytes += output.length
    }
  }
  console.log(JSON.stringify({ images: entries.length, originalBytes, outputBytes }))
} finally { await browser.close() }
