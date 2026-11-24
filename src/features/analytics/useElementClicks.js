import { useEffect } from 'react'
import { sendAnalytics } from './sendAnalytics'

export function recordElementClick(key) {
  return sendAnalytics('rpc/weavers_increment_element_click', { element_key: key })
}

export function useElementClicks() {
  useEffect(() => {
    function record(event) {
      if (!(event.target instanceof Element)) return
      const control = event.target.closest('[data-click-key]')
      if (!control || control.matches(':disabled')) return
      if (event.type === 'auxclick' && (event.button !== 1 || !control.matches('a[href]'))) return
      recordElementClick(control.dataset.clickKey)
    }

    document.addEventListener('click', record, true)
    document.addEventListener('auxclick', record, true)
    return () => {
      document.removeEventListener('click', record, true)
      document.removeEventListener('auxclick', record, true)
    }
  }, [])
}
