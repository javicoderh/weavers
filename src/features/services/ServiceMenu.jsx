import { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { services, formatPrice } from './catalog'
import { ServiceArtwork } from './ServiceArtwork'
import { ServiceIcon } from './ServiceIcon'
import styles from './ServiceMenu.module.css'

export function ServiceMenu() {
  const { t, language } = useLanguage()
  const [params, setParams] = useSearchParams()
  const index = Math.max(0, services.findIndex(s => s.slug === params.get('servicio')))
  const service = services[index]
  const key = 'services.' + service.slug
  const stage = useRef(null)
  const strip = useRef(null)
  const touch = useRef(null)
  const lastWheel = useRef(-Infinity)

  function select(next, focus = false) {
    if (next < 0 || next >= services.length) return
    if (focus) strip.current.children[next].focus({ preventScroll: true })
    if (next !== index) setParams({ servicio: services[next].slug }, { replace: true, preventScrollReset: true })
  }

  useEffect(() => {
    const rail = strip.current
    const tab = rail.children[index]
    const bounds = rail.getBoundingClientRect()
    const tile = tab.getBoundingClientRect()
    if (tile.left < bounds.left || tile.right > bounds.right) {
      rail.scrollLeft += (tile.left + tile.right - bounds.left - bounds.right) / 2
    }
  }, [index])

  useEffect(() => {
    const panel = stage.current
    function wheel(event) {
      if (event.ctrlKey) return
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      const next = index + Math.sign(delta)
      if (!delta || !services[next]) return
      event.preventDefault()
      if (event.timeStamp - lastWheel.current < 300) return
      if (event.deltaMode === 0 && Math.abs(delta) < 2) return
      lastWheel.current = event.timeStamp
      setParams({ servicio: services[next].slug }, { replace: true, preventScrollReset: true })
    }
    panel.addEventListener('wheel', wheel, { passive: false })
    return () => panel.removeEventListener('wheel', wheel)
  }, [index, setParams])

  function keyboard(event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    const target = { ArrowRight: index+1, ArrowLeft: index-1, Home: 0, End: services.length-1 }[event.key]
    if (target === undefined) return
    event.preventDefault()
    select(target, true)
  }

  function endSwipe(event) {
    const start = touch.current
    touch.current = null
    if (!start || event.touches.length) return
    const end = event.changedTouches[0]
    const dx = end.clientX - start.clientX
    if (Math.abs(dx) > 40 && Math.abs(dx) > 1.4 * Math.abs(end.clientY-start.clientY)) {
      select(index - Math.sign(dx))
    }
  }

  return <section className={styles.menu} aria-labelledby="menu-title">
    <div className={styles.heading}>
      <h1 id="menu-title">{t('menu.title')}</h1>
      <div className={styles.controls}>
        <span aria-hidden="true" className={styles.counter}>{String(index+1).padStart(2,'0')} / {String(services.length).padStart(2,'0')}</span>
        <button type="button" aria-label={t('menu.previous')} disabled={index === 0} onClick={() => select(index-1)}><ServiceIcon name="previous" /></button>
        <button type="button" aria-label={t('menu.next')} disabled={index === services.length-1} onClick={() => select(index+1)}><ServiceIcon name="next" /></button>
      </div>
    </div>
    <div className={styles.tabs} ref={strip} role="tablist" aria-label={t('menu.title')} onKeyDown={keyboard}>
      {services.map((s, i) => <button key={s.slug} id={'tab-'+s.slug} role="tab" type="button"
        aria-selected={i === index} aria-controls="service-preview" tabIndex={i === index ? 0 : -1}
        onPointerEnter={event => { if (event.pointerType === 'mouse') select(i) }}
        onClick={() => select(i, true)}>
        <ServiceIcon name={s.slug} /><span>{t('services.'+s.slug+'.name')}</span>
      </button>)}
    </div>
    <div className={styles.preview} ref={stage} id="service-preview" role="tabpanel" tabIndex={0}
      aria-labelledby={'tab-'+service.slug} onKeyDown={keyboard}
      onTouchStart={e => { touch.current = e.touches.length === 1 ? e.touches[0] : null }}
      onTouchCancel={() => { touch.current = null }} onTouchEnd={endSwipe}>
      <div className={styles.story}>
        <h2>{t(key+'.name')}</h2>
        <p>{t(key+'.pain')}</p>
        <div className={styles.offer}>
          <span className={styles.price}>{service.price == null ? t('menu.customQuote') : t(service.launchOffer ? 'menu.launchFrom' : 'menu.from', { price: formatPrice(service, language) })}</span>
          {service.price != null && <small>{t(service.workshop ? 'menu.workshop' : 'menu.project')}</small>}
        </div>
        <Link className={styles.cta} to={'/'+service.slug}>{t(key+'.cta')} <ServiceIcon name="go" /></Link>
      </div>
      <ServiceArtwork key={service.slug} slug={service.slug} />
    </div>
  </section>
}
