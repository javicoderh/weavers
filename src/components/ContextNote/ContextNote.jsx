import { useEffect, useId, useRef, useState } from 'react'
import styles from './ContextNote.module.css'

export function ContextNote({ label, clickKey, children }) {
  const [mode, setMode] = useState('closed')
  const root = useRef(null)
  const button = useRef(null)
  const panelId = useId()
  const open = mode !== 'closed'

  useEffect(() => {
    if (!open) return

    function dismissOutside(event) {
      if (!root.current.contains(event.target)) setMode('closed')
    }

    function dismissOnEscape(event) {
      if (event.key === 'Escape') setMode('closed')
    }

    document.addEventListener('pointerdown', dismissOutside)
    document.addEventListener('keydown', dismissOnEscape)
    return () => {
      document.removeEventListener('pointerdown', dismissOutside)
      document.removeEventListener('keydown', dismissOnEscape)
    }
  }, [open])

  function toggle(event) {
    const pinPreview = mode === 'preview' && event.detail > 0
    setMode(!open || pinPreview ? 'pinned' : 'closed')
  }

  return (
    <div
      className={styles.note}
      ref={root}
      onPointerEnter={event => {
        if (event.pointerType === 'mouse' && !open) setMode('preview')
      }}
      onPointerLeave={() => {
        if (mode === 'preview' && !button.current.matches(':focus-visible')) setMode('closed')
      }}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMode('closed')
      }}
    >
      <button
        ref={button}
        type="button"
        className={styles.trigger}
        data-click-key={clickKey}
        aria-label={label}
        aria-expanded={open}
        aria-controls={panelId}
        aria-describedby={open ? panelId : undefined}
        onFocus={event => {
          if (event.currentTarget.matches(':focus-visible') && !open) setMode('preview')
        }}
        onClick={toggle}
      >
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
          <path d="M12 11v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div id={panelId} className={styles.panel} hidden={!open}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
