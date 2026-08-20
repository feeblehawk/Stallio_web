import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Check } from 'lucide-react'
import { LANGUAGES } from '../i18n/index.js'
import useReducedMotion from '../hooks/useReducedMotion'

// ─── Easing (matches Navbar system) ─────────────────────────────────────────
const SPRING   = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_OUT = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'

// ─── LanguageSwitcher ────────────────────────────────────────────────────────
/**
 * Dropdown language switcher.
 * • Desktop: appears in the right action group of the Navbar.
 * • Mobile: expands smoothly inside the mobile drawer without being clipped.
 * • Keyboard-accessible (Escape closes, Arrow keys move focus, Enter selects).
 * • Persists selection via i18next-browser-languagedetector → localStorage.
 */
const LanguageSwitcher = ({ variant = 'desktop' }) => {
  const { i18n, t } = useTranslation('common')
  const reducedMotion  = useReducedMotion()
  const [open, setOpen]   = useState(false)
  const containerRef      = useRef(null)
  const triggerRef        = useRef(null)
  const optionRefs        = useRef([])
  const isRtl = i18n.resolvedLanguage === 'ar'
  const isMobile = variant === 'mobile'

  const currentLang = LANGUAGES.find(l => l.code === i18n.resolvedLanguage) ?? LANGUAGES[0]

  // ── Close on outside click / focus leave ──────────────────────────────────
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('focusin',   handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('focusin',   handler)
    }
  }, [open])

  // ── Escape key ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (e.key === 'Escape') { setOpen(false); triggerRef.current?.focus() }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  const toggle = useCallback(() => setOpen(v => !v), [])

  const select = useCallback((code) => {
    i18n.changeLanguage(code)
    setOpen(false)
    triggerRef.current?.focus()
  }, [i18n])

  // Arrow-key navigation inside the dropdown
  const handleOptionKeyDown = useCallback((e, idx) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      optionRefs.current[(idx + 1) % LANGUAGES.length]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      optionRefs.current[(idx - 1 + LANGUAGES.length) % LANGUAGES.length]?.focus()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={isMobile ? 'relative w-full' : 'relative inline-block'}
    >
      {/* ── Trigger button ── */}
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('language.ariaLabel', 'Select language')}
        className={[
          'flex items-center gap-1.5 rounded-xl',
          'text-sm font-medium select-none cursor-pointer',
          'transition-colors duration-150',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          isMobile
            ? 'w-full justify-between px-4 py-3 border border-border bg-surface hover:bg-muted hover:border-border/80'
            : 'px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/60',
        ].join(' ')}
      >
        {/* Flag + label */}
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="text-base leading-none">
            {currentLang.flag}
          </span>
          <span
            className={isMobile ? 'text-foreground font-semibold text-[13px]' : 'text-muted-foreground'}
            style={{ lineHeight: 1 }}
          >
            {isMobile ? `${currentLang.nativeLabel} (${currentLang.code.toUpperCase()})` : currentLang.code.toUpperCase()}
          </span>
        </span>

        {/* Chevron */}
        <ChevronDown
          size={14}
          strokeWidth={2.4}
          aria-hidden="true"
          className={isMobile ? 'text-muted-foreground' : ''}
          style={{
            transition: reducedMotion ? 'none' : `transform 0.2s ${SPRING}`,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* ── Dropdown panel ── */}
      {isMobile ? (
        // Mobile in-flow expansion — renders cleanly inside drawer without getting clipped
        <div
          role="listbox"
          aria-label={t('language.ariaLabel', 'Select language')}
          style={{
            display: open ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '4px',
            marginTop: '8px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '6px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          }}
        >
          {LANGUAGES.map((lang, idx) => {
            const isActive = lang.code === i18n.resolvedLanguage
            return (
              <button
                key={lang.code}
                ref={el => { optionRefs.current[idx] = el }}
                role="option"
                aria-selected={isActive}
                type="button"
                onClick={() => select(lang.code)}
                onKeyDown={(e) => handleOptionKeyDown(e, idx)}
                tabIndex={open ? 0 : -1}
                className={[
                  'flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5',
                  'text-sm font-medium cursor-pointer select-none text-start',
                  'transition-colors duration-100',
                  'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring',
                  isActive
                    ? 'bg-primary/[0.09] text-primary font-semibold'
                    : 'text-foreground hover:bg-accent/70',
                ].join(' ')}
              >
                <span aria-hidden="true" className="text-base leading-none shrink-0">
                  {lang.flag}
                </span>

                <span className="flex flex-col items-start gap-0.5 leading-none">
                  <span className="font-semibold text-[13px]">{lang.nativeLabel}</span>
                  {lang.nativeLabel !== lang.label && (
                    <span className="text-[11px] text-muted-foreground">
                      {lang.label}
                    </span>
                  )}
                </span>

                <span className="ms-auto">
                  <Check
                    size={14}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    style={{
                      opacity: isActive ? 1 : 0,
                      color: 'var(--primary)',
                    }}
                  />
                </span>
              </button>
            )
          })}
        </div>
      ) : (
        // Desktop floating dropdown with RTL alignment
        <div
          role="listbox"
          aria-label={t('language.ariaLabel', 'Select language')}
          style={{
            position: 'absolute',
            ...(isRtl ? { left: 0 } : { right: 0 }),
            top: 'calc(100% + 6px)',
            zIndex: 60,
            minWidth: '168px',
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.97)',
            pointerEvents: open ? 'auto' : 'none',
            transition: reducedMotion ? 'none' : `opacity 0.18s ${EASE_OUT}, transform 0.22s ${SPRING}`,
            transformOrigin: isRtl ? 'top left' : 'top right',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
            padding: '6px',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {LANGUAGES.map((lang, idx) => {
            const isActive = lang.code === i18n.resolvedLanguage
            return (
              <button
                key={lang.code}
                ref={el => { optionRefs.current[idx] = el }}
                role="option"
                aria-selected={isActive}
                type="button"
                onClick={() => select(lang.code)}
                onKeyDown={(e) => handleOptionKeyDown(e, idx)}
                tabIndex={open ? 0 : -1}
                className={[
                  'flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5',
                  'text-sm font-medium cursor-pointer select-none text-start',
                  'transition-colors duration-100',
                  'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring',
                  isActive
                    ? 'bg-primary/[0.09] text-primary'
                    : 'text-foreground hover:bg-accent/70',
                ].join(' ')}
              >
                <span aria-hidden="true" className="text-base leading-none shrink-0">
                  {lang.flag}
                </span>

                <span className="flex flex-col items-start gap-0.5 leading-none">
                  <span className="font-semibold text-[13px]">{lang.nativeLabel}</span>
                  {lang.nativeLabel !== lang.label && (
                    <span
                      className="text-[11px]"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {lang.label}
                    </span>
                  )}
                </span>

                <span className="ms-auto">
                  <Check
                    size={14}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    style={{
                      opacity: isActive ? 1 : 0,
                      color: 'var(--primary)',
                    }}
                  />
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher