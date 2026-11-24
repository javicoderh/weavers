import workshopiaCover from '../features/projects/workshopia-cover.webp?no-inline'
import { workshopiaPath } from '../features/projects/catalog'
import { formatPrice, services } from '../features/services/catalog'
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
    description = t('about.description')
  } else if (workshopia) {
    title = t('seo.workshopia.title')
    description = t('seo.workshopia.description')
  } else {
    const service = services.find(({ slug }) => '/' + slug === route)
    const key = 'services.' + service.slug
    title = t('detail.title', { service: t(key + '.heading') })
    description = t(key + '.snippet', { price: service.price == null ? '' : formatPrice(service, language) })
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

  const structuredData = origin && route === '/' ? {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': origin + '/#website',
    name: t('brand.name'),
    url: origin + '/',
    inLanguage: languages,
    publisher: {
      '@type': 'Organization',
      '@id': origin + '/#organization',
      name: t('brand.name'),
      url: origin + '/',
    },
  } : null
  return { title, tags, structuredData }
}
