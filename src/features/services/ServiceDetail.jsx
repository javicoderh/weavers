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
    <Link className={styles.back} to={'/?servicio='+service.slug} data-click-key={`services.${service.slug}.back`}><ServiceIcon name="previous" />{t('detail.back')}</Link>
    <div className={styles.layout}>
      <div>
        <h1>{t(key+'.name')}</h1>
        <p className={styles.promise}>{t(key+'.benefit')}</p>
        <p className={styles.price}>{service.price == null ? t('menu.customQuote') : t(service.launchOffer ? 'menu.launchFrom' : 'menu.from', { price: formatPrice(service, language) })} {service.price != null && <small>{t(service.workshop ? 'menu.workshop' : 'menu.project')}</small>}</p>
        <details open>
          <summary data-click-key={`services.${service.slug}.scope`}>{t(service.price == null ? 'detail.projectScope' : 'detail.included')}</summary>
          <p>{t(key+'.scope')}</p>
        </details>
        <details>
          <summary data-click-key={`services.${service.slug}.pricing`}>{t('detail.pricing')}</summary>
          <p>{service.price != null && t('detail.terms') + ' '}{t(key+'.extras')}</p>
        </details>
      </div>
      <ServiceArtwork slug={service.slug} />
    </div>
  </article>
}
