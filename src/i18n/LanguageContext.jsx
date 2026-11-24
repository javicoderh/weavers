import { createContext, useContext } from 'react'
import es from './locales/es.json'
import en from './locales/en.json'

const catalogs = { es, en }
const LanguageContext = createContext(null)
export function translate(language, key, values = {}) {
  const template = catalogs[language]?.[key] ?? es[key] ?? key
  return template.replace(/\{(\w+)\}/g, (placeholder, name) => values[name] ?? placeholder)
}

export function LanguageProvider({ children, language }) {
  return (
    <LanguageContext.Provider value={{ language, t: (key, values) => translate(language, key, values) }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
