import { Link } from 'react-router-dom'
import { workshopiaPath } from '../../features/projects/catalog'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from './About.module.css'

export function About() {
  const { t } = useLanguage()

  return (
    <section className={styles.about}>
      <h1>{t('header.aboutLabel')}</h1>
      <p>{t('about.description')}</p>
      <h2>{t('about.projects')}</h2>
      <p>{t('about.projectsIntro')}</p>
      <ul>
        <li><Link to="/e-commerce">{t('about.storeLink')}</Link></li>
        <li><Link to="/chatbots">{t('about.chatbotLink')}</Link></li>
        <li><Link to={workshopiaPath}>{t('about.workshopiaLink')}</Link></li>
      </ul>
    </section>
  )
}
