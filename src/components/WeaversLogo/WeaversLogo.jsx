import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import artwork from './weavers.svg?no-inline'
import styles from './WeaversLogo.module.css'

export function WeaversLogo() {
  const { t } = useLanguage()

  return (
    <div className={styles.brand}>
      <Link className={styles.link} to="/" aria-label={t('header.homeLinkLabel')} data-click-key="header.logo">
        <img src={artwork} width="232" height="40" alt={t('brand.name')} />
      </Link>
      <p className={styles.tagline}>{t('brand.tagline')}</p>
    </div>
  )
}
