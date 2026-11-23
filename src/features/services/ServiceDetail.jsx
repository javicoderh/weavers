import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { formatPrice } from './catalog'
import { ServiceArtwork } from './ServiceArtwork'
import { ServiceIcon } from './ServiceIcon'
import styles from './ServiceDetail.module.css'

export function ServiceDetail({ service }) {
  const { t, language } = useLanguage()
  const key = 'services.' + service.slug
  return <article className={styles.detail}>
    <Link className={styles.back} to={'/?servicio='+service.slug}><ServiceIcon name="previous" />{t('detail.back')}</Link>
    <div className={styles.layout}>
      <div>
        <h1>{t(key+'.name')}</h1>
        <p className={styles.promise}>{t(key+'.benefit')}</p>
        <p className={styles.price}>{t('menu.from', { price: formatPrice(service, language) })} <small>{t(service.workshop ? 'menu.workshop' : 'menu.project')}</small></p>
        <details open>
          <summary>{t('detail.included')}</summary>
          <p>{t(key+'.scope')}</p>
        </details>
        <details>
          <summary>{t('detail.pricing')}</summary>
          <p>{t('detail.terms')} {t(key+'.extras')}</p>
        </details>
      </div>
      <ServiceArtwork slug={service.slug} />
    </div>
  </article>
}
