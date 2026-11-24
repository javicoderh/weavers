import { useLanguage } from '../../i18n/LanguageContext'
import styles from './About.module.css'

export function About() {
  const { t } = useLanguage()

  return (
    <section className={styles.about}>
      <h1>{t('about.title')}</h1>
      <p>{t('header.aboutDescription')}</p>
    </section>
  )
}
