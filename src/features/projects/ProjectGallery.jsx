import { useEffect, useId, useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { recordElementClick } from '../analytics/useElementClicks'
import { projects } from './catalog'
import { ProjectList } from './ProjectList'
import styles from './ProjectGallery.module.css'

export function ProjectGallery({ onOpenChange }) {
  const { t } = useLanguage()
  const dialog = useRef(null)
  const titleId = useId()

  useEffect(() => () => onOpenChange(false), [onOpenChange])

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="dialog"
        data-click-key="home.work"
        onClick={() => {
          dialog.current.showModal()
          onOpenChange(true)
        }}
      >
        <span className={styles.portfolioIcon} aria-hidden="true" />
        {t('gallery.open')}
      </button>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby={titleId}
        onClose={event => onOpenChange(event.currentTarget.open)}
        onClick={event => {
          if (event.target === event.currentTarget) {
            recordElementClick('work.backdrop')
            event.currentTarget.close()
          }
        }}
      >
        <div className={styles.panel}>
          <header className={styles.header}>
            <h2 id={titleId}>{t('gallery.title')}</h2>
            <button type="button" className={styles.close} aria-label={t('gallery.close')} data-click-key="work.close"
              onClick={() => dialog.current.close()}>
              <span aria-hidden="true">×</span>
            </button>
          </header>
          {projects.length ? (
            <ProjectList projects={projects} clickPrefix="work.project" />
          ) : <p className={styles.empty}>{t('gallery.empty')}</p>}
        </div>
      </dialog>
    </>
  )
}
