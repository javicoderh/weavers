import { useEffect, useRef, useState } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
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

function Layout() {
  const { t } = useLanguage()
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)
  const main = useRef(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const route = pathname.replace(/\/+$/, '').toLowerCase() || '/'
  useRouteAnalytics(route === '/' && galleryOpen ? '/trabajos' : route)
  useElementClicks()
  useEffect(() => {
    const path = pathname.replace(/\/$/, '')
    const service = services.find(s => '/'+s.slug === path)
    let title = t('brand.name')
    if (service) title = t('detail.title', { service: t('services.'+service.slug+'.name') })
    if (path === '/about') title = t('about.pageTitle', { brand: t('brand.name') })
    if (route === workshopiaPath) title = t('detail.title', { service: t('projects.workshopia.name') })
    document.title = title
    if (previousPath.current !== pathname) {
      main.current.focus({ preventScroll: true })
      window.scrollTo(0, 0)
      previousPath.current = pathname
    }
  }, [pathname, route, t])

  return <div className="page">
    <header className="site-header"><div className="container">
      <WeaversLogo />
      <div className="header-actions">
        <ContextNote label={t('header.aboutLabel')} clickKey="header.about-note">{t('header.aboutDescription')}</ContextNote>
        <LanguageToggle />
      </div>
    </div></header>
    <main ref={main} tabIndex={-1}><Outlet context={setGalleryOpen} /></main>
    <footer className="site-footer"><div className="container">{t('footer.copyright', { year: new Date().getFullYear() })}</div></footer>
  </div>
}

export function AppRoutes() {
  return <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path={workshopiaPath} element={<Workshopia />} />
      {services.map(service => <Route key={service.slug} path={service.slug} element={<ServiceDetail service={service} />} />)}
    </Route>
  </Routes>
}
