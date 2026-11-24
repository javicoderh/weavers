import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build, loadEnv } from 'vite'

const { SEO_SITE_URL = 'https://weavers-gamma.vercel.app', VERCEL_ENV } = loadEnv('production', process.cwd(), '')
const siteUrl = new URL(SEO_SITE_URL)
if (!['https:', 'http:'].includes(siteUrl.protocol)) throw new Error('SEO_SITE_URL must be an absolute HTTP(S) URL')
const { origin } = siteUrl
const noIndex = VERCEL_ENV === 'preview'

await build({ build: { outDir: 'dist' } })

const buildCache = resolve('node_modules/.cache')
await mkdir(buildCache, { recursive: true })
const serverDir = await mkdtemp(resolve(buildCache, 'weavers-prerender-'))

try {
  await build({ build: { ssr: 'src/prerender.jsx', outDir: serverDir } })
  const { pages, renderPage, renderHead } = await import(pathToFileURL(resolve(serverDir, 'prerender.js')))
  const template = await readFile('dist/index.html', 'utf8')

  for (const page of [...pages, { path: '/404', language: 'es' }]) {
    const output = resolve('dist', page.path === '/' ? 'index.html' : page.path.slice(1) + '.html')
    const html = template
      .replace('lang="es"', `lang="${page.language}"`)
      .replace('<title>Weavers</title>', () => renderHead(page, origin, noIndex))
      .replace('<div id="root"></div>', () => `<div id="root" data-rendered-path="${page.path}" data-site-origin="${origin}" data-noindex="${noIndex}">${renderPage(page)}</div>`)
    await mkdir(dirname(output), { recursive: true })
    await writeFile(output, html)
  }

  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)
  const urls = pages.map(({ path }) => `  <url><loc>${origin}${path}</loc></url>`).join('\n')
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
} finally {
  await rm(serverDir, { recursive: true, force: true })
}
