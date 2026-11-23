import { createContext, useContext, useEffect, useState } from 'react'
import es from './locales/es.json'
import en from './locales/en.json'

const catalogs = { es, en }
const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('es')

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  function t(key, values = {}) {
    const template = catalogs[language]?.[key] ?? es[key] ?? key
    return template.replace(/\{(\w+)\}/g, (placeholder, name) => values[name] ?? placeholder)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
