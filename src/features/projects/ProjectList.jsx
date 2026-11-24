import { useId } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from './ProjectList.module.css'

export function ProjectList({ projects, clickPrefix }) {
  const { t } = useLanguage()
  const listId = useId()
  const newTabId = `${listId}-new-tab`

  return (
    <>
      <span id={newTabId} hidden>{t('gallery.newTab')}</span>
      <ul className={styles.projects} role="list">
        {projects.map(project => {
          const key = `projects.${project.id}`
          const nameId = `${listId}-${project.id}`
          const actionId = `${nameId}-action`

          return (
            <li key={project.id}>
              <a
                className={styles.card}
                href={project.url}
                data-click-key={`${clickPrefix}.${project.id}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-labelledby={`${actionId} ${nameId}`}
                aria-describedby={newTabId}
              >
                <img className={styles.thumbnail} src={project.image} alt="" loading="lazy" width="128" height="128" />
                <div className={styles.copy}>
                  <h3 id={nameId}>{t(`${key}.name`)}</h3>
                  <p>{t(`${key}.description`)}</p>
                  <p className={styles.implementation}>{t(`${key}.implementation`)}</p>
                  <span id={actionId} className={styles.action}>
                    {t(`gallery.action.${project.action ?? 'site'}`)}
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}
