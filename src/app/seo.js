import workshopiaCover from '../features/projects/workshopia-cover.webp?no-inline'
import { workshopiaPath } from '../features/projects/catalog'
import { translate } from '../i18n/LanguageContext'
import { languages, localizedPath, publicPaths } from './paths'

export function pageMetadata(path, language, origin, noIndex = false) {
  const t = (key, values) => translate(language, key, values)
  const route = path.replace(/\/+$/, '').toLowerCase() || '/'
  const indexable = publicPaths.includes(route)
  const workshopia = route === workshopiaPath
  let title
  let description

  if (!indexable) {
    title = t('detail.title', { service: t('notFound.title') })
  } else if (route === '/') {
    title = t('seo.home.title')
    description = t('seo.home.description')
  } else if (route === '/about') {
    title = t('about.pageTitle', { brand: t('brand.name') })
    description = t('header.aboutDescription')
  } else if (workshopia) {
    title = t('seo.workshopia.title')
    description = t('projects.workshopia.description')
  } else {
    const key = 'services.' + route.slice(1)
    title = t('detail.title', { service: t(key + '.name') })
    description = t(key + '.scope')
  }

  const tags = []
  const meta = (name, content) => tags.push(['meta', { name, content }])
  const og = (name, content) => tags.push(['meta', { property: 'og:' + name, content }])
  if (noIndex || !indexable) meta('robots', 'noindex')
  if (!indexable) return { title, tags }

  meta('description', description)
  og('type', 'website')
  og('site_name', t('brand.name'))
  og('title', title)
  og('description', description)
  og('locale', language === 'es' ? 'es_CL' : 'en_US')
  meta('twitter:card', workshopia ? 'summary' : 'summary_large_image')
  meta('twitter:title', title)
  meta('twitter:description', description)

  if (origin) {
    const canonical = origin + localizedPath(route, language)
    const image = origin + (workshopia ? workshopiaCover : '/weavers-social.png')
    const imageAlt = workshopia ? t('seo.workshopia.imageAlt') : t('brand.name')
    tags.push(['link', { rel: 'canonical', href: canonical }])
    for (const alternate of languages) {
      tags.push(['link', { rel: 'alternate', hreflang: alternate, href: origin + localizedPath(route, alternate) }])
    }
    og('url', canonical)
    og('image', image)
    og('image:alt', imageAlt)
    meta('twitter:image', image)
    meta('twitter:image:alt', imageAlt)
  }

  return { title, tags }
}
