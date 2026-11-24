import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app/router'
import { languageFromPath } from './app/paths'
import { LanguageProvider } from './i18n/LanguageContext'
import './styles.css'

const { pathname, search } = window.location
const language = languageFromPath(pathname)
const root = document.getElementById('root')
document.documentElement.lang = language

const app = (
  <StrictMode>
    <LanguageProvider language={language}>
      <BrowserRouter basename={language === 'en' ? '/en' : '/'}>
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>
)

// A selected service in the URL changes the initial carousel markup.
if (root.dataset.renderedPath === pathname && !new URLSearchParams(search).has('servicio')) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
