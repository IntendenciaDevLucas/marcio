import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_BASE_PATH || './',
    plugins: [react(), tailwindcss(), {
      name: 'site-metadata',
      transformIndexHtml(html) {
        const site = (env.VITE_SITE_URL || '').replace(/\/$/, '')
        if (!site) return html
        const safe = site.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
        return html.replace('<!-- deployment-metadata -->', `<link rel="canonical" href="${safe}/" /><meta property="og:url" content="${safe}/" />`)
      },
    }],
  }
})
