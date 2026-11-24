import { useEffect, useId, useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { recordElementClick } from '../analytics/useElementClicks'
import { projects } from './catalog'
import styles from './ProjectGallery.module.css'

export function ProjectGallery({ onOpenChange }) {
  const { t } = useLanguage()
  const dialog = useRef(null)
  const titleId = useId()
  const newTabId = useId()

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
          <span id={newTabId} hidden>{t('gallery.newTab')}</span>
          {projects.length ? (
            <ul className={styles.projects}>
              {projects.map(project => {
                const key = `projects.${project.id}`
                const nameId = `${titleId}-${project.id}`

                return (
                  <li key={project.id}>
                    <a
                      className={styles.card}
                      href={project.url}
                      data-click-key={`work.project.${project.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-labelledby={nameId}
                      aria-describedby={newTabId}
                    >
                      <img className={styles.thumbnail} src={project.image} alt="" loading="lazy" width="128" height="128" />
                      <div className={styles.copy}>
                        <h3 id={nameId}>{t(`${key}.name`)}</h3>
                        <p>{t(`${key}.description`)}</p>
                        <p className={styles.implementation}>{t(`${key}.implementation`)}</p>
                      </div>
                      <span className={styles.arrow} aria-hidden="true">↗</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          ) : <p className={styles.empty}>{t('gallery.empty')}</p>}
        </div>
      </dialog>
    </>
  )
}
