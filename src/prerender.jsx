import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { languages, localizedPath, publicPaths } from './app/paths'
import { AppRoutes } from './app/router'
import { pageMetadata } from './app/seo'
import { LanguageProvider } from './i18n/LanguageContext'

export const pages = languages.flatMap(language => publicPaths.map(route => ({
  route,
  language,
  path: localizedPath(route, language),
})))

export function renderPage({ path, language }) {
  return renderToString(
    <LanguageProvider language={language}>
      <StaticRouter location={path} basename={language === 'en' ? '/en' : '/'}>
        <AppRoutes />
      </StaticRouter>
    </LanguageProvider>,
  )
}

export function renderHead({ route, path, language }, origin, noIndex) {
  const { title, tags } = pageMetadata(route ?? path, language, origin, noIndex)
  return renderToStaticMarkup(<>
    <title>{title}</title>
    {tags.map(([Tag, attributes], index) => <Tag key={index} {...attributes} data-seo="" />)}
  </>)
}
