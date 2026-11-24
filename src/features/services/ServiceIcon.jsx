import styles from './ServiceIcon.module.css'

const outlines = {
  'e-commerce': <><path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
  'pagina-web': <><rect x="2.5" y="4" width="19" height="16" rx="2"/><path d="M3 9h18M6 6.5h.1m2.5 0h.1"/></>,
  chatbots: <><path d="M3 5h14v10H8l-4 4v-4H3Z"/><path d="M18 9h3v11l-4-3h-5M7 10h.1m3.5 0h.1m3.5 0h.1"/></>,
  apps: <><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10 5h4m-3 14h2"/></>,
  juegos: <><path d="M7 7h10a4 4 0 0 1 4 3.5l.6 5a2.5 2.5 0 0 1-4.3 2l-2-2H8.7l-2 2a2.5 2.5 0 0 1-4.3-2l.6-5A4 4 0 0 1 7 7Z"/><path d="M6 11h4m-2-2v4m7-2h.1m2.9 2h.1"/></>,
  agentes: <><rect x="3" y="7" width="18" height="13" rx="4"/><path d="M12 7V3m-2 0h4m-6 9v2m8-2v2m-6 3h4"/></>,
  'sistemas-agenticos': <><path d="m5 15 5-9m4 0 5 9M8 18h8"/><circle cx="12" cy="5" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="18" r="3"/></>,
  'capacitaciones-ia': <><path d="m2 9 10-5 10 5-10 5L2 9Zm4 3v5q6 5 12 0v-5m4-3v7"/></>,
  next: <path d="m9 5 7 7-7 7"/>,
  previous: <path d="m15 5-7 7 7 7"/>,
  go: <path d="M4 12h15m-6-6 6 6-6 6"/>,
}

export function ServiceIcon({ name }) {
  return <svg className={styles.icon} aria-hidden="true" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {outlines[name]}
  </svg>
}
