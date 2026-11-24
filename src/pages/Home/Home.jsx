import { Link, useOutletContext } from 'react-router-dom'
import { ProjectGallery } from '../../features/projects/ProjectGallery'
import { ServiceMenu } from '../../features/services/ServiceMenu'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from './Home.module.css'

export function Home() {
  const { t } = useLanguage()
  const setGalleryOpen = useOutletContext()

  return (
    <div className={styles.home}>
      <div className={styles.actions}>
        <ProjectGallery onOpenChange={setGalleryOpen} />
        <Link className={styles.aboutLink} to="/about" data-click-key="home.about">
          <span className={styles.peopleIcon} aria-hidden="true" />
          {t('about.title')}
        </Link>
      </div>
      <ServiceMenu />
    </div>
  )
}
