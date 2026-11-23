import { useEffect, useRef } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { ContextNote } from '../components/ContextNote/ContextNote'
import { LanguageToggle } from '../components/LanguageToggle/LanguageToggle'
import { WeaversLogo } from '../components/WeaversLogo/WeaversLogo'
import { useLanguage } from '../i18n/LanguageContext'
import { services } from '../features/services/catalog'
import { ServiceMenu } from '../features/services/ServiceMenu'
import { ServiceDetail } from '../features/services/ServiceDetail'

function Layout() {
  const { t } = useLanguage()
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)
  const main = useRef(null)
  useEffect(() => {
    const service = services.find(s => '/'+s.slug === pathname.replace(/\/$/, ''))
    document.title = service ? t('detail.title', { service: t('services.'+service.slug+'.name') }) : t('brand.name')
    if (previousPath.current !== pathname) {
      main.current.focus({ preventScroll: true })
      window.scrollTo(0, 0)
      previousPath.current = pathname
    }
  }, [pathname, t])

  return <div className="page">
    <header className="site-header"><div className="container">
      <WeaversLogo />
      <div className="header-actions">
        <ContextNote label={t('header.aboutLabel')}>{t('header.aboutDescription')}</ContextNote>
        <LanguageToggle />
      </div>
    </div></header>
    <main ref={main} tabIndex={-1}><Outlet /></main>
    <footer className="site-footer"><div className="container">{t('footer.copyright', { year: new Date().getFullYear() })}</div></footer>
  </div>
}

export function AppRoutes() {
  return <Routes>
    <Route element={<Layout />}>
      <Route index element={<ServiceMenu />} />
      {services.map(service => <Route key={service.slug} path={service.slug} element={<ServiceDetail service={service} />} />)}
    </Route>
  </Routes>
}
