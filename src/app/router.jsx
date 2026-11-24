import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { ContextNote } from '../components/ContextNote/ContextNote'
import { LanguageToggle } from '../components/LanguageToggle/LanguageToggle'
import { WeaversLogo } from '../components/WeaversLogo/WeaversLogo'
import { useRouteAnalytics } from '../features/analytics/useRouteAnalytics'
import { useElementClicks } from '../features/analytics/useElementClicks'
import { useLanguage } from '../i18n/LanguageContext'
import { workshopiaPath } from '../features/projects/catalog'
import { services } from '../features/services/catalog'
import { ServiceDetail } from '../features/services/ServiceDetail'
import { About } from '../pages/About/About'
import { Home } from '../pages/Home/Home'
import { Workshopia } from '../pages/Workshopia/Workshopia'
import { publicPaths } from './paths'
import { pageMetadata } from './seo'

function Layout() {
  const { language, t } = useLanguage()
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)
  const main = useRef(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const route = pathname.replace(/\/+$/, '').toLowerCase() || '/'
  useRouteAnalytics(publicPaths.includes(route) ? (route === '/' && galleryOpen ? '/trabajos' : route) : null)
  useElementClicks()
  useEffect(() => {
    const { siteOrigin, noindex } = document.getElementById('root').dataset
    const metadata = pageMetadata(route, language, siteOrigin, noindex === 'true')
    document.title = metadata.title
    document.head.querySelectorAll('[data-seo]').forEach(tag => tag.remove())
    for (const [name, attributes] of metadata.tags) {
      const tag = document.createElement(name)
      tag.dataset.seo = ''
      for (const [key, value] of Object.entries(attributes)) tag.setAttribute(key, value)
      document.head.append(tag)
    }
  }, [route, language])

  useEffect(() => {
    if (previousPath.current !== pathname) {
      main.current.focus({ preventScroll: true })
      window.scrollTo(0, 0)
      previousPath.current = pathname
    }
  }, [pathname])

  return <div className="page">
    <header className="site-header"><div className="container">
      <WeaversLogo />
      <div className="header-actions">
        <ContextNote label={t('header.aboutLabel')} clickKey="header.about-note">{t('header.aboutDescription')}</ContextNote>
        <LanguageToggle />
      </div>
    </div></header>
    <main ref={main} tabIndex={-1}><Outlet context={setGalleryOpen} /></main>
    <footer className="site-footer"><div className="container">
      <nav aria-label={t('footer.services')} className="site-footer-links">
        {services.map(({ slug }) => <Link key={slug} to={'/' + slug}>{t('services.' + slug + '.name')}</Link>)}
      </nav>
      {t('footer.copyright', { year: new Date().getFullYear() })}
    </div></footer>
  </div>
}

function NotFound() {
  const { t } = useLanguage()
  return <section className="container">
    <h1>{t('notFound.title')}</h1>
    <Link to="/">{t('notFound.home')}</Link>
  </section>
}

export function AppRoutes() {
  return <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path={workshopiaPath} element={<Workshopia />} />
      {services.map(service => <Route key={service.slug} path={service.slug} element={<ServiceDetail service={service} />} />)}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
}
