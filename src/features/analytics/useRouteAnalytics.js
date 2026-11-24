import { useEffect, useLayoutEffect, useRef } from 'react'

import { sendAnalytics } from './sendAnalytics'

function startVisit(route, now) {
  return {
    route,
    elapsed: 0,
    visibleSince: document.visibilityState === 'visible' ? now : null,
  }
}

function pauseVisit(visit, now) {
  if (visit.visibleSince === null) return
  visit.elapsed += now - visit.visibleSince
  visit.visibleSince = null
}

function sendVisit(visit, now) {
  if (!visit) return
  pauseVisit(visit, now)
  const duration = Math.round(visit.elapsed)
  if (duration <= 0) return

  sendAnalytics('weavers_route_visits', { route_path: visit.route, duration_ms: duration })
}

export function useRouteAnalytics(route) {
  const currentVisit = useRef(null)

  useLayoutEffect(() => {
    const previousVisit = currentVisit.current
    if (previousVisit?.route === route) return
    const now = performance.now()
    currentVisit.current = route ? startVisit(route, now) : null
    sendVisit(previousVisit, now)
  }, [route])

  useEffect(() => {
    function handleVisibility() {
      const visit = currentVisit.current
      if (!visit) return
      const now = performance.now()
      if (document.visibilityState === 'visible') visit.visibleSince ??= now
      else pauseVisit(visit, now)
    }

    function handlePageHide() {
      const visit = currentVisit.current
      currentVisit.current = null
      sendVisit(visit, performance.now())
    }

    function handlePageShow() {
      if (route && !currentVisit.current) currentVisit.current = startVisit(route, performance.now())
    }

    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('pagehide', handlePageHide)
    window.addEventListener('pageshow', handlePageShow)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('pagehide', handlePageHide)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [route])
}
