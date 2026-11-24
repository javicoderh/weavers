import { useLanguage } from '../../i18n/LanguageContext'
import styles from './LanguageToggle.module.css'

export function LanguageToggle() {
  const { language, t } = useLanguage()
  const { pathname, search, hash } = useLocation()
  const spanish = language === 'es'
  const targetLanguage = spanish ? 'en' : 'es'
  const label = t('header.switchLanguage')

  return (
    <a
      className={styles.button}
      data-click-key="header.language"
      aria-label={label}
      title={label}
      href={localizedPath(pathname, targetLanguage) + search + hash}
      hrefLang={targetLanguage}
    >
      {spanish ? (
        <svg aria-hidden="true" viewBox="0 0 30 20" className={styles.flag}>
          <path fill="#fff" d="M0 0h30v20H0z" />
          <path fill="#d52b1e" d="M0 10h30v10H0z" />
          <path fill="#0039a6" d="M0 0h10v10H0z" />
          <path fill="#fff" d="m5 1.9.73 2.24h2.36L6.18 5.53l.73 2.24L5 6.39 3.09 7.77l.73-2.24-1.91-1.39h2.36Z" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 38 20" className={styles.flag}>
          <rect width="38" height="20" fill="#fff" />
          <path stroke="#b31942" strokeWidth={20 / 13} d="M0 .769h38M0 3.846h38M0 6.923h38M0 10h38M0 13.077h38M0 16.154h38M0 19.231h38" />
          <rect width="15.2" height={140 / 13} fill="#0a3161" />
          {Array.from({ length: 9 }, (_, row) =>
            Array.from({ length: row % 2 ? 5 : 6 }, (_, column) => (
              <path
                key={`${row}-${column}`}
                fill="#fff"
                transform={`translate(${1.25 + column * 2.54 + (row % 2) * 1.27} ${1.08 + row * 1.075})`}
                d="m0-.64.15.44h.46L.23.08l.15.44L0 .25l-.38.27.15-.44-.38-.28h.46Z"
              />
            )),
          )}
        </svg>
      )}
    </a>
  )
}
import { useLocation } from 'react-router-dom'
import { localizedPath } from '../../app/paths'
