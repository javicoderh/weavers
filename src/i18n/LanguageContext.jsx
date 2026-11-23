import { createContext, useContext, useEffect, useState } from 'react'
import es from './locales/es.json'
import en from './locales/en.json'

const catalogs = { es, en }
const LanguageContext = createContext(null)
const preferenceKey = 'weavers-language'

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem(preferenceKey) === 'en' ? 'en' : 'es'
    } catch {
      return 'es'
    }
  })

  useEffect(() => {
    document.documentElement.lang = language
    try {
      localStorage.setItem(preferenceKey, language)
    } catch {
      // Language switching also works when storage is unavailable.
    }
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
