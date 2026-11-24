import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import cover from '../../features/projects/workshopia-cover.webp'
import academicPlan from '../../../workshopia/unidad-academica.pdf?url&no-inline'
import facilitatorGuide from '../../../workshopia/guia-facilitador.pdf?url&no-inline'
import commercialBrochure from '../../../workshopia/brochure-comercial.pdf?url&no-inline'
import styles from './Workshopia.module.css'

const documents = [
  { id: 'academic-plan', url: academicPlan, pages: 115 },
  { id: 'facilitator-guide', url: facilitatorGuide, pages: 46 },
  { id: 'commercial-brochure', url: commercialBrochure, pages: 4 },
]

export function Workshopia() {
  const { t } = useLanguage()

  return (
    <article className={styles.case}>
      <Link className={styles.back} to="/sistemas-agenticos" data-click-key="workshopia.back">
        <span aria-hidden="true">←</span> {t('workshopia.back')}
      </Link>
      <header className={styles.hero}>
        <div>
          <h1>{t('projects.workshopia.name')}</h1>
          <p className={styles.tagline}>{t('workshopia.tagline')}</p>
          <p className={styles.intro}>{t('projects.workshopia.description')}</p>
        </div>
        <img src={cover} alt="" width="512" height="512" />
      </header>

      <section aria-labelledby="workshopia-documents">
        <h2 id="workshopia-documents">{t('workshopia.documents')}</h2>
        <p className={styles.intro}>{t('workshopia.documentsIntro')}</p>
        <ul className={styles.documents} role="list">
          {documents.map(({ id, url, pages }) => (
            <li key={id}>
              <a
                className={styles.document}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                data-click-key={`workshopia.pdf.${id}`}
              >
                <h3>{t(`workshopia.pdf.${id}.name`)}</h3>
                <p>{t(`workshopia.pdf.${id}.description`)}</p>
                <span className={styles.openPdf}>
                  {t('workshopia.openPdf', { pages })} <span aria-hidden="true">↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="workshopia-pipeline">
        <h2 id="workshopia-pipeline">{t('workshopia.pipeline')}</h2>
        <ol className={styles.pipeline}>
          {['input', 'plan', 'review', 'output'].map(step => (
            <li key={step}>{t(`workshopia.step.${step}`)}</li>
          ))}
        </ol>
        <p className={styles.intro}>{t('workshopia.operations')}</p>
      </section>
    </article>
  )
}
